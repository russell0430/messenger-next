"use client"
import React from "react"
import ReactSelect from "react-select"
interface SelectProps {
  disabled: boolean
  label: string
  options: Record<string, any>[]
  onChange: (value: Record<string, any> | null) => void
  value?: Record<string, any>
}
const Select: React.FC<SelectProps> = (props) => {
  const { label, value, options, onChange, disabled } = props

  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          isMulti
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 999 }) }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  )
}

export default Select
