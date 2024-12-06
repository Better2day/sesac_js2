import { useState, useEffect } from "react";
import MemoForm from './components/MemoForm';
import MemoList from "./components/MemoList";
import MemoSearch from "./components/MemoSearch";
import MemoDetail from "./components/MemoDetail";
import './styles.css';

const App = () => {
    // const [memos, setMemos] = useState([]) // 초기화? 로컬 스토리지에 데이터가 있으면 불러오고, 없으면 []로 초기화
    const [memos, setMemos] = useState(() => { // 초기화? 로컬 스토리지에 데이터가 있으면 불러오고, 없으면 []로 초기화
        const savedMemos = localStorage.getItem('memos');
        return savedMemos ? JSON.parse(savedMemos) : [];
    });
    const [searchQuery, setSearchQuery] = useState(''); // 검색 상태
    const [isDetailOpen, setIsDetailOpen] = useState(false); // 상세보기 여부
    const [selectedMemo, setSelectedMemo] = useState(null);

    const showDetail = (id) => {
        const memo = memos.find((m) => m.id === id);
        setSelectedMemo(memo);
        setIsDetailOpen(true);
    }

    const hideDetail = () => {
        setSelectedMemo(null);
        setIsDetailOpen(false);
    }

    const addMemo = (text) => {
        const newMemo = { id: Date.now(), text, completed: false }; // 고유ID와 텍스트값으로 메모 객체 생성
        setMemos([...memos, newMemo]); // 기존 메모 배열에 새 메모 추가
    }

    // 메모의 상태가 변경될 때마다 추가 작업
    useEffect(() => {
        // Local Storage에 저장
        localStorage.setItem('memos', JSON.stringify(memos)); // 메모 상태를 JSON 문자열로 저장
    }, [memos]); // 메모리가 변경될 때마다

    // 삭제 함수를 구현하고,
    const deleteMemo = (id) => {
        // id 가 일치하지 않는것만 유지
        setMemos(memos.filter((memo) => memo.id !== id));
    }

    // 수정 함수는??
    const editMemo = (id, newText) => {
        setMemos(
            memos.map((memo) =>
                memo.id === id ? { ...memo, text: newText } : memo
            )
        );
    };

    const toggleComplete = (id) => {
        setMemos(
            memos.map((memo) =>
                memo.id === id ? { ...memo, completed: !memo.completed } : memo
            )
        )
    }

    const reorderMemos = (startIndex, endIndex) => {
        // 기존 메모를 불러와서 리스트(array) 형태로 변환하고...
        // startIndex에 있는것 1개를 지움 => removed에 저장해둠
        // endIndex 위치에다가 removed 를 삽입한다.
        setMemos((prevMemos) => {
            const updatedMemos = Array.from(prevMemos);
            const [removed] = updatedMemos.splice(startIndex, 1);
            updatedMemos.splice(endIndex, 0, removed);
            return updatedMemos;
        })
    }

    // const editMemoLegacy = (id, newText) => {
    //     const updatedMemo = [...memos];

    //     for (let i = 0; i < updatedMemo.length; i++) {
    //         if (updatedMemo[i].id === id) {
    //             updatedMemo[i].text = newText; 
    //         }
    //     }

    //     setMemos(updatedMemo);
    // }

    const filteredMemo = memos.filter((memo) => {
        console.log(memo);
        return memo.text.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <div>
            <h1>메모앱 (투두리스트)</h1>
            {/* 1. <MemoSearch /> */}

            {/* 1. 이거 개별 컴포넌트로 만든다 */}
            {/* 2. 검색 함수를 구현한다 */}
            {/* 3. 검색 내용을 담을 상태변수를 만든다 */}
            {/* 4. 필터된 내용을 MemoList에 전달한다 */}
            <MemoSearch search={setSearchQuery} />

            {/* 2. MemoSort */}
            {/* <select>
                <option>최신순</option>
                <option>오래된순</option>
                <option>알파벳순</option>
            </select> */}

            <MemoForm addMemo={addMemo} />
            <MemoList
                memos={filteredMemo}
                deleteMemo={deleteMemo}
                editMemo={editMemo}
                toggleDone={toggleComplete}
                reorderMemos={reorderMemos}
                showDetail={showDetail}
            />

            {isDetailOpen && (
                <MemoDetail
                    memo={selectedMemo}
                    onClose={hideDetail} />
            )}
        </div>
    )
}

export default App;
