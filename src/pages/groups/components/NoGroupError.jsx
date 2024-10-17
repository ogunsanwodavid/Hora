import { Link } from "react-router-dom";
import noGroupErrorImg from "../../../assets/noGroupError.svg";

function NoGroupError() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-3">
      <img src={noGroupErrorImg} className="w-[260px] lg:w-[280px]" alt="" />
      <p className="text-white text-center font-semibold md:text-lg">
        You’re not in any accountability group.
      </p>

      <Link to="/groups/newgroup">
        <button className="w-max px-6 bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
          Add New Group
        </button>
      </Link>
    </div>
  );
}

export default NoGroupError;
