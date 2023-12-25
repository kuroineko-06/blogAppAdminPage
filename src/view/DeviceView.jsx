import React from "react";
import MarkDown from "markdown-to-jsx";

export default function DeviceView({ visible, thumbnail, title, content, onClose }) {
    if (!visible) return null;

    const handleOnClick = (e) => {
        if (e.target.id === "container")
            onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClick} className="bg-gray-500 bg-opacity-50 fixed inset-0 backdrop-blur-sm 
            flex justify-center items-center overflow-visible">
            <div className="bg-white w-device-width h-device-height rounded 
            overflow-x-hidden overflow-y-auto">
                <img src={thumbnail} className="aspect-video" alt="" />
                <div className="px-2">
                    <h1 className="font-semibold text-gray-700 py-2 text-xl">{title}</h1>
                    <div className="prose prose-sm">
                        <MarkDown>
                            {content}
                        </MarkDown>
                    </div>


                </div>
            </div>

        </div>
    )
}
