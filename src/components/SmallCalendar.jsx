import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import { getMonth } from "../utils/util";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import GlobalContext from "../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const selectedDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === selectedDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  };

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>

        <div>
          <button onClick={handlePrevMonth}>
            <ChevronLeftOutlinedIcon className="cursor-pointer text-gray-600 mx-2" />
          </button>

          <button onClick={handleNextMonth}>
            <ChevronRightOutlinedIcon className="cursor-pointer text-gray-600 mx-2" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => {
          return (
            <span key={i} className="text-sm py-1 text-center">
              {day.format("dd").charAt(0)}
            </span>
          );
        })}
        
        {currentMonth.map((row, index) => {
          return (
            <React.Fragment>
              {row.map((day, i) => {
                return (
                  <button
                    onClick={() => {
                      setSmallCalendarMonth(currentMonthIdx);
                      setDaySelected(day);
                    }}
                    className={`py-1 w-full ${getDayClass(day)}`}
                  >
                    <span className="text-sm">{day.format("D")}</span>
                  </button>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SmallCalendar;
