import { type ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

type ButtonVariant = 'primary' | 'primary-small' | 'primary-xsmall' | 'invisible' | 'invisible-small' | 'invisible-xsmall'

interface ButtonProps {
  variant: ButtonVariant
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  wide?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  'primary': 'cursor-pointer rounded-2xl text-xl font-normal bg-button-primary',
  'primary-small': 'cursor-pointer rounded-2xl text-base font-normal bg-button-primary',
  'primary-xsmall': 'cursor-pointer rounded-2xl text-xs font-normal bg-button-primary',
  'invisible': 'cursor-pointer rounded-2xl text-xl font-normal border border-f0f0f0 bg-transparent transition-colors duration-200 border-1 hover:bg-button-primary hover:text-f0f0f0 hover:border-button-primary',
  'invisible-small': 'cursor-pointer rounded-2xl text-base font-normal border border-f0f0f0 bg-transparent transition-colors duration-200 border-1 hover:bg-button-primary hover:text-f0f0f0 hover:border-button-primary',
  'invisible-xsmall': 'cursor-pointer rounded-2xl text-xs font-normal border border-f0f0f0 bg-transparent transition-colors duration-200 border-1 hover:bg-button-primary hover:text-f0f0f0 hover:border-button-primary',
}

export function Button({
  variant,
  children,
  className = '',
  type = 'button',
  onClick,
  wide = false
}: ButtonProps) {
  const isMobile = useIsMobile()
  const isXMobile = useIsMobile(500)

  let effectiveVariant = variant

  if (variant === 'primary' && isXMobile) {
    effectiveVariant = 'primary-xsmall'
  } else if (variant === 'primary' && isMobile) {
    effectiveVariant = 'primary-small'
  } else if (variant === 'invisible' && isXMobile) {
    effectiveVariant = 'invisible-xsmall'
  } else if (variant === 'invisible' && isMobile) {
    effectiveVariant = 'invisible-small'
  }

  const variantClass = variantStyles[effectiveVariant]
  const widthClass = wide ? 'w-full' : ''

  let combinedClassName = `${variantClass} ${widthClass} text-text-default ${className}`.trim()

  if (variant.startsWith('invisible')) {
    combinedClassName = `${variantClass} ${widthClass} text-text-default ${className}`.trim()
  }

  const buttonStyle = {
    padding: isXMobile ? '5px 8px' : (isMobile ? '10px 15px' : '10px 15px'),
  };

  return (
    <button
      type={type}
      className={combinedClassName}
      style={buttonStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button