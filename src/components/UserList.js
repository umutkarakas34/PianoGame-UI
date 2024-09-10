import React from 'react';

const UserList = ({ users, deleteUser }) => {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index}>
                    {user.username} - {user.score}
                    <button onClick={() => deleteUser(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
