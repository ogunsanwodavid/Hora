import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // New Swiper import
import { Mousewheel } from "swiper/modules"; // New module import
import "swiper/css"; // Core Swiper styles
import "swiper/css/mousewheel"; // Mousewheel styles

const TimeTest = () => {
  // Generate an array of numbers from 1 to 12
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={{ height: "100px", width: "100px" }}>
      <Swiper
        direction="vertical"
        spaceBetween={0} // No space between slides
        slidesPerView={1} // Only show one slide at a time
        mousewheel={true} // Enable mousewheel control for smooth scrolling
        loop={true} // Enable infinite looping
        speed={400} // Adjust the speed of the transition
        centeredSlides={true} // Center the current slide
        modules={[Mousewheel]} // Use the new module import format
      >
        {numbers.map((number) => (
          <SwiperSlide key={number}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px", // 100% height of viewport
                width: "100px", // 100% width of viewport
                fontSize: "5rem", // Large font size for display
                backgroundColor: "#3F71FD", // Custom background color
                color: "#fff", // White text color
                fontFamily: "Raleway, sans-serif", // Use your font
              }}
            >
              {number}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TimeTest;
