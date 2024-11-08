import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { CircleSpinner } from "react-spinners-kit";

function DeletingTaskLoader() {
  //Window size info
  const { windowHeight, windowWidth } = useWindowDimensions();

  return (
    <div
      className="creatingtaskloader fixed top-0 left-0  w-full bg-darkestBlue flex flex-col items-center justify-center gap-y-3 lg:absolute lg:!min-h-full"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <p className="text-base text-white md:text-[18px]">Deleting task</p>

      {/**** Loader spinner */}
      <CircleSpinner color={"#3D63DD"} size={windowWidth > 1200 ? 60 : 50} />
    </div>
  );
}

export default DeletingTaskLoader;
