import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAppDesign } from "../../../contexts/appDesignContext";
import { useGroups } from "../../../contexts/groupsContext";

import useWindowDimensions from "../../../hooks/useWindowDimensions";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import useShare from "../../../hooks/useShare";

import createGroupSuccessImg from "../../../assets/createGroupSuccess.svg";

import backButton from "../../../icons/leftArrowIcon.svg";
import whiteCloseIcon from "../../../icons/whiteCloseIcon.svg";
import grayInfoIcon from "../../../icons/grayInfoIcon.svg";

function CreateGroupSuccessModal() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Navigate
  const navigate = useNavigate();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Variables from groups context
  const {
    createGroupSuccessCode,
    createGroupSuccessName,
    createGroupSuccessInviteLink,
    // setShowcaseCreateGroupSuccessModal,
  } = useGroups();

  //
  /* useEffect(() => {
    return () => {
      setShowcaseCreateGroupSuccessModal(false);
    };
  }); */

  //State to handle notification box
  const [showcaseNotificationBox, setShowcaseNotificationBox] = useState(true);

  //Varaibles from copy to clipboard hook
  const { copied, copy } = useCopyToClipboard("", 3000);

  //Function from useshare hook
  const shareContent = useShare();

  //Function to copy group code
  function handleCopyGroupCode() {
    copy(createGroupSuccessCode);
  }

  //Function to share invite link
  function handleShareInviteLink() {
    shareContent(
      createGroupSuccessCode,
      "Join our group to start keeping streaks and competing on the leaderboard",
      createGroupSuccessInviteLink
    );
  }

  return (
    <div
      className="fixed top-0 left-0 bg-darkestBlue w-full px-5 py-10 lg:p-[24px] flex flex-col lg:!min-h-full lg:absolute flex-grow"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full h-full flex-grow  flex flex-col max-w-[700px] mx-auto lg:max-w-none ">
        {/*** Header */}
        <header className="w-full flex items-center space-x-7 md:mt-4 md:space-x-10">
          {/*** Back button */}
          <Link to="/groups">
            <img src={backButton} className="w-4" alt="Back button" />
          </Link>

          <section className="w-full">
            {/**** Group name */}
            <h3 className="text-[18px] text-white font-semibold md:text-[20px]">
              {createGroupSuccessName}
            </h3>
            <p className="text-[14px] text-white md:text-base">You</p>
          </section>
        </header>

        {/****** Notification box */}
        {showcaseNotificationBox && (
          <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[calc(100%_-_40px)] max-w-[400px]  rounded-[8px] border-[0.8px] border-blue50 flex lg:top-[80px]">
            {/****** Texts */}
            <main className="w-full h-full border-r-[0.8px] border-blue50 p-3 flex items-center gap-x-2">
              {/**** Info icon */}
              <img src={grayInfoIcon} className="w-4" alt="" />

              <p className=" text-[#EEEEF0]">
                Your Group Code is{" "}
                <span className="font-inter">{createGroupSuccessCode}</span>
              </p>
            </main>

            {/**** Close button */}
            <div
              className="p-3 flex items-center justify-center"
              onClick={() => setShowcaseNotificationBox(false)}
            >
              <img src={whiteCloseIcon} className="w-4" alt="" />
            </div>
          </div>
        )}

        {/***** Main part */}
        <section className="w-full max-w-[400px] mx-auto flex-grow flex flex-col items-center justify-center gap-y-4 overflow-hidden">
          {/**** Group success image */}
          <img
            src={createGroupSuccessImg}
            className="h-[185px] lg:h-[205px]"
            alt=""
          />

          {/**** Texts */}
          <div className="space-y-1">
            <h2 className="text-[22px] text-white text-center font-semibold md:text-[24px]">
              Share Invite
            </h2>
            <p className="text-[15px] text-white text-center md:text-base">
              Share Invite or Group code{" "}
              <span className="font-semibold font-inter">
                {createGroupSuccessCode}
              </span>{" "}
              to three friends to start keeping streaks and competing on the
              leaderboard.
            </p>
          </div>

          {/**** Buttons */}
          <div className="w-full flex flex-wrap justify-center gap-3">
            <section
              className="w-full sm:w-[calc(50%_-_6px)]"
              onClick={handleCopyGroupCode}
            >
              <button className="w-full px-6 border-[1px] border-[#5F606A] h-[46px] rounded-[50px] text-blue200 text-base font-semibold flex items-center justify-center sm:max-w-[190px] sm:mx-auto">
                Copy Code
              </button>
            </section>

            <section
              className="w-full sm:w-[calc(50%_-_6px)]"
              onClick={handleShareInviteLink}
            >
              <button className="w-full px-6 bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center sm:max-w-[190px] sm:mx-auto">
                Share Invite
              </button>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateGroupSuccessModal;
