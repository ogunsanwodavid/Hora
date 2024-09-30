import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { ClipLoader } from "react-spinners";

import CountdownTimer from "./CountdownTimer";

import fullLogo from "../../assets/fullLogo.svg";

import leftArrow from "../../icons/leftArrowIcon.svg";

function VerifyEmail() {
  const navigate = useNavigate();

  const { windowHeight } = useWindowDimensions();

  const {
    verifyEmailAddress,
    verifyEmail,
    isVerifyingEmail,
    verificationOtp,
    verificationOtpError,
  } = useAuth();

  useEffect(() => {
    //Navigate back to signup page if no verfication otp to show this component
    if (!verificationOtp) {
      navigate("/createaccount");
    }

    //Set time left to 0 if there is an error to get resend code
    if (verificationOtpError) {
      setTimeLeft(0);
    }
  }, [verificationOtp, navigate, verificationOtpError]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await verifyEmail({
      otp: otpString,
      email: verifyEmailAddress,
    });
  };

  const handleResendCode = (e) => {
    e.preventDefault();
    setOtp(new Array(6).fill(""));
    setTimeLeft(60);
  };

  const [timeLeft, setTimeLeft] = useState(60); // Initialize to 60 seconds (1 minute) for countdown timer

  return (
    <div
      className="font-raleway w-full bg-darkestBlue px-6 py-10 pb-20"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <header className="px-2 space-y-4">
        <img
          src={leftArrow}
          className="w-4"
          alt="left-arrow"
          onClick={() => navigate(-1)}
        />

        <main className="space-y-3 text-white text-center">
          <img src={fullLogo} className="mx-auto h-8" alt="" />
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
              className={`w-[20px] h-[20px] bg-transparent border-[1.5px] text-white text-[20px] text-center  font-semibold sm:w-[40px] sm:h-[40px] ${
                verificationOtpError ? "border-errorRed" : "border-black300"
              }`}
              disabled={isVerifyingEmail}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </section>

        {verificationOtpError && (
          <section className="text-sm text-errorRed text-center font-semibold font-regular mt-2">
            <p>Wrong verification code. Click resend to get new code</p>
          </section>
        )}

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
              <p onClick={handleResendCode}>Resend code</p>
              <p>Resend as SMS</p>
            </div>
          )}
        </section>

        <section className="mt-16">
          <button
            className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center"
            style={{
              opacity: (isVerifyingEmail || otpString.length !== 6) && 0.6,
            }}
            disabled={isVerifyingEmail || otpString.length !== 6}
            onClick={handleSubmit}
          >
            {isVerifyingEmail ? (
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
