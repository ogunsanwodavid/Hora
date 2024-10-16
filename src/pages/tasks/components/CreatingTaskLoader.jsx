import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { CircleSpinner } from "react-spinners-kit";

function CreatingTaskLoader() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="creatingtaskloader fixed top-0 left-0  w-full bg-darkestBlue flex flex-col items-center justify-center gap-y-3 lg:absolute lg:!min-h-full"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <p className="text-[18px] text-white ">Adding Task</p>

      {/**** Loader spinner */}
      <CircleSpinner color={"#3D63DD"} size={60} />
    </div>
  );
}

export default CreatingTaskLoader;
