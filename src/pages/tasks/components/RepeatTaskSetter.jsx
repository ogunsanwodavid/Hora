import useWindowDimensions from "../../../hooks/useWindowDimensions";

function RepeatTaskSetter() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="absolute top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 p-6">
        <h3 className="text-white text-[18px] font-semibold">Repeat Task</h3>
      </main>
    </div>
  );
}

export default RepeatTaskSetter;
