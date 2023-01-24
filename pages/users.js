import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: 'AIzaSyDxBm0urtZBgYT5vP84OsqDzoMqHr0CNtI',
    authDomain: 'code-circle--x.firebaseapp.com',
    projectId: 'code-circle--x',
    storageBucket: 'code-circle--x.appspot.com',
    messagingSenderId: '250555057230',
    appId: '1:250555057230:web:b0b6fe6f763bc2f458ef1f',
    measurementId: 'G-LHZ1H9YKED',
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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