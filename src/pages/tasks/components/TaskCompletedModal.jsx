import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import grayCloseIcon from "../../../icons/grayCloseIcon.svg";
import completedTaskModalImg from "../../../assets/completedTaskModal.svg";

function TaskCompletedModal({ setShowcaseTaskCompletedModal }) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center lg:absolute lg:!min-h-full"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-darkestBlue p-6 space-y-4">
        {/**** Close icon */}
        <Link to="/tasks">
          <img
            src={grayCloseIcon}
            className="w-[20px] h-[20px] ml-auto"
            alt="gray close icon"
            onClick={() => setShowcaseTaskCompletedModal(false)}
          />
        </Link>

        {/**** Image */}
        <img
          src={completedTaskModalImg}
          className="w-full max-w-[200px] mx-auto"
          alt=""
        />

        {/**** Texts */}
        <section className="w-full">
          <h3 className="text-[20px] text-white font-semibold text-center">
            Task Completed!
          </h3>
          <p className="text-[14px] text-[#EEEEF0] text-center">
            You’re one step closer to a full progress bar. Maintain the
            momentum!
          </p>
        </section>
      </main>
    </div>
  );
}

export default TaskCompletedModal;
