import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import FormInput from "../../ui/FormInput";
import FormButton from "../../ui/FormButton";

import fullLogo from "../../assets/fullLogo.svg";
import forgotPasswordImg from "../../assets/forgotpassword.svg";

import leftArrow from "../../icons/leftArrowIcon.svg";

function ForgotPassword() {
  const { windowHeight } = useWindowDimensions();

  const { register, formState, setValue, handleSubmit } = useForm();
  const { errors } = formState;

  const { requestReset, isRequestingReset, setResetPasswordEmail } = useAuth();

  useEffect(() => {
    //set reset password email to empty string on mount
    setResetPasswordEmail("");
  }, [setResetPasswordEmail]);

  async function onSubmit(data) {
    const formData = {
      email: data.email,
    };

    await requestReset(formData);

    //Reset form inputs on successful login request
    setValue("email", "");
  }

  const navigate = useNavigate();

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
          <img src={forgotPasswordImg} className="min-w-[440px]" alt="" />
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
              <h2 className="font-semibold text-2xl">Forgot Password?</h2>
              <h3 className="font-regular text-base">
                Enter your email below to reset your password
              </h3>
            </main>
          </header>

          <form
            className="w-full mt-5 max-w-[500px] mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section className="space-y-4">
              {/*** Email input */}
              <FormInput label="Email" error={errors?.email?.message}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please provide a valid email address",
                    },
                  })}
                  className={`w-full !bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] lowercase placeholder:normal-case placeholder:text-black150 ${
                    errors?.email?.message ? "border-errorRed" : ""
                  }  ${!errors?.email?.message && "focus:border-white"}`}
                  disabled={isRequestingReset}
                />
              </FormInput>
            </section>

            <section className="mt-10">
              <FormButton
                content="Send Reset OTP"
                loading={isRequestingReset}
              />
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
