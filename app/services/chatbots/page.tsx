// app/services/page.tsx (or wherever it's placed)

import { Button } from '@/components/ui/button';
import { BotIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ServicesPage() {
    
  return (
    <div className="p-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-4xl font-bold">
     <span className="text-purple-500">Need ChatBot for your Business Websites And Applications ?</span>
      </h1>

      <p className="text-lg max-w-2xl font-medium leading-relaxed">
        Create and integrate your own chatbots into portfolio websites, business platforms, product sites, and mobile apps
        using VOID's powerful APIs.
        <br />
        <br />
        With support for:
        <br />
        <b className="text-red-500">Custom Context Provided by You</b> —{' '}
        <span className="italic">(it will respond exactly how you want it to!)</span>
      </p>
       <Link className='text-xl w-1/2 rounded-2xl hover:bg-purple-500 transition-all duration-500 border border-purple-500  px-10 py-3 ' href={'/services/chatbots/create'}><Button variant="ghost" className='text-xl w-1/2 hover:bg-purple-500 transition-all duration-500   px-10 py-3 '>Create A Free ChatBot <BotIcon/></Button></Link>
    </div>
  );
}
