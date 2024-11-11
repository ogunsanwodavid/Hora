import { toast } from "react-toastify";

const useShare = () => {
  const shareContent = async (title, text, url, errorFunc) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        console.error("Error sharing content:", err);
        toast.warning("Failed to share content");
      }
    } else {
      errorFunc();
    }
  };

  return shareContent;
};

export default useShare;
