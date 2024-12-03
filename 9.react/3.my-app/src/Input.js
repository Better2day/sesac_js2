const Input = ({ setMessage }) => {

    const onChangeHandler = (e) => {
        const newValue = e.target.value;
        console.log('New Value: ', newValue);
        setMessage(newValue);
    }

    return (
        <div>
            <label>메시지 입력:</label>
            <input
                type="text"
                placeholder="메시지를 입력하세요"
                // onChange={(e) => setMessage(e.target.value)}
                onChange={(e) => onChangeHandler(e)}

            />
            {/* 위 input처럼 태그 가운데에 올 내용이 없을 때 self-closing tag 사용 */}
        </div>
    );
}

export default Input;