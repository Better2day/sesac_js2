import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './UserDetail.css';

const UserDetail = () => {
    const { userId } = useParams();
    /* 
        const users = [
            { id: 1, name: 'Alice', email: 'alice@example.com', age: 25 },
            { id: 2, name: 'Bob', email: 'bob@example.com', age: 30 },
            { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
        ]
        const user = users.find((u) => u.id === parseInt(userId));
    */

    const [user, setUser] = useState([]); // 초기값은 빈 배열
    const [error, setError] = useState(null); // 초기에는 오류 null

    useEffect(() => {
        fetch(`http://localhost:3000/api/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => setUser(data))
            .catch(error => setError(error.message));
    }, [userId]);

    if (error) {
        // return <p style={{ color: 'red', fontWeight: 'bold' }}>오류: {error}</p>
        return <p className='error-message'>오류: {error}</p>
    }

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
