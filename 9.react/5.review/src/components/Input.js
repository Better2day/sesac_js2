const Input = ({ setMessage }) => {

    function onChangeHandler(e) {
        console.log(e.target.value);
        setMessage(e.target.value);
    }

    return (
        <div>
            <label>메시지 입력: </label>
            <input
                type="text"
                // onChange={(e) => setMessage(e.target.value)}
                onChange={(e) => onChangeHandler(e)}
                placeholder="글자 입력..."
            />
        </div>
    );
}

export default Input;
