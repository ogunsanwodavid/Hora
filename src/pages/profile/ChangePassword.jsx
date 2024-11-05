import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";

import { CircleSpinner } from "react-spinners-kit";

import backButton from "../../icons/leftArrowIcon.svg";
import eyeIcon from "../../icons/eyeIcon.svg";
import eyeOffIcon from "../../icons/eyeOffIcon.svg";
import blueEyeIcon from "../../icons/blueEyeIcon.svg";
import blueEyeOffIcon from "../../icons/blueEyeOffIcon.svg";

// Create a custom-styled TextField
const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "rgba(61, 99, 221, 1)", // Default label color
    fontSize: "14px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(61, 99, 221, 1)", // Label color when focused
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "rgba(61, 99, 221, 1)", // Label color when focused
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(61, 99, 221, 1)", // Default border color
    },
    /* "&:hover fieldset": {
        borderColor: theme.palette.primary.light, // Border color on hover
      } */
    "&.Mui-focused fieldset": {
      borderColor: "rgba(61, 99, 221, 1)", // Border color when focused
    },
    "&.Mui-focused": {
      color: "#fff", // Text color on focus
      backgroundColor: "rgba(29, 46, 97, 1)",
    },
    "&.MuiOutlinedInput-notEmpty fieldset": {
      // Custom class for non-empty input
      borderColor: "rgba(61, 99, 221, 1)", // Border color when not empty
    },
    "&.MuiOutlinedInput-notEmpty": {
      color: "rgba(61, 99, 221, 1)", // Text color when not empty
    },

    color: "rgba(61, 99, 221, 1)", // Input text color
  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    "& fieldset": {
      borderColor: "rgba(61, 99, 221, 1)", // Border color when disabled
    },
    color: "#fff", //Text color when disabled
  },
}));

