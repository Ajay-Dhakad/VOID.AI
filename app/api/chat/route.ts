import axios from "axios"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Check if user is requesting image generation
    const imageKeywords = [
      "generate image",
      "create image",
      "make image",
      "draw",
      "picture of",
      "image of",
      "show me",
      "visualize",
      "illustration",
      "artwork",
      "photo of",
    ]

    const isImageRequest = imageKeywords.some((keyword) => lastMessage.toLowerCase().includes(keyword))

    if (isImageRequest) {
      // Extract the image prompt from the message
      let imagePrompt = lastMessage
        .replace(
          /generate image of|create image of|make image of|draw|picture of|image of|show me|visualize|illustration of|artwork of|photo of/gi,
          "",
        )
        .trim()

      if (!imagePrompt) {
        imagePrompt = lastMessage
      }

      // Generate image URL
      const encodedPrompt = encodeURIComponent(imagePrompt)
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`

      return Response.json({
        message: `🎨 **Image Generated Successfully!**\n\n![Generated Image](${imageUrl})\n\n**Prompt:** ${imagePrompt}\n\n*AI has visualized your request! ✨*`,
        isImage: true,
        imageUrl: imageUrl,
        imagePrompt: imagePrompt,
      })
    }

    // Regular text response with conversation history
    const response = await axios.post(
      "https://text.pollinations.ai/openai",
      {
        messages: [
          {
            role: "system",
            content: `
You are a highly intelligent, professional AI assistant.

🧠 Your traits:
- Expert-level knowledge across all domains
- Clear, concise, and helpful communication
- Professional yet friendly tone
- Contextually aware of conversation history

🗣️ Communication style:
- Professional and approachable
- Provide detailed explanations when needed
- Use examples and step-by-step guidance
- Ask clarifying questions when needed

🔍 Response behavior:
- Reference previous conversation context when relevant
- Build upon earlier discussions
- Maintain conversation continuity
- Use markdown formatting for clarity

⛔ You never:
- Ignore conversation context
- Repeat information unnecessarily
- Provide outdated or incorrect information

✅ You always:
- Consider the full conversation history
- Provide accurate, helpful responses
- Maintain professional standards
- Adapt to the user's communication style

Remember: You have access to the conversation history, so use it to provide contextually relevant responses.

If someone asks you to generate, create, or make an image, let them know they can use phrases like "generate image of [description]" and you'll create it for them.
`,
          },
          ...messages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Assistant",
        },
      },
    )

    const reply = response.data.choices[0].message.content

    return Response.json({ message: reply })
  } catch (error) {
    console.error("API Error:", error)
    return Response.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
