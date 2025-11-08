interface InputProps {
  label: string
  name?: string
  type?: 'text' | 'email' | 'textarea'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
  placeholder?: string
  rows?: number
}

export function Input({ 
  label, 
  name,
  type = 'text',
  value,
  onChange,
  className = '',
  placeholder = '',
  rows = 4
}: InputProps) {
  const baseInputClasses = 'w-full px-4 py-2 rounded-2xl border bg-text-default text-base font-normal focus:outline-none focus:ring-2 focus:border-transparent'
  const combinedInputClassName = `${baseInputClasses} ${className}`.trim()
  
  const baseLabelClasses = 'block text-text-default font-medium mb-2'
  const inputId = name || `input-${label.toLowerCase().replace(/\s+/g, '-')}`
  
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className={baseLabelClasses}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          className={combinedInputClassName}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={combinedInputClassName}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default Input