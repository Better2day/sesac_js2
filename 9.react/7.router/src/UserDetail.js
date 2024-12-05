import { useParams } from 'react-router-dom';

const UserDetail = () => {
    const { userId } = useParams();

    const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
        { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
    ]

    const user = users.find((u) => u.id === parseInt(userId));

    return (
        <div>
            <h2>User Detail</h2>
            <p>사용자 상세 페이지: {userId}</p>

            <p><strong>이름: </strong> {user.name}</p>
            <p><strong>이메일: </strong> {user.email}</p>
            <p><strong>나이: </strong> {user.age}</p>
        </div>
    );
};

export default UserDetail;
