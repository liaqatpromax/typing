import { useEffect, useRef, useState } from "react";

function Otp({ fun }) {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inp, setInp] = useState([]);
  const inpRef = useRef([]);
  let otpss = [];

  const focus = (index) => {
    if (inpRef.current[index]) {
      console.log(index);
      inpRef.current[index].focus();
    }
  };
  const create = () => {
    setSuccess(false);
    setError(false);
    inpRef.current.forEach((inp) => {
      inp.value = "";
    });
    otpss = [];
    for (let i = 0; i < 4; i++) {
      const otps = Math.floor(Math.random() * 9);
      otpss.push(otps);
    }
    setOtp(otpss);

    console.log(otpss);
  };
  const check = () => {
    const chk = otp.join("");
    const user = inp.join("");
    if (chk === user) {
      setSuccess(true);
    } else {
      setError(true);
    }
  };
  const renderInput = (index) => {
    return (
      <input
        type="text"
        style={
          success ? { border: "2px solid green" } : { border: "2px solid gray" }
        }
        ref={(e) => (inpRef.current[index] = e)}
        maxLength={1}
        className="inp active border h-10 text-center border-black w-10"
        onChange={(e) => {
          const values = e.target.value;
          setInp((prev) => {
            const newArr = [...prev];
            newArr[index] = Number(values);
            return newArr;
          });

          if (values.length === 1 && index < otp.length - 1) {
            focus(index + 1); // Automatically focus the next input
          } else if (values.length === 0 && index > 0) {
            focus(index - 1);
          }
        }}
      />
    );
  };

  return (
    <div>
      <h1>Otp</h1>
      <div className="flex gap-2">
        {otp &&
          otp.map((_, index) => {
            return <div key={index}>{renderInput(index)}</div>;
          })}
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={create}>generate otp</button>
        <button
          className="bg-blue-900 text-white rounded-sm py-1 px-4 capitalize"
          onClick={check}
        >
          check otp
        </button>
        <h1>{success && "success"}</h1>
        <h1>{error && "error"}</h1>
      </div>
    </div>
  );
}
export default Otp;
