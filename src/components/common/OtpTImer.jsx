import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function OtpTImer({
  secs,
  mins,
  setOTPTimerComplete,
  onResend,
  Reset,
  setReset,
}) {
  const [seconds, setSeconds] = useState(secs);
  const [minutes, setMinutes] = useState(mins);

  // otp timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    if (seconds <= 0 || minutes <= 0) {
      setOTPTimerComplete(true);
      setReset(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    if (Reset) {
      setSeconds(secs);
      setMinutes(mins);
    }
  }, [Reset]);
  return (
    <div id="timer" className="mt-2">
      {seconds > 0 || minutes > 0 ? (
        <p>
          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      ) : (
        <p>
          Didn't recieve code?
          <span
            onClick={() => {
              setSeconds(secs);
              setMinutes(mins);
              setOTPTimerComplete(false);
              onResend();
            }}
            style={{ cursor: "pointer" }}
          >
            {" "}
            Resend Otp
          </span>
        </p>
      )}
    </div>
  );
}

export default OtpTImer;
