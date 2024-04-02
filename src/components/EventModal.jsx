import React, { useContext, useState } from "react";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import GlobalContext from "../context/GlobalContext";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const labelClasses = [
    "orange", 
    "yellow", 
    "green", 
    "blue", 
    "red", 
    "pink"
];

const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [selectedLabel, setSelectedlable] = useState(
    selectedEvent
      ? labelClasses.find((lbl) => lbl === selectedEvent.label)
      : labelClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  const closeEventModelHandler = () => {
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed 
    left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex 
        justify-between items-center">
          <button>
            <DragHandleOutlinedIcon className="text-grey-400" />
          </button>
          <div>
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            )}

            <button onClick={closeEventModelHandler}>
              <CancelOutlinedIcon className="text-grey-400" />
            </button>
          </div>
        </header>

        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>

            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3  border-0 text-grey-500 text-xl 
              font-semibold pb-2 w-full border-b-2  
              border-gray-200 focus:outline-none 
              focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

            <ScheduleOutlinedIcon className="text-grey-400" />

            <p>{daySelected.format("dddd, MMMM DD")}</p>

            <SegmentOutlinedIcon className="text-grey-400" />

            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              className="pt-3  border-0 text-grey-500 pb-2 w-full border-b-2  border-gray-200 focus:outline-none 
               focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            <BookmarkBorderOutlinedIcon />

            <div className="flex gap-x-2">
              {labelClasses.map((lblClass, index) => {
                return (
                  <span
                    key={index}
                    onClick={() => setSelectedlable(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <CheckCircleOutlinedIcon className="text-white text-sm shadow-2xl" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
