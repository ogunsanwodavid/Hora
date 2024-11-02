import { CircleSpinner } from "react-spinners-kit";

function InvitingNewMembersLoader() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center gap-y-3 creatingtaskloader md:mt-28">
      <p className="text-[17px] text-white md:text-[19px]">Inviting user</p>

      {/**** Loader spinner */}
      <CircleSpinner color={"#3D63DD"} size={40} />
    </div>
  );
}

export default InvitingNewMembersLoader;
