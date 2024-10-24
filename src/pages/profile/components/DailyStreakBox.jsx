import yellowLightningIcon from "../../../icons/yellowLightningIcon.svg";
import plainCircleIcon from "../../../icons/plainCircleIcon.svg";
import tickCircleIcon from "../../../icons/tickCircleIcon.svg";

function DailyStreakBox() {
  return (
    <div className="w-full p-4 border-[1px] border-[#46484F] rounded-[10px] mt-4 lg:p-8">
      {/**** Current streak */}
      <section className="flex items-center gap-x-4">
        {/*** Yellow lightning icon */}
        <img
          src={yellowLightningIcon}
          className="w-[17px]"
          alt="yellow lightning icon"
        />

        <p className="text-[#B2B3BD]">Current Streak</p>

        {/**** Current streak days */}
        <p className="ml-auto text-white font-semibold">24 days</p>
      </section>

      {/***** Streak display by week days */}
      <section className="dashed-bottom-border py-5  flex items-center justify-between">
        <div className="flex flex-col items-center gap-y-2">
          <img src={tickCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">S</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={tickCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">M</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={tickCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">T</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={tickCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">W</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={plainCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">T</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={plainCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">F</p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img src={plainCircleIcon} className="w-[24px]" alt="icon" />
          <p className="text-lg text-[#B2B3BD] font-semibold">S</p>
        </div>
      </section>

      {/***** Longest streak */}
      <section className="flex items-center justify-between gap-x-4 mt-4">
        <p className="text-[#B2B3BD]">Longest Streak</p>

        {/**** Current streak days */}
        <p className=" text-white font-semibold">31 days</p>
      </section>
    </div>
  );
}

export default DailyStreakBox;
