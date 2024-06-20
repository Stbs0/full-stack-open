import { useState } from "react"
import blogServices from "../services/blogs"
const Comments = ({blogs,blog})=>{


    // TODO: add this functionality
    // dont forget about the axios or services of blogs
    // also try add the fetching of comments throught the server and mutate the creation
    
const handleClick = async(e)=>{

    const inp = e.target.comment.value
 const res = await blogServices.createComment(blog.id, inp);


}

    return (
      <div>
        <h1>comments</h1>
        <input name="comment" /> <button>add comment</button>
        <ul>
          {blogs.comments && blogs.comments.length
            ? blog.comments.map((comment) => {
                return <li key={comment}>{comment.comment}</li>;
              })
            : null}
        </ul>
      </div>
    );
}
export default Comments