import React from "react";
import { Models } from "appwrite";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
  };
  
  const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex justify-between items-center z-20">
    <div className="flex gap-2 mr-5">
        <img
        src="/assets/icons/like.svg"
        alt="like"
        width={20}
        height={20}
        onClick={()=>{}}
        className="cursor-pointer"/>
    <p>0</p>
    </div>

    </div>
  )
};

export default PostStats;