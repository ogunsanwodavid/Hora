import noTasksErrorImg from "../../../assets/notaskserror.svg";

function NoTasksError() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-6">
      <img src={noTasksErrorImg} className="w-[180px] lg:w-[220px]" alt="" />
      <p className="text-white text-center font-semibold lg:text-lg">
        You currently have no tasks
      </p>
    </div>
  );
}

export default NoTasksError;
