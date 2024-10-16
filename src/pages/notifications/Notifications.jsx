import { useEffect } from "react";

import { useAppDesign } from "../../contexts/appDesignContext";

function Notifications() {
  //App design info
  const { setShowcaseMobileNav } = useAppDesign();

  //Dont show mobile navbar on mount
  useEffect(() => {
    setShowcaseMobileNav(false);

    return () => {
      setShowcaseMobileNav(true);
    };
  }, [setShowcaseMobileNav]);
  return <div></div>;
}

export default Notifications;
