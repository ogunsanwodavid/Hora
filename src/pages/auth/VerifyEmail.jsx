import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../ui/FormButton";
import leftArrow from "../../icons/leftArrowIcon.svg";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import CountdownTImer from "./CountdownTimer";
import CountdownTimer from "./CountdownTimer";

function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill("")); // Initialize an array with 6 empty strings
  const otpString = otp.join("");

  const handleChange = (element, index) => {
    if (!isNaN(element.value)) {
      let newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Focus the next input if the current one is filled
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otpString);
  };

  const loading = false;

  const [timeLeft, setTimeLeft] = useState(60); // Initialize to 60 seconds (1 minute) for countdown timer

  return (
    <div className="font-inter w-full min-h-screen bg-darkestBlue px-6 py-10 pb-20">
      <header className="px-2 space-y-4">
        <img
          src={leftArrow}
          className="w-4"
          alt="left-arrow"
          onClick={() => navigate(-1)}
        />

        <main className="space-y-3 text-white text-center">
          <h2 className="font-semibold text-2xl">Verify your Email.</h2>
          <h3 className="font-regular text-base">
            Enter the OTP sent to your email address.
          </h3>
        </main>
      </header>

      <form className="mt-5">
        <section className="w-max mx-auto space-x-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength="1"
              value={data}
              className="w-[20px] h-[20px] bg-transparent border-[1.5px] text-white text-[20px] text-center border-black300 font-semibold sm:w-[40px] sm:h-[40px]"
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </section>

        <section className="text-base text-white text-center font-regular mt-6">
          {timeLeft ? (
            <div className="space-y-1">
              <p>Didn't get the code?</p>

              <p>
                Resend code in{" "}
                <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
              </p>
            </div>
          ) : (
            <div className="flex justify-center gap-x-6 font-semibold text-blue200">
              <p>Resend code</p>
              <p>Resend as SMS</p>
            </div>
          )}
        </section>

        <section className="mt-16">
          <button
            className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center"
            style={{
              opacity: (loading || otpString.length !== 6) && 0.6,
            }}
            disabled={loading || otpString.length !== 6}
            onClick={handleSubmit}
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
              "Verify"
            )}
          </button>
        </section>
      </form>
    </div>
  );
}

export default VerifyEmail;
