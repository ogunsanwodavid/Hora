import { useTasks } from "../../../contexts/tasksContext";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import grayCloseIcon from "../../../icons/grayCloseIcon.svg";
import deleteTaskModalImg from "../../../assets/deleteTaskModal.svg";

function DeleteTaskConfirmationModal({
  taskId,
  setShowcaseDeleteTaskConfirmationModal,
}) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Variables from task context
  const { deleteTask } = useTasks();

  async function handleDeleteTask() {
    await deleteTask(taskId);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center lg:absolute lg:!min-h-full"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 p-6 space-y-4">
        {/**** Close icon */}
        <img
          src={grayCloseIcon}
          className="w-[20px] h-[20px] ml-auto"
          alt="gray close icon"
          onClick={() => setShowcaseDeleteTaskConfirmationModal(false)}
        />

        {/**** Image */}
        <img
          src={deleteTaskModalImg}
          className="w-full max-w-[140px] mx-auto"
          alt=""
        />

        {/**** Texts */}
        <section className="w-full">
          <h3 className="text-[20px] text-white font-semibold text-center md:text-[22px]">
            Delete Task
          </h3>
          <p className="text-[14px] text-[#EEEEF0] text-center md:text-base">
            Are you sure you want to delete?
          </p>
        </section>

        {/**** Buttons */}
        <section className="w-full flex gap-3 ">
          {/**** Cancel button */}
          <button
            className="w-1/2 px-6 py-3 rounded-full border-[1px] border-errorRed text-[12px] text-errorRed font-semibold md:text-[14px]"
            onClick={() => setShowcaseDeleteTaskConfirmationModal(false)}
          >
            Cancel
          </button>

          {/**** Delete button */}
          <button
            className="w-1/2 px-6 py-3 rounded-full border-[1px] border-errorRed bg-errorRed text-[12px] text-white font-semibold md:text-[14px]"
            onClick={handleDeleteTask}
          >
            Delete
          </button>
        </section>
      </main>
    </div>
  );
}

export default DeleteTaskConfirmationModal;
