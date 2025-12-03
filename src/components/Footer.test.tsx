import { describe, it, expect, vi, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from './Footer'
import { useIsMobile } from '../hooks/useIsMobile'

vi.mock('../hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(),
}))

describe('Footer Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render the Footer component', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Footer />)
    expect(screen.getByText('Como funciona?')).toBeInTheDocument()
  })

  it('should render texts with correct variants based on isMobile', () => {
    ;(useIsMobile as Mock).mockReturnValue(true)
    const { unmount } = render(<Footer />)
    expect(screen.getByText('Como funciona?')).toHaveClass('text-xl')

    unmount()
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Footer />)
    expect(screen.getByText('Como funciona?')).toHaveClass('text-4xl')
  })

  it('should render the step cards with correct titles and descriptions', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Footer />)
    expect(screen.getByText('Você envia sua ideia')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Preencha o formulário ou fale conosco pelo WhatsApp e conte o que você quer criar'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('Planejamos juntos')).toBeInTheDocument()
    expect(screen.getByText('Desenvolvemos seu software')).toBeInTheDocument()
    expect(screen.getByText('Você lança e cresce')).toBeInTheDocument()
  })

  it('should render the contact form', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Footer />)
    expect(screen.getByLabelText('Nome completo')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Descrição da ideia de software')).toBeInTheDocument()
  })

  it('should update form data on input change', async () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Footer />)
    const nameInput = screen.getByLabelText('Nome completo') as HTMLInputElement
    const emailInput = screen.getByLabelText('E-mail') as HTMLInputElement
    const descriptionInput = screen.getByLabelText(
      'Descrição da ideia de software'
    ) as HTMLTextAreaElement

    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'john@example.com')
    await userEvent.type(descriptionInput, 'A great software idea')

    expect(nameInput.value).toBe('John Doe')
    expect(emailInput.value).toBe('john@example.com')
    expect(descriptionInput.value).toBe('A great software idea')
  })

  it('should open WhatsApp when the "Falar com um Especialista" button is clicked', async () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<Footer />)
    const button = screen.getByRole('button', { name: 'Falar com um Especialista' })
    await userEvent.click(button)

    await waitFor(() => {
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining('wa.me'),
        '_blank'
      )
    })

    windowOpenSpy.mockRestore()
  })
})
