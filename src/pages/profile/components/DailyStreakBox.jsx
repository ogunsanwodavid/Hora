import { useEffect, useState } from "react";

import { useAuth } from "../../../contexts/authContext";

import yellowLightningIcon from "../../../icons/yellowLightningIcon.svg";
import plainCircleIcon from "../../../icons/plainCircleIcon.svg";
import tickCircleIcon from "../../../icons/tickCircleIcon.svg";

function DailyStreakBox() {
  //User streak information
  const { user } = useAuth();
  const userLongestStreak = user?.maxStreak;
  const userCurrentStreak = user?.streakCount;

  //Streak days info
  const [streakDays, setStreakDays] = useState([]);

  //Function to get streaked days
  function getStreakedDays(streak) {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    // Ensure streak is within bounds of 1 to 7
    streak = Math.min(Math.max(streak, 1), 7);

    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const today = new Date().getDay();

    // Calculate the starting index for the streak based on streak count
    const startIndex = (today - streak + 1 + 7) % 7;

    // Create the result array, starting from `startIndex` and looping back to complete the week
    const result = Array(7)
      .fill(null)
      .map((_, i) => {
        const index = (startIndex + i) % 7;
        return {
          day: daysOfWeek[index],
          isStreaked: i < streak,
        };
      });

    return result;
  }

  //Set streak days on mount using user current streak
  useEffect(() => {
    setStreakDays(getStreakedDays(userCurrentStreak));
  }, []);

  return (
    <div className="w-full p-4 border-[1px] border-[#46484F] rounded-[10px] mt-4 lg:p-8">
      {/**** Current streak */}
      <section className="flex items-center gap-x-4">
        {/*** Yellow lightning icon */}
        <img
          src={yellowLightningIcon}
          className="w-[17px] md:w-[19px]"
          alt="yellow lightning icon"
        />

        <p className="text-[#B2B3BD] md:text-lg">Current Streak</p>

        {/**** Current streak days */}
        <p className="font-inter ml-auto text-white font-semibold md:text-lg">
          {userCurrentStreak} {userCurrentStreak > 1 ? "days" : "day"}
        </p>
      </section>

      {/***** Streak display by week days */}
      <section className="dashed-bottom-border py-5  flex items-center justify-between">
        {streakDays.length &&
          streakDays.map((day, index) => {
            const dayOfTheWeek = day.day;
            const isDayStreaked = day.isStreaked;
            return (
              <div className="flex flex-col items-center gap-y-2" key={index}>
                <img
                  src={isDayStreaked ? tickCircleIcon : plainCircleIcon}
                  className="w-[24px] md:w-[26px]"
                  alt="icon"
                />
                <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
                  {dayOfTheWeek}
                </p>
              </div>
            );
          })}
      </section>

      {/***** Longest streak */}
      <section className="flex items-center justify-between gap-x-4 mt-4">
        <p className="text-[#B2B3BD] md:text-lg">Longest Streak</p>

        {/**** Current streak days */}
        <p className="font-inter text-white font-semibold md:text-lg">
          {userLongestStreak} {userLongestStreak > 1 ? "days" : "day"}
        </p>
      </section>
    </div>
  );
}

export default DailyStreakBox;
