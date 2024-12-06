import { useState } from 'react';

const MemoDetail = ({ memo, onClose }) => {
    // 1. 내부에서 메모 제목과 상세 내용을 관리한다.
    // 2. 메모를 저장하는 함수를 받아온다.
    // 3. 내부에 저장된 내용을 3번의 함수를 통해서 다시 바깥으로 저장해준다.
    const [text, setTitle] = useState(memo.text); // 이런 식으로 시작

    const [attachments, setAttachments] = useState([]);

    return (
        <div className="memo-detail-overlay">
            <div className="memo-detail">
                <h2>메모 상세보기</h2>
                <input
                    type="text"
                    value={memo.text}
                    placeholder="제목을 입력하세요"
                    className="memo-title-input"
                />
                <textarea
                    placeholder="상세 내용을 입력하세요"
                    className="memo-textarea"
                />
                <div className="attachment-scetion">
                    <h3>첨부 파일</h3>
                    <input
                        type="file"
                        multiple
                    />
                    <ul className="attachment-list">
                        {attachments.map((file, index) => (
                            <li key={index}>
                                {file.type.startsWith('image/') ? (
                                    < img
                                        src={file.url}
                                        alt={file.name}
                                        className="attachment-thumbnail"
                                    />
                                ) : (
                                    <a href={file.url} download={file.name}>
                                        {file.name}
                                    </a>
                                )}
                                <button
                                    className="delete-attachment"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="memo-detail-buttons">
                    <button>저장</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default MemoDetail;
