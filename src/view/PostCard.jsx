import React from "react"
import dateFormat from "dateformat";
import { BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import { Link } from "react-router-dom";


export default function PostCard({ post, ondeleteClick }) {

    if (!post) return null;
    const { title, thumbnail, tags, meta, createAt, slug } = post;
    return (
        <div className="bg-white aspect-square shadow-sm rounded flex flex-col">
            <img className="aspect-video" src={thumbnail || "./loading.jpg"} alt={title} />

            <div className="p-2 flex-1 flex flex-col justify-between">
                <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
                <p className="text-gray-500">{meta.substring(0, 80) + "..."}</p>

                <div className="flex-justify-between py-2">
                    <p className="text-gray-500 text-sm">{dateFormat(createAt, "fullDate")}</p>
                    <p className="text-gray-500 text-sm">{tags?.join(", ")}</p>
                </div>

                <div className="flex space-x-3">
                    <Link to={`/update-post/${slug}`} className="w-8 h-8 rounded-full bg-blue-400
                     hover:bg-blue-600 flex justify-center items-center">
                        <BsPencilSquare />
                    </Link>

                    <button onClick={ondeleteClick} className="w-8 h-8 rounded-full bg-red-400
                     hover:bg-red-600 flex justify-center items-center">
                        <BsTrash3Fill />
                    </button>
                </div>
            </div>

        </div>
    );
}
