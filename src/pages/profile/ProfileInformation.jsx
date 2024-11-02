import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { toast } from "react-toastify";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
} from "@mui/material";

import { FaUserCircle } from "react-icons/fa";

import { MdOutlineAddAPhoto, MdOutlineNoPhotography } from "react-icons/md";

import backButton from "../../icons/leftArrowIcon.svg";
import eyeIcon from "../../icons/eyeIcon.svg";
import eyeOffIcon from "../../icons/eyeOffIcon.svg";
import blueEyeIcon from "../../icons/blueEyeIcon.svg";
import blueEyeOffIcon from "../../icons/blueEyeOffIcon.svg";

// Create a custom-styled TextField
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "rgba(61, 99, 221, 1)", // Default label color
    fontSize: "1rem",
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

// Create a custom-styled TextField
const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "rgba(61, 99, 221, 1)", // Default label color
    fontSize: "1rem",
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

function ProfileInformation() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigation
  const navigate = useNavigate();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;
  const userUsername = user?.username;
  const userEmail = user?.email;

  //React hook form variables
  const { register, formState, watch, handleSubmit } = useForm();
  const { errors } = formState;

  //States of form inputs
  const usernameInputValue = watch("username");
  const emailInputValue = watch("email");
  const passwordInputValue = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  //Check if form is changed
  const isFormChanged =
    usernameInputValue !== userUsername || emailInputValue !== userEmail;

  //Make save changes button clickable if form is changed and if there's password input
  const isSaveChangesClickable =
    isFormChanged &&
    usernameInputValue &&
    emailInputValue &&
    passwordInputValue;

  //State of editing form
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  //Function to change user photo
  function handleChangePhoto() {
    toast.dismiss();
    toast.error("Feature not yet available");
  }

  //Function to delete user photo
  function handleDeletePhoto() {
    toast.dismiss();
    toast.error("Feature not yet available");
  }

  //Function to edit user details
  function handleEditDetails(e) {
    e.preventDefault();
    setIsEditingUserInfo(true);
  }

  //Function to save changes to user details
  async function handleSaveChanges(data) {
    const formData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    console.log(formData);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[40px] lg:!min-h-0 lg:max-w-none"
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

          <h2 className="w-full text-xl text-white text-center font-semibold">
            Profile Information
          </h2>
        </header>

        {/**** User Photo info */}
        <section className="flex flex-col items-center mt-4">
          {/**** User profile Photo */}
          <FaUserCircle className="w-[80px] h-[80px] fill-blue700" />

          {/*** Buttons */}
          <main className="w-full flex justify-center gap-x-2 mt-3">
            {/*** Change photo button */}
            <button
              className="w-full max-w-[166px] flex items-center justify-center gap-1 p-3 bg-blue700 border-[1.5px] border-blue200 rounded-lg"
              onClick={handleChangePhoto}
            >
              <MdOutlineAddAPhoto className="fill-white text-[23px]" />
              <p className="text-white text-[13px] font-semibold">
                Change photo
              </p>
            </button>

            {/*** Delete photo button */}
            <button
              className="w-full max-w-[166px] flex items-center justify-center gap-1 p-3 bg-blue700 border-[1.5px] border-blue200 rounded-lg"
              onClick={handleDeletePhoto}
            >
              <MdOutlineNoPhotography className="fill-white text-[23px]" />
              <p className="text-white text-[13px] font-semibold">
                Delete photo
              </p>
            </button>
          </main>
        </section>

        {/**** Form */}
        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(handleSaveChanges)}
        >
          {/*** Username input */}
          <CustomTextField
            label="Username"
            name="username"
            id="username"
            {...register("username", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
            })}
            helperText={errors?.username?.message}
            defaultValue={userUsername}
            className="w-full"
            disabled={!isEditingUserInfo}
            onKeyDown={(e) => {
              const key = e.key;

              // Allow only letters and digits
              if (!/^[a-zA-Z0-9]$/.test(key) && key !== "Backspace") {
                e.preventDefault();
              }
            }}
          />

          {/*** Email input */}
          <CustomTextField
            label="Email"
            name="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please provide a valid email address",
              },
            })}
            helperText={errors?.email?.message}
            defaultValue={userEmail}
            className="w-full"
            disabled={!isEditingUserInfo}
          />

          {/**** Password input */}
          {isEditingUserInfo && (
            <FormControl
              className="w-full profileInfo-passwordInput"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <CustomOutlinedInput
                id="outlined-adornment-password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "This field is required",
                })}
                className="w-full "
                onFocus={() => setIsPasswordInputFocused(true)}
                onBlur={() => setIsPasswordInputFocused(false)}
                disabled={!isEditingUserInfo}
                endAdornment={
                  <InputAdornment position="end">
                    {/**** Eye on / off icon */}
                    <img
                      src={
                        showPassword
                          ? isPasswordInputFocused
                            ? eyeOffIcon
                            : blueEyeOffIcon
                          : isPasswordInputFocused
                          ? eyeIcon
                          : blueEyeIcon
                      }
                      alt="icon"
                      className={`h-4`}
                      //style={{ width: 24, height: 24 }} // Adjust size as needed
                      onClick={() => setShowPassword((state) => !state)}
                    />
                  </InputAdornment>
                }
              />
            </FormControl>
          )}

          {/**** Buttons */}
          <div className="flex mt-4">
            {/**** Show edit or save changes button depending on editing status */}
            {!isEditingUserInfo ? (
              <button
                className="text-white font-semibold text-[15px] ml-auto px-6 py-3  bg-blue700 rounded-lg border-[1.5px] border-blue700"
                onClick={handleEditDetails}
              >
                Edit details
              </button>
            ) : (
              <button
                className={`text-white font-semibold text-[15px] ml-auto px-6 py-3  bg-blue700 rounded-lg border-[1.5px] ${
                  isSaveChangesClickable
                    ? "border-blue200 bg-blue700"
                    : "border-blue900 bg-blue900"
                }`}
                disabled={!isSaveChangesClickable}
              >
                Save changes
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileInformation;
