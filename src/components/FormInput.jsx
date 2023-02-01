import React from 'react'

const FormInput = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange
  }) => {
  return (    
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className=""
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        required
      />
    </div>
  )
}

export default FormInput
