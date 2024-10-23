import useWindowDimensions from "../../../hooks/useWindowDimensions";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserSearchSkeletonLoader() {
  const { windowWidth } = useWindowDimensions();

  return (
    <div className="w-full space-y-5 mt-6 md:space-y-7">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        {Array(windowWidth < 1200 ? 7 : 4).fill(
          <div className="w-full flex items-center gap-x-3 md:gap-x-4">
            {/***** Select status box: shows tick if user is selected */}
            <Skeleton className="h-[15px] w-[15px] flex-shrink-0 md:h-[17px] md:w-[17px]" />

            {/**** User profile picture */}
            <Skeleton className="h-[35px] w-[35px] flex-shrink-0 rounded-full md:h-[40px] md:w-[40px]" />

            {/**** User details */}
            <section className="w-full">
              <Skeleton className="w-full h-[24px] max-w-[180px] md:max-w-[230px] md:h-[25.49px]" />
              <Skeleton className="w-full h-[21px] max-w-[230px] md:max-w-[280px] md:h-[22.49px]" />
            </section>
          </div>
        )}
      </SkeletonTheme>
    </div>
  );
}

export default UserSearchSkeletonLoader;
