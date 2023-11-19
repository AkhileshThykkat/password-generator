import { useCallback, useEffect, useRef, useState } from 'react';
function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState('');
  const passRef = useRef();
  const passwordGenerator = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (characters) str += '`~@#$%^&*()-_=+[]{}:;,./|';
    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  };
  const copyToClickBoard = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current.select();
  };
  useEffect(passwordGenerator, [length, number, characters]);
  useCallback(passwordGenerator, [length, number, characters]);
  // console.log(length);
  return (
    <>
      <div className='w-[800px] items-center h-[300px] flex flex-col p-1 bg-black text-cyan-300 mx-auto mt-[100px] rounded-md'>
        <h2 className='text-2xl text-center mt-[px]'>Password Generator</h2>
        <div className='w-[70%] h-[60%] items-center pt-5 mt-5 flex flex-col bg-slate-950 mx-auto'>
          <div className='flex justify-center text-black items-start mb-2 mx-4'>
            <input
              value={password}
              className='outline-none'
              type='text'
              name=''
              id=''
              readOnly
              ref={passRef}
            />
            <button
              onClick={copyToClickBoard}
              className='mx-5 rounded-lg text-emerald-400'>
              Copy
            </button>
          </div>
          <div className='flex w-max justify-between items-start mt-8 mx-4'>
            <div className='flex flex-col mx-3'>
              <input
                min={8}
                max={36}
                value={length}
                onChange={(e) => setLength(e.target.value)}
                type='range'
              />
              <label htmlFor='range'>Length : {length}</label>
            </div>
            <div className='flex flex-col mx-3'>
              <input
                checked={number}
                type='checkbox'
                name=''
                id=''
                onChange={() => setNumber((prev) => !prev)}
              />
              <label htmlFor='Number'>Number</label>
            </div>
            <div className='flex flex-col mx-3'>
              <input
                checked={characters}
                type='checkbox'
                onChange={() => setCharacters((prev) => !prev)}
                name=''
                id=''
              />
              <label htmlFor='Characters'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
