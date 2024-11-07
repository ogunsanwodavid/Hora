import { useGroups } from "../../../contexts/groupsContext";

import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { IoWarningOutline } from "react-icons/io5";

function RemoveGroupMemberModal({
  groupId,
  removeMemberInfo,
  setShowcaseRemoveMemberModal,
}) {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //Variables from groups context
  const { removeGroupMember } = useGroups();

  //Details of member to be removed
  const removeMemberId = removeMemberInfo?._id;
  const removeMemberUsername = removeMemberInfo?.username;

  //Function to remove member
  async function handleRemoveMember() {
    setShowcaseRemoveMemberModal(false);
    //console.log(groupId, removeMemberId);
    await removeGroupMember(groupId, removeMemberId);
  }
  return (
    <div
      className="z-20 fixed top-0 left-0 w-full bg-[rgba(12,17,28,0.2)] backdrop-blur-[2px] flex items-center justify-center lg:absolute lg:!min-h-full"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <main className="w-full max-w-[345px] mx-5 rounded-[10px] bg-blue900 p-6 space-y-4">
        {/**** Warning icon */}
        <div className="w-max mx-auto bg-[rgba(229,77,81,0.3)] p-2 rounded-full">
          <IoWarningOutline className="text-[30px] text-errorRed md:text-[33px]" />
        </div>

        {/**** Texts */}
        <section className="w-full space-y-1">
          <h3 className="text-[20px] text-white font-semibold text-center md:text-[22px]">
            Are you sure?
          </h3>
          <p className="text-[14px] text-[#EEEEF0] text-center md:text-base">
            This action will remove{" "}
            <span className="font-semibold">{removeMemberUsername}</span> from
            this group and it can&apos;t be undone.
          </p>
        </section>

        {/**** Buttons */}
        <section className="w-full flex gap-3 ">
          {/**** Cancel button */}
          <button
            className="w-1/2 px-6 py-3 rounded-full border-[1px] border-errorRed text-[12px] text-errorRed font-semibold md:text-[14px]"
            onClick={() => setShowcaseRemoveMemberModal(false)}
          >
            Cancel
          </button>

          {/**** Remove user button */}
          <button
            className="w-1/2 px-6 py-3 rounded-full border-[1px] border-errorRed bg-errorRed text-[12px] text-white font-semibold md:text-[14px]"
            onClick={handleRemoveMember}
          >
            Remove
          </button>
        </section>
      </main>
    </div>
  );
}

export default RemoveGroupMemberModal;
