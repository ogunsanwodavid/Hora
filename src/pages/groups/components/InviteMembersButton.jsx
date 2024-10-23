import { useState } from "react";

import { Link } from "react-router-dom";

import trianglePolygon from "../../../assets/trianglePolygon.svg";

import whiteUserPlusIcon from "../../../icons/whiteUserPlusIcon.svg";

function InviteMembersButton() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  return (
    <div className="fixed right-[36px] bottom-[90px] space-y-4 flex flex-col items-center  md:right-[calc((100%_-_700px)_/_2)] lg:absolute lg:bottom-[60px] lg:right-[34px] group">
      {/**** Modal */}
      <section
        className={`hidden relative bg-white px-[7px] py-[4px] rounded-[4px] items-center justify-center transition-opacity duration-300 lg:flex ${
          isButtonHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="z-10 text-[12px] text-[#4D515B]">Tap to invite members</p>

        <img
          src={trianglePolygon}
          className="h-[19px] absolute -bottom-[8px] left-1/2 -translate-x-1/2"
          alt=""
        />
      </section>

      {/***** Button */}
      <main
        className="h-[56px] w-[56px] rounded-full bg-blue200 flex items-center justify-center cursor-pointer"
        onMouseOver={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <img src={whiteUserPlusIcon} className="h-[14px]" alt="" />
      </main>
    </div>
  );
}

export default InviteMembersButton;
