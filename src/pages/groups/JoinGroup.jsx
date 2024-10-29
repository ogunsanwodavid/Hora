import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useGroups } from "../../contexts/groupsContext";
import { useAuth } from "../../contexts/authContext";

import JoiningGroupLoader from "./components/JoiningGroupLoader";

import backButton from "../../icons/leftArrowIcon.svg";
import FormInput from "../../ui/FormInput";

function JoinGroup() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Variables from groups context
  const { joinGroup, isJoiningGroup, joinGroupError } = useGroups();

  //React hook form functions and variables
  const { register, formState, watch, handleSubmit } = useForm();
  const { errors } = formState;

  //Join group clickable only where theres a inviteLink input value
  const isJoinGroupBtnClickable = Boolean(watch("inviteLink"));

  //Function to create group
  async function handleJoinGroup(data) {
    const formData = {
      userId: userId,
      inviteLink: data.inviteLink,
    };

    await joinGroup(formData);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[500px] mx-auto px-3 pb-[40px] flex flex-col lg:!min-h-full lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        {/*** Header */}
        <header className="w-full px-2 md:mt-4">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />
        </header>

        {/****** Main content ****/}
        <main className="w-full flex-grow lg:flex lg:flex-col lg:items-center lg:justify-center">
          <section className="space-y-3 text-white text-center mt-4">
            <h2 className="font-semibold text-2xl md:text-[26px]">
              Join Group
            </h2>
            <h3 className="font-regular text-base md:text-lg">
              Enter the group code of the group you want to join.
            </h3>
          </section>

          {/**** Form */}
          <form
            className="w-full mt-6 lg:max-w-[500px] lg:mx-auto"
            onSubmit={handleSubmit(handleJoinGroup)}
          >
            {/**** Invite Link input */}
            <FormInput error={errors?.inviteLink?.message || joinGroupError}>
              <input
                type="text"
                name="inviteLink"
                id="inviteLink"
                placeholder="Enter group code"
                {...register("inviteLink", {
                  required: "This field is required",
                })}
                className={`w-full bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                  errors?.inviteLink?.message || joinGroupError
                    ? "border-errorRed"
                    : ""
                } ${!errors?.inviteLink?.message && "focus:border-white"}`}
                disabled={isJoiningGroup}
                onKeyDown={(e) => {
                  const key = e.key;

                  // Allow only alphabets and hyphen
                  if (!/^[a-zA-Z-]$/.test(key) && key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            </FormInput>

            {/**** Create group button */}
            <button
              className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16 md:h-[52px] md:text-[18px]"
              style={{
                backgroundColor: !isJoinGroupBtnClickable && "#303136",
                boxShadow: "0px 4px 8px 0px #14080014",
                opacity: !isJoinGroupBtnClickable && 0.4,
              }}
              disabled={!isJoinGroupBtnClickable}
            >
              Join Group
            </button>
          </form>
        </main>
      </div>

      {/**** Show creating group loader when creating group */}
      {isJoiningGroup && <JoiningGroupLoader />}
    </>
  );
}

export default JoinGroup;
