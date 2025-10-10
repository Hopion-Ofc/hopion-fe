import { type ReactNode } from 'react'

type TextVariant = 
  | 'small'
  | 'body'
  | 'body-large'
  | 'body-large-highlight'
  | 'heading-sm'
  | 'heading-md'
  | 'heading-lg'
  | 'heading-xl'

interface TextProps {
  variant: TextVariant
  className: string
  children: ReactNode
  tag: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const variantStyles: Record<TextVariant, string> = {
  'small': 'text-xs font-medium',
  'body': 'text-base font-medium',
  'body-large': 'text-lg font-semibold',
  'body-large-highlight': 'text-lg font-semibold',
  'heading-sm': 'text-xl font-bold',
  'heading-md': 'text-2xl font-bold',
  'heading-lg': 'text-3xl font-bold',
  'heading-xl': 'text-4xl font-extrabold',
}

export function Text({ 
  variant, 
  className, 
  children, 
  tag: Tag 
}: TextProps) {
  const variantClass = variantStyles[variant]
  const combinedClassName = `${variantClass} ${className}`.trim()

  return <Tag className={combinedClassName}>{children}</Tag>
}

export default Text

