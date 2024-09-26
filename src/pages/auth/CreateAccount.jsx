import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import FormInput from "../../ui/FormInput";
import FormButton from "../../ui/FormButton";

import leftArrow from "../../icons/leftArrowIcon.svg";
import eyeIcon from "../../icons/eyeIcon.svg";
import eyeOffIcon from "../../icons/eyeOffIcon.svg";

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordFocused, setPassswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPassswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((p) => !p);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((p) => !p);
  };

  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="font-inter w-full min-h-screen bg-darkestBlue px-6 py-10 pb-20">
      <header className="px-2 space-y-4">
        <img src={leftArrow} className="w-4" alt="left-arrow" />

        <main className="space-y-3 text-white text-center">
          <h2 className="font-semibold text-2xl">Create an account.</h2>
          <h3 className="font-regular text-base">
            Create an account to access all our features.
          </h3>
        </main>
      </header>

      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-4">
          {/*** Full Name input */}
          <FormInput label="Full Name" error={errors?.fullName?.message}>
            <input
              type="text"
              name="fullName"
              id="fullname"
              placeholder="Enter your full name"
              {...register("fullName", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/,
                  message:
                    "Full name must include both first and last names - capitalize first letters",
                },
              })}
              className={`w-full bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                errors?.fullName?.message ? "border-errorRed" : ""
              } ${!errors?.fullName?.message && "focus:border-white"}`}
            />
          </FormInput>

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
              className={`w-full !bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                errors?.email?.message ? "border-errorRed" : ""
              }  ${!errors?.email?.message && "focus:border-white"}`}
            />
          </FormInput>

          {/*** Password input */}
          <FormInput label="Password" error={errors?.password?.message}>
            <main
              className={`w-full flex gap-x-2 bg-black700 h-[48px] px-4 py-3 text-base text-white border-[1.2px] border-black300 rounded-[4px] ${
                errors?.password?.message ? "border-errorRed" : ""
              }  ${
                !errors?.fullName?.message && passwordFocused && "border-white"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "This field is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message: "Must be a mix of letters, numbers and symbols",
                  },
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
                className={`w-full h-full bg-transparent transition-all duration-500  outline-none  placeholder:text-black150 `}
                onFocus={() => setPassswordFocused(true)}
                onBlur={() => setPassswordFocused(false)}
              />

              <div onClick={togglePasswordVisibility}>
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  className="h-[15px]"
                />
              </div>
            </main>
          </FormInput>

          {/*** Confirm Password input */}
          <FormInput
            label="Confirm Password"
            error={errors?.confirmPassword?.message}
          >
            <main
              className={`w-full flex gap-x-2 bg-black700 h-[48px] px-4 py-3 text-base text-white border-[1.2px] border-black300 rounded-[4px] ${
                errors?.confirmPassword?.message ? "border-errorRed" : ""
              } ${
                !errors?.fullName?.message &&
                confirmPasswordFocused &&
                "border-white"
              }`}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPasssword"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) => {
                    return (
                      value === getValues().password || "Passwords do not match"
                    );
                  },
                })}
                className={`w-full h-full bg-transparent transition-all duration-500  outline-none  placeholder:text-black150 focus:border-white`}
                onFocus={() => setConfirmPassswordFocused(true)}
                onBlur={() => setConfirmPassswordFocused(false)}
              />

              <div onClick={toggleConfirmPasswordVisibility}>
                <img
                  src={showConfirmPassword ? eyeOffIcon : eyeIcon}
                  className="h-[15px]"
                />
              </div>
            </main>
          </FormInput>
        </section>

        <section className="mt-10">
          <FormButton content="Sign Up" loading={false} />

          <div className="w-full mt-4 space-x-2 text-white text-center text-[14px] font-semibold">
            Already have an account?{" "}
            <span className="text-blue300">Sign in</span>
          </div>
        </section>
      </form>
    </div>
  );
}

export default CreateAccount;
