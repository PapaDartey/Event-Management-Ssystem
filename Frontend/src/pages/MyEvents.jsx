import React, { useState, useEffect, useCallback } from "react";
import { FiCalendar, FiMapPin, FiClock, FiUsers } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { getMyEvents, cancelRSVP } from "../services/eventService";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
const MyEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookedEvents, setBookedEvents] = useState([]);
  const { user } = useAuth();

  const fetchMyEvents = useCallback(async () => {
    const events = await getMyEvents(user.id);
    setBookedEvents(events);
  }, [user.id]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const cancelBooking = async (eventId) => {
    const loadingToast = toast.loading("Cancelling your Reservation...");
    try {
      await cancelRSVP(eventId);
      toast.dismiss(loadingToast);
      toast.success("Reservation cancelled successfully!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to cancel reservation.");
    }
    fetchMyEvents();
  };

  const filteredEvents = bookedEvents.filter((event) => {
    const matchesSearch = searchQuery
      ? event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesSearch;
  });

  return (
    <>
      <Navbar hideMyEvents={true} />
      <div className='min-h-screen bg-[#0c0a09] pt-8'>
        <div className='max-w- mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
            <h1 className='text-2xl font-bold text-gray-100'>My Events</h1>
            <SearchBar
              placeholder='Search my events'
              value={searchQuery}
              onChange={setSearchQuery}
              className='w-full md:w-64'
            />
          </div>

          {filteredEvents.length === 0 ? (
            <div className='text-center py-16 rounded-xl shadow-sm'>
              <div className='max-w-md mx-auto'>
                <FiCalendar className='mx-auto h-12 w-12 text-gray-100' />
                <h3 className='mt-4 text-lg font-medium text-gray-200'>
                  No reserved events
                </h3>
                <p className='mt-2 text-gray-300'>
                  You haven't reserved any events yet.
                </p>
              </div>
            </div>
          ) : (
            <div className='grid lg:grid-cols-2 gap-6'>
              {filteredEvents.map((event) => (
                <div
                  id={event._id}
                  key={event._id}
                  className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'
                >
                  <div className='p-6'>
                    <div className='flex flex-col md:flex-row justify-between items-start'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-3'>
                          <h2 className='text-xl font-semibold text-[#0c0a09]'>
                            {event.name}
                          </h2>
                          <span className='inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full'>
                            {event.category}
                          </span>
                        </div>
                        <p className='mt-2 text-[#0c0a09] text-sm'>
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
                      <div className='flex items-center text-gray-600'>
                        <FiCalendar className='mr-2 text-[#0c0a09]' />
                        <span className='text-sm'>
                          {new Date(event.startDateTime).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          ) +
                            " - " +
                            new Date(event.endDateTime).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                        </span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <FiClock className='mr-2 text-[#0c0a09]' />
                        <span className='text-sm'>
                          {new Date(event.startDateTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          ) +
                            " - " +
                            new Date(event.endDateTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <FiMapPin className='mr-2 text-[#0c0a09]' />
                        <span className='text-sm'>{event.location}</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <FiUsers className='mr-2 text-gray-300' />
                        <span className='text-sm'>
                          {event.attendees?.length || 0} attendees
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => cancelBooking(event._id)}
                      className='px-4 py-2 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors mt-4'
                    >
                      Cancel
                    </button>
                  </div>

                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyEvents;
