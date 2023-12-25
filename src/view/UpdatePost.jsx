import React, { useEffect, useState } from "react"
import PostForm from "./PostForm";
import NotFound from "./NotFound";
import { useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NavBar_Search_Component from "./NavBar_Search_Component";

export default function UpdatePost() {

  const { updateNotification } = useNotification();
  const [postInfo, setPostInfo] = useState(null);
  const { notFound, setNotFound } = useState(false);
  const [busy, setBusy] = useState(false);
  const { slug } = useParams();

  const fetchPost = async () => {
    const { error, post } = await getPost(slug);
    if (error) {
      setNotFound(true);
      return updateNotification("error", error);
    };

    setPostInfo({ ...post, tags: post.tags?.join(", ") });

  };


  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await updatePost(postInfo.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setPostInfo({ ...post, tags: post.tags?.join(", ") });
  };

  if (notFound) return <NotFound />;

  return (
    <div className="max-w-screen-full flex">
      <div className="flex relative ">
        <NavBar_Search_Component />
      </div>

        <div className="flex-1 max-w-screen-lg justify-center items-center bg-gray-100">   
          <PostForm
            onSubmit={handleSubmit}
            initialPost={postInfo}
            busy={busy}
            postBtnTitle="Update"
            resetAfterSubmit
          />
        </div>


    </div>
  );
};
