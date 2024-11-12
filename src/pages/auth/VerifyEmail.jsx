import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import CountdownTimer from "./CountdownTimer";

import { ClassicSpinner } from "react-spinners-kit";

import fullLogo from "../../assets/fullLogo.svg";
import verifyEmailImg from "../../assets/verifyemail.svg";

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

  const [timeLeft, setTimeLeft] = useState(60); // Initialize to 60 seconds (1 minute) for countdown timer

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

  return (
    <div
      className="font-raleway w-full bg-electricBlue100  lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main
        className="w-full h-max bg-darkestBlue px-6 py-10 pb-20 lg:pb-0 lg:px-0 lg:py-0 lg:w-max lg:h-[631px] lg:mx-auto lg:flex lg:rounded-3xl lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <section className="hidden w-max bg-blue300 m-6 rounded-3xl lg:flex items-center justify-center">
          <img src={verifyEmailImg} className="min-w-[440px]" alt="" />
        </section>

        <section className="w-full max-w-[500px] mx-auto lg:w-[470px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-6">
          <header className="w-full px-2 space-y-4 max-w-[500px] mx-auto">
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

          <form className="w-full mt-5 max-w-[500px] mx-auto">
            <section className="w-max mx-auto space-x-3">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  name="otp"
                  autoComplete="off"
                  maxLength="1"
                  value={data}
                  className={`w-[30px] h-[30px] bg-transparent border-[1.5px] text-white text-[20px] text-center  font-semibold sm:w-[40px] sm:h-[40px] ${
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
                  <p>Didn&apos;t get the code?</p>

                  <p>
                    Resend code in{" "}
                    <CountdownTimer
                      timeLeft={timeLeft}
                      setTimeLeft={setTimeLeft}
                    />
                  </p>
                </div>
              ) : (
                <div className="flex justify-center gap-x-6 font-semibold text-blue200">
                  <p onClick={handleResendCode}>Resend code</p>
                  {/* <p>Resend as SMS</p> */}
                </div>
              )}
            </section>

            <section className="mt-16">
              <button
                className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center"
                style={{
                  opacity: otpString.length !== 6 && 0.6,
                }}
                disabled={isVerifyingEmail || otpString.length !== 6}
                onClick={handleSubmit}
              >
                {isVerifyingEmail ? (
                  <ClassicSpinner size={20} color="#fff" />
                ) : (
                  "Verify"
                )}
              </button>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}

export default VerifyEmail;
