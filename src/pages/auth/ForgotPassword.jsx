import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import FormInput from "../../ui/FormInput";
import FormButton from "../../ui/FormButton";

import fullLogo from "../../assets/fullLogo.svg";

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
          <h2 className="font-semibold text-2xl">Forgot Password?</h2>
          <h3 className="font-regular text-base">
            Enter your email below to reset your password?
          </h3>
        </main>
      </header>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
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
          <FormButton content="Send Reset OTP" loading={isRequestingReset} />
        </section>
      </form>
    </div>
  );
}

export default ForgotPassword;
