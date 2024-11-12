import { toast } from "react-toastify";
import { useGroups } from "../../../contexts/groupsContext";

import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedin,
  FaPinterest,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaReddit,
} from "react-icons/fa6";

import { GoCopy } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

function ShareJoinGroupUrl({ setShowcaseShareJoinGroupUrl }) {
  //Variables from groups context
  const { createGroupSuccessName, createGroupSuccessInviteLink } = useGroups();

  //Encoded URL
  const encodedCreateGroupSuccessInviteLink = encodeURIComponent(
    createGroupSuccessInviteLink
  );

  //Invite users URL text
  const urlText = `You are have been invited to join the group ${createGroupSuccessName}. Sign in or create a new account and join in ${createGroupSuccessInviteLink}`;
  const encodedUrlText = encodeURIComponent(urlText);

  //Varaibles from copy to clipboard hook
  const { copy } = useCopyToClipboard("", 3000);

  //Function to copy url
  function handleCopyUrl() {
    copy(createGroupSuccessInviteLink);
    toast.success("Copied to clipboard");
  }

  return (
    <div
      className={`w-full fixed h-full bottom-0 left-0 bg-[rgba(12,17,28,0)] backdrop-blur-[2px] lg:absolute transition-transform duration-1000 ease-in `}
    >
      <div
        className={
          "w-full flex flex-col absolute bottom-0 left-0 bg-blue900 rounded-t-2xl p-5 pb-10 md:rounded-t-[2.5rem] md:px-[24px] md:py-[50px] "
        }
        style={{
          animation: "slideUp 250ms ease-in forwards",
        }}
      >
        {/**** Close icon */}
        <div className="flex md:px-[40px]">
          <IoCloseOutline
            className="ml-auto text-white text-2xl md:text-3xl"
            onClick={() => setShowcaseShareJoinGroupUrl(false)}
          />
        </div>

        <main className="w-full flex flex-wrap gap-6 mt-3 md:justify-center">
          {/***** Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedCreateGroupSuccessInviteLink}&quote=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaFacebookF className="text-white text-xl md:text-2xl" />
          </a>

          {/***** Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedCreateGroupSuccessInviteLink}&text=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaXTwitter className="text-white text-xl md:text-2xl" />
          </a>

          {/***** LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedCreateGroupSuccessInviteLink}&title=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaLinkedin className="text-white text-xl md:text-2xl" />
          </a>

          {/***** Instagram (only copying link here, as Instagram does not support URL sharing) */}
          {/* <div className="p-2 bg-blue200 rounded-full" onClick={handleCopyUrl}>
            <FaInstagram className="text-white text-xl md:text-2xl" />
          </div> */}

          {/**** WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaWhatsapp className="text-white text-xl md:text-2xl" />
          </a>

          {/***** Pinterest */}
          <a
            href={`https://pinterest.com/pin/create/button/?url=${encodedCreateGroupSuccessInviteLink}&description=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaPinterest className="text-white text-xl md:text-2xl" />
          </a>

          {/***** Telegram */}
          <a
            href={`https://t.me/share/url?url=${encodedCreateGroupSuccessInviteLink}&text=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaTelegram className="text-white text-xl md:text-2xl" />
          </a>

          {/**** Reddit */}
          <a
            href={`https://www.reddit.com/submit?url=${encodedCreateGroupSuccessInviteLink}&title=${encodedUrlText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue200 rounded-full"
          >
            <FaReddit className="text-white text-xl md:text-2xl" />
          </a>

          {/**** Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent(
              "Join our group"
            )}&body=${encodeURIComponent(urlText)}`}
            className="p-2 bg-blue200 rounded-full"
          >
            <FaEnvelope className="text-white text-xl md:text-2xl" />
          </a>

          {/**** Copy Icon */}
          <div className="p-2 bg-blue200 rounded-full" onClick={handleCopyUrl}>
            <GoCopy className="text-white text-xl md:text-2xl" />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ShareJoinGroupUrl;
