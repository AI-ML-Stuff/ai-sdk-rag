'use client'

import { useChat } from '@ai-sdk/react'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Weather } from '@/components/Weather';

import AssistantMessage from './AssistantMessage'

export default function StreamText() {
  const { messages, input, handleInputChange, handleSubmit, status, stop } =
    useChat({})

  return (
    <div className='chat-container'>
      <div className='flex gap-2 justify-center items-center chat-title'>
        <h2 className=''>Chat Interface</h2>
        {(status === 'submitted' || status === 'streaming') && (
          <div>
            <div className='animate-spin text-primary'>
              <Loader size={20} />
            </div>
          </div>
        )}
      </div>

      <div className='chat-messages'>
        {messages.map((message) => (
          message.role === 'user' ? (
            <div
              key={message.id}
              className="chat-message chat-message-user"
            >
              <div className='chat-message-content'>
                {message.content}
              </div>
            </div>
          ) : (
            <AssistantMessage 
              key={message.id}
              message={message}
              isStreaming={status === 'streaming'}
            />
          )
        ))}
      </div>

      <form onSubmit={handleSubmit} className='flex gap-2'>
        <input
          name='prompt'
          value={input}
          onChange={handleInputChange}
          placeholder='Type your message here...'
          className='chat-input'
          disabled={status !== 'ready'}
        />
        {status === 'submitted' || status === 'streaming' ? (
          <button
            className='chat-stop-button'
            type='button'
            onClick={() => stop()}
          >
            Stop
          </button>
        ) : (
          <button className='chat-button' type='submit'>
            Submit
          </button>
        )}
      </form>
    </div>
  )
}
