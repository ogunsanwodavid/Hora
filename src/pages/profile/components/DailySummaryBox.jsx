import calendarIcon from "../../../icons/calendarIcon.svg";

function DailySummaryBox() {
  return (
    <div className="w-full p-4 border-[1px] border-[#46484F] rounded-[10px] mt-4 flex items-center gap-x-3 lg:p-8">
      {/**** Calendar icon */}
      <section className="w-[40px] h-[40px] rounded-full border-[0.5px] border-[#46484F] flex items-center justify-center">
        <img src={calendarIcon} className="w-[18px]" alt="gray calendar icon" />
      </section>

      {/**** Daily task completion summary */}
      <section>
        <p className="font-inter text-white font-semibold">5/10</p>
        <p className="text-[#B2B3BD] text-[14px]">
          Daily activities completed.
        </p>
      </section>
    </div>
  );
}

export default DailySummaryBox;
