const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full flex gap-x-3 items-center">
      <main className="w-full bg-blue50 h-[6px] rounded-[4px] overflow-hidden md:h-[8px] md:rounded-[5px]">
        <div
          className="h-full bg-blue200 rounded-[4px] md:rounded-[5px]"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </main>
      <p className="font-inter text-[15px] text-blue50 md:text-[17px]">
        {progress}%
      </p>
    </div>
  );
};

export default ProgressBar;
