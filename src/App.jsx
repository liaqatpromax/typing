import { useState, useEffect, useCallback, useRef } from "react";
import Paragraph from "./components/Paragrapgh";
import Result from "./components/Result";
import Otp from "./components/Otp";

function App() {
  const [wpm, setWpm] = useState(0);
  const [orgpara, setOrgpara] = useState("");
  const [correctIndexes, setCorrectIndexes] = useState([]);
  const [incorrectIndexes, setInCorrectIndexes] = useState([]);
  const [count, setCount] = useState(0);
  const [char, setChar] = useState(false);
  const [working, setWorking] = useState(false);
  const timerRef = useRef(null);
  const [tim, setTime] = useState(15);
  const workRef = useRef(null);
  const [focus, setFocus] = useState([]);
  let spltd;
  const handlePara = (data) => {
    setOrgpara(data); // Dynamically update the paragraph
  };
  const backspace = useCallback(() => {}, []);
  const calculateResult = useCallback(() => {
    const wordsTyped = correctIndexes.length;
    setCount((wordsTyped / 5) * 2 * 10); // Assuming 5 characters per word.
  }, [correctIndexes]);

  const timer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          workRef.current = false;
          setWorking(false);
          calculateResult();
          return prev;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  }, [calculateResult]);

  const handle = useCallback(
    (e) => {
      if (
        !orgpara ||
        ["Tab", "Shift", "Control", "CapsLock"].includes(e.key) ||
        tim <= 0
      ) {
        return; // Do nothing if no paragraph is set
      } else {
        workRef.current = true;

        // if(timerRef.current) return

        spltd = orgpara.toLowerCase().split("");

        if (e.key === "Backspace") {
          // Handle Backspace
          setWpm((prev) => (prev > 0 ? prev - 1 : prev));
          setCorrectIndexes((prev) => {
            if (prev.length === 0) return prev;
            return prev.slice(0, -1); // Remove the last correct index
          });
          setInCorrectIndexes((prev) => {
            if (prev.length === 0) return prev;
            return prev.slice(0, -1); // Remove the last incorrect index
          });
          return; // Exit early to avoid further processing
        }

        // Check if the current character matches the key pressed
        if (e.key === spltd[wpm]) {
          // Correct character typed
          setWpm((prev) => prev + 1);
          setCorrectIndexes((prev) => [...prev, wpm]);
        } else {
          // Incorrect character typed

          setWpm((prev) => prev + 1);
          setInCorrectIndexes((prev) => [...prev, wpm]);
        }
      }
    },
    [wpm, orgpara] // Ensure updated values are used
  );

  useEffect(() => {
    document.addEventListener("keydown", handle);

    if (workRef.current) {
      timer();
    }
    return () => {
      document.removeEventListener("keydown", handle); // Ensures event listener is removed
    };
  }, [handle]);

  return (
    <div className="h-full bc hei flex-col flex gap-32 ">
      <h1 className="text-center text-5xl font-semibold fon pt-5  text-white">
        Swift Typer
      </h1>
      <div className="  flex items-center flex-col  gap-3  justify-center">
        <div className="flex gap-4 text-2xl fon px-3">
          
          <h1 className="fon text-white">Words Per Minute : {count}</h1>

          <p className="text-yellow-400 fon " id="timer">
           Timer : {tim}
          </p>
        </div>
        <h1 className="flex flex-col items-center justify-center 
         rounded ">
          <Paragraph whichPara={handlePara} />
          <p className=" p-2 w-3/6 bg border text-center rounded-lg text-4xl">
            {orgpara
              .split("")
              .map((char, idx) => (
                <span
                  key={idx}
                  className={` letspace font-light text-3xl 
        ${correctIndexes.includes(idx) ? "correct" : ""}
        ${incorrectIndexes.includes(idx) ? "incorrect" : ""}`}
                >
                  {char}
                </span>
              ))
              .reduce((acc, charSpan, idx) => {
                // Insert the cursor as a separate element at the correct position
                if (idx === wpm) {
                  acc.push(
                    <span key="cursor" className="cursor">
                      |
                    </span>
                  );
                }
                acc.push(charSpan);

                return acc;
              }, [])}
          </p>
          {char && <Result count={count} />}
        </h1>
        {/* <p>WPM: {wpm}</p> */}
        <button className="px-3 py-1 rounded hover:bg-slate-800 hover:text-white fon font-bold capitalize bg-white text-blue-950" onClick={() => {
          setWpm(0);
          setCount(0);
          setTime(15); // Reset timer
          setCorrectIndexes([]);
          setInCorrectIndexes([]);
          setWorking(false);
          clearInterval(timerRef.current); // Clear any active timer
          timerRef.current = null; // Reset the timer reference
          workRef.current = null; // Reset the working state reference
          
        }}>try again</button>
      </div>
    </div>
  );
}
export default App;
