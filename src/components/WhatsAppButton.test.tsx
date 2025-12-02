import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import WhatsAppButton from './WhatsAppButton'

describe('WhatsAppButton Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the WhatsApp button', () => {
    render(<WhatsAppButton />)
    const button = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    expect(button).toBeInTheDocument()
  })

  it('should have correct WhatsApp URL with phone number', () => {
    render(<WhatsAppButton />)
    const button = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    expect(button).toHaveAttribute('href', expect.stringContaining('wa.me/5531972499694'))
  })

  it('should have correct pre-filled message', () => {
    render(<WhatsAppButton />)
    const button = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    const href = button.getAttribute('href')
    expect(href).toContain('Ol%C3%A1')
    expect(href).toContain('Hopion')
  })

  it('should open in new tab', () => {
    render(<WhatsAppButton />)
    const button = screen.getByRole('link', { name: 'Falar no WhatsApp' })
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render WhatsApp icon', () => {
    const { container } = render(<WhatsAppButton />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should have fixed positioning', () => {
    const { container } = render(<WhatsAppButton />)
    const button = container.querySelector('a')
    expect(button).toHaveClass('fixed')
  })

  it('should render tooltip text', () => {
    const { container } = render(<WhatsAppButton />)
    expect(container.textContent).toContain('Fale conosco')
  })
})
