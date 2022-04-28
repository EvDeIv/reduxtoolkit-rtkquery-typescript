import React, { FC } from "react";
import { IPost } from "../models/IPost";
import { postAPI } from "./../services/PostService";
import PostItem from "./PostItem";

const PostContainer2: FC = () => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100);
  const [updatePost] = postAPI.useUpdatePostsMutation();
  const [deletePost] = postAPI.useDeletePostsMutation();

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <div className="post__list">
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>Loading error.</h1>}
        {posts &&
          posts?.map((post) => (
            <PostItem
              remove={handleRemove}
              update={handleUpdate}
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer2;
