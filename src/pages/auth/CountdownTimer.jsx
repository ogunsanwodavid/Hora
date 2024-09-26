import { useEffect } from "react";

function CountdownTimer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    // If timeLeft reaches 0, do something
    if (timeLeft === 0) {
      handleTimeUp(); // Call the function when timer hits 00:00
      return; // Stop further countdown
    }

    // Create a timer that decreases the timeLeft every second
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clean up the timer when component unmounts or timeLeft changes
    return () => clearInterval(timerId);
  }, [timeLeft, setTimeLeft]);

  // Function to handle when time reaches 00:00
  const handleTimeUp = () => {
    //alert("Time's up!");
    // You can trigger any action here, such as resetting the timer, or sending an API request.
  };

  // Format the timeLeft to display in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return <span className="font-semibold">{formatTime(timeLeft)}</span>;
}

export default CountdownTimer;
