import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../components/Topbar";
import { Trash2, UploadCloud } from "lucide-react";
import axios from "axios";

const StoredEvents = () => {
  const { id: eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [pendingUploads, setPendingUploads] = useState(0);

  // Fetch event data
  const fetchEventData = async () => {
    try {
      if (!eventId) throw new Error("No event ID provided");

      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.data || !response.data.success) {
        throw new Error("Invalid response from server");
      }

      const eventData = response.data.event;
      console.log("Raw additionalImages from backend:", eventData.additionalImages);

      // Parse and validate additionalImages
      let additionalImages = [];
      if (eventData.additionalImages) {
        additionalImages = typeof eventData.additionalImages === "string"
          ? JSON.parse(eventData.additionalImages)
          : eventData.additionalImages;
        // Ensure it’s an array of valid URLs
        additionalImages = Array.isArray(additionalImages)
          ? additionalImages.filter((img) => typeof img === "string" && img.startsWith("https://"))
          : [];
      }

      console.log("Parsed and filtered additionalImages:", additionalImages);

      setEvent({ ...eventData, additionalImages });
    } catch (err) {
      console.error("Error fetching event:", err);
      setError(err.message || "Failed to load event data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  // Upload additional images
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setPendingUploads(files.length);

    const initialProgress = {};
    Array.from(files).forEach((file) => (initialProgress[file.name] = 0));
    setUploadProgress(initialProgress);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("images", file));

      await axios.post(`http://localhost:5001/api/events/${eventId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress((prev) => ({
            ...prev,
            [files[0].name]: percentCompleted, // Simplified for first file
          }));
        },
      });

      // Refetch to sync with backend
      await fetchEventData();
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload images");
    } finally {
      setIsUploading(false);
      setPendingUploads(0);
      setUploadProgress({});
    }
  };

  // Delete an image
  const handleDeleteImage = async (imageUrl) => {
    try {
      const fileId = imageUrl.split("/").pop().split(".")[0];
      await axios.delete(`http://localhost:5001/api/events/${eventId}/images`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: { fileId },
      });

      setEvent((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.filter((img) => img !== imageUrl),
        ...(imageUrl === prev.coverImage && { coverImage: null }),
      }));
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete image");
    }
  };

  if (loading && !event) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Loading storage data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Error: {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-white">
        Event not found
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#121212] text-white overflow-y-auto">
      <Topbar title="Storage Management" />

      <div className="max-w-6xl mx-auto p-6">
        {/* Event Info Section */}
        <div className="bg-black rounded-xl p-6 mb-6 border border-gray-800">
          <h1 className="text-2xl font-bold mb-2">{event.eventname}</h1>
          <p className="text-gray-400 mb-4">{event.description || "No description"}</p>
          <div className="flex gap-4 text-sm">
            <span>Start: {new Date(event.startDate).toLocaleDateString()}</span>
            <span>End: {event.endDate ? new Date(event.endDate).toLocaleDateString() : "N/A"}</span>
          </div>
        </div>

        {/* Cover Image Section */}
        <div className="bg-black rounded-xl p-6 mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Cover Image</h2>
          {event.coverImage ? (
            <div className="relative">
              <img
                src={event.coverImage}
                alt="Event Cover"
                className="w-full h-64 object-cover rounded-lg"
              />
              
            
            </div>
          ) : (
            <p className="text-gray-500">No cover image uploaded</p>
          )}
        </div>

        {/* Additional Images Section */}
        <div className="bg-black rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Additional Images ({event.additionalImages.length})
            </h2>
            <div className="relative">
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isUploading ? "bg-gray-700" : "bg-purple-600 hover:bg-purple-700"
                } cursor-pointer transition-colors`}
              >
                <UploadCloud size={18} />
                {isUploading ? "Uploading..." : "Add Images"}
              </label>
            </div>
          </div>

          {event.additionalImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {event.additionalImages.map((image, index) => (
                <div key={index} className="relative aspect-square group">
                  <img
                    src={image}
                    alt={`Event image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                      console.log(`Failed to load image: ${image}`);
                    }}
                  />
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 py-8 text-center">No additional images uploaded yet</p>
          )}

          {/* Upload progress indicators */}
          {Object.entries(uploadProgress).map(([filename, progress]) => (
            <div key={filename} className="mt-4 p-3 bg-gray-900 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm truncate max-w-xs">{filename}</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {pendingUploads > 0 && (
        <div className="fixed bottom-4 left-4 bg-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Uploading {pendingUploads} file{pendingUploads !== 1 ? "s" : ""}...
        </div>
      )}
    </div>
  );
};

export default StoredEvents;