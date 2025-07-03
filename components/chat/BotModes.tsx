import React, { useEffect } from 'react'
import { botModes } from './BotModeUtils';

function BotModes() {

  const [mode, setMode] = React.useState<string>("");
  

  useEffect(() => {

    const savedMode = localStorage.getItem('botMode');
    if (savedMode) {
      setMode(savedMode);
    }else{
      setMode("void");
    }

  },[])

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    localStorage.setItem('botMode', newMode);
  };

  return (
    <>
     <select value={mode} onChange={(e) => handleModeChange(e.target.value)} className="p-3 appearance-none hover:w-auto transition-all duration-1000 border w-0 sm:w-auto bg-slate-50 border-slate-200 dark:border-slate-700 dark:bg-slate-700 rounded-md " name="mode" id="">
        {botModes?.map((botMode:any) => 
          <option key={botMode.value} value={botMode.value}>
            {botMode.name}
          </option>
        )}
          </select>
          
          </>
  )
}

export default BotModes
