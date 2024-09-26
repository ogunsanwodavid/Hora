import { ClipLoader } from "react-spinners";

function FormButton({ content, loading }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center"
      style={{
        opacity: loading && 0.6,
      }}
    >
      {loading ? (
        <ClipLoader
          color={"#fff"}
          loading={true}
          cssOverride={{
            display: "block",
            borderColor: "#fff",
          }}
          size={25}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        content
      )}
    </button>
  );
}

export default FormButton;
