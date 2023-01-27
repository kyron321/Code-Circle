import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';

async function getUsers(db) {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
}

export default function Users() {
    const [users, setUsers] = useState( [] );

    useEffect(() => {
        getUsers(db)
            .then((response) => {
                setUsers(response);
            })
    }, []);

    return (
        <main>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Users</h1>
            {users.map((user) => {
                return (
                    <div key={user.displayname}>
                        <p>Display name: {user.displayname}</p>
                        <p>Tech stack: {user.techstack.join(",")}</p>
                    </div>                   
                )
            })}
        </main>
    )
}