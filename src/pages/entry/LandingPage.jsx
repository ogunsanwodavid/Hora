import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import fullLogo from "../../assets/fullLogo.svg";

import landingPageImg from "../../assets/landingpage.svg";

function LandingPage() {
  const { windowHeight, windowWidth } = useWindowDimensions();
  console.log(windowWidth);

  return (
    <div
      className="font-raleway w-full lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
        background: `linear-gradient(to bottom${
          windowWidth > 1200 ? " right" : ""
        }, rgba(64, 94, 178, 1) 0%, rgba(17, 23, 37, 1) ${
          windowWidth > 1200 ? "20%" : "10%"
        }, rgba(17, 23, 37, 1) ${
          windowWidth > 1200 ? "80%" : "90%"
        }, rgba(64, 94, 178, 1) 100%)`,
      }}
    >
      <main
        className="w-full h-max px-6 py-10 pb-20 flex items-center justify-center lg:flex-row-reverse lg:pb-0 lg:px-0 lg:py-0 lg:w-max lg:mx-auto lg:gap-x-0 lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <section className="w-full max-w-[500px] mx-auto space-y-3 lg:w-[500px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-6 lg:space-y-5">
          {/*** Logo */}
          {/* <section className="w-20 h-20 mx-auto flex items-center justify-center p-3 rounded-full bg-darkestBlue ">
            <img src={Logo} className="w-16" alt="" />
          </section> */}
          <img src={fullLogo} className="h-8 mx-auto md:h-9 lg:ml-0" alt="" />

          {/*** Texts */}
          <section className="space-y-2">
            <h2 className="text-white text-2xl text-center font-semibold md:text-3xl lg:text-left">
              Boost Your Productivity, Stay Accountable, and Collaborate with
              Peers
            </h2>
            <h4 className="text-electricBlue50 text-base text-center font-regular md:text-lg lg:text-left">
              Join us today and start collaborating with others while staying
              accountable to your personal or academic goals.
            </h4>
          </section>

          {/***Buttons */}
          <section className="w-full mx-auto flex flex-wrap justify-center gap-3 font-semibold lg:justify-start">
            <Link className="w-full md:max-w-[210px]" to="/signin">
              <button className="w-full h-[44px] p-2 border-2 border-electricBlue50 text-white text-base rounded-lg md:h-max md:text-lg">
                Sign In
              </button>
            </Link>

            <Link className="w-full md:max-w-[210px]" to="/createaccount">
              <button className="w-full h-[44px] p-2 bg-[#3f71fd] border-2 border-[#3f71fd] text-white text-base rounded-lg md:h-max md:text-lg">
                Create Account
              </button>
            </Link>
          </section>
        </section>

        <section className="hidden w-max h-full bg-[#3f71fd] m-6 p-3 rounded-2xl lg:flex items-center justify-center">
          <img src={landingPageImg} className="min-w-[400px]" alt="" />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
