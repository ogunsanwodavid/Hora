import { useState } from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import FormInput from "../../ui/FormInput";
import FormButton from "../../ui/FormButton";

import fullLogo from "../../assets/fullLogo.svg";

import leftArrow from "../../icons/leftArrowIcon.svg";
import eyeIcon from "../../icons/eyeIcon.svg";
import eyeOffIcon from "../../icons/eyeOffIcon.svg";

function SignIn() {
  const { windowHeight } = useWindowDimensions();

  const [showPassword, setShowPassword] = useState(false);

  const [passwordFocused, setPassswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((p) => !p);
  };

  const { register, formState, setValue, handleSubmit } = useForm();
  const { errors } = formState;

  const { login, isLoggingIn } = useAuth();

  async function onSubmit(data) {
    const formData = {
      email: data.email,
      password: data.password,
    };

    await login(formData);

    //Reset form inputs on successful login request
    setValue("email", "");
    setValue("password", "");
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
          <h2 className="font-semibold text-2xl">Sign in to your account.</h2>
          <h3 className="font-regular text-base">
            Sign in to access all our features.
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
              disabled={isLoggingIn}
            />
          </FormInput>

          {/*** Password input */}
          <FormInput label="Password" error={errors?.password?.message}>
            <main
              className={`w-full flex gap-x-2 bg-black700 h-[48px] px-4 py-3 text-base text-white border-[1.2px] border-black300 rounded-[4px] ${
                errors?.password?.message ? "border-errorRed" : ""
              }  ${
                !errors?.username?.message && passwordFocused && "border-white"
              }`}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "This field is required",
                })}
                className={`w-full h-full bg-transparent transition-all duration-500  outline-none  placeholder:text-black150 `}
                onFocus={() => setPassswordFocused(true)}
                onBlur={() => setPassswordFocused(false)}
                disabled={isLoggingIn}
              />

              <div onClick={togglePasswordVisibility}>
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  className="h-[15px]"
                />
              </div>
            </main>
          </FormInput>

          <Link to="/forgotpassword">
            <p className="w-max ml-auto text-blue300 text-[14px] font-semibold mt-1">
              Forgot password?
            </p>
          </Link>
        </section>

        <section className="mt-10">
          <FormButton content="Sign in" loading={isLoggingIn} />

          <div className="w-full mt-4 space-x-2 text-white text-center text-[14px] font-semibold">
            Don't have an account?{" "}
            <Link to="/createaccount">
              <span className="text-blue300">Sign up</span>
            </Link>
          </div>
        </section>
      </form>
    </div>
  );
}

export default SignIn;