function ChangePassword() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigation
  const navigate = useNavigate();

  //User credentials
  const { changePassword, isChangingPassword } = useAuth();

  // React hook form variables
  //Set default value of username and email to user username and user email
  const {
    register,
    formState: { errors },
    getValues,
    watch,
    handleSubmit,
  } = useForm();

  // Watch all form values at once
  const formValues = watch(); // This will include all form fields

  // Destructure watched values from formValues
  const {
    oldPassword: oldPasswordInputValue,
    newPassword: newPasswordInputValue,
    confirmNewPassword: confirmNewPasswordInputValue,
  } = formValues;

  //State of change password button clickability
  const isChangePasswordBtnClickable =
    oldPasswordInputValue &&
    newPasswordInputValue &&
    confirmNewPasswordInputValue;

  //States of password inputs
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [isOldPasswordInputFocused, setIsOldPasswordInputFocused] =
    useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isNewPasswordInputFocused, setIsNewPasswordInputFocused] =
    useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [
    isConfirmNewPasswordInputFocused,
    setIsConfirmNewPasswordInputFocused,
  ] = useState(false);

  //Change password function
  async function handleChangePassword(data) {
    const formData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    await changePassword(formData);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[100px] lg:!min-h-full lg:max-w-none lg:pb-[30px] lg:flex lg:flex-col"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center justify-between md:mt-4">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />

          <h2 className="w-full text-xl text-white text-center font-semibold mt-3 md:text-[22px]">
            Change Password
          </h2>
        </header>

        {/**** Change password form */}
        <form
          className="w-full space-y-4 mt-6 md:space-y-6"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          {/**** Old password input */}
          <FormControl
            className="w-full profileInfo-passwordInput"
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password-1"
              error={Boolean(errors?.oldPassword?.message)}
            >
              Old Password
            </InputLabel>
            <CustomOutlinedInput
              id="outlined-adornment-password-1"
              label="Old Password"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              {...register("oldPassword", {
                required: "This field is required",
              })}
              error={Boolean(errors?.oldPassword?.message)}
              className="w-full "
              onFocus={() => setIsOldPasswordInputFocused(true)}
              onBlur={() => setIsOldPasswordInputFocused(false)}
              disabled={isChangingPassword}
              endAdornment={
                <InputAdornment position="end">
                  {/**** Eye on / off icon */}
                  <img
                    src={
                      showOldPassword
                        ? isOldPasswordInputFocused
                          ? eyeOffIcon
                          : blueEyeOffIcon
                        : isOldPasswordInputFocused
                        ? eyeIcon
                        : blueEyeIcon
                    }
                    alt="icon"
                    className={`h-4`}
                    //style={{ width: 24, height: 24 }} // Adjust size as needed
                    onClick={() => setShowOldPassword((state) => !state)}
                  />
                </InputAdornment>
              }
            />

            {/**** Helper text */}
            <FormHelperText error={Boolean(errors?.oldPassword?.message)}>
              {errors?.oldPassword?.message}
            </FormHelperText>
          </FormControl>

          {/**** New password input */}
          <FormControl
            className="w-full profileInfo-passwordInput"
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password-2"
              error={Boolean(errors?.newPassword?.message)}
            >
              New Password
            </InputLabel>
            <CustomOutlinedInput
              id="outlined-adornment-password-2"
              label="New Password"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
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
              error={Boolean(errors?.newPassword?.message)}
              className="w-full "
              onFocus={() => setIsNewPasswordInputFocused(true)}
              onBlur={() => setIsNewPasswordInputFocused(false)}
              disabled={isChangingPassword}
              endAdornment={
                <InputAdornment position="end">
                  {/**** Eye on / off icon */}
                  <img
                    src={
                      showNewPassword
                        ? isNewPasswordInputFocused
                          ? eyeOffIcon
                          : blueEyeOffIcon
                        : isNewPasswordInputFocused
                        ? eyeIcon
                        : blueEyeIcon
                    }
                    alt="icon"
                    className={`h-4`}
                    //style={{ width: 24, height: 24 }} // Adjust size as needed
                    onClick={() => setShowNewPassword((state) => !state)}
                  />
                </InputAdornment>
              }
            />

            {/**** Helper text */}
            <FormHelperText error={Boolean(errors?.newPassword?.message)}>
              {errors?.newPassword?.message}
            </FormHelperText>
          </FormControl>

          {/**** Confirm New password input */}
          <FormControl
            className="w-full profileInfo-passwordInput"
            variant="outlined"
          >
            <InputLabel
              htmlFor="outlined-adornment-password-3"
              error={Boolean(errors?.confirmNewPassword?.message)}
            >
              Confirm New Password
            </InputLabel>
            <CustomOutlinedInput
              id="outlined-adornment-password-3"
              label="Confirm New Password"
              name="confirmNewPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              {...register("confirmNewPassword", {
                required: "This field is required",
                validate: (value) => {
                  return (
                    value === getValues().newPassword ||
                    "Passwords do not match"
                  );
                },
              })}
              error={Boolean(errors?.confirmNewPassword?.message)}
              className="w-full "
              onFocus={() => setIsConfirmNewPasswordInputFocused(true)}
              onBlur={() => setIsConfirmNewPasswordInputFocused(false)}
              disabled={isChangingPassword}
              endAdornment={
                <InputAdornment position="end">
                  {/**** Eye on / off icon */}
                  <img
                    src={
                      showConfirmNewPassword
                        ? isConfirmNewPasswordInputFocused
                          ? eyeOffIcon
                          : blueEyeOffIcon
                        : isConfirmNewPasswordInputFocused
                        ? eyeIcon
                        : blueEyeIcon
                    }
                    alt="icon"
                    className={`h-4`}
                    //style={{ width: 24, height: 24 }} // Adjust size as needed
                    onClick={() => setShowConfirmNewPassword((state) => !state)}
                  />
                </InputAdornment>
              }
            />

            {/**** Helper text */}
            <FormHelperText
              error={Boolean(errors?.confirmNewPassword?.message)}
            >
              {errors?.confirmNewPassword?.message}
            </FormHelperText>
          </FormControl>

          {/**** Submit button */}
          <section className="flex">
            <button
              className={`confirmdeleteacc-btn ml-auto text-white font-semibold text-[15px] px-6 py-3  bg-blue700 rounded-lg border-[1.5px] flex justify-center md:text-[17px] ${
                isChangePasswordBtnClickable
                  ? "border-blue200 bg-blue700"
                  : "border-blue900 bg-blue800"
              } ${isChangingPassword && "!w-[176.79px] md:!w-[193.75px]"}`}
              disabled={!isChangePasswordBtnClickable}
            >
              {isChangingPassword ? (
                <CircleSpinner color={"#fff"} size={25} />
              ) : (
                "Change Password"
              )}
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
