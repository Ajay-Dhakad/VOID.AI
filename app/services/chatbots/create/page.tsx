'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BotIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'

function page() {

    const [Data,setData] = React.useState({
        name: '',
        context: ''
    })


    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateChatBot = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!Data.name || !Data.context) {
                toast.error('Please fill in all fields');
                return;
            }

            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(Data),
              });
            
              const data = await response.json();
              console.log(data);

            
        } catch (error) {

            toast.error('An error occurred while creating the chatbot. Please try again later.')
        }
    }
  return (
  <div className='p-6 flex h-full flex-col items-center justify-center gap-6 text-center'>

    <h1 className='font-bold text-2xl'>Create And Manage A Free ChatBot And Integrate With Your Websites</h1>

    <form onSubmit={handleCreateChatBot} action="" className='flex w-full sm:w-1/3 flex-col items-center justify-center gap-2 text-center'>
        <Input onChange={handleValueChange} name='name' className='w-full text-center  p-2 ' placeholder='ChatBot Name'/>
        {/* <Input className='w-full text-center p-2 ' placeholder='ChatBot Description' /> */}
        <Textarea onChange={handleValueChange} name='context' className='w-full text-center  p-2 ' placeholder='ChatBot Context' />
        <Button className='w-full'>Create ChatBot <BotIcon/></Button>
    </form>
    <p className='text-sm text-gray-500'>You can use this chatbot in your portfolio websites, business platforms, product sites, and mobile apps using VOID's powerful APIs.</p>

    <h1 className='font-bold text-2xl underline'>My ChatBots</h1>
    <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-sm text-gray-500'>No ChatBots Found Create One.</p>
    </div>
  </div>
  )
}

export default page
