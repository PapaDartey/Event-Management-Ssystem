import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const EventCalendar = ({
  onDateSelect,
  onPreferencesChange,
  events,
  preferences,
}) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to check if date has events
  const hasEvents = (date) => {
    return events.some((event) => {
      const eventDate = new Date(event.startDateTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Updated tile content with new styling
  const tileContent = ({ date, view }) => {
    if (view === "month" && hasEvents(date)) {
      return (
        <div className='h-1.5 w-1.5 bg-black rounded-full mx-auto mt-1'></div>
      );
    }
  };

  const handlePreferenceToggle = (pref) => {
    const newPreferences = selectedPreferences.includes(pref)
      ? selectedPreferences.filter((p) => p !== pref)
      : [...selectedPreferences, pref];

    setSelectedPreferences(newPreferences);
    onPreferencesChange(newPreferences); // Pass the updated preferences to parent
  };

  const handleDateSelect = (date) => {
    const newDate = selectedDate && selectedDate.toDateString() === date.toDateString() ? null : date;
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  return (
    <div
      className='bg-white rounded-xl shadow-lg p-6 '
      style={{ width: "350px" }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-[#0c0a09]'>Event Calendar</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg text-[#0c0a09]'
        >
          <FiFilter className='text-[#0c0a09]' />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className='mb-6 rounded-lg'>
          <h3 className='text-sm font-medium text-[#0c0a09] mb-3'>
            Event Types
          </h3>
          <div className='flex flex-wrap gap-2'>
            {preferences.map((pref) => (
              <button
                key={pref}
                onClick={() => handlePreferenceToggle(pref)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedPreferences.includes(pref)
                    ? "bg-black text-white border border-white "
                    : "bg-white text-black border"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className='calendar-container bg-transparent'>
        <Calendar
          onChange={handleDateSelect}
          value={selectedDate}
          tileContent={tileContent}
          prevLabel={<FiChevronLeft className='text-black hover:text-white' />}
          nextLabel={<FiChevronRight className='text-black hover:text-white' />}
          className='rounded-lg'
        />
      </div>
    </div>
  );
};

export default EventCalendar;
