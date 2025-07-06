import React, { useEffect } from 'react'
import { botModels } from './BotModeUtils';

function BotModels() {

  const [model, setModel] = React.useState<string>("");
  

  useEffect(() => {

    const savedModel = localStorage.getItem('model');
    if (savedModel) {
      setModel(savedModel);
    }else{
      setModel("");
    }

  },[])

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    localStorage.setItem('model', newModel);
  };

  return (
    <>
     <select value={model} onChange={(e) => handleModelChange(e.target.value)} className="p-3 appearance-none hover:w-5 sm:hover:w-[200px] transition-all duration-500 border w-0 sm:w-[150px] bg-slate-50 border-slate-200 dark:border-slate-700 dark:bg-slate-700 rounded-md " name="mode" id="">
        {botModels?.map((botModel:any) => 
          <option key={botModel.value} value={botModel.value}>
            {botModel.name}
          </option>
        )}
          </select>
          
          </>
  )
}

export default BotModels
