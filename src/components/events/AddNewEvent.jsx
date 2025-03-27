import { useState } from "react";
import { useForm } from "react-hook-form";
import Topbar from "../topbar";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../api/events";
import { useNavigate } from "react-router-dom";

import axiosClient from "../../lib/axiosClient";

const baseUrl = import.meta.env.VITE_API_URL;

export default function AddNewEvent() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { mutate } = useMutation({
    mutationKey: ["add-event"],
    mutationFn: async (data) => {
      const result = await createEvent(data);

      if (imageFile) {
        await uploadImageToEvent(3, imageFile);
      }

      return result;
    },
    onSuccess: () => {
      navigate("/events");
    },
    onError: (error) => {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    },
  });

  const uploadImageToEvent = async (eventId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosClient.post(
        `${baseUrl}/api/events/upload?eventId=${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
      throw error;
    }
  };

  const handleImageChange = (e) => {
    setUploadError(null);
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        "Please select a valid image file (JPEG, PNG, WEBP, HEIC)"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  const onSubmit = async (data) => {
    if (isUploading) {
      alert("Image upload is still in progress. Please wait.");
      return;
    }

    if (uploadError) {
      alert("Please fix the image upload error before submitting.");
      return;
    }

    mutate(data);
  };

  return (
    <div className="h-screen relative bg-[#121212] text-white p-6">
      <Topbar title="Add Event" />
      <div className="p-20">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("eventName", { required: true })}
              type="text"
              placeholder="Title*"
              className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400"
            />
          </div>

          <div>
            <input
              {...register("eventDescription")}
              type="text"
              placeholder="Description"
              className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                {...register("startDate", { required: true })}
                type="date"
                id="startDate"
                className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400 pt-6"
              />
              <label
                htmlFor="startDate"
                className="absolute left-4 top-2 text-gray-400 text-xs pointer-events-none"
              >
                Start Date
              </label>
            </div>

            <div className="relative">
              <input
                {...register("endDate")}
                type="date"
                id="endDate"
                className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400 pt-6"
              />
              <label
                htmlFor="endDate"
                className="absolute left-4 top-2 text-gray-400 text-xs pointer-events-none"
              >
                End Date
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="border border-dashed border-gray-600 rounded-md p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-white font-medium">Add Cover Image</p>

              {imagePreview ? (
                <div className="relative w-16 h-16">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-12 h-12 bg-purple-400 bg-opacity-50 rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}

              {uploadError && (
                <p className="text-red-500 text-sm">{uploadError}</p>
              )}

              <div className="text-center">
                <p className="text-sm text-gray-300">
                  Drop images here, or{" "}
                  <label className="text-purple-400 cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp,image/heic"
                      onChange={handleImageChange}
                      disabled={isUploading}
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports: JPEG, PNG, WEBP, HEIC (max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* <div>
            <input
              type="text"
              placeholder="Add Admins"
              className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400"
            />
          </div> */}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md w-full"
              disabled={isUploading}
            >
              {isUploading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
