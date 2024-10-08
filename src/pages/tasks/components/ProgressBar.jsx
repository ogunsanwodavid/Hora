const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full flex gap-x-3 items-center">
      <main className="w-full bg-blue50 h-2 rounded-[4px] overflow-hidden">
        <div
          className="h-full bg-blue200 rounded-[4px]"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </main>
      <p className=" text-blue50">{progress}%</p>
    </div>
  );
};

export default ProgressBar;
