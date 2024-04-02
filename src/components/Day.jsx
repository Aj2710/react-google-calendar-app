import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const Day = (prop) => {
  const { day, rowIdx } = prop;

  const [dayEvents, setDayEvents] = useState([]);

  const {
    setShowEventModal,
    setDaySelected,
    setSelectedEvent,
    filteredEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter((evt) => {
      return dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY");
    });
    
    setDayEvents(events);
  }, [filteredEvents, day]);

  const handleClick = () => {
    setDaySelected(day);
    setShowEventModal(true);
  };

  const getCurrentDayClass = () => {
    return (
      day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7" : "" 
    )
  };

  return (
    <div className="border border-gray flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>

      <div className="flex-1 cursor-pointer" onClick={handleClick}>
        {dayEvents.map((evt, index) => {
          return (
            <div
              key={index}
              onClick={() => {setSelectedEvent(evt)}}
              className={`bg-${evt.label}-300 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
              {evt.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
