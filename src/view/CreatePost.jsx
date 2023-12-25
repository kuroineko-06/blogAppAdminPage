import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import PostForm, { defaultPost } from "./PostForm"
import { createPost } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import NavBar_Search_Component from "./NavBar_Search_Component";

export default function CreatePost() {
  const [postInfo, setPostInfo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [resetAfterSubmit, setResetAfterSubmit] = useState(false);
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, post } = await createPost(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    setResetAfterSubmit(true);
    navigate(`/update-post/${post.slug}`);
  };

  useEffect(() => {
    const result = localStorage.getItem("Local_Storage");
    if (!result) return;
    const oldPost = JSON.parse(result);
    setPostInfo({ ...defaultPost, ...oldPost });
  }, []);

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
            postBtnTitle="Add"
            resetAfterSubmit={resetAfterSubmit}
          />
        </div>


    </div>

  );
};
