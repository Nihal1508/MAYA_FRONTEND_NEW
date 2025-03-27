import { useForm } from "react-hook-form";
import Topbar from "../topbar";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "../../api/events";
import { useNavigate } from "react-router-dom";

export default function ManageEvent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["add-event"],
    mutationFn: createEvent,
    onSuccess: () => {
      navigate("/events");
    },
  });

  return (
    <div className="h-screen relative bg-[#121212] text-white p-6">
      <Topbar title="Manage Event" />
      <div className=" p-20">
        <form className="space-y-4" onSubmit={handleSubmit(mutate)}>
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
                className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400 pr-10 "
              />
            </div>

            <div className="relative">
              <input
                {...register("endDate")}
                type="date"
                className="bg-transparent border border-gray-700 rounded-md p-4 w-full text-white placeholder-gray-400 pr-10"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-md w-full"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
