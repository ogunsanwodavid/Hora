import { CircleSpinner } from "react-spinners-kit";

function GettingCurrentGroupTasksLoader() {
  return (
    <div className="creatingtaskloader flex-grow bg-darkestBlue flex items-center justify-center ">
      {/**** Loader spinner */}
      <CircleSpinner color={"#3D63DD"} size={60} />
    </div>
  );
}

export default GettingCurrentGroupTasksLoader;
