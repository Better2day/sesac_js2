import { useState } from 'react';

const MemoForm = ({ addMemo }) => {

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 방지
        addMemo(input);
        setInput('');
    }

    return (
        <form onSubmit={handleSubmit} className="memo-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메모를 입력하세요"
            />
            <button type="submit">추가</button>
        </form>
    )
}

export default MemoForm;
