import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  it('should render button with children', () => {
    render(
      <Button variant="primary">
        Click me
      </Button>
    )

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should apply primary variant classes correctly', () => {
    render(
      <Button variant="primary">
        Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-xl', 'font-normal', 'bg-button-primary', 'text-text-default')
  })

  it('should apply custom className', () => {
    render(
      <Button variant="primary" className="custom-class">
        Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toHaveClass('custom-class')
  })

  it('should have default type button', () => {
    render(
      <Button variant="primary">
        Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toHaveAttribute('type', 'button')
  })

  it('should apply correct type attribute', () => {
    render(
      <Button variant="primary" type="submit">
        Submit
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Submit' })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Click me' })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not have w-full class when wide is false', () => {
    render(
      <Button variant="primary">
        Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).not.toHaveClass('w-full')
  })

  it('should have w-full class when wide is true', () => {
    render(
      <Button variant="primary" wide>
        Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Button' })
    expect(button).toHaveClass('w-full')
  })

  it('should apply small variant classes correctly', () => {
    render(
      <Button variant="primary-small">
        Small Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-base', 'font-normal', 'bg-button-primary', 'text-text-default')
  })

  it('should have w-full class when wide is true for small variant', () => {
    render(
      <Button variant="primary-small" wide>
        Small Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toHaveClass('w-full')
  })

  it('should apply xsmall variant classes correctly', () => {
    render(
      <Button variant="primary-xsmall">
        XSmall Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'XSmall Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-xs', 'font-normal', 'bg-button-primary', 'text-text-default')
  })

    it('should apply invisible variant classes correctly', () => {
    render(
      <Button variant="invisible">
        Invisible Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Invisible Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-xl', 'font-normal', 'border', 'border-f0f0f0', 'bg-transparent')
  })

  it('should apply invisible small variant classes correctly', () => {
    render(
      <Button variant="invisible-small">
        Invisible Small Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Invisible Small Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-base', 'font-normal', 'border', 'border-f0f0f0', 'bg-transparent')
  })

    it('should apply invisible xsmall variant classes correctly', () => {
    render(
      <Button variant="invisible-xsmall">
        Invisible XSmall Button
      </Button>
    )

    const button = screen.getByRole('button', { name: 'Invisible XSmall Button' })
    expect(button).toHaveClass('cursor-pointer', 'rounded-2xl', 'text-xs', 'font-normal', 'border', 'border-f0f0f0', 'bg-transparent')
  })
})