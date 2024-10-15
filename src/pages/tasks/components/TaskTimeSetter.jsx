import { useRef, useState } from "react";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import {
  convertTo12HourFormat,
  convertTo24HourFormat,
} from "../../../utils/helpers";

import alarmIcon from "../../../icons/alarmIcon.svg";
import caretDownIcon from "../../../icons/caretDownIcon.svg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Mousewheel, Navigation } from "swiper/modules";

function TaskTimeSetter({
  setShowcaseTaskTimeSetter,
  time,
  setTime,
  isAlarm,
  setIsAlarm,
}) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Task time states

  // Extract the hour, minute, and AM/PM values from the formatted time
  const [hourValue, setHourValue] = useState(
    time ? convertTo12HourFormat(time)?.slice(0, 2) : "01" // Extract the hour (first two characters)
  );
  const [minuteValue, setMinuteValue] = useState(
    time ? convertTo12HourFormat(time)?.slice(3, 5) : "00" // Extract the minute (characters 3 and 4)
  );
  const [amOrPm, setAmOrPm] = useState(
    time ? convertTo12HourFormat(time)?.slice(5).toLowerCase() : "" // Extract 'am' or 'pm' (from index 5 onwards)
  );

  const timeValue = `${hourValue}:${minuteValue}${amOrPm}`;

  // Derived state for checking if it's AM or PM
  const isAM = amOrPm === "am";
  const isPM = amOrPm === "pm";

  const [isSelectingHour, setIsSelectingHour] = useState(true);
  const [isSelectingMinute, setIsSelectingMinute] = useState(false);

  const [notificationAlarm, setNotificationAlarm] = useState(isAlarm);

  // Refs for custom div navigation
  const prevHourSelectorRef = useRef(null);
  const nextHourSelectorRef = useRef(null);
  const prevMinuteSelectorRef = useRef(null);
  const nextMinuteSelectorRef = useRef(null);

  //Hour options of 01 to 11
  const hourOptions = Array.from({ length: 12 }, (_, index) =>
    String(index + 1).padStart(2, "0")
  ); // Create an array [01, 02, ..., 11]

  //Minute options from 00 to 59
  const minuteOptions = Array.from({ length: 60 }, (_, index) =>
    String(index).padStart(2, "0")
  );
  // Creates an array ['00', '01', ..., '59']

  //Function to toggle selecting hour
  function handleSelectingHour() {
    setIsSelectingHour(true);
    setIsSelectingMinute(false);
  }

  //Function to toggle selecting minute
  function handleSelectingMinute() {
    setIsSelectingHour(false);
    setIsSelectingMinute(true);
  }

  //Set hour value on hour selector swipe
  const handleHourSwiperChange = (swiper) => {
    // Get the active slide index
    const activeIndex = swiper.activeIndex;

    // Update the state with the content of the active slide
    setHourValue(hourOptions[activeIndex]);
  };

  //Set minute value on minute selector swipe
  const handleMinuteSwiperChange = (swiper) => {
    // Get the active slide index
    const activeIndex = swiper.activeIndex;

    // Update the state with the content of the active slide
    setMinuteValue(minuteOptions[activeIndex]);
  };

  //Set time value in 12hour format
  function handleSetTimeValue() {
    //set time and close modal only if necessary variables are set
    const isTimeValueComplete = hourValue && minuteValue && amOrPm;

    if (isTimeValueComplete) {
      setTime(convertTo24HourFormat(timeValue));
      setShowcaseTaskTimeSetter(false);
    }

    //set alarm
    setIsAlarm(notificationAlarm);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center cursor-pointer lg:absolute lg:!min-h-full"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 py-6">
        <h3 className="w-max mx-auto text-white text-[18px] font-semibold">
          Set Time
        </h3>

        {/**** Time selector */}
        <section className="w-full space-y-4 px-6 mt-4">
          {/**** Hour and minute selector */}
          <div className="w-full flex items-center justify-between gap-x-[6px]">
            {/**** Hour selector */}
            <section className="w-full">
              {/**** Hour selector swiper prev navigation icon */}
              <img
                src={caretDownIcon}
                className="hidden h-[45px] mx-auto rotate-180 lg:block"
                alt="Hour selector prev navigation icon"
                ref={prevHourSelectorRef}
                style={{
                  opacity: !isSelectingHour && "0",
                }}
              />

              <main className="w-full" onClick={handleSelectingHour}>
                <Swiper
                  allowSlideNext={isSelectingHour}
                  allowSlidePrev={isSelectingHour}
                  onSlideChange={handleHourSwiperChange}
                  initialSlide={hourValue - 1}
                  loop={true}
                  direction={"vertical"}
                  slidesPerView={1}
                  mousewheel={true}
                  modules={[Mousewheel, Navigation]}
                  onInit={(swiper) => {
                    // Assign refs to navigation buttons after swiper initialization
                    swiper.params.navigation.prevEl =
                      prevHourSelectorRef.current;
                    swiper.params.navigation.nextEl =
                      nextHourSelectorRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="time-selector relative w-full h-[100px] bg-[#171C27] p-2 flex items-center justify-center font-inter text-[#EEEEF0] text-[60px] rounded-[10px] font-semibold"
                  style={{
                    color: isSelectingHour && "#3D63DD",
                    backgroundColor: isSelectingHour && "#3D63DD1A",
                    border: isSelectingHour && "2px",
                  }}
                >
                  {/**** Top gradient showcase when selecting */}
                  {isSelectingHour && (
                    <div
                      className="absolute w-full h-[15px] top-0 left-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(54, 79, 149, 0.5) 0%, rgba(17, 25, 47, 0.05) 41.42%)",
                      }}
                    ></div>
                  )}

                  {/**** Display 01 to 11 as options in the hour selector */}
                  {hourOptions.map((option) => (
                    <SwiperSlide key={option} className="!w-max mx-auto h-full">
                      {option}
                    </SwiperSlide>
                  ))}

                  {/**** Bottom gradient showcase when selecting */}
                  {isSelectingHour && (
                    <div
                      className="absolute w-full h-[15px] bottom-0 left-0 rotate-180"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(54, 79, 149, 0.5) 0%, rgba(17, 25, 47, 0.05) 41.42%)",
                      }}
                    ></div>
                  )}
                </Swiper>
              </main>

              {/**** Hour selector swiper next navigation icon */}
              <img
                src={caretDownIcon}
                className="hidden h-[45px] mx-auto lg:block"
                alt="Hour selector next navigation icon"
                ref={nextHourSelectorRef}
                style={{
                  opacity: !isSelectingHour && "0",
                }}
              />
            </section>

            {/**** Colon */}
            <p className="font-inter text-[#797B86] text-[55px] font-semibold">
              :
            </p>

            {/*** Minute selector */}
            <section className="w-full">
              {/**** Minute selector swiper prev navigation icon */}
              <img
                src={caretDownIcon}
                className="hidden h-[45px] mx-auto rotate-180 lg:block"
                alt="Hour selector next navigation icon"
                ref={prevMinuteSelectorRef}
                style={{
                  opacity: !isSelectingMinute && "0",
                }}
              />

              <main className="w-full" onClick={handleSelectingMinute}>
                <Swiper
                  allowSlideNext={isSelectingMinute}
                  allowSlidePrev={isSelectingMinute}
                  onSlideChange={handleMinuteSwiperChange}
                  initialSlide={minuteValue}
                  loop={true}
                  direction={"vertical"}
                  slidesPerView={1}
                  mousewheel={true}
                  modules={[Mousewheel, Navigation]}
                  onInit={(swiper) => {
                    // Assign refs to navigation buttons after swiper initialization
                    swiper.params.navigation.prevEl =
                      prevMinuteSelectorRef.current;
                    swiper.params.navigation.nextEl =
                      nextMinuteSelectorRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                  className="time-selector relative w-full h-[100px] bg-[#171C27] p-2 flex items-center justify-center font-inter text-[#EEEEF0] text-[60px] rounded-[10px] font-semibold"
                  style={{
                    color: isSelectingMinute && "#3D63DD",
                    backgroundColor: isSelectingMinute && "#3D63DD1A",
                    border: isSelectingMinute && "2px",
                  }}
                  onClick={() => handleSelectingMinute()}
                >
                  {/**** Top gradient showcase when selecting */}
                  {isSelectingMinute && (
                    <div
                      className="absolute w-full h-[15px] top-0 left-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(54, 79, 149, 0.5) 0%, rgba(17, 25, 47, 0.05) 41.42%)",
                      }}
                    ></div>
                  )}

                  {/**** Display 00 to 59 as options in the minute selector */}
                  {minuteOptions.map((option) => (
                    <SwiperSlide key={option} className="!w-max mx-auto h-full">
                      {option}
                    </SwiperSlide>
                  ))}

                  {/**** Bottom gradient showcase when selecting */}
                  {isSelectingMinute && (
                    <div
                      className="absolute w-full h-[15px] bottom-0 left-0 rotate-180"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(54, 79, 149, 0.5) 0%, rgba(17, 25, 47, 0.05) 41.42%)",
                      }}
                    ></div>
                  )}
                </Swiper>
              </main>

              {/**** Minute selector swiper next navigation icon */}
              <img
                src={caretDownIcon}
                className="hidden h-[45px] mx-auto lg:block"
                alt="Hour selector next navigation icon"
                ref={nextMinuteSelectorRef}
                style={{
                  opacity: !isSelectingMinute && "0",
                }}
              />
            </section>
          </div>

          {/***** AM/PM Selector */}
          <div className="w-full border-[1px] border-[#393A40] rounded-[8px] flex">
            {/*** AM  select */}
            <div
              className="w-1/2 h-[55px] p-2 border-[1px] border-[#303136] flex items-center justify-center"
              style={{ backgroundColor: isAM && "rgba(61, 99, 221, 0.1)" }}
              onClick={() => setAmOrPm("am")}
            >
              <p
                className="text-[20px] text-[#B2B3BD] font-semibold"
                style={{ color: isAM && "#3D63DD" }}
              >
                AM
              </p>
            </div>

            {/*** PM select */}
            <div
              className="w-1/2 h-[55px] p-2 border-[1px] border-[#303136] flex items-center justify-center"
              style={{ backgroundColor: isPM && "rgba(61, 99, 221, 0.1)" }}
              onClick={() => setAmOrPm("pm")}
            >
              <p
                className="text-[20px] text-[#B2B3BD] font-semibold"
                style={{ color: isPM && "#3D63DD" }}
              >
                PM
              </p>
            </div>
          </div>
        </section>

        {/***** Notification alarm Toggler */}
        <section
          className="w-full flex items-center justify-between px-6 py-4"
          style={{
            borderWidth: "2px, 0px, 2px, 0px",
            borderStyle: "solid",
            borderColor: "#111725",
          }}
        >
          <div className="flex gap-x-2 items-center">
            {/**** Alarm icon */}
            <img src={alarmIcon} className="w-[16px]" alt="alarm icon" />

            {/**** Texts */}
            <div>
              <p className="text-white font-semibold">Notification Alarm</p>
              <p className="text-white text-[12px]">
                Get Notified 5 minutes ahead.
              </p>
            </div>
          </div>

          {/**** Alarm toggler */}
          <div
            className="w-[60px] h-[35px] rounded-full px-[9px] py-2 bg-[#797B86]"
            style={{
              boxShadow:
                "0px 2px 4px 0px #FFFFFF40 inset, 0px 2px 4px 0px #00000040, 0px -2px 4px 0px #FFFFFF40 inset",
              backgroundColor: notificationAlarm && "#3D63DD",
            }}
            onClick={() => setNotificationAlarm((alarm) => !alarm)}
          >
            <main
              className="h-[19px] w-[19px] rounded-full bg-[#B2B3BD]"
              style={{
                boxShadow: "1px 2px 2px 0px #00000033",
                marginLeft: notificationAlarm && "auto",
                backgroundColor: notificationAlarm && "#fff",
              }}
            ></main>
          </div>
        </section>

        {/**** Buttons */}
        <div className="w-max ml-auto flex gap-x-3 items-center mt-2 px-6">
          {/**** Cancel button */}
          <button
            className="w-[85px] h-[46px] px-4 py-3 text-[#EEEEF0]"
            onClick={() => setShowcaseTaskTimeSetter(false)}
          >
            Cancel
          </button>

          {/**** Set button */}
          <button
            className="w-[57px] h-[46px] px-4 py-3 text-blue200 font-semibold"
            onClick={handleSetTimeValue}
          >
            Set
          </button>
        </div>
      </main>
    </div>
  );
}

export default TaskTimeSetter;
