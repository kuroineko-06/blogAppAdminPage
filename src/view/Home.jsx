import React, { useEffect, useState } from "react"
import { deletePost, getPosts } from "../api/post"
import PostCard from "./PostCard"
import { useSearch } from "../context/SearchProvier";
import { useNotification } from "../context/NotificationProvider";

import NavBar_Search_Component from "./NavBar_Search_Component";

let pageNo = 0;
const POST_LIMIT = 9;
const getCount = (length) => {
  const result = length / POST_LIMIT;
  if (result % 1 !== 0) {
    return Math.floor(result) + 1;
  }
  return result;
};

export default function Home() {
  const { searchResult } = useSearch();
  const [posts, setPosts] = useState([]);
  const [TotalPostCount, setTotalPostCount] = useState([]);
  const { updateNotification } = useNotification();
  const role = localStorage.getItem("role");

  const itemCount = getCount(TotalPostCount);
  const itemArr = new Array(itemCount).fill(" ");

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);
    if (error) return updateNotification("error", error);
    setPosts(posts);
    setTotalPostCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const fetchMorePosts = (index) => {
    pageNo = index;
    fetchPosts();
  };

  const handleDelete = async ({ id }) => {
    if (role === 'admin') {
      const confirmed = window.confirm("Are you sure to delete this post?");
      if (!confirmed) return;
      const { error, message } = await deletePost(id);
      if (error) return updateNotification("error", error);
      updateNotification("success", message);

      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
    }
    else {
      updateNotification("warrning", "You don't have permission!!!")
    }

  };

  return (
    <div className="flex float-left absolute right-60">
      <NavBar_Search_Component />
      <div className="grid grid-cols-3 gap-3 pb-5 mt-3 border-2 border-gray-200">
        {searchResult.length
          ? searchResult.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                ondeleteClick={() => handleDelete(post)}
              />
            )
          })
          : posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                ondeleteClick={() => handleDelete(post)}
              />
            )
          })
        }
      </div>
      {itemArr.length > 1 && !searchResult.length ? (
        <div className=" py-5 flex absolute right-0 -bottom-20 space-x-3">
          {itemArr.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => fetchMorePosts(index)}
                className={
                  index === pageNo
                    ? "text-blue-500 border-b-2 border-b-blue-500"
                    : "text-gray-500"
                }>
                {index + 1}
              </button>
            )
          })}
        </div>
      )
        : null}
    </div>
  )
}
