import React from 'react';

export default function HomePagePostCard( {post} ) {
    return (
        <div>
            <p>Post title: {post.postTitle}</p>
            <p>Project description: {post.projectDescription}</p>
            <p>Programming language: {post.programmingLanguage}</p>
            <p>Time to code: {post.timeToCode.seconds}</p>
            <p>Time zone: {post.timeZone}</p>            
        </div>
    )
}