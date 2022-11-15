import { useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Background from "./components/Background";

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
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function getColorAccuracy(color1: string, color2: string): number {
  let cwith2 = color1;
  let ccolor2 = color2;

  if (!cwith2 && !ccolor2) return 0;

  let _cwith2 = cwith2.charAt(0) == "#" ? cwith2.substring(1, 7) : cwith2;
  let _ccolor2 = ccolor2.charAt(0) == "#" ? ccolor2.substring(1, 7) : ccolor2;

  let _r = parseInt(_cwith2.substring(0, 2), 16);
  let _g = parseInt(_cwith2.substring(2, 4), 16);
  let _b = parseInt(_cwith2.substring(4, 6), 16);

  let __r = parseInt(_ccolor2.substring(0, 2), 16);
  let __g = parseInt(_ccolor2.substring(2, 4), 16);
  let __b = parseInt(_ccolor2.substring(4, 6), 16);

  let p1 = (_r / 255) * 100;
  let p2 = (_g / 255) * 100;
  let p3 = (_b / 255) * 100;

  let perc1 = Math.round((p1 + p2 + p3) / 3);

  p1 = (__r / 255) * 100;
  p2 = (__g / 255) * 100;
  p3 = (__b / 255) * 100;

  let perc2 = Math.round((p1 + p2 + p3) / 3);

  let result = 100 - Math.abs(perc1 - perc2);
  return result;
}

const randomColor = getRandomColor();
export default function Home() {
  const [guessColor, setGuessColor] = useState("#000000");
  const [targetColor, setTargetColor] = useState(randomColor);
  const [guessResult, setGuessResult] = useState(false);
  console.log("target is " + targetColor);

  return (
    <>
      <Background targetColor={targetColor} />
      <Background targetColor={targetColor} />
      <Background targetColor={targetColor} />
      <Background targetColor={targetColor} />
    </>
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
