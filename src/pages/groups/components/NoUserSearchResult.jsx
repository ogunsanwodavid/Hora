import noUserSearchResultImg from "../../../assets/noUserSearchResult.svg";

function NoUserSearchResult() {
  return (
    <div className="w-full flex-grow mt-4 flex flex-col items-center justify-center">
      <img
        src={noUserSearchResultImg}
        className="w-full max-w-[250px] md:max-w-[270px]"
        alt="no result search image"
      />
      <p className="text-[#B2B3BD] text-[14px] font-semibold mt-2 md:text-base md:mt-3">
        No results found...
      </p>
    </div>
  );
}

export default NoUserSearchResult;
