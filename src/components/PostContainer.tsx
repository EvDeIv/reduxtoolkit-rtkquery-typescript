import React, { FC, useEffect, useState } from "react";
import { postAPI } from "./../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "./../models/IPost";

const PostContainer: FC = () => {
  const [limit, setLimit] = useState<number>(100);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit);
  const [createPost] = postAPI.useCreatePostsMutation();
  const [updatePost] = postAPI.useUpdatePostsMutation();
  const [deletePost] = postAPI.useDeletePostsMutation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLimit(3);
  //   }, 2000);
  // }, []);

  const handleCreate = async () => {
    const title = prompt();
    await createPost({ title, body: title } as IPost);
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  return (
    <div>
      <div className="post__list">
        <button onClick={handleCreate}>Add new post</button>
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

export default PostContainer;
