import { toast } from "react-toastify";

const useShare = () => {
  const shareContent = async (title, text, url) => {
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
      toast.warning("Web Share API is not supported in your browser.");
      console.log("Web Share API not supported");
    }
  };

  return shareContent;
};

export default useShare;
