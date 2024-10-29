import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { toast } from "react-toastify";

import { TextField } from "@mui/material";

import { FaUserCircle } from "react-icons/fa";

import { MdOutlineAddAPhoto, MdOutlineNoPhotography } from "react-icons/md";

import backButton from "../../icons/leftArrowIcon.svg";
import { useState } from "react";

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

  const [usernameInputValue, setUsernameInputValue] = useState(userUsername);
  const [emailInputValue, setEmailInputValue] = useState(userEmail);

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

          <h2 className="text-xl text-white text-center font-semibold">
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
        <form className="mt-6 space-y-6">
          {/*** Username input */}
          <TextField
            label="Username"
            value={usernameInputValue}
            className="w-full focus:border-blue200"
            onChange={(e) => setUsernameInputValue(e.target.value)}
          />

          {/*** Email input */}
          <TextField
            label="Email"
            value={emailInputValue}
            className="w-full focus:border-blue200"
            onChange={(e) => setEmailInputValue(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}

export default ProfileInformation;
