import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useGroups } from "../../contexts/groupsContext";
import { useAuth } from "../../contexts/authContext";

import CreatingGroupLoader from "./components/CreatingGroupLoader";

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
  const { isCreatingGroup } = useGroups();

  //React hook form functions and variables
  const { register, formState, watch, handleSubmit } = useForm();
  const { errors } = formState;

  //Create group clickable only where theres a groupname input value
  const isCreateGroupBtnClickable = Boolean(watch("groupName"));

  //Function to create group
  async function createGroup(data) {
    const formData = {
      groupName: data.groupName,
      userId: userId,
    };

    console.log(formData);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[500px] mx-auto px-3 pb-[40px] flex flex-col lg:!min-h-full"
        style={{
          minHeight: `${windowHeight}px`,
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

          <main className="space-y-3 text-white text-center">
            <h2 className="font-semibold text-2xl md:text-[26px]">
              Create Group
            </h2>
            <h3 className="font-regular text-base md:text-lg">
              Enter the name of your new accountability Group.
            </h3>
          </main>
        </header>

        <form className="w-full mt-6" onSubmit={handleSubmit(createGroup)}>
          {/**** Group name input */}
          <FormInput errors={errors?.groupName?.message}>
            <input
              type="text"
              name="groupName"
              id="groupName"
              placeholder="Enter your group name"
              {...register("groupName", {
                required: "This field is required",
              })}
              className={`w-full bg-black700 h-[48px] px-4 py-3 text-base text-white  transition-all duration-500 border-[1.2px] border-black300 outline-none rounded-[4px] placeholder:text-black150 ${
                errors?.groupName?.message ? "border-errorRed" : ""
              } ${!errors?.groupName?.message && "focus:border-white"}`}
              disabled={isCreatingGroup}
              onKeyDown={(e) => {
                const key = e.key;

                // Allow only letters, spaces, and backspace
                if (
                  !/^[a-zA-Z]$/.test(key) &&
                  key !== "Backspace" &&
                  key !== " "
                ) {
                  e.preventDefault();
                }
              }}
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
      </div>

      {/**** Show creating group loader when creating group */}
      {isCreatingGroup && <CreatingGroupLoader />}
    </>
  );
}

export default CreateGroup;
