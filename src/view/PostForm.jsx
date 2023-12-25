import React, { useEffect, useState } from "react";
import { ImSpinner6, ImEye, ImFilePicture, ImFileEmpty } from "react-icons/im";
import { uploadImage } from "../api/post";
import { useNotification } from "../context/NotificationProvider";
import MarkDown from "./MarkDown";
import DeviceView from "./DeviceView";

export const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
};

export default function PostForm({
  initialPost,
  busy,
  postBtnTitle,
  onSubmit,
  resetAfterSubmit,
}) {
  const [postInfo, setPostInfo] = useState({ ...defaultPost });
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");
  const [imageURLToCopy, setImageURLToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [displayMarkDown, setDisplayMarkDown] = useState(false);
  const [showDeviceView, setShowDeviceView] = useState(false);

  const { title, content, featured, tags, meta } = postInfo;

  const { updateNotification } = useNotification();

  useEffect(() => {
    if (initialPost) {
      setPostInfo({ ...initialPost });
      setSelectedThumbnailURL(initialPost?.thumbnail);
    }
    setPostInfo({ ...initialPost });
    return () => {
      if (resetAfterSubmit) resetForm();
    };
  }, [initialPost, resetAfterSubmit]);

  const handleChange = ({ target }) => {
    const { value, name, checked } = target;
    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return alert("This is not an image");
      }
      setPostInfo({ ...postInfo, thumbnail: file });
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }

    if (name === "featured") {
      localStorage.setItem(
        "Local_Storage",
        JSON.stringify({ ...postInfo, featured: checked })
      );
      return setPostInfo({ ...postInfo, [name]: checked });
    }

    if (name === "tags") {
      const newTags = tags?.split(" ,");
      if (newTags?.length > 4)
        updateNotification("warrning", "Only choose four tags");
    }

    if (name === "meta" && meta?.length >= 150) {
      return setPostInfo({ ...postInfo, meta: value.substring(0, 149) });
    }

    const newPost = { ...postInfo, [name]: value };

    setPostInfo({ ...newPost });

    localStorage.setItem("Local_Storage", JSON.stringify(newPost));
  };

  const handleImageUpload = async ({ target }) => {
    if (imageUploading) return;
    const file = target.files[0];
    if (!file.type?.includes("image")) {
      return updateNotification("error", "This is not an image");
    }

    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    if (error) return updateNotification("error", error);
    setImageURLToCopy(image);
  };

  const handleOnCopy = () => {
    // const textCopy = `![Add image desc!!](${imageURLToCopy})`;
    navigator.clipboard.writeText(imageURLToCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, content, tags, meta } = postInfo;
    if (!title.trim()) {
      return updateNotification("error", "Title is missing!");
    }
    if (!content.trim()) {
      return updateNotification("error", "Content is missing!");
    }
    if (!tags.trim()) {
      return updateNotification("error", "Tags are missing!");
    }
    if (!meta.trim()) {
      return updateNotification("error", "Meta description is missing!");
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .split(" ")
      .filter((item) => item?.trim())
      .join("-");

    const newTags = tags
      .split(",")
      .map((item) => item.trim())
      .splice(0, 4);

    const formData = new FormData();
    const finalPost = { ...postInfo, tags: JSON.stringify(newTags), slug };
    for (let key in finalPost) {
      formData.append(key, finalPost[key]);
    }
    onSubmit(formData);
  };

  const resetForm = () => {
    setPostInfo({ ...defaultPost });
    localStorage.removeItem("Local_Storage");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-2 flex border-l-2">
        <div className="w-9/12 h-screen space-y-3 flex flex-col">
          <div className="justify-between items-center">
            {/* title,submit */}
            <div className="flex items-center space-x-5">
              <h1 className="text-xl font-semibold text-gray-700">
                {postBtnTitle} New Post
              </h1>

              {/* btn-reset */}
              <button
                onClick={resetForm}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1
                                ring-blue-500 rounded h-10 text-blue-500 hover:text-white
                                hover:bg-blue-500 transition"
              >
                <ImSpinner6 />
                <span>Reset</span>
              </button>

              {/* btn-view */}
              <button
                onClick={() => setShowDeviceView(true)}
                type="button"
                className="flex items-center space-x-2 px-3 ring-1
                                ring-blue-500 rounded h-10 text-blue-500 hover:text-white
                                hover:bg-blue-500 transition"
              >
                <ImEye />
                <span>View</span>
              </button>

              {/* btn-post */}
              <button
                className="h-10 w-30 space-x-2 px-3 hover:ring-1
                            bg-blue-500 rounded  text-white hover:text-blue-500 
                            hover:bg-transparent ring-blue-500 transition "
              >
                <span>
                  {busy ? (
                    <ImSpinner6 className="animate-spin mx-auto text-xl" />
                  ) : (
                    postBtnTitle
                  )}
                </span>
              </button>
            </div>

            {/* check-box */}
            <div className="flex">
              <input
                name="featured"
                value={featured}
                onChange={handleChange}
                id="featured"
                type="checkbox"
                hidden
              />
              <label
                className="select-none flex items-center space-x-2 text-gray-700 cursor-pointer
                            group"
                htmlFor="featured"
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-blue-500 
                                flex justify-center items-center group-hover:border-blue-500"
                >
                  {featured && (
                    <div
                      className="w-2 h-2 rounded-full bg-gray-700 
                                group-hover:bg-blue-500"
                    />
                  )}
                </div>

                <span className="group-hover:text-blue-500">Featured</span>
              </label>
            </div>
          </div>

          {/* titlle-input */}
          <input
            value={title}
            name="title"
            type="text"
            onFocus={() => {
              setDisplayMarkDown(false);
            }}
            onChange={handleChange}
            className="text-xl outline-none 
                        focus:ring-1 rounded p-2 w-full font-semibold"
            placeholder="Post title"
          />

          {/* image */}
          <div className="flex space-x-2">
            <div>
              <input
                onChange={handleImageUpload}
                id="image-input"
                type="file"
                hidden
              />
              <label
                htmlFor="image-input"
                className="flex items-center space-x-2 px-3 ring-1
                            ring-blue-500 rounded h-10 text-gray-500 hover:text-white
                            hover:bg-gray-500 transition cursor-pointer"
              >
                <span>Place image</span>
                {!imageUploading ? (
                  <ImFilePicture />
                ) : (
                  <ImSpinner6 className="animate-spin" />
                )}
              </label>
            </div>

            {imageURLToCopy && (
              <div className="flex bg-gray-400 flex-1 rounded overflow-hidden justify-between">
                <input
                  type="text"
                  className="bg-transparent px-2 text-white w-full"
                  value={imageURLToCopy}
                  disabled
                />

                <button
                  onClick={handleOnCopy}
                  className="text-xs flex items-center flex-col 
                                justify-center p-1 self-stretch bg-gray-700 text-white"
                >
                  <ImFileEmpty />
                  <span>Copy</span>
                </button>
              </div>
            )}
          </div>

          {/* content */}
          <textarea
            value={content}
            name="content"
            onFocus={() => {
              setDisplayMarkDown(true);
            }}
            onChange={handleChange}
            className="resize-none outline-none focus:ring-1 
                        rounded p-2 w-full font-semibold flex-1 font-mono tracking-wide text-lg"
            placeholder="## heading"
          ></textarea>

          {/* tags */}
          <div>
            <label className="text-gray-500" htmlFor="tags">
              Tags
            </label>
            <input
              value={tags}
              name="tags"
              id="tags"
              type="text"
              onChange={handleChange}
              className="outline-none focus:ring-1
                            rounded p-2 w-full font-semibold"
              placeholder="Tags area"
            />
          </div>

          {/* meta-desc */}
          <div>
            <label className="text-gray-500" htmlFor="meta">
              Meta Description {meta?.length} /150
            </label>
            <textarea
              value={meta}
              name="meta"
              id="meta"
              onChange={handleChange}
              className="resize-none outline-none focus:ring-1 
                            rounded p-2 w-full font-semibold"
              placeholder="Meta"
            ></textarea>
          </div>
        </div>

        {/* thumbnail */}
        <div className="w-1/4 px-5 relative">
          <h1 className="text-xl font-semibold text-gray-700 mb-2">
            Thumbnail
          </h1>
          <div>
            <label className="" htmlFor="thumbnail">
              {selectedThumbnailURL ? (
                <img
                  src={selectedThumbnailURL}
                  className="aspect-video shadow-sm rounded"
                  alt=""
                />
              ) : (
                <div
                  className="border border-dashed border-gray-500 aspect-video 
                                    text-gray-500 flex flex-col
                                     justify-center items-center"
                >
                  <span>Select thumbnail</span>
                  <span className="text-xs">Recommended size</span>
                  <span className="text-xs">1280*720</span>
                </div>
              )}
            </label>
            <input
              onChange={handleChange}
              name="thumbnail"
              id="thumbnail"
              type="file"
              hidden
            />
          </div>

          {/* mark_down */}
          <div className="absolute top-1/3 -traslate-y-1/2 ">
            {displayMarkDown && <MarkDown />}
          </div>
        </div>
      </form>

      <DeviceView
        title={title}
        content={content}
        thumbnail={selectedThumbnailURL}
        visible={showDeviceView}
        onClose={() => setShowDeviceView(false)}
      />
    </>
  );
}
