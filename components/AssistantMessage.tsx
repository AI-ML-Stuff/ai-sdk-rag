'use client'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'

import { Weather } from '@components/Weather'
import { UIMessage } from 'ai'

interface AssistantMessageProps {
  message: UIMessage
  isStreaming: boolean
}

export default function AssistantMessage({
  message,
  isStreaming,
}: AssistantMessageProps) {
  // State for interactions
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [feedback, setFeedback] = useState<'liked' | 'disliked' | null>(null)

  // Extract thinking text from a message
  const extractThinkingText = (content: string) => {
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/)
    return thinkMatch ? thinkMatch[1].trim() : ''
  }

  // Extract final response (without thinking text)
  const extractFinalResponse = (content: string) => {
    return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
  }

  // Copy message content to clipboard
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  const thinkingText = extractThinkingText(message.content)
  const finalResponse = extractFinalResponse(message.content)
  const hasThinking = thinkingText.length > 0

  return (
    <div className='chat-message chat-message-ai group'>
      <div className='chat-message-content'>
        {hasThinking && (
          <div className='thinking-accordion'>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='thinking-toggle'
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={16} />
                  <span>Hide Reasoning</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  <span>Show Reasoning</span>
                </>
              )}
            </button>

            {isExpanded && (
              <div className='thinking-content'>{thinkingText}</div>
            )}
          </div>
        )}
        {finalResponse}
        <div>
            {message.toolInvocations?.map(toolInvocation => {
              const { toolName, toolCallId, state } = toolInvocation;

              if (state === 'result') {
                if (toolName === 'displayWeather') {
                  const { result } = toolInvocation;
                  return (
                    <div key={toolCallId}>
                      <Weather {...result} />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={toolCallId}>
                    {toolName === 'displayWeather' ? (
                      <div>Loading weather...</div>
                    ) : null}
                  </div>
                );
              }
            })}
          </div>

        {/* Message interaction buttons */}
        {!isStreaming && (
          <div className='message-actions'>
            <button
              onClick={() => copyToClipboard(finalResponse)}
              className='message-action-button relative p-2'
              title='Copy to clipboard'
            >
              <Copy size={16} />
              {isCopied && <span className='copied-indicator text-xs'>Copied!</span>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
