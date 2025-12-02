import { type ReactNode } from 'react'
type TextVariant = 
  | 'small'
  | 'small-highlight'
  | 'xsmall'
  | 'xsmall-highlight'
  | 'xxsmall'
  | 'xxsmall-highlight'
  | 'medium'
  | 'medium-highlight'
  | 'body-large'
  | 'body-large-highlight'
  | 'heading-sm'
  | 'heading-sm-highlight'
  | 'heading-md'
  | 'heading-md-highlight'
  | 'heading-lg'
  | 'heading-lg-highlight'
  | 'heading-xl'
  | 'heading-xl-highlight'
  | 'success-title'
  | 'success-message'
  | 'success-icon'
  | 'error-title'
  | 'error-message'
  | 'error-icon'
  | 'warning-title'
  | 'warning-message'
  | 'warning-icon'

interface TextProps {
  variant: TextVariant
  className?: string
  children?: ReactNode
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  text: ReactNode 
}

const variantStyles: Record<TextVariant, string> = {
  'heading-xl': 'text-9xl font-normal',
  'heading-xl-highlight': 'text-9xl font-semibold',
  'heading-lg': 'text-6xl font-semibold',
  'heading-lg-highlight': 'text-6xl font-bold',
  'heading-sm': 'text-3xl font-medium',
  'heading-sm-highlight': 'text-3xl font-semibold',
  'heading-md': 'text-4xl font-medium',
  'heading-md-highlight': 'text-4xl font-semibold',
  'body-large': 'text-2xl font-medium',
  'body-large-highlight': 'text-2xl font-semibold',
  'small': 'text-base font-normal',
  'small-highlight': 'text-base font-semibold',
  'xsmall': 'text-sm font-normal',
  'xsmall-highlight': 'text-sm font-semibold',
  'xxsmall': 'text-xs font-normal',
  'xxsmall-highlight': 'text-xs font-semibold',
  'medium': 'text-xl font-normal',
  'medium-highlight': 'text-xl font-semibold',
  'success-title': 'text-base font-semibold text-success-text',
  'success-message': 'text-sm font-normal text-success-text-light',
  'success-icon': 'text-xl font-normal text-success-icon',
  'error-title': 'text-base font-semibold text-error-text',
  'error-message': 'text-sm font-normal text-error-text-light',
  'error-icon': 'text-xl font-normal text-error-icon',
  'warning-title': 'text-base font-semibold text-warning-text',
  'warning-message': 'text-sm font-normal text-warning-text-light',
  'warning-icon': 'text-xl font-normal text-warning-icon',
}

export function Text({ 
  variant, 
  className = '',
  children,
  tag: Tag,
  text
}: TextProps) {
  const variantClass = variantStyles[variant]
  
  const hasCustomColor = variant.includes('success') || variant.includes('error') || variant.includes('warning')
  const textColorClass = hasCustomColor ? '' : 'text-text-default'
  
  const combinedClassName = `${variantClass} ${textColorClass} ${className}`.trim()

  return <Tag className={combinedClassName}>{text || children}</Tag>
}

export default Text