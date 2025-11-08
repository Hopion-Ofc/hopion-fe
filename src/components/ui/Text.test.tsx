import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Text from './Text'

describe('Text Component', () => {
  it('should render text with correct variant', () => {
    render(
      <Text text="Hello World" variant="body-large" className="custom-class" tag="p">
      </Text>
    )

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should apply correct classes for small variant', () => {
    render(
      <Text text="Small text" variant="small" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('Small text')
    expect(element).toHaveClass('text-base', 'font-normal', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-xl variant', () => {
    render(
      <Text text="Heading XL" variant="heading-xl" className="custom-class" tag="h1">
      </Text>
    )

    const element = screen.getByText('Heading XL')
    expect(element).toHaveClass('text-9xl', 'font-normal', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-lg variant', () => {
    render(
      <Text text="Heading LG" variant="heading-lg" className="custom-class" tag="h2">
      </Text>
    )

    const element = screen.getByText('Heading LG')
    expect(element).toHaveClass('text-6xl', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for body-large variant', () => {
    render(
      <Text text="Body Large" variant="body-large" className="custom-class" tag="p">
      </Text>
    )

    const element = screen.getByText('Body Large')
    expect(element).toHaveClass('text-2xl', 'font-medium', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for body-large-highlight variant', () => {
    render(
      <Text text="Body Large Highlight" variant="body-large-highlight" className="custom-class" tag="p">
      </Text>
    )

    const element = screen.getByText('Body Large Highlight')
    expect(element).toHaveClass('text-2xl', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for small-highlight variant', () => {
    render(
      <Text text="Small Highlight" variant="small-highlight" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('Small Highlight')
    expect(element).toHaveClass('text-base', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for medium variant', () => {
    render(
      <Text text="Medium" variant="medium" className="custom-class" tag="p">
      </Text>
    )

    const element = screen.getByText('Medium')
    expect(element).toHaveClass('text-xl', 'font-normal', 'text-text-default', 'custom-class')
  })

  it('should render with correct HTML tag', () => {
    render(
      <Text text="Heading" variant="heading-xl" className="custom-class" tag="h1">
      </Text>
    )

    const element = screen.getByText('Heading')
    expect(element.tagName).toBe('H1')
  })

  it('should apply correct classes for xsmall variant', () => {
    render(
      <Text text="XSmall text" variant="xsmall" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('XSmall text')
    expect(element).toHaveClass('text-sm', 'font-normal', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for xxsmall variant', () => {
    render(
      <Text text="XXSmall text" variant="xxsmall" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('XXSmall text')
    expect(element).toHaveClass('text-xs', 'font-normal', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for xsmall-highlight variant', () => {
    render(
      <Text text="XSmall Highlight" variant="xsmall-highlight" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('XSmall Highlight')
    expect(element).toHaveClass('text-sm', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for xxsmall-highlight variant', () => {
    render(
      <Text text="XXSmall Highlight" variant="xxsmall-highlight" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('XXSmall Highlight')
    expect(element).toHaveClass('text-xs', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for medium-highlight variant', () => {
    render(
      <Text text="Medium Highlight" variant="medium-highlight" className="custom-class" tag="span">
      </Text>
    )

    const element = screen.getByText('Medium Highlight')
    expect(element).toHaveClass('text-xl', 'font-semibold', 'text-text-default', 'custom-class')
  })

    it('should apply correct classes for heading-sm variant', () => {
    render(
      <Text text="Heading SM" variant="heading-sm" className="custom-class" tag="h3">
      </Text>
    )

    const element = screen.getByText('Heading SM')
    expect(element).toHaveClass('text-3xl', 'font-medium', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-md variant', () => {
    render(
      <Text text="Heading MD" variant="heading-md" className="custom-class" tag="h4">
      </Text>
    )

    const element = screen.getByText('Heading MD')
    expect(element).toHaveClass('text-4xl', 'font-medium', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-sm-highlight variant', () => {
    render(
      <Text text="Heading SM Highlight" variant="heading-sm-highlight" className="custom-class" tag="h3">
      </Text>
    )

    const element = screen.getByText('Heading SM Highlight')
    expect(element).toHaveClass('text-3xl', 'font-semibold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-md-highlight variant', () => {
    render(
      <Text text="Heading MD Highlight" variant="heading-md-highlight" className="custom-class" tag="h4">
      </Text>
    )

    const element = screen.getByText('Heading MD Highlight')
    expect(element).toHaveClass('text-4xl', 'font-semibold', 'text-text-default', 'custom-class')
  })

    it('should apply correct classes for heading-lg-highlight variant', () => {
    render(
      <Text text="Heading LG Highlight" variant="heading-lg-highlight" className="custom-class" tag="h2">
      </Text>
    )

    const element = screen.getByText('Heading LG Highlight')
    expect(element).toHaveClass('text-6xl', 'font-bold', 'text-text-default', 'custom-class')
  })

  it('should apply correct classes for heading-xl-highlight variant', () => {
    render(
      <Text text="Heading XL Highlight" variant="heading-xl-highlight" className="custom-class" tag="h1">
      </Text>
    )

    const element = screen.getByText('Heading XL Highlight')
    expect(element).toHaveClass('text-9xl', 'font-semibold', 'text-text-default', 'custom-class')
  })
})