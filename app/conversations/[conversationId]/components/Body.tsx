"use client"
import useConversation from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import React, { useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import axios from "axios"
import { pusherClient } from "@/app/libs/pusher"
interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = (props) => {
  const { initialMessages } = props

  const [messages, setMessages] = useState(initialMessages)
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  useEffect(() => {
    const messageHandler = (message: FullMessageType) => {
      // current user have seen this message
      axios.post(`/api/conversations/${conversationId}/seen`)
      // append new message and rerender
      setMessages((current) =>
        current.find((value) => value.id === message.id)
          ? current
          : [...current, message]
      )
    }

    const updateMessageHandler = (updatedMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) =>
          currentMessage.id === updatedMessage.id
            ? updatedMessage
            : currentMessage
        )
      )
    }

    pusherClient.subscribe(conversationId)
    bottomRef.current?.scrollIntoView()

    // triggered at /api/conversations/[conversationId]/seen/route.ts
    pusherClient.bind("message:new", messageHandler)

    // triggered at /api/conversations/[conversationId]/seen/route.ts
    pusherClient.bind("message:update", updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("message:new", messageHandler)
      pusherClient.unbind("message:update", updateMessageHandler)
    }
  }, [conversationId])
  const bottomRef = useRef<HTMLDivElement>(null)
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessageBox
          isLast={idx === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="" />
    </div>
  )
}

export default Body
