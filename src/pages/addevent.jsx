import React, { useState, useCallback } from "react";
import Topbar from "../components/topbar";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:5001/api/events';

const AddEvent = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!formData.eventName || !formData.startDate) {
      setError("Please fill in all required fields (Title and Start Date)");
      return;
    }
  
    try {
      setLoading(true);
  
      // Prepare form data for the event
      const eventFormData = new FormData();
      eventFormData.append('eventName', formData.eventName);
      eventFormData.append('eventDescription', formData.eventDescription);
      eventFormData.append('startDate', formData.startDate);
      if (formData.endDate) {
        eventFormData.append('endDate', formData.endDate);
      }
      if (coverImage) {
        eventFormData.append('coverImage', coverImage);
      }
  
      // Create the event
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: eventFormData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          // Remove 'Content-Type': 'multipart/form-data' from here
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }
  
      const eventResponse = await response.json();
  
      // Redirect to events page with success message
      navigate("/events", {
        state: {
          success: coverImage
            ? "Event created with image successfully!"
            : "Event created successfully!",
          eventId: eventResponse.event.id
        }
      });
  
    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload JPEG, PNG, WEBP, or HEIC.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size too large. Maximum 5MB allowed.");
        return;
      }

      setCoverImage(file);
      setError("");
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
    setError("");
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      handleImageChange({ target: { files: [file] } });
    } else {
      setError("Only image files are allowed");
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
        <form className="space-y-6 h-fit text-left" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-500/20 text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="">
            <label className="block text-gray-400 mb-1">Title*</label>
            <input
              type="text"
              name="eventName"
              placeholder="Event Title"
              value={formData.eventName}
              onChange={handleChange}
              className="w-7/12 p-2 rounded border border-gray-600 bg-transparent text-white focus:outline-none focus:ring focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Subtitle</label>
            <input
              type="text"
              name="eventDescription"
              placeholder="Subtitle"
              value={formData.eventDescription}
              onChange={handleChange}
              className="w-7/12 p-2 rounded border border-gray-600 bg-transparent text-white focus:outline-none focus:ring focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-1">Start Date*</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-fit p-2 rounded border border-gray-600 bg-transparent placeholder:text-gray-200 text-white focus:outline-none focus:ring focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:invert"
              style={{ color: "gray" }}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-fit p-2 rounded border border-gray-600 bg-transparent placeholder:text-gray-200 text-white focus:outline-none focus:ring focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:invert"
              style={{ color: "gray" }}
              min={formData.startDate}
            />
          </div>

          <div 
            className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
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
                  className="mx-auto max-h-48 mb-2 rounded-lg object-cover"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Click to change or drag & drop a new image
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-2">Add Cover Image</p>
                <img 
                  src="/assets/images/image 30.png" 
                  alt="Placeholder" 
                  className="mx-auto w-12 h-12 mb-2" 
                />
                <p className="text-sm text-gray-500">
                  Drop images here, or{" "}
                  <span className="text-purple-500">browse</span>
                </p>
                <p className="text-sm text-gray-500">Supports: JPEG, PNG, WEBP, HEVC</p>
                <p className="text-sm text-gray-500 mt-1">Max size: 5MB</p>
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2 px-6 border border-gray-600 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;