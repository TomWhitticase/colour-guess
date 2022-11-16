import { AnyRecordWithTtl } from "dns";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputError = () =>
  toast.error("Enter a valid hex code!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

function shouldTextBeBlack(backgroundcolor: string): boolean {
  function computeLuminence(backgroundcolor: string): number {
    let colors = hexToRgb(backgroundcolor);
    let components = ["r", "g", "b"];
    for (let i in components) {
      let c = components[i];
      colors[c] = colors[c] / 255.0;
      if (colors[c] <= 0.03928) {
        colors[c] = colors[c] / 12.92;
      } else {
        colors[c] = Math.pow((colors[c] + 0.055) / 1.055, 2.4);
      }
    }
    let luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;
    return luminence;
  }
  function hexToRgb(hex: string): any {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }
  return computeLuminence(backgroundcolor) > 0.179;
}

function getRandomColor(): string {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

function getColorAccuracy(color1: string, color2: string): number {
  const hexToDec = (hex: string) => parseInt(hex, 16);

  const rgb1 = [
    hexToDec(color1.substring(1, 3)),
    hexToDec(color1.substring(3, 5)),
    hexToDec(color1.substring(5, 7)),
  ];
  const rgb2 = [
    hexToDec(color2.substring(1, 3)),
    hexToDec(color2.substring(3, 5)),
    hexToDec(color2.substring(5, 7)),
  ];

  const differences = [
    1 - Math.abs(rgb1[0] - rgb2[0]) / 255,
    1 - Math.abs(rgb1[1] - rgb2[1]) / 255,
    1 - Math.abs(rgb1[2] - rgb2[2]) / 255,
  ];

  const accuracy = (differences[0] + differences[1] + differences[2]) / 3;

  return Math.round(accuracy * 100);
}

function getAccuracyCircleColor(accuracy: number): string {
  if (accuracy >= 90) return "limegreen";
  if (accuracy >= 70) return "orange";
  return "red";
}

function checkInput(guess: string): boolean {
  const reg = /^#[0-9A-F]{6}$/i;
  if (reg.test(guess)) {
    return true;
  }
  inputError();
  return false;
}

export default function Home() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [guess, setGuess] = useState("");

  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <div>
      <ToastContainer />

      <div
        style={{ background: color }}
        className="flex items-center justify-center w-screen h-screen"
      >
        {!showAnswer && (
          <div key={0} className="flex flex-col gap-4">
            <div className="shadow-lg rounded-lg p-8 text-4xl bg-white">
              #
              <input
                size={6}
                onChange={(e) => {
                  setGuess("#" + e.target.value);
                }}
              ></input>
            </div>
            <button
              className="bg-black rounded-lg text-lg text-white p-4"
              onClick={() => {
                if (checkInput(guess)) setShowAnswer(true);
              }}
            >
              Guess
            </button>
          </div>
        )}
        {showAnswer && (
          <>
            <div
              key={1}
              className="bg-white p-8 shadow-lg rounded-lg flex flex-col gap-4"
            >
              <div
                className={`p-4 rounded-full shadow-lg ${
                  shouldTextBeBlack(guess) ? "text-black" : "text-white"
                }`}
                style={{
                  backgroundColor: guess,
                }}
              >
                Guess {guess}
              </div>
              <div
                className={`p-4 rounded-full shadow-lg ${
                  shouldTextBeBlack(color) ? "text-black" : "text-white"
                }`}
                style={{
                  backgroundColor: color,
                }}
              >
                Answer {color}
              </div>
              <div className="flex gap-2 justify-center items-center text-lg">
                Accuracy
                <CircularProgressbar
                  className="w-16 h-16"
                  value={getColorAccuracy(guess, color)}
                  text={`${getColorAccuracy(guess, color)}%`}
                  styles={buildStyles({
                    pathColor: getAccuracyCircleColor(
                      getColorAccuracy(guess, color)
                    ),
                    textColor: "black",
                    textSize: "2rem",
                  })}
                />
              </div>
              <button
                className="bg-black rounded-lg text-lg text-white p-4"
                onClick={() => location.reload()}
              >
                Play again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

{
  /* <div
  className="flex flex-col gap-4 justify-center items-center w-full h-screen"
  style={{
    backgroundColor: targetColor,
  }}
>
  <div className="shadow-lg rounded-lg p-8 text-4xl bg-white">
    #
    <input
      size={6}
      onChange={(e) => {
        setGuessColor("#" + e.target.value);
      }}
    ></input>
  </div>
  <button
    className="bg-black rounded-lg text-lg text-white p-4"
    onClick={() => setGuessResult(true)}
  >
    Guess
  </button>
</div>; */
}

{
  /* <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col gap-4">
  <div
    className={`p-4 rounded-full shadow-lg ${
      shouldTextBeBlack(guessColor) ? "text-black" : "text-white"
    }`}
    style={{
      backgroundColor: guessColor,
    }}
  >
    Guess {guessColor}
  </div>
  <div
    className={`p-4 rounded-full shadow-lg ${
      shouldTextBeBlack(targetColor) ? "text-black" : "text-white"
    }`}
    style={{
      backgroundColor: targetColor,
    }}
  >
    Answer {targetColor}
  </div>
  <div className="flex gap-2 justify-center items-center text-lg">
    Accuracy
    <CircularProgressbar
      className="w-16 h-16"
      value={getColorAccuracy(targetColor, guessColor)}
      text={`${getColorAccuracy(targetColor, guessColor)}%`}
      styles={buildStyles({
        pathColor: "limegreen",
        textColor: "black",
        textSize: "2rem",
      })}
    />
  </div>
  <button
    className="bg-black rounded-lg text-lg text-white p-4"
    onClick={() => location.reload()}
  >
    Play again
  </button>
</div>; */
}
