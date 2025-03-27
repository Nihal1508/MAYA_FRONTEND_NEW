import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventImage } from "../../api/events";
import { useParams } from "react-router-dom";
import Topbar from "../topbar";
import axiosClient from "../../lib/axiosClient";
import { Trash2 } from "lucide-react";
import EventName from "./StoredEvents";

const baseUrl = import.meta.env.VITE_API_URL;

const EventImages = () => {
  const { id: eventId } = useParams();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [pendingUploads, setPendingUploads] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["eventImages", eventId],
    queryFn: () => getEventImage({ eventId }),
    enabled: !!eventId,
  });

  const eventImages = data?.files || [];

  const uploadImageMutation = useMutation({
    mutationFn: async ({ eventId, file }) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        `${baseUrl}/api/events/upload?eventId=${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: percentCompleted,
            }));
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["eventImages", eventId]);
    },
    onSettled: (data, error, variables) => {
      setUploadProgress((prev) => {
        const updated = { ...prev };
        delete updated[variables.file.name];
        return updated;
      });

      setPendingUploads((prev) => {
        const newCount = prev - 1;

        if (newCount <= 0) {
          setIsUploading(false);
        }
        return newCount;
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (fileId) => {
      const formData = new URLSearchParams();
      formData.append("eventId", eventId);
      formData.append("fileid", fileId);

      await axiosClient.delete(`${baseUrl}/api/events/images`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["eventImages", eventId]);
    },
  });

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (files.length === 0) return;

    setIsUploading(true);
    setPendingUploads(files.length);

    const initialProgress = {};
    Array.from(files).forEach((file) => {
      initialProgress[file.name] = 0;
    });
    setUploadProgress(initialProgress);

    for (const file of files) {
      uploadImageMutation.mutate({ eventId, file });
    }
  };

  return (
    <div className="h-screen bg-[#121212] text-white p-6">
      <Topbar title="Storage" />

      <EventName id={eventId} />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center mt-8">
          Failed to load images. Please try again.
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {eventImages.map((image) => (
              <div
                key={image.fileid}
                className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.filename}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => deleteImageMutation.mutate(image.fileid)}
                  className="absolute top-2 right-2 bg-red-600 text-black p-1 rounded-full text-xs"
                >
                  <Trash2 />
                </button>
              </div>
            ))}

            {/* Upload in progress placeholders */}
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div
                key={filename}
                className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="h-16 w-16 mb-2">
                    <svg
                      className="animate-spin h-full w-full text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-sm font-medium">{progress}%</div>
                  <div className="text-xs text-gray-400 truncate max-w-full px-2">
                    {filename}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6">
        <input
          type="file"
          id="imageUpload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
        <label
          htmlFor="imageUpload"
          className={`${
            isUploading ? "bg-gray-500" : "bg-purple-500 hover:bg-purple-600"
          } text-white p-4 rounded-full shadow-lg inline-flex items-center justify-center transition-colors`}
        >
          {isUploading ? (
            <svg
              className="animate-spin h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          )}
        </label>
      </div>

      {pendingUploads > 0 && (
        <div className="fixed bottom-6 left-6 bg-gray-800 px-4 py-2 rounded-full text-sm">
          Uploading {pendingUploads} {pendingUploads === 1 ? "file" : "files"}
          ...
        </div>
      )}
    </div>
  );
};

export default EventImages;
