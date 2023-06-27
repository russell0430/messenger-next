"use client"
import React from "react"
import Modal from "@/app/components/modals/Modal"
import Image from "next/image"
interface ImageModalProps {
  isOpen?: boolean
  src?: string | null
  onClose: () => void
}
const ImageModal: React.FC<ImageModalProps> = (props) => {
  const { isOpen, src, onClose } = props
  if (!src) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image alt="Image" fill src={src} className="object-cover" />
      </div>
    </Modal>
  )
}

export default ImageModal
