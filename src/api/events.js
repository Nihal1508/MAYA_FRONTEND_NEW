import axiosClient from "../lib/axiosClient";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllEvents(status) {
  const response = await axiosClient.get(
    `${API_URL}/admin/events?status=${status}`
  );

  console.log(response.data.events);
  return response.data.events;
}

export async function getEvent({ id }) {
  const response = await axiosClient.get(
    `${API_URL}/api/events/details?eventId=${id}`,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return response.data;
}

export async function createEvent({
  eventName,
  eventDescription,
  startDate,
  endDate,
}) {
  const response = await axiosClient.post(`${API_URL}/admin/events/create`, {
    eventName,
    eventDescription,
    startDate,
    endDate,
  });

  return response.data;
}

export async function getEventImage({ eventId }) {
  const response = await axiosClient.get(
    `${API_URL}/api/events/images?eventId=${eventId}`
  );

  return response.data;
}

export async function deleteImage({ eventId, fileid }) {
  const response = await axiosClient.delete(
    `${API_URL}/api/events/images?eventId=${eventId}&fileid=${fileid}`
  );

  console.log(response);
  return response;
}
