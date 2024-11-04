import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { toast } from "react-toastify";

import DeleteAccountConfirmationModal from "./components/DeleteAccountConfirmationModal";

import { CircleSpinner } from "react-spinners-kit";

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
import { FiLogOut, FiUserX } from "react-icons/fi";

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

function ProfileSettings() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigation
  const navigate = useNavigate();

  //User credentials and variables from auth contexts
  const { user, logout, updateUser, isUpdatingUser } = useAuth();
  const userId = user?._id;
  const userUsername = user?.username;
  const userEmail = user?.email;

  // React hook form variables
  //Set default value of username and email to user username and user email
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: userUsername,
      email: userEmail,
    },
  });

  // Watch all form values at once
  const formValues = watch(); // This will include all form fields

  // Destructure watched values from formValues
  const {
    username: usernameInputValue,
    email: emailInputValue,
    password: passwordInputValue,
  } = formValues;

  // Toggle state for showing password and input focus
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordInputFocused, setIsPasswordInputFocused] = useState(false);

  // State to track if form has changed
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Use effect to update isFormChanged whenever formValues change
  useEffect(() => {
    setIsFormChanged(
      formValues.username !== userUsername || formValues.email !== userEmail
    );
  }, [formValues, userUsername, userEmail]); // Dependencies include formValues and initial user values

  //Make save changes button clickable if form is changed and if there's password input
  const isSaveChangesClickable =
    isFormChanged &&
    usernameInputValue &&
    emailInputValue &&
    passwordInputValue;

  //State of editing form
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);

  //State to shwocase delete account confirmation modal
  const [
    showcaseDeleteAccountConfirmationModal,
    setShowcaseDeleteAccountConfirmationModal,
  ] = useState(false);

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

    updateUser(formData);
  }

  //Function to log out user
  function handleLogOut() {
    logout();
  }

  //Function to delete user's account
  function handleDeleteAccount() {
    //Show delete account confirm modal
    setShowcaseDeleteAccountConfirmationModal(true);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[100px] lg:!min-h-0 lg:max-w-none lg:pb-[30px]"
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
            Profile Settings
          </h2>
        </header>

        {/**** User Photo info */}
        <section className="flex flex-col items-center mt-4 md:w-max md:mx-auto md:flex-row md:gap-x-8">
          {/**** User profile Photo */}
          <FaUserCircle className="w-[80px] h-[80px] fill-blue700 md:w-[100px] md:h-[100px]" />

          {/*** Buttons */}
          <main className="w-full flex justify-center gap-x-2 mt-3 md:w-max md:gap-x-3">
            {/*** Change photo button */}
            <button
              className="w-full flex items-center justify-center gap-1 p-3 bg-blue700 border-[1.5px] border-blue200 rounded-lg md:p-4"
              onClick={handleChangePhoto}
            >
              <MdOutlineAddAPhoto className="fill-white text-[23px] md:text-[24px]" />
              <p className="text-white text-[13px] font-semibold md:text-[15px] whitespace-nowrap">
                Change photo
              </p>
            </button>

            {/*** Delete photo button */}
            <button
              className="w-full max-w-[166px] flex items-center justify-center gap-1 p-3 bg-blue700 border-[1.5px] border-blue200 rounded-lg md:p-4 md:max-w-[180px]"
              onClick={handleDeletePhoto}
            >
              <MdOutlineNoPhotography className="fill-white text-[23px] md:text-[25px]" />
              <p className="text-white text-[13px] font-semibold md:text-[15px]">
                Delete photo
              </p>
            </button>
          </main>
        </section>

        {/**** Form to edit user info */}
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
            error={Boolean(errors?.username?.message)}
            autoComplete="off"
            className="w-full"
            disabled={!isEditingUserInfo || isUpdatingUser}
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
            error={Boolean(errors?.email?.message)}
            autoComplete="off"
            className="w-full"
            disabled={!isEditingUserInfo || isUpdatingUser}
          />

          {/**** Password input */}
          {isEditingUserInfo && (
            <>
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
                  disabled={!isEditingUserInfo || isUpdatingUser}
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

                <Link
                  to="/profile/settings/changepassword"
                  className="w-max ml-auto mt-2 cursor-pointer"
                >
                  <p className="text-[13px] text-blue200 font-semibold md:text-[15px]">
                    Change password?
                  </p>
                </Link>
              </FormControl>
            </>
          )}

          {/**** Buttons */}
          <div className="flex !mt-3">
            {/**** Show edit or save changes button depending on editing status */}
            {!isEditingUserInfo ? (
              <button
                className="text-white font-semibold text-[15px] ml-auto px-6 py-3  bg-blue700 rounded-lg border-[1.5px] border-blue700 md:text-[17px]"
                onClick={handleEditDetails}
              >
                Edit details
              </button>
            ) : (
              <button
                className={`confirmdeleteacc-btn text-white font-semibold text-[15px] ml-auto px-6 py-3  bg-blue700 rounded-lg border-[1.5px] flex justify-center md:text-[17px] ${
                  isSaveChangesClickable
                    ? "border-blue200 bg-blue700"
                    : "border-blue900 bg-blue800"
                } ${isUpdatingUser && "!w-[149.79px] md:!w-[163.16px]"}`}
                disabled={!isSaveChangesClickable}
              >
                {isUpdatingUser ? (
                  <CircleSpinner color={"#fff"} size={25} />
                ) : (
                  "Save Changes"
                )}
              </button>
            )}
          </div>
        </form>

        <section className="w-full flex flex-col gap-4 mt-7 md:flex-row">
          {/**** Log out */}
          <div className="w-full bg-blue200 p-4 pb-7 rounded-xl space-y-2 md:w-1/2">
            <h4 className="font-semibold text-white text-[17px] md:text-[18px]">
              Log Out
            </h4>

            <p className="font-medium text-white text-[15px] md:text-base">
              Are you sure you want to log out? Logging out will end your
              current session, and you’ll need to log in again to access your
              account.
            </p>

            {/**** Log out button */}
            <button
              className="text-[15px] font-semibold text-white px-4 py-3 bg-[rgba(29,46,97,0.7)] rounded-lg border-[1.5px] border-blue700 flex items-center justify-center gap-x-1 md:text-base"
              onClick={handleLogOut}
            >
              {/**** Log out icon */}
              <FiLogOut className="w-5 text-white md:w-6" />

              <p>Log out</p>
            </button>
          </div>

          {/**** Delete account */}
          <div className="w-full bg-blue700 p-4 pb-7 rounded-xl space-y-2 md:w-1/2">
            <h4 className="font-semibold text-white text-[17px] md:text-lg">
              Delete Account
            </h4>

            <p className="font-medium text-white text-[15px] md:text-base">
              This action can&apos;t be undone. All of your tasks, groups and
              settings will be deleted, and we can not recover your account
            </p>

            {/**** Delete account button */}
            <button
              className="text-[15px] font-semibold text-white px-3 py-3 bg-[rgba(229,77,81,0.5)] rounded-lg border-[1.5px] border-errorRed flex items-center justify-center gap-x-1 md:text-base"
              onClick={handleDeleteAccount}
            >
              {/**** Delete Account icon */}
              <FiUserX className="w-5 text-white" />

              <p>Delete Account</p>
            </button>
          </div>
        </section>
      </div>

      {/**** Showcase delete account confirmation modal */}
      {showcaseDeleteAccountConfirmationModal && (
        <DeleteAccountConfirmationModal
          userId={userId}
          setShowcaseDeleteAccountConfirmationModal={
            setShowcaseDeleteAccountConfirmationModal
          }
        />
      )}
    </>
  );
}

export default ProfileSettings;
