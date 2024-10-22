import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import newGroupImg from "../../assets/newGroup.svg";

import backButton from "../../icons/leftArrowIcon.svg";
import { useGroups } from "../../contexts/groupsContext";

function NewGroup() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Variables from groups context
  const { setJoinGroupError } = useGroups();

  //set join group error empty on mount
  useEffect(() => {
    setJoinGroupError("");
  });

  return (
    <div
      className="w-full relative max-w-[700px] mx-auto px-3 pb-[0px] flex flex-col lg:!min-h-full lg:max-w-none"
      style={{
        minHeight: `${windowHeight - 40}px`,
      }}
    >
      {/*** Header */}
      <header className="w-full md:mt-4">
        {/*** Back button */}
        <img
          src={backButton}
          className="w-4"
          alt="Back button"
          onClick={() => navigate(-1)}
        />
      </header>

      <section className="w-full max-w-[400px] mx-auto flex-grow flex flex-col items-center justify-center gap-y-4">
        {/**** No group image */}
        <img src={newGroupImg} className="w-[200px] lg:w-[220px]" alt="" />

        {/**** Texts */}
        <div className="space-y-1">
          <h2 className="text-[22px] text-white text-center font-semibold md:text-[24px]">
            New Accountability Group
          </h2>
          <p className="text-[15px] text-white text-center md:text-base">
            Complete tasks with your friends and add fun to the process with
            streaking and a task leaderboard.
          </p>
        </div>

        {/**** Buttons */}
        <div className="w-full flex flex-wrap justify-center gap-3">
          <Link
            to="/groups/joingroup"
            className="w-full sm:w-[calc(50%_-_6px)]"
          >
            <button className="w-full px-6 border-[1px] border-[#5F606A] h-[46px] rounded-[50px] text-blue200 text-base font-semibold flex items-center justify-center sm:max-w-[190px] sm:mx-auto">
              Join Group
            </button>
          </Link>

          <Link
            to="/groups/creategroup"
            className="w-full sm:w-[calc(50%_-_6px)]"
          >
            <button className="w-full px-6 bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center sm:max-w-[190px] sm:mx-auto">
              Create Group
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default NewGroup;
