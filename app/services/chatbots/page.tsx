// app/services/page.tsx

import { Button } from '@/components/ui/button';
import { BotIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ServicesPage() {
  return (
    <div className="p-6 flex flex-col items-center justify-center gap-12 text-center min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white max-w-3xl leading-snug">
        <span className="text-purple-600">
          Need a ChatBot for your Business Websites or Apps?
        </span>
      </h1>

      <p className="text-lg max-w-2xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
        Build and integrate your own chatbots into portfolio websites, business platforms,
        product sites, and mobile apps using{' '}
        <span className="font-bold text-purple-600">VOID's powerful APIs</span>.
        <br /><br />
        With support for:
        <br />
        <span className="font-bold text-red-500">Custom Context Provided by You</span> —{' '}
        <span className="italic">your bot will respond exactly how you want!</span>
      </p>

      <Link href="/services/chatbots/create">
        <Button 
          className="text-lg px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 
                     border border-purple-500 text-purple-600 hover:text-white 
                     hover:bg-purple-600 transition-all duration-300"
          variant="ghost"
        >
          Create a Free ChatBot <BotIcon className="w-5 h-5" />
        </Button>
      </Link>

      {/* Integration Docs Section */}
      <div className="w-full max-w-4xl text-left bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          How to Integrate Your ChatBot
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Once you create a chatbot, you’ll get a unique token. Use the following endpoint to send messages to your bot:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`POST ${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/chatbot/chat?token=<your_bot_token>`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Example Request Body</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there! How can I help you?" },
    { "role": "user", "content": "Who are you?" }
  ]
}`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Example fetch() Call</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`fetch('${process.env.NEXT_PUBLIC_SITE_URL}/api/v1/chatbot/chat?token=<your_bot_token>', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello' },
      { role: 'assistant', content: 'Hi there! How can I help you?' },
      { role: 'user', content: 'Who are you?' }
    ]
  })
})
.then(res => res.json())
.then(data => {
  console.log('Bot Reply:', data.content);
})
.catch(err => console.error('Error:', err));`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Example Response</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`{
  "role": "assistant",
  "content": "I am your custom chatbot! I can respond based on the context you provided."
}`}
        </pre>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Usage Tips</h3>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Always send previous conversation history in <code>messages</code> to maintain context.</li>
          <li>Roles can be <code>"user"</code> or <code>"assistant"</code>.</li>
          <li>Secure your bot token — do not expose it in public frontend code.</li>
          {/* <li>Use your production domain instead of localhost when deploying.</li> */}
          <li>Responses are generated exactly according to the context you provided when creating the bot.</li>
        </ul>
      </div>
    </div>
  );
}
