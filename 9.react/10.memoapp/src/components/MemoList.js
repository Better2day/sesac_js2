import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MemoList = ({ memos, deleteMemo, editMemo, toggleDone, reorderMemos, showDetail }) => {

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) {
            console.log('드롭 위치가 없음');
            return;
        }

        if (source.index === destination.index) {
            console.log('같은 위치로 이동했음');
            return;
        }

        console.log(`드래그 시작: ${source.index}, 드롭 위치: ${destination.index}`);

        reorderMemos(source.index, destination.index); // 순서 변경을 저정한다.
    }
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="memo-list">
                {(provided) => (
                    <div
                        ref={provided.innerRef} // ref 전달
                        {...provided.droppableProps} // 드롭 가능 속성 전달
                    >

                        <div>
                            {memos.map((memo, index) => {
                                // console.log(memo);
                                return (
                                    <Draggable key={memo.id} draggableId={memo.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={memo.id} className="memo-item"
                                            >
                                                {/* 완료 체크박스 */}
                                                <input
                                                    type="checkbox"
                                                    checked={memo.completed}
                                                    onChange={() => toggleDone(memo.id)}
                                                    className="checkbox"
                                                />

                                                {/* 메모 텍스트 */}
                                                <input
                                                    type="text"
                                                    value={memo.text}
                                                    disabled={memo.completed} // 완료된 메모는 수정 불가
                                                    onChange={(e) => editMemo(memo.id, e.target.value)}
                                                />

                                                {/* 상태보기 버튼 */}
                                                <button onClick={() => showDetail(memo.id)}>상태 보기</button>

                                                {/* 버튼이 클릭 되었을때, 받아온 함수 호출 */}
                                                <button onClick={() => deleteMemo(memo.id)}>삭제</button>

                                                {/* 드래그를 편하게 하기 위한 아이콘 추가 */}
                                                <span
                                                    {...provided.dragHandleProps}
                                                    className="drag-handle"
                                                    title="드래그하여이동할핸들"
                                                >
                                                    ≡
                                                </span>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default MemoList;
