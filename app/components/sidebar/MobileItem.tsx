"use client"
import React from "react"
import Link from "next/link"
import clsx from "clsx"
interface MobileItemProps {
  href: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = (props) => {
  const { href, icon: Icon, active, onClick } = props
  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold
        w-full justify-center p-4 text-gray-500 
        hover:text-black hover:bg-gray-100`,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon />
    </Link>
  )
}

export default MobileItem
