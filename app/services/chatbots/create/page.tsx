"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/lib/useFetch";
import axios from "axios";
import { BotIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import { json } from "stream/consumers";

function page() {
  const [Data, setData] = React.useState({
    name: "",
    context: "",
  });

  const { data, error, isLoading, mutate } = useFetch("/api/v1/chatbot");

  //   console.log("ChatBot Data:", data);

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/api/v1/chatbot", {
        name: Data.name,
        context: Data.context,
      });

      if (response.status === 201) {
        toast.success("ChatBot created successfully");
        setData({ name: "", context: "" }); // Reset form fields
        mutate(); // Re-fetch chatbots data
      }
    } catch (error) {
      toast.error(
        "An error occurred while creating the chatbot. Please try again later."
      );
    }
  };
  return (
    <div className="p-6 flex h-full flex-col items-center justify-center gap-6 text-center">
      <h1 className="font-bold text-2xl">
        Create And Manage A Free ChatBot And Integrate With Your Websites
      </h1>

      {/* {JSON.stringify(data)} */}

      <form
        onSubmit={handleCreateChatBot}
        action=""
        className="flex w-full sm:w-1/3 flex-col items-center justify-center gap-2 text-center"
      >
        <Input
          value={Data?.name}
          onChange={handleValueChange}
          name="name"
          className="w-full text-center  p-2 "
          placeholder="ChatBot Name"
        />
        {/* <Input className='w-full text-center p-2 ' placeholder='ChatBot Description' /> */}
        <Textarea
          value={Data?.context}
          onChange={handleValueChange}
          name="context"
          className="w-full text-center  p-2 "
          placeholder="ChatBot Context"
        />
        <Button className="w-full">
          Create ChatBot <BotIcon />
        </Button>
      </form>
      <p className="text-sm text-gray-500">
        You can use this chatbot in your portfolio websites, business platforms,
        product sites, and mobile apps using VOID's powerful APIs.
      </p>

      <h1 className="font-bold text-2xl underline">My ChatBots</h1>
      {data && data.length <= 0 && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">No ChatBots Found Create One.</p>
        </div>
      )}
    {data && (
  <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
      <thead className="">
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Context</th>
          <th className="px-4 py-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((chatbot: any,i:number) => (
          <tr key={chatbot._id} className="bg-transparent">
            <td className="px-4 py-2 border font-semibold">#{i+1} {chatbot.name}</td>
            <td className="px-4 py-2 border text-gray-600">{chatbot.context}</td>
            <td className="px-4 py-2 border">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/api/v1/chatbot/chat?token=${chatbot._id}`);
                  toast.success("ChatBot ID copied to clipboard");
                }}
                className="border border-gray-400 px-3 py-1 rounded w-full"
              >
                Copy API
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
}

export default page;
