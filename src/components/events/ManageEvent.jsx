import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Topbar from "../topbar";
import { updateEvent, fetchEventById,getEvent} from "../../api/events1";

export default function ManageEvent() {
  const { eventid } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Fetch event data using only eventid
  const { 
    data: event, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ["eventId", eventid],
    queryFn: () => fetchEventById(eventid),
    retry: 1,
  });

  // Update event mutation using eventid
  const { mutate } = useMutation({
    mutationFn: (formData) => updateEvent(eventid, formData),
    onSuccess: () => {
      navigate("/events");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      alert("Failed to update event");
    },
  });

  // Reset form when data loads
  React.useEffect(() => {
    if (event) {
      reset({
        title: event.title || "",
        description: event.description || "",
        startDate: event.startDate?.split("T")[0] || "",
        endDate: event.endDate?.split("T")[0] || ""
      });
    }
  }, [event, reset]);

  // Loading and error states
  if (isLoading) return <div className="text-white p-6">Loading event...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error.message}</div>;
  if (!event) return <div className="text-white p-6">Event not found</div>;

  return (
    <div className="h-screen bg-[#121212] text-white p-6">
      <Topbar title="Manage Event" />
      
      <div className="p-4 md:p-20">
        {event.banner && (
          <img
            src={event.banner}
            alt="Event Banner"
            className="w-full h-48 md:h-60 object-cover rounded-md mb-6"
          />
        )}

        <form className="space-y-6" onSubmit={handleSubmit(mutate)}>
          <div>
            <label className="block text-gray-400 mb-2">Event Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="bg-gray-900 border border-gray-700 rounded-md p-3 w-full text-white"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="bg-gray-900 border border-gray-700 rounded-md p-3 w-full text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Start Date</label>
              <input
                {...register("startDate", { required: true })}
                type="date"
                className="bg-gray-900 border border-gray-700 rounded-md p-3 w-full text-white"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">End Date</label>
              <input
                {...register("endDate")}
                type="date"
                className="bg-gray-900 border border-gray-700 rounded-md p-3 w-full text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/events")}
              className="px-6 py-2 border border-gray-600 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

