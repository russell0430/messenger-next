"use client"
import React from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
interface MessageInputProps {
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
const MessageInput: React.FC<MessageInputProps> = (props) => {
  const { placeholder, id, type, required, register, errors } = props
  return (
    <div className="relative w-full">
      <input
        {...{
          id,
          type,
          autoComplete: id,
          placeholder,
          ...register(id, { required }),
        }}
        className="text-black font-light py-2 px-4 bg-neutral-100 
        w-full rounded-full focus:outline-none"
      />
    </div>
  )
}

export default MessageInput
