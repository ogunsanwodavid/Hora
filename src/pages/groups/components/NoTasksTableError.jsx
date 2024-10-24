import noTasksTableErrorImg from "../../../assets/noTasksTableError.svg";

function NoTasksTableError() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-6">
      <img
        src={noTasksTableErrorImg}
        className="w-[200px] lg:w-[240px]"
        alt=""
      />
      <p className="text-white text-[14px] text-center font-semibold lg:text-[16px]">
        Nothing to show
      </p>
    </div>
  );
}

export default NoTasksTableError;
