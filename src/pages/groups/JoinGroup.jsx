import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import backButton from "../../icons/leftArrowIcon.svg";

function JoinGroup() {
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
  return (
    <div
      className="w-full relative max-w-[700px] mx-auto px-3 pb-[40px] flex flex-col lg:!min-h-full lg:max-w-none"
      style={{
        minHeight: `${windowHeight}px`,
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
    </div>
  );
}

export default JoinGroup;
