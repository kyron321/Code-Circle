import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    function handleSubmit(e) {
        // e.preventDefault();
    }

    return (
        <main>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>Homepage</h1>
            <form onSubmit={handleSubmit}>
                <Link href="/create-a-post"><button>Make a post</button></Link>
            </form>            
        </main>
    )
}