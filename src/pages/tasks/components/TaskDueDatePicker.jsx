import { useState } from "react";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  formatDateToYYYYMMDD,
  parseDateFromYYYYMMDD,
} from "../../../utils/helpers";

function TaskDueDatePicker({
  setShowcaseTaskDueDatePicker,
  dueDate,
  setDueDate,
}) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  const [dateValue, setDateValue] = useState(
    dueDate ? parseDateFromYYYYMMDD(dueDate) : ""
  );

  //Set Date
  function handleSetDate() {
    if (!dateValue) return;
    if (dateValue) {
      setDueDate(formatDateToYYYYMMDD(dateValue));
      setShowcaseTaskDueDatePicker(false);
    }
  }

  // Function to render day labels
  const dayNames = document.getElementsByClassName(
    "react-datepicker__day-name"
  );

  // Convert HTMLCollection to an array and update innerHTML
  Array.from(dayNames).forEach((dayname, index) => {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    dayname.innerHTML = daysOfWeek[index];
  });

  return (
    <div
      className="absolute top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center cursor-pointer lg:!min-h-full"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 py-6">
        {/**** Date picker */}
        <section className="w-max mx-auto">
          <DatePicker
            minDate={new Date()}
            selected={dateValue}
            onChange={(date) => setDateValue(date)}
            inline
          />
        </section>

        {/**** Buttons */}
        <div className="w-max ml-auto flex gap-x-3 items-center mt-2 px-6">
          {/**** Cancel button */}
          <button
            className="w-[85px] h-[46px] px-4 py-3 text-[#EEEEF0]"
            onClick={() => setShowcaseTaskDueDatePicker(false)}
          >
            Cancel
          </button>

          {/**** Set button */}
          <button
            className="w-[57px] h-[46px] px-4 py-3 text-blue200 font-semibold"
            onClick={handleSetDate}
          >
            Set
          </button>
        </div>
      </main>
    </div>
  );
}

export default TaskDueDatePicker;
