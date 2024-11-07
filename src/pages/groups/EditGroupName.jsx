import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useGroups } from "../../contexts/groupsContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { styled, TextField } from "@mui/material";

import { CircleSpinner } from "react-spinners-kit";

import backButton from "../../icons/leftArrowIcon.svg";

// Create a custom-styled TextField
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "rgba(61, 99, 221, 1)", // Default label color
    fontSize: "16px",
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

function EditGroupName() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigation
  const navigate = useNavigate();

  //Route parameters
  const { groupId } = useParams();

  //Variables from groups context
  const { currentGroupInfo, isEditingGroupName, editGroup } = useGroups();

  //React hook form variables
  //Pre-fiiled with the existing group name
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      groupName: currentGroupInfo?.groupName,
    },
  });

  // Watch all form values at once
  const formValues = watch(); // This will include all form fields

  // Destructure watched values from formValues
  const { groupName: groupNameValue } = formValues;

  // State to track if form has changed
  const [isFormChanged, setIsFormChanged] = useState(false);

  // Use effect to update isFormChanged whenever formValues change
  useEffect(() => {
    setIsFormChanged(groupNameValue !== currentGroupInfo?.groupName);
  }, [setIsFormChanged, groupNameValue, currentGroupInfo]); // Dependencies include formValues and initial user values

  //Check if save changes button is clickable
  const isSaveChangesBtnClickable =
    !isEditingGroupName && isFormChanged && groupNameValue;

  //Function to save changes
  async function handleSaveChanges(data) {
    const formData = {
      groupId: groupId,
      groupName: data.groupName,
    };
    console.log(formData);
    //await editGroup(formData);
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
            Edit Group
          </h2>
        </header>

        {/**** Form to edit group name */}
        <form
          className="w-full space-y-4 mt-6 md:space-y-6"
          onSubmit={handleSubmit(handleSaveChanges)}
        >
          {/*** Group name input */}
          <CustomTextField
            label="Group Name"
            name="groupName"
            id="groupname"
            {...register("groupName", {
              required: "This field is required",
            })}
            helperText={errors?.groupName?.message}
            error={Boolean(errors?.groupName?.message)}
            autoComplete="off"
            className="w-full"
            disabled={isEditingGroupName}
            onKeyDown={(e) => {
              const key = e.key;

              // Allow letters, digits, spaces, and backspace
              if (
                !/^[a-zA-Z0-9]$/.test(key) &&
                key !== "Backspace" &&
                key !== " "
              ) {
                e.preventDefault();
              }
            }}
          />

          {/**** Submit button */}
          <section className="flex">
            <button
              className={`confirmdeleteacc-btn ml-auto text-white font-semibold text-[15px] px-6 py-3  bg-blue700 rounded-lg border-[1.5px] flex justify-center md:text-[17px] ${
                isSaveChangesBtnClickable
                  ? "border-blue200 bg-blue700"
                  : "border-blue900 bg-blue800"
              } ${isEditingGroupName && "!w-[149.79px] md:!w-[163.16px]"}`}
              disabled={!isSaveChangesBtnClickable}
            >
              {isEditingGroupName ? (
                <CircleSpinner color={"#fff"} size={25} />
              ) : (
                "Save Changes"
              )}
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default EditGroupName;
