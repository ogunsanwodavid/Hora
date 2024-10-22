import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import backButton from "../../icons/leftArrowIcon.svg";

function AddGroupMember() {
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

  //Route parameters
  const { groupId } = useParams();

  //Group information
  const groupName = "Designers in Group 8";

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[40px] flex flex-col lg:!min-h-full lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center gap-x-4 md:mt-4 md:gap-x-8">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />
        </header>

        {/***** Text info */}
        <section className="w-full mt-4 space-y-1 md:mt-6">
          <h2 className="text-[20px] text-white text-center font-semibold md:text-[22px]">
            {groupName}
          </h2>
          <p className="text-[16px] text-[#B2B3BD] text-center md:text-lg">
            Add group members
          </p>
        </section>
      </div>
    </>
  );
}

export default AddGroupMember;
