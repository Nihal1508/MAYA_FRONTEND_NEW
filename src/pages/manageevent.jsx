import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../components/topbar";
import Cover from "../assets/images/cover.png";
import axios from "axios";

const ManageEvents = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event with ID:", id);
        if (!id) {
          throw new Error("No event ID provided in URL");
        }

        const response = await axios.get(`http://localhost:5001/api/events/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (!response.data.success || !response.data.event) {
          throw new Error("Event not found or invalid response");
        }

        setEvent(response.data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSendEmail = async () => {
    if (!email) {
      setSendStatus({ success: false, message: "Please enter an email address" });
      return;
    }

    try {
      setIsSending(true);
      setSendStatus(null);

      const response = await axios.post(
        `http://localhost:5001/api/events/${id}/send-email`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.data.success) {
        setSendStatus({ success: true, message: "Event details sent successfully!" });
        setEmail("");
      } else {
        throw new Error(response.data.message || "Failed to send email");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setSendStatus({ success: false, message: err.message });
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return (
    <div className="h-[100vh] bg-[#121212] text-white p-6 flex items-center justify-center">
      <p>Loading event...</p>
    </div>
  );
  if (error) return (
    <div className="h-[100vh] bg-[#121212] text-white p-6 flex items-center justify-center">
      <p>Error: {error}</p>
    </div>
  );
  if (!event) return (
    <div className="h-[100vh] bg-[#121212] text-white p-6 flex items-center justify-center">
      <p>Event not found</p>
    </div>
  );

  return (
    <div className="h-[100vh] bg-[#121212] text-white overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-800 scrollbar-thin">
      {/* <h1 title="Manage Event"  className='p-20' /> */}

      {/* Main Content Container */}
      <div className="max-w-3xl mx-auto pt-8 pb-12 px-6">
        {/* Event Details Section */}
        <div className="bg-black rounded-xl p-6 mb-6 shadow-md border border-gray-900">
          <div className="flex flex-col gap-2">
            <p className="text-2xl text-left font-bold">{event.eventname || "Event Name Not Available"}</p>
            <p className="text-base font-semibold">{event.description || "No description provided"}</p>
            <p className="text-sm">
              {event.startDate
                ? new Date(event.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Date not set"}
            </p>
          </div>
        </div>

        {/* Cover Image Section */}
        <div className="bg-black rounded-xl p-6 mb-6 shadow-md border border-gray-900">
          <p className="text-gray-400 mb-1">Cover Image</p>
          <img
            src={event.coverImage || Cover}
            alt="Event Cover"
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>

        {/* Email Sending Section */}
        <div className="bg-black rounded-xl p-6 shadow-md border border-gray-900">
          <h2 className="text-xl font-semibold mb-4">Send Event Details</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter recipient email"
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendEmail}
              disabled={isSending}
              className={`px-6 py-2 rounded-lg font-medium ${
                isSending
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              } transition-colors`}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
          
          {sendStatus && (
            <p className={`mt-3 text-sm ${
              sendStatus.success ? "text-green-400" : "text-red-400"
            }`}>
              {sendStatus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;