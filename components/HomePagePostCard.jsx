import React from 'react';
import { Link } from 'next/link';

export default function HomePagePostCard( {post} ) {
    return (
        <div>
            <p>Post ID: {post.postId}</p>
            <p>Post title: {post.postTitle}</p>
            <p>Project description: {post.projectDescription}</p>
            <p>Programming language: {post.programmingLanguage}</p>
            <p>Time to code: {post.timeToCode}</p>
            <p>Time zone: {post.timeZone}</p>          
        </div>
    )
}