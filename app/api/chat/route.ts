import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { streamText } from 'ai';
import { redirect } from 'next/navigation';
import { createChat } from '@tools/chat-store';
import { tools } from '@/ai/tools';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: any };

  const result = streamText({
    model: groq('qwen-qwq-32b'),
    system: 'You are a helpful assistant.',
    messages,
    maxSteps: 5,
    tools
  });

  return result.toDataStreamResponse();
}
