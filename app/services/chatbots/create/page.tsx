"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/lib/useFetch";
import axios from "axios";
import { BotIcon } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

function Page() {
  const [Data, setData] = React.useState({
    name: "",
    context: "",
  });

  const { data, mutate } = useFetch("/api/v1/chatbot");

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
    e.preventDefault();
    try {
      if (!Data.name || !Data.context) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("/api/v1/chatbot", {
        name: Data.name,
        context: Data.context,
      });

      if (response.status === 201) {
        toast.success("ChatBot created successfully!");
        setData({ name: "", context: "" });
        mutate(); // Refresh chatbot list
      }
    } catch (error) {
      toast.error("Error creating chatbot. Please try again later.");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center min-h-screen gap-8 text-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white max-w-2xl leading-snug">
        Create & Manage Your ChatBot — Integrate with Any Website or App
      </h1>

      <form
        onSubmit={handleCreateChatBot}
        className="flex w-full sm:w-1/3 flex-col gap-4"
      >
        <Input
          value={Data.name}
          onChange={handleValueChange}
          name="name"
          placeholder="ChatBot Name"
          className="text-center py-3 text-lg font-medium focus:ring-2 focus:ring-purple-500"
        />
        <Textarea
          value={Data.context}
          onChange={handleValueChange}
          name="context"
          placeholder="ChatBot Context"
          className="text-center py-3 text-lg font-medium focus:ring-2 focus:ring-purple-500"
        />
        <Button className="w-full py-3 text-lg font-semibold flex items-center gap-2">
          Create ChatBot <BotIcon className="w-5 h-5" />
        </Button>
      </form>

      <p className="text-base text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
        Use this chatbot for portfolio websites, business platforms, product sites,
        and mobile apps using <span className="font-semibold text-purple-600">VOID's APIs</span>.
      </p>

      <h2 className="text-2xl font-bold underline text-gray-800 dark:text-white">
        My ChatBots
      </h2>

      {data && data.length <= 0 && (
        <p className="text-gray-500">No ChatBots found. Create one above.</p>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto w-full sm:w-2/3">
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 border font-semibold text-gray-700 dark:text-gray-200">
                  Name
                </th>
                <th className="px-4 py-3 border font-semibold text-gray-700 dark:text-gray-200">
                  Context
                </th>
                <th className="px-4 py-3 border font-semibold text-gray-700 dark:text-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((chatbot: any, i: number) => (
                <tr
                  key={chatbot._id}
                  className={i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                >
                  <td className="px-4 py-3 border font-medium text-gray-800 dark:text-gray-200">
                    #{i + 1} {chatbot.name}
                  </td>
                  <td className="px-4 py-3 border text-gray-600 dark:text-gray-300">
                    {chatbot.context}
                  </td>
                  <td className="px-4 py-3 border">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/api/v1/chatbot/chat?token=${chatbot._id}`
                        );
                        toast.success("ChatBot API link copied to clipboard!");
                      }}
                      className="border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md font-medium transition-colors duration-300 w-full"
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

export default Page;
