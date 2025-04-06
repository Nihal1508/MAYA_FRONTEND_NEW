import { privateGateway, publicGateway } from "../../services/gateway";
import { maya } from "../../services/urls";
import axios from 'axios'
const API_BASE_URL = 'http://localhost:5001';

/**
 * Create a new event
 * @param {Object} eventData - Event details
 * @param {string} eventData.eventName - Name of the event
 * @param {string} eventData.eventDescription - Description of the event
 * @param {string} eventData.startDate - Start date (ISO format)
 * @param {string} [eventData.endDate] - End date (ISO format)
 * @returns {Promise<Object>} Created event data
 */
// In your frontend API service (events.js)
// In your frontend API service (events1.js)
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/events/create', // Full correct URL
      eventData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Full API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(error.response?.data?.message || "Failed to create event. Please try again.");
  }
};
/**
 * Upload an image for an event
 * @param {Object} params
 * @param {string} params.eventId - ID of the event
 * @param {FormData} params.file - Image file in FormData
 * @returns {Promise<Object>} Upload response data
 */
// In your API service file (events1.js)
export const uploadEventImage = async (formData) => {
  try {
    console.log('Uploading image with formData:', formData); // Debug log
    
    const response = await axios.post(
      `http://localhost:5001/events/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error('Upload error details:', {
      config: error.config,
      response: error.response
    });
    throw new Error(
      error.response?.data?.message || 
      "Failed to upload image. Please try again."
    );
  }
};

/**
 * Get all events
 * @param {string} [status] - Filter by status (upcoming, ongoing, completed)
 * @returns {Promise<Array>} List of events
 */
/**
 * Get all events
 * @param {string} [status] - Filter by status (upcoming, ongoing, completed)
 * @returns {Promise<Array>} List of events
 */
export const getEvent = async (status) => {
  try {
    const params = status ? { status } : {};
    const response = await axios.get(
      'http://localhost:5001/events', // Direct endpoint URL
      {
        params,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    );
    console.log("Events fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw new Error(
      error.response?.data?.message || "Failed to fetch events. Please try again."
    );
  }
};

/**
 * Get a specific event by ID
 * @param {string} eventId - ID of the event to fetch
 * @returns {Promise<Object>} Event details
 */
export const getEventById = async (eventId) => {
  try {
    const response = await privateGateway.get(`${maya.getEvent}/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch event. Please try again."
    );
  }
};

/**
 * Update an existing event
 * @param {string} eventId - ID of the event to update
 * @param {Object} eventData - Updated event details
 * @returns {Promise<Object>} Updated event data
 */
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await privateGateway.put(
      `${maya.updateEvent}/${eventId}`,
      eventData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update event. Please try again."
    );
  }
};

/**
 * Get event image
 * @param {Object} params
 * @param {string} params.eventid - ID of the event
 * @returns {Promise<Object>} Image data
 */
export const getEventImage = async ({ eventid }) => {
  try {
    const response = await publicGateway.get(maya.getEventImage, { 
      params: { eventid },
      responseType: 'blob' // Important for image responses
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch event image. Please try again."
    );
  }
};

/**
 * Invite manager to event
 * @param {Object} params
 * @param {string} params.userid - ID of the user to invite
 * @param {string} params.eventid - ID of the event
 * @returns {Promise<Object>} Invitation response
 */
export const ManagerInvite = async ({ userid, eventid }) => {
  try {
    const response = await publicGateway.post(maya.ManagerInvite, {
      userid,
      eventid,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to invite manager. Please try again."
    );
  }
};

/**
 * Fetch event by ID (alternative)
 * @param {string} eventid - ID of the event
 * @returns {Promise<Object>} Event details
 */
export const fetchEventById = async (eventid) => {
  try {
    const response = await privateGateway.get(`${maya.getEvent}/${eventid}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch event. Please try again."
    );
  }
};

/**
 * Delete an event
 * @param {string} eventId - ID of the event to delete
 * @returns {Promise<Object>} Deletion response
 */
export const deleteEvent = async (eventId) => {
  try {
    const response = await privateGateway.delete(`${maya.getEvent}/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete event. Please try again."
    );
  }
};

/**
 * Get assigned users for an event
 * @param {string} eventId - ID of the event
 * @returns {Promise<Array>} List of assigned users
 */
export const getAssignedUsers = async (eventId) => {
  try {
    const response = await privateGateway.get(`${maya.getEvent}/users`, {
      params: { eventId }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch assigned users. Please try again."
    );
  }
};