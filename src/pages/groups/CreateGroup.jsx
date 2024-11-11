import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useGroups } from "../../contexts/groupsContext";
import { useAuth } from "../../contexts/authContext";

import CreatingGroupLoader from "./components/CreatingGroupLoader";
import CreateGroupSuccessModal from "./components/CreateGroupSuccessModal";
import ShareJoinGroupUrl from "./components/ShareJoinGroupUrl";

import backButton from "../../icons/leftArrowIcon.svg";
import FormInput from "../../ui/FormInput";

function CreateGroup() {
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
  const {
    createGroup,
    isCreatingGroup,
    showcaseCreateGroupSuccessModal,
    setShowcaseCreateGroupSuccessModal,
  } = useGroups();

  useEffect(() => {
    setShowcaseCreateGroupSuccessModal(false);
  }, []);

  //React hook form functions and variables
  const { register, formState, watch, handleSubmit } = useForm();
  const { errors } = formState;

  //Create group clickable only where theres a groupname input value
  const isCreateGroupBtnClickable = Boolean(watch("groupName"));

  //Function to create group
  async function handleCreateGroup(data) {
    const formData = {
      groupName: data.groupName,
      userId: userId,
    };

    await createGroup(formData);
  }

  //State to showcase share join group url
  const [showcaseShareJoinGroupUrl, setShowcaseShareJoinGroupUrl] =
    useState(false);

  return (
    <>
      <div
        className="w-full relative max-w-[500px] mx-auto px-3 pb-[40px] flex flex-col lg:!min-h-full lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        {/*** Header */}
        <header className="w-full px-2 space-y-4 md:mt-4">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />
        </header>

        {/**** Main content */}
        <main className="w-full flex-grow lg:flex lg:flex-col lg:items-center lg:justify-center">
          <section className="space-y-3 text-white text-center mt-4">
            <h2 className="font-semibold text-2xl md:text-[26px]">
              Create Group
            </h2>
            <h3 className="font-regular text-base md:text-lg">
              Enter the name of your new accountability Group.
            </h3>
          </section>

          {/***** Form */}
          <form
            className="w-full mt-6 lg:max-w-[500px] lg:mx-auto"
            onSubmit={handleSubmit(handleCreateGroup)}
          >
            {/**** Group name input */}
            <FormInput error={errors?.groupName?.message}>
              <input
                type="text"
                name="groupName"
                id="groupName"
                autoComplete="off"
                placeholder="Enter your group name"
                {...register("groupName", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Za-z0-9 ]*$/, // Only allows letters, digits, and spaces
                    message: "Only digits, text, and spaces are allowed",
                  },
                })}
                className={`w-full bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                  errors?.groupName?.message ? "border-errorRed" : ""
                } ${!errors?.groupName?.message && "focus:border-white"}`}
                disabled={isCreatingGroup}
              />
            </FormInput>

            {/**** Create group button */}
            <button
              className="w-full bg-blue200 h-[46px] rounded-[50px] text-white text-base font-semibold flex items-center justify-center mt-16 md:h-[52px] md:text-[18px]"
              style={{
                backgroundColor: !isCreateGroupBtnClickable && "#303136",
                boxShadow: "0px 4px 8px 0px #14080014",
                opacity: !isCreateGroupBtnClickable && 0.4,
              }}
              disabled={!isCreateGroupBtnClickable}
            >
              Create Group
            </button>
          </form>
        </main>
      </div>

      {/**** Show creating group loader when creating group */}
      {isCreatingGroup && <CreatingGroupLoader />}

      {/**** Showcase CreatSuccessGroupLoader */}
      {showcaseCreateGroupSuccessModal && (
        <CreateGroupSuccessModal
          setShowcaseShareJoinGroupUrl={setShowcaseShareJoinGroupUrl}
        />
      )}

      {/**** Showcase Share join group if device is not compatible with WEB Share API */}
      {showcaseShareJoinGroupUrl && (
        <ShareJoinGroupUrl
          setShowcaseShareJoinGroupUrl={setShowcaseShareJoinGroupUrl}
        />
      )}
    </>
  );
}

export default CreateGroup;
