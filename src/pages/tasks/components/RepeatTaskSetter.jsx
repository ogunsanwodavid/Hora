import { useState } from "react";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

function RepeatTaskSetter({ repeat, setRepeat, setShowcaseRepeatTaskSetter }) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Radio form states
  const [repeatRadioValue, setRepeatRadioValue] = useState(repeat || "none");
  const isRepeatDaily = repeatRadioValue === "daily";
  const isRepeatWeekly = repeatRadioValue === "weekly";
  const isRepeatNone = repeatRadioValue === "none";

  //Function to handle set repeat
  function handleSetRepeat() {
    setRepeat(repeatRadioValue);
    setShowcaseRepeatTaskSetter(false);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center lg:absolute lg:!min-h-full"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 p-6">
        <h3 className="text-white text-[18px] font-semibold">Repeat Task</h3>

        {/**** Radio select */}
        <div className="w-full space-y-2 mt-2">
          {/**** Daily radio option */}
          <section
            className="flex items-center"
            onClick={() => setRepeatRadioValue("daily")}
          >
            {/**** Radio button  */}
            <div className="p-2 h-[40px] w-[40px] flex items-center justify-center">
              <div
                className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${
                  isRepeatDaily ? "border-blue200" : "border-[#b2b3bd]"
                }`}
              >
                {isRepeatDaily && (
                  <div className="w-[10px] h-[10px] rounded-full bg-blue200"></div>
                )}
              </div>
            </div>

            {/**** Radio label */}
            <p
              className={`${
                isRepeatDaily ? "text-white font-semibold" : "text-[#B2B3BD]"
              }`}
            >
              Daily
            </p>
          </section>

          {/**** Weekly radio option */}
          <section
            className="flex items-center"
            onClick={() => setRepeatRadioValue("weekly")}
          >
            {/**** Radio button  */}
            <div className="p-2 h-[40px] w-[40px] flex items-center justify-center">
              <div
                className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${
                  isRepeatWeekly ? "border-blue200" : "border-[#b2b3bd]"
                }`}
              >
                {isRepeatWeekly && (
                  <div className="w-[10px] h-[10px] rounded-full bg-blue200"></div>
                )}
              </div>
            </div>

            {/**** Radio label */}
            <p
              className={`${
                isRepeatWeekly ? "text-white font-semibold" : "text-[#B2B3BD]"
              }`}
            >
              Weekly
            </p>
          </section>

          {/**** Don't repeat radio option */}
          <section
            className="flex items-center"
            onClick={() => setRepeatRadioValue("none")}
          >
            {/**** Radio button  */}
            <div className="p-2 h-[40px] w-[40px] flex items-center justify-center">
              <div
                className={`w-[20px] h-[20px] rounded-full border-[2px] flex items-center justify-center ${
                  isRepeatNone ? "border-blue200" : "border-[#b2b3bd]"
                }`}
              >
                {isRepeatNone && (
                  <div className="w-[10px] h-[10px] rounded-full bg-blue200"></div>
                )}
              </div>
            </div>

            {/**** Radio label */}
            <p
              className={`${
                isRepeatNone ? "text-white font-semibold" : "text-[#B2B3BD]"
              }`}
            >
              Don&apos;t repeat
            </p>
          </section>
        </div>

        {/**** Buttons */}
        <div className="w-max ml-auto flex gap-x-3 items-center mt-2">
          {/**** Cancel button */}
          <button
            className="w-[85px] h-[46px] px-4 py-3 text-[#EEEEF0]"
            onClick={() => setShowcaseRepeatTaskSetter(false)}
          >
            Cancel
          </button>

          {/**** Set button */}
          <button
            className="w-[57px] h-[46px] px-4 py-3 text-blue200 font-semibold"
            onClick={() => handleSetRepeat()}
          >
            Set
          </button>
        </div>
      </main>
    </div>
  );
}

export default RepeatTaskSetter;
