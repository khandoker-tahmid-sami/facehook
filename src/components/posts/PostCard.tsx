import React from 'react'
import { PostHeader } from './PostHeader'
import { PostBody } from './PostBody'
import { PostAction } from './PostAction'
import { PostComments } from './PostComments'
export const PostCard = ({post}) => {
    console.log(post)
  return (
    <article className="card mt-6 lg:mt-8">
        <PostHeader post={post}/>
        <PostBody/>
        <PostAction/>
        <PostComments/>
    </article>
  )
}
