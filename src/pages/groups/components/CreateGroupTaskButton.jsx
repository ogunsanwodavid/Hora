import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import trianglePolygon from "../../../assets/trianglePolygon.svg";

import plusIcon from "../../../icons/plusIcon.svg";

function CreateGroupTaskButton() {
  //Route parameter
  const { groupId } = useParams();

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  return (
    <Link
      to={`/groups/group/tasks/createtask/${groupId}`}
      className="fixed right-[24px] bottom-[90px] flex flex-col gap-y-4 items-center md:right-[calc((100%_-_700px)_/_2)] lg:absolute lg:bottom-[60px] lg:right-[32px] lg:w-[134.26px] group"
    >
      {/**** Modal */}
      <section
        className={`hidden relative bg-white px-[7px] py-[4px] rounded-[4px] items-center justify-center transition-opacity duration-300 ${
          isButtonHovered ? "lg:flex" : "lg:hidden"
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

export default CreateGroupTaskButton;
