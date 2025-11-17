"use client";

import { useState, useEffect } from "react";
import classes from "./CookingMode.module.css";

const CookingMode = ({ instructions }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((time) => {
          if (time <= 1) {
            setIsTimerRunning(false);
            if (typeof window !== 'undefined') {
              alert("⏰ Timer finished!");
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startCookingMode = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const exitCookingMode = () => {
    setIsActive(false);
    setCurrentStep(0);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const nextStep = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(0);
      setIsTimerRunning(false);
    }
  };

  const startTimer = (minutes) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) {
    return (
      <button 
        onClick={startCookingMode} 
        className={classes.startButton}
      >
        👨‍🍳 Start Cooking Mode
      </button>
    );
  }

  const currentInstruction = instructions[currentStep];

  return (
    <div className={classes.cookingMode}>
      <div className={classes.overlay} onClick={exitCookingMode}></div>
      
      <div className={classes.modal}>
        <div className={classes.header}>
          <h2>Cooking Mode</h2>
          <button onClick={exitCookingMode} className={classes.closeBtn}>
            ✕
          </button>
        </div>

        <div className={classes.progress}>
          <span>Step {currentStep + 1} of {instructions.length}</span>
          <div className={classes.progressBar}>
            <div 
              className={classes.progressFill}
              style={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className={classes.content}>
          <p className={classes.instruction}>
            {currentInstruction.display_text}
          </p>

          <div className={classes.timerSection}>
            {timer > 0 ? (
              <div className={classes.activeTimer}>
                <div className={classes.timerDisplay}>
                  {formatTime(timer)}
                </div>
                <button 
                  onClick={toggleTimer}
                  className={classes.timerBtn}
                >
                  {isTimerRunning ? "⏸️ Pause" : "▶️ Resume"}
                </button>
                <button 
                  onClick={() => setTimer(0)}
                  className={classes.timerBtnSecondary}
                >
                  Reset
                </button>
              </div>
            ) : (
              <div className={classes.timerPresets}>
                <p>Set a timer:</p>
                <div className={classes.presetButtons}>
                  <button onClick={() => startTimer(5)}>5 min</button>
                  <button onClick={() => startTimer(10)}>10 min</button>
                  <button onClick={() => startTimer(15)}>15 min</button>
                  <button onClick={() => startTimer(30)}>30 min</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={classes.navigation}>
          <button 
            onClick={previousStep}
            disabled={currentStep === 0}
            className={classes.navBtn}
          >
            ← Previous
          </button>
          
          {currentStep === instructions.length - 1 ? (
            <button 
              onClick={exitCookingMode}
              className={classes.finishBtn}
            >
              ✓ Finish Cooking
            </button>
          ) : (
            <button 
              onClick={nextStep}
              className={classes.navBtn}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookingMode;