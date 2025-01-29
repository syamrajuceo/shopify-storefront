import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CountDown({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  loop = false,
  control = false,
  onComplete = null, // Callback when countdown finishes
  className = "", // Custom class for styling
}) {
  const initialTime = { days, hours, minutes, seconds };
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(initialTime);

  useEffect(() => {
    setTime(initialTime); // Reset when props change
  }, [days, hours, minutes, seconds]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalRef.current);
          if (onComplete) onComplete();
          return loop ? initialTime : prevTime;
        }

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Helper function to ensure 2-digit format
  const formatTime = (num) => num.toString().padStart(2, "0");

  return (
    <div className={`flex items-center justify-center min-h-screen bg-black ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full text-center bg-opacity-30 backdrop-blur-lg rounded-lg shadow-2xl p-8 max-w-3xl border border-gray-700"
      >
        <div className="grid grid-flow-col gap-6 text-center text-white text-5xl font-bold">
          <AnimatePresence>
            {time.days > 0 && (
              <motion.div
                key="days"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg"
              >
                <span>{formatTime(time.days)}</span>
                <span className="text-lg">Days</span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="flex flex-col bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg">
            <span>{formatTime(time.hours)}</span>
            <span className="text-lg">Hours</span>
          </motion.div>

          <motion.div className="flex flex-col bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg">
            <span>{formatTime(time.minutes)}</span>
            <span className="text-lg">Min</span>
          </motion.div>

          <motion.div className="flex flex-col bg-gray-800 bg-opacity-50 rounded-lg p-6 shadow-lg">
            <span>{formatTime(time.seconds)}</span>
            <span className="text-lg">Sec</span>
          </motion.div>
        </div>

        {/* Control Buttons */}
        {control && (
          <div className="mt-6 space-x-4">
            <button onClick={startTimer} className="btn btn-primary">Start</button>
            <button onClick={pauseTimer} className="btn btn-secondary">Pause</button>
            <button onClick={resetTimer} className="btn btn-accent">Reset</button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default CountDown;
