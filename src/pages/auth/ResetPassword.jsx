import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import FormInput from "../../ui/FormInput";
import FormButton from "../../ui/FormButton";

import fullLogo from "../../assets/fullLogo.svg";

import leftArrow from "../../icons/leftArrowIcon.svg";
import eyeIcon from "../../icons/eyeIcon.svg";
import eyeOffIcon from "../../icons/eyeOffIcon.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function ResetPassword() {
  const navigate = useNavigate();

  const { windowHeight } = useWindowDimensions();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [newPasswordFocused, setNewPasswordFocused] = useState(false);
  const [confirmNewPasswordFocused, setConfirmPasswordFocused] =
    useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((p) => !p);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((p) => !p);
  };

  const { register, formState, setValue, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  const { resetPassword, isResettingPassword, resetPasswordEmail } = useAuth();

  useEffect(() => {
    //Navigate back to forgot password page if no reset email to show this component
    if (!resetPasswordEmail) {
      navigate("/forgotpassword");
    }
  }, [resetPasswordEmail, navigate]);

  async function onSubmit(data) {
    const formData = {
      email: data.email,
      otp: data.otp,
      newPassword: data.newPassword,
    };

    await resetPassword(formData);

    //Reset form inputs on successful signup request
    setValue("email", "");
    setValue("newPassword", "");
    setValue("confirmNewPassword", "");
  }

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
          <h2 className="font-semibold text-2xl">Reset Password</h2>
          <h3 className="font-regular text-base">
            Enter your OTP and new password
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
              value={resetPasswordEmail}
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
              disabled={isResettingPassword}
            />
          </FormInput>

          {/*** OTP input */}
          <FormInput label="OTP" error={errors?.otp?.message}>
            <input
              type="text"
              name="otp"
              id="otp"
              maxLength="6"
              placeholder="Enter your OTP"
              {...register("otp", {
                required: "This field is required",
              })}
              className={`w-full bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                errors?.otp?.message ? "border-errorRed" : ""
              } ${!errors?.otp?.message && "focus:border-white"}`}
              disabled={isResettingPassword}
              onKeyDown={(e) => {
                const key = e.key;

                // Allow only digits
                if (!/^[0-9]$/.test(key) && key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          </FormInput>

          {/*** New Password input */}
          <FormInput label="New Password" error={errors?.newPassword?.message}>
            <main
              className={`w-full flex gap-x-2 bg-black700 h-[48px] px-4 py-3 text-base text-white border-[1.2px] border-black300 rounded-[4px] ${
                errors?.newPassword?.message ? "border-errorRed" : ""
              }  ${
                !errors?.newPassword?.message &&
                newPasswordFocused &&
                "border-white"
              }`}
            >
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new password"
                {...register("newPassword", {
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
                disabled={isResettingPassword}
                onFocus={() => setNewPasswordFocused(true)}
                onBlur={() => setNewPasswordFocused(false)}
              />

              <div onClick={toggleNewPasswordVisibility}>
                <img
                  src={showNewPassword ? eyeOffIcon : eyeIcon}
                  className="h-[15px]"
                />
              </div>
            </main>
          </FormInput>

          {/*** Confirm New Password input */}
          <FormInput
            label="Confirm New Password"
            error={errors?.confirmNewPassword?.message}
          >
            <main
              className={`w-full flex gap-x-2 bg-black700 h-[48px] px-4 py-3 text-base text-white border-[1.2px] border-black300 rounded-[4px] ${
                errors?.confirmNewPassword?.message ? "border-errorRed" : ""
              } ${
                !errors?.confirmNewPassword?.message &&
                confirmNewPasswordFocused &&
                "border-white"
              }`}
            >
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                name="confirmPasssword"
                id="confirmNewPassword"
                placeholder="Confirm your new password"
                {...register("confirmNewPassword", {
                  required: "This field is required",
                  validate: (value) => {
                    return (
                      value === getValues().newPassword ||
                      "Passwords do not match"
                    );
                  },
                })}
                className={`w-full h-full bg-transparent transition-all duration-500  outline-none  placeholder:text-black150 focus:border-white`}
                disabled={isResettingPassword}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
              />

              <div onClick={toggleConfirmNewPasswordVisibility}>
                <img
                  src={showConfirmNewPassword ? eyeOffIcon : eyeIcon}
                  className="h-[15px]"
                />
              </div>
            </main>
          </FormInput>
        </section>

        <section className="mt-10">
          <FormButton content="Reset Password" loading={isResettingPassword} />
        </section>
      </form>
    </div>
  );
}

export default ResetPassword;
