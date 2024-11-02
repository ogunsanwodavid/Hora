import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useAuth } from "../../contexts/authContext";
import { useGroups } from "../../contexts/groupsContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { getMonthName, parseDateFromYYYYMMDD } from "../../utils/helpers";

import ExitingGroupLoader from "./components/ExitingGroupLoader";
import DeleteGroupConfirmationModal from "./components/DeleteGroupConfirmationModal";
import DeletingGroupLoader from "./components/DeletingGroupLoader";
import GroupMembersList from "./components/GroupMembersList";

import backButton from "../../icons/leftArrowIcon.svg";
import kebabIcon from "../../icons/kebabIcon.svg";
import whiteUserPlusIcon from "../../icons/whiteUserPlusIcon.svg";
import redSignOutIcon from "../../icons/redSignOutIcon.svg";
import redDeleteIcon from "../../icons/redDeleteIcon.svg";
import TasksIcon from "../../icons/TasksIcon";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GroupInfo() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Navigate
  const navigate = useNavigate();

  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);

  //Variables from user context
  const { user } = useAuth();
  const userId = user?._id;

  //Route parameters
  const { groupId } = useParams();

  //Variables from groups context
  const {
    currentGroupInfo,
    getCurrentGroup,
    exitGroup,
    isGettingCurrentGroup,
    isExitingGroup,
    isDeletingGroup,
  } = useGroups();

  //Get current group info on mount
  useEffect(() => {
    getCurrentGroup(groupId);
  }, []);

  //State of dropdown
  const [showcaseDropdown, setShowcaseDropdown] = useState(false);

  //Group information
  const groupName = currentGroupInfo?.name; //|| "Designers in Group 8";
  const groupCreator = currentGroupInfo?.createdBy?.username; //|| "Desire Destiny";

  //Group date of creation info
  const dateOfGroupCreation = currentGroupInfo?.createdAt || "2024-09-11";
  const yearofGroupCreation = parseDateFromYYYYMMDD(
    dateOfGroupCreation?.substring(0, 10)
  )?.getFullYear();
  const monthofGroupCreation = getMonthName(
    parseDateFromYYYYMMDD(dateOfGroupCreation?.substring(0, 10))?.getMonth()
  );
  const dayofGroupCreation = parseDateFromYYYYMMDD(
    dateOfGroupCreation?.substring(0, 10)
  )?.getDate();

  //Group members info
  const groupMembers = currentGroupInfo?.members; /*  || [
    {
      _id: "01",
      username: "desire007",
    },
    {
      _id: "02",
      username: "boluwatife010",
    },
    {
      _id: "03",
      username: "hoaxthagod",
    },
    {
      _id: "04",
      username: "00xdave",
    },
    {
      _id: "05",
      username: "incognito_lord",
    },
    {
      _id: "06",
      username: "Redemptionsync",
    },
    {
      _id: "07",
      username: "Beatthemyth",
    },
    {
      _id: "08",
      username: "blink200",
    },
  ]; */

  //Check if group was created by user
  const isGroupCreatedByUser =
    true || currentGroupInfo?.createdBy?._id === userId;

  //state to showcase delete confirm modal
  const [
    showcaseDeleteConfirmationModal,
    setShowcaseDeleteGroupConfirmationModal,
  ] = useState(false);

  async function handleExitGroup() {
    const formData = {
      groupId: groupId,
      userId: userId,
    };

    await exitGroup(formData);
  }

  function handleDeleteGroup() {
    setShowcaseDeleteGroupConfirmationModal(true);
    setShowcaseDropdown(false);
  }

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 pb-[40px] lg:!min-h-0 lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 40}px`,
        }}
      >
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {/*** Header */}
          <header className="relative w-full flex items-center justify-between md:mt-4">
            {/*** Back button */}
            <img
              src={backButton}
              className="w-4"
              alt="Back button"
              onClick={() => navigate(-1)}
            />

            {/*** More icon  */}
            {!isGettingCurrentGroup && isGroupCreatedByUser && (
              <img
                src={kebabIcon}
                className="h-4"
                alt="Kebab menu icon"
                onClick={() => setShowcaseDropdown((show) => !show)}
              />
            )}

            {/**** Dropdown */}
            {showcaseDropdown && (
              <section className="w-[160px] rounded-[8px] overflow-hidden absolute top-full mt-3 right-0 text-white cursor-pointer">
                <Link
                  to={`/groups/group/tasks/${groupId}`}
                  className="block w-full p-3 bg-blue700"
                >
                  <p>Tasks</p>
                </Link>

                <div
                  className="w-full p-3 bg-blue800"
                  onClick={handleExitGroup}
                >
                  Exit
                </div>

                <div
                  className="w-full p-3 bg-blue700"
                  onClick={handleDeleteGroup}
                >
                  Delete
                </div>
              </section>
            )}
          </header>

          {/***** Text info */}
          <section className="w-full mt-4 md:mt-6">
            {!isGettingCurrentGroup ? (
              <>
                <h2 className="text-[20px] text-white text-center font-semibold md:text-[22px]">
                  {groupName}
                </h2>
                <p className="text-[14px] text-[#B2B3BD] text-center md:text-base">
                  Created by {groupCreator} on {monthofGroupCreation}{" "}
                  {dayofGroupCreation}, {yearofGroupCreation}
                </p>{" "}
              </>
            ) : (
              <div className="w-full skeleton__loader-parent-1">
                <Skeleton className="inline-block mx-auto h-[30px] max-w-[220px] md:h-[33px] md:max-w-[250px]" />
                <Skeleton className="inline-block mx-auto mt-1 h-[21px] max-w-[250px] md:h-[24px] md:max-w-[280px]" />
              </div>
            )}
          </section>

          {/***** Members info */}
          <section className="w-full space-y-4 mt-4 md:mt-6 md:space-y-6">
            {/**** Group members count */}
            {groupMembers && groupMembers.length && !isGettingCurrentGroup && (
              <p className="text-[#B2B3BD] text-[14px] md:text-base">
                {groupMembers && groupMembers.length}{" "}
                {groupMembers.length > 1 ? "members" : "member"}
              </p>
            )}
            {/**** Skeleton loader */}
            {isGettingCurrentGroup && (
              <Skeleton className="h-[21px] max-w-[120px] md:h-[24px] md:max-w-[150px]"></Skeleton>
            )}

            {/**** Add members */}
            {isGroupCreatedByUser && !isGettingCurrentGroup && (
              <Link
                to={`/groups/group/invitemembers/${groupId}`}
                className="flex items-center gap-x-3 md:gap-x-5"
              >
                {/**** User plus icon */}
                <div className="h-[40px] w-[40px] bg-blue200 rounded-full flex items-center justify-center md:h-[45px] md:w-[45px]">
                  <img
                    src={whiteUserPlusIcon}
                    className="h-[16.5px] md:h-[18.6px]"
                    alt="white user plus icon"
                  />
                </div>

                <h5 className="text-white font-semibold md:text-lg">
                  Invite a member
                </h5>
              </Link>
            )}

            {/*** Members details */}
            <main className="w-full space-y-6 md:space-y-8">
              {/***** List of members */}
              {groupMembers &&
                groupMembers.length &&
                !isGettingCurrentGroup && (
                  <GroupMembersList groupMembers={groupMembers} />
                )}

              {/**** Skeleton loader */}
              {isGettingCurrentGroup &&
                Array(4).fill(
                  <div className="flex items-center gap-x-3 md:gap-x-5 skeleton__loader-parent-2">
                    <Skeleton className="h-[40px] w-[40px] rounded-full md:h-[45px] md:w-[45px]" />

                    <Skeleton className="h-[24px] max-w-[150px] md:h-[28px] md:max-w-[180px]" />
                  </div>
                )}
            </main>
          </section>

          {/**** Check group tasks ,Exit or delete group */}
          {!isGettingCurrentGroup && (
            <section className="w-full space-y-6 mt-10 md:space-y-8 md:mt-14">
              {/**** Check group tasks */}
              <Link
                to={`/groups/group/tasks/${groupId}`}
                className="flex items-center gap-x-4 cursor-pointer md:gap-x-6"
              >
                {/**** Task icon */}
                <TasksIcon className="fill-blue200 w-[20px] h-[19px] md:w-[25px] md:h-[24px]" />

                <p className="text-blue200 font-semibold md:text-lg">
                  Group Tasks
                </p>
              </Link>

              {/**** Exit group */}
              <div
                className="flex items-center gap-x-4 cursor-pointer md:gap-x-6"
                onClick={handleExitGroup}
              >
                {/**** Exit icon */}
                <img
                  src={redSignOutIcon}
                  className="w-[20px] h-[19px] md:w-[25px] md:h-[24px]"
                  alt="red signout icon"
                />

                <p className="text-errorRed font-semibold md:text-lg">
                  Exit Group
                </p>
              </div>

              {/**** Delete group */}
              {isGroupCreatedByUser && (
                <div
                  className="flex items-center gap-x-4 cursor-pointer md:gap-x-6"
                  onClick={handleDeleteGroup}
                >
                  {/**** Exit icon */}
                  <img
                    src={redDeleteIcon}
                    className="w-[20px] h-[19px] md:w-[25px] md:h-[24px]"
                    alt="red delete icon"
                  />

                  <p className="text-errorRed font-semibold md:text-lg">
                    Delete Group
                  </p>
                </div>
              )}
            </section>
          )}
        </SkeletonTheme>
      </div>

      {/**** Showcase Exiting Group Loader */}
      {isExitingGroup && <ExitingGroupLoader />}

      {/*** Showcase Deleting Group loader */}
      {isDeletingGroup && <DeletingGroupLoader />}

      {/**** Delete Group Confirmation Modal */}
      {showcaseDeleteConfirmationModal && !isDeletingGroup && (
        <DeleteGroupConfirmationModal
          groupId={groupId}
          setShowcaseDeleteGroupConfirmationModal={
            setShowcaseDeleteGroupConfirmationModal
          }
        />
      )}
    </>
  );
}

export default GroupInfo;
