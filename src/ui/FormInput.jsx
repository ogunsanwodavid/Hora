function FormInput({ label, children, error }) {
  return (
    <div className="flex flex-col w-full gap-y-1">
      <span className="text-[14px] text-white font-semibold">{label}</span>
      {children}
      <span className="w-full font-medium text-sm text-errorRed">{error}</span>
    </div>
  );
}

export default FormInput;
