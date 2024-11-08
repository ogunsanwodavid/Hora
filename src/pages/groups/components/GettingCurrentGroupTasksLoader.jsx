import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { CircleSpinner } from "react-spinners-kit";

function GettingCurrentGroupTasksLoader() {
  //Window size info
  const { windowWidth } = useWindowDimensions();

  return (
    <div className="creatingtaskloader flex-grow bg-darkestBlue flex items-center justify-center ">
      {/**** Loader spinner */}
      <CircleSpinner color={"#3D63DD"} size={windowWidth > 1200 ? 60 : 50} />
    </div>
  );
}

export default GettingCurrentGroupTasksLoader;
