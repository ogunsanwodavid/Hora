import { ClassicSpinner } from "react-spinners-kit";

function FormButton({ content, loading }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center"
    >
      {loading ? <ClassicSpinner size={20} color="#fff" /> : content}
    </button>
  );
}

export default FormButton;
