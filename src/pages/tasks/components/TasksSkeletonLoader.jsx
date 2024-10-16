import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TasksSkeletonLoader() {
  return (
    <div className="w-full mt-4 cursor-pointer">
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <section className="w-full flex flex-wrap gap-3">
          <Skeleton className="w-[61.19px] h-[45.66px] rounded-full md:w-[63.61px] md:h-[48.66px]" />
          <Skeleton className="w-[106.12px] h-[46px] rounded-full md:w-[114.13px] md:h-[49px]" />
          <Skeleton className="w-[87.38px] h-[46px] rounded-full md:w-[93.05px] md:h-[49px]" />
        </section>

        <section className="w-full mt-4 space-y-4">
          <div className="w-full rounded-[12px] bg-blue900 p-4 flex items-center gap-x-4 md:px-6 md:gap-x-7">
            <Skeleton className="w-6 h-6 rounded-full md:w-8 md:h-8"></Skeleton>

            <main className="w-full">
              <Skeleton className="w-full h-[24px] md:h-[27px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
            </main>
          </div>

          <div className="w-full rounded-[12px] bg-blue900 p-4 flex items-center gap-x-4 md:px-6 md:gap-x-7">
            <Skeleton className="w-6 h-6 rounded-full md:w-8 md:h-8"></Skeleton>

            <main className="w-full">
              <Skeleton className="w-full h-[24px] md:h-[27px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
            </main>
          </div>

          <div className="w-full rounded-[12px] bg-blue900 p-4 flex items-center gap-x-4 md:px-6 md:gap-x-7 lg:hidden">
            <Skeleton className="w-6 h-6 rounded-full md:w-8 md:h-8"></Skeleton>

            <main className="w-full">
              <Skeleton className="w-full h-[24px] md:h-[27px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
              <Skeleton className="w-full h-[21px] md:h-[24px]"></Skeleton>
            </main>
          </div>
        </section>
      </SkeletonTheme>
    </div>
  );
}

export default TasksSkeletonLoader;
