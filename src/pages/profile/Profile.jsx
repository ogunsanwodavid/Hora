import useWindowDimensions from "../../hooks/useWindowDimensions";

import DailyProgressBox from "./components/DailyProgressBox";
import DailySummaryBox from "./components/DailySummaryBox";
import DailyStreakBox from "./components/DailyStreakBox";

import defaultProfilePic from "../../assets/dave.jpeg";

import rightCaretIcon from "../../icons/rightCaretIcon.svg";

function Profile() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="w-full max-w-[700px] mx-auto relative  pb-[40px] lg:!min-h-[552px] lg:pb-0  lg:max-w-none"
      style={{
        minHeight: `${windowHeight - 77}px`,
      }}
    >
      {/**** Header */}
      <header className="w-full flex items-center justify-between lg:mt-4">
        <h2 className="text-[20px] text-white font-semibold md:text-[22px]">
          Profile
        </h2>
      </header>

      {/**** User details */}
      <section className="w-full flex items-center gap-x-3 mt-4">
        {/**** Profile picture */}
        <img
          src={defaultProfilePic}
          className="h-[40px] w-[40px] flex-shrink-0 md:h-[43px] md:w-[43px] rounded-full object-cover"
          alt="user profile picture"
        />

        {/**** Username and email */}
        <div className="flex-grow overflow-hidden text-ellipsis">
          <p className=" text-white text-[17px] font-semibold  overflow-hidden text-ellipsis">
            hoaxthagod
          </p>
          <p className="text-[#B2B3BD] text-[14px] overflow-hidden text-ellipsis">
            ogunsanwodavid123@gmail.com
          </p>
        </div>

        {/**** Right caret icon */}
        <img src={rightCaretIcon} className="h-4 ml-auto" alt="" />
      </section>

      {/**** Daiy progress box*/}
      <DailyProgressBox />

      {/**** Daily activities summary box */}
      <DailySummaryBox />

      {/*** Daily streak summary box */}
      <DailyStreakBox />
    </div>
  );
}

export default Profile;
