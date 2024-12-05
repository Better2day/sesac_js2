import { Link } from 'react-router-dom';

const Users = () => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
    ]

    const userList = [];
    users.forEach(user => {
        userList.push(
            <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
        );
    })

    // return 구문 안에서는 DOM을 반납. callback 함수에서 { } 부분을 ()로 바꿔서 감싸야 한다.
    return (
        <div>
            <h2>사용자 목록</h2>
            {/* 방법 1 */}
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
            {/* 방법 2 */}
            <ul>
                {userList}
            </ul>
        </div>
    );
};

export default Users;
