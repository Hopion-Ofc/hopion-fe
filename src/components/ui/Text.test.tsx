import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Text from './Text'

describe('Text Component', () => {
  it('should render text with correct variant', () => {
    render(
      <Text variant="body" className="text-primary" tag="p">
        Hello World
      </Text>
    )
    
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should apply correct classes for small variant', () => {
    render(
      <Text variant="small" className="text-primary" tag="span">
        Small text
      </Text>
    )
    
    const element = screen.getByText('Small text')
    expect(element).toHaveClass('text-xs', 'font-medium', 'text-primary')
  })

  it('should render with correct HTML tag', () => {
    render(
      <Text variant="heading-xl" className="text-primary" tag="h1">
        Heading
      </Text>
    )
    
    const element = screen.getByText('Heading')
    expect(element.tagName).toBe('H1')
  })

  it('should apply combined classes correctly', () => {
    render(
      <Text variant="body-large" className="text-primary custom-class" tag="p">
        Text with classes
      </Text>
    )
    
    const element = screen.getByText('Text with classes')
    expect(element).toHaveClass('text-lg', 'font-semibold', 'text-primary', 'custom-class')
  })
})

