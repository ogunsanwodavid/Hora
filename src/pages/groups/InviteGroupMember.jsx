import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDesign } from "../../contexts/appDesignContext";
import { useGroups } from "../../contexts/groupsContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import UserSearchList from "./components/UserSearchList";
import UserSearchSkeletonLoader from "./components/UserSearchSkeletonLoader";
import NoUserSearchResult from "./components/NoUserSearchResult";
import InviteMembersButton from "./components/InviteMembersButton";
import WaitingToSearchUser from "./components/WaitingToSearchUser";

import backButton from "../../icons/leftArrowIcon.svg";

import { FiSearch } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

function InviteGroupMember() {
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

  //Route parameters
  const { groupId } = useParams();

  //Variables from groups context
  const { isSearchingNewMember, orderedSearchNewMemberResult, selectedUsers } =
    useGroups();

  //Group information
  const groupName = "Designers in Group 8";

  //Search input
  const [searchInputValue, setSearchInputValue] = useState("");

  return (
    <>
      <div
        className="w-full relative max-w-[700px] mx-auto px-3 flex flex-col lg:pb-0 lg:!min-h-0 lg:max-w-none"
        style={{
          minHeight: `${windowHeight - 70}px`,
        }}
      >
        {/*** Header */}
        <header className="relative w-full flex items-center gap-x-4 md:mt-4 md:gap-x-8">
          {/*** Back button */}
          <img
            src={backButton}
            className="w-4"
            alt="Back button"
            onClick={() => navigate(-1)}
          />
        </header>

        {/***** Text info */}
        <section className="w-full mt-4 space-y-1 md:mt-6">
          <h2 className="text-[20px] text-white text-center font-semibold md:text-[22px]">
            {groupName}
          </h2>
          <p className="text-[16px] text-[#B2B3BD] text-center md:text-lg">
            Invite group members
          </p>
        </section>

        {/***** Search input */}
        <section className="w-full max-w-[400px] mx-auto mt-4 bg-black700 border-black300 h-[48px] px-4 py-3 rounded-full  flex items-center justify-between gap-x-2 md:h-[55px] md:max-w-[500px] md:gap-x-4">
          {/**** Search icon */}
          <FiSearch className="text-white text-[22px] md:text-[24px]" />

          <input
            type="text"
            value={searchInputValue}
            placeholder="Search username..."
            className="w-full outline-none bg-transparent text-white text-[15px] placeholder:text-black150 placeholder:text-[15px] md:text-[17px] md:placeholder:text-[17px]"
            onChange={(e) => setSearchInputValue(e.target.value)}
          />

          {/*** Clear icon */}
          {searchInputValue && (
            <div
              className="p-[5px] bg-darkestBlue flex items-center justify-center rounded-full"
              onClick={() => setSearchInputValue("")}
            >
              <TfiClose className="text-white text-[9px] md:text-[11px]" />
            </div>
          )}
        </section>

        {/**** List of users or skeleton if loading */}
        {!isSearchingNewMember ? (
          orderedSearchNewMemberResult.length && searchInputValue.length ? (
            <UserSearchList />
          ) : searchInputValue.length ? (
            <NoUserSearchResult />
          ) : (
            <WaitingToSearchUser />
          )
        ) : (
          <UserSearchSkeletonLoader />
        )}
      </div>

      {/**** Show invite members button if at least a user is selected */}
      {selectedUsers.length && !isSearchingNewMember && <InviteMembersButton />}
    </>
  );
}

export default InviteGroupMember;