import React, { useState, useCallback } from "react";
import Topbar from "../components/topbar";

const AddEvent = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = () => {
    alert("Submit button clicked!");
    // Here you would typically handle the form submission including the coverImage file
    console.log({ coverImage });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const triggerFileInput = () => {
    document.getElementById('cover-image-upload').click();
  };

  return (
    <div className="h-screen bg-[#121212] text-white w-full p-6">
      <Topbar title="Manage Events" />
      <div className="h-full overflow-y-scroll p-8 pb-20 scrollbar-custom">
        <form className="space-y-6 h-fit text-left">
          <div className="">
            <label className="block text-gray-400 mb-1">Title*</label>
            <input
              type="text"
              placeholder="Event Title"
              className="w-7/12 p-2 rounded border border-gray-600 bg-transparent text-white focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Subtitle</label>
            <input
              type="text"
              placeholder="Subtitle"
              className="w-7/12 p-2 rounded border border-gray-600 bg-transparent text-white focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Start Date*</label>
            <input
              type="date"
              className="w-fit p-2 rounded border border-gray-600 bg-transparent placeholder:text-gray-200 text-white focus:outline-none focus:ring focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:invert"
              style={{ color: "gray" }}
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">End Date</label>
            <input
              type="date"
              className="w-fit p-2 rounded border border-gray-600 bg-transparent placeholder:text-gray-200 text-white focus:outline-none focus:ring focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:invert"
              style={{ color: "gray" }}
            />
          </div>

          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              id="cover-image-upload"
              type="file"
              accept="image/jpeg, image/png, image/webp, image/heic"
              className="hidden"
              onChange={handleImageChange}
            />
            
            {previewImage ? (
              <>
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="mx-auto max-h-48 mb-2 rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Click to change or drag & drop a new image
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-2">Add Cover Image</p>
                <img 
                  src="assets/images/image 30.png" 
                  alt="Placeholder" 
                  className="mx-auto w-12 h-12 mb-2" 
                />
                <p className="text-sm text-gray-500">
                  Drop images here, or{" "}
                  <span className="text-purple-500">browse</span>
                </p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, WEBP, HEVC</p>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="py-2 px-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;