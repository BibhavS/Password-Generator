import React, { useCallback, useEffect, useState, useRef } from "react"

function App() {
  const [length, setLength] = useState(6);
  const [hasNum, setHasNum] = useState(false);
  const [hasChar, setHasChar] = useState(false);
  const [password, setPassword] = useState('');
  

  // ref hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (hasNum) str += "0123456789";
    if (hasChar) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
 
    setPassword(pass);

  }, [length, hasNum, hasChar, setPassword]);
  
  const copyToClipboard = useCallback(()=>{
     passwordRef.current?.select()
     window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, hasNum, hasChar, passwordGenerator])
  
  return (
    <>
      <h1 className="text-5xl font-medium text-center mt-8 text-emerald-400 tracking-wider">Password Generator</h1>
      <h3 className="text-2xl text-white text-center mt-6">Made by Bibhav Shrestha</h3>
      <div className="w-full max-w-3xl mx-auto text-2xl rounded-lg overflow-hidden px-12 py-16 my-12 text-emerald-400 bg-slate-800">
        <div className="flex gap-2">
          <input type="text"
            value={password}
            className="outline-none w-full py-2 px-2 rounded-sm text-slate-800"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-8 rounded-sm"
          onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center gap-x-4 mt-12">
            <input type="range"
                   min={6}
                   max={30}
                   value={length}
                   className="cursor-pointer w-32"
                   onChange={(e) => {setLength(e.target.value)}}
            />
            <label className=" w-[7.8rem]">Length: {length}</label>
            <input type="checkbox"
                   defaultChecked = {hasNum}
                   className="cursor-pointer h-5 w-5"
                   onChange={() =>{
                    setHasNum((prev) => !prev)
                   }}
            />
            <label>Numbers</label>
            <input type="checkbox"
                   defaultChecked = {hasChar}
                   className="cursor-pointer h-5 w-5"
                   onChange={() =>{
                    setHasChar((prev) => !prev)
                   }}
            />
            <label>Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
