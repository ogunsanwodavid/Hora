import waitingToSearchUserImg from "../../../assets/waitingToSearchUser.svg";

function WaitingToSearchUser() {
  return (
    <div className="w-full flex-grow mt-8 flex flex-col items-center justify-center">
      <img
        src={waitingToSearchUserImg}
        className="w-full max-w-[250px] md:max-w-[300px]"
        alt="no result search image"
      />
      <p className="text-[#B2B3BD] text-[14px] font-semibold mt-2 md:text-base md:mt-3">
        Waiting to search!
      </p>
    </div>
  );
}

export default WaitingToSearchUser;
