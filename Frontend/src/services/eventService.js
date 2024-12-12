import api from "./api";



export const getEvents = async () => {
  try {
    const response = await api.get("http://localhost:3001/api/events");
    return response?.data?.data?.map((event) => ({
      ...event,
      image: event.imageUrl,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getMyEvents = async (userId) => {
  const events = await getEvents();
  return events.filter((event) =>
    event.attendees.some((attendee) => attendee.user._id === String(userId))
  );
};

export const getEventById = async (eventId) => {
  const events = await getEvents();
  return events.filter((event) => event._id === eventId);
};

export const cancelRSVP = async (eventId) => {
  try {
    const response = await api.delete(`/events/${eventId}/rsvp`);
    return response.data;
  } catch (error) {
    console.error("Error canceling RSVP:", error);
    throw error;
  }
};

export const eventsCreatedByUser = async (userId) => {
  const events = await getEvents();
  return events.filter((event) => event.organizer._id === userId);
};

export const deleteEvent = async (eventId) => {
  const response = await api.delete(`/events/${eventId}`);
  return response.data;
};

export const createEvent = async (event) => {
  const response = await api.post("/events", event);
  return response.data;
};

export const getEvent = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};
