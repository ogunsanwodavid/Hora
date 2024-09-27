import Logo from "../../assets/logo.svg";

function LoadingPage() {
  return (
    <div className="w-full h-screen bg-darkestBlue flex items-center justify-center ">
      <img src={Logo} className="logo-scale w-14 md:w-20" alt="" />
    </div>
  );
}

export default LoadingPage;