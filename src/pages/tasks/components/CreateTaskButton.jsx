import { useState } from "react";

import { Link } from "react-router-dom";

import trianglePolygon from "../../../assets/trianglePolygon.svg";

import plusIcon from "../../../icons/plusIcon.svg";

function CreateTaskButton() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  return (
    <Link
      to="/tasks/createtask"
      className="fixed right-[24px] bottom-[90px] space-y-4 flex flex-col items-center md:right-[calc((100%_-_700px)_/_2)] lg:absolute lg:bottom-[60px] lg:right-[34px] group"
    >
      {/**** Modal */}
      <section
        className={`hidden relative bg-white px-[7px] py-[4px] rounded-[4px] items-center justify-center transition-opacity duration-300 lg:flex ${
          isButtonHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="z-10 text-[12px] text-[#4D515B]">Tap to add a new task</p>

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
        <img src={plusIcon} className="h-[14px]" alt="" />
      </main>
    </Link>
  );
}

export default CreateTaskButton;
