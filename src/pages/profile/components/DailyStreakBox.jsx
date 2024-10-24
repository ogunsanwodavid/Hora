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
          className="w-[17px] md:w-[19px]"
          alt="yellow lightning icon"
        />

        <p className="text-[#B2B3BD] md:text-lg">Current Streak</p>

        {/**** Current streak days */}
        <p className="font-inter ml-auto text-white font-semibold md:text-lg">
          24 days
        </p>
      </section>

      {/***** Streak display by week days */}
      <section className="dashed-bottom-border py-5  flex items-center justify-between">
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={tickCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            S
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={tickCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            M
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={tickCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            T
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={tickCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            W
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={plainCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            T
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={plainCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            F
          </p>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={plainCircleIcon}
            className="w-[24px] md:w-[26px]"
            alt="icon"
          />
          <p className="text-lg text-[#B2B3BD] font-semibold md:text-[20px]">
            S
          </p>
        </div>
      </section>

      {/***** Longest streak */}
      <section className="flex items-center justify-between gap-x-4 mt-4">
        <p className="text-[#B2B3BD] md:text-lg">Longest Streak</p>

        {/**** Current streak days */}
        <p className="font-inter text-white font-semibold md:text-lg">
          31 days
        </p>
      </section>
    </div>
  );
}

export default DailyStreakBox;
