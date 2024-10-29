import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../contexts/authContext";
import { useGroups } from "../../../contexts/groupsContext";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import GroupListItem from "./GroupListItem";

import blue200CrossIcon from "../../../icons/blue200crossIcon.svg";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function GroupsList() {
  //Window size info
  const { windowWidth } = useWindowDimensions();

  //User credentials
  const { user } = useAuth();
  const userId = user?._id;

  //Variables from groups context
  const { groups, isGettingAllGroups } = useGroups();

  return (
    <div className="w-full space-y-5 mt-4 md:space-y-8 md:mt-8">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <main className="w-full space-y-3 md:space-y-4">
          {/**** Groups list */}
          {!isGettingAllGroups
            ? groups.map((group) => {
                const groupId = group._id;
                return <GroupListItem group={group} key={groupId} />;
              })
            : Array(windowWidth < 1200 ? 8 : 6).fill(
                <div className="w-full">
                  {/**** Group name */}
                  <Skeleton className="h-[24px] max-w-[210px] md:h-[28px] md:max-w-[300px]" />
                  <Skeleton className="h-[21px] w-full md:h-[24px]" />
                </div>
              )}
        </main>

        {/***** Add New Group */}
        {!isGettingAllGroups && (
          <Link to="/groups/newgroup" className="flex items-center gap-2">
            <p className=" text-blue200 font-semibold md:text-lg">
              Add New Group
            </p>

            {/**** Cross icon */}
            <img src={blue200CrossIcon} className="w-4" alt="" />
          </Link>
        )}
      </SkeletonTheme>
    </div>
  );
}

export default GroupsList;
