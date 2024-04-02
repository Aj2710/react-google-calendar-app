import React, { useContext } from "react";
import logo from "../assets/logo.png";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const CONSTANTS = {
  LOGO_NAME: "Calendar",
  TODAY_BTN: "Today",
};

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />

      <h1 className="mr-10 text-xl text-gray-500 font-bold">
        {CONSTANTS.LOGO_NAME}
      </h1>

      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        {CONSTANTS.TODAY_BTN}
      </button>

      <button onClick={handlePrevMonth}>
        <ChevronLeftOutlinedIcon className="cursor-pointer text-gray-600 mx-2" />
      </button>

      <button onClick={handleNextMonth}>
        <ChevronRightOutlinedIcon className="cursor-pointer text-gray-600 mx-2" />
      </button>

      <h2 className="ml-4 text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalendarHeader;
