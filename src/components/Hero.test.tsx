import { describe, it, expect, vi, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from './Hero'
import { useIsMobile } from '../hooks/useIsMobile'

vi.mock('../hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(),
}))

vi.mock('../hooks/useSmoothScroll', () => ({
  useSmoothScroll: () => ({
    smoothScrollTo: vi.fn(),
    scrollToSection: vi.fn(),
  }),
}))

describe('Hero Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render the Hero component', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Hero />)
    expect(screen.getByText('Hopion')).toBeInTheDocument()
  })

  it('should render the subtitle text', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Hero />)
    expect(screen.getByText(/Criamos soluções digitais sob medida/i)).toBeInTheDocument()
  })

  it('should render the CTA buttons', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Hero />)
    expect(screen.getByRole('button', { name: 'Solicitar Orçamento' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Falar com um Especialista' })).toBeInTheDocument()
  })

  it('should open WhatsApp when buttons are clicked', async () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<Hero />)
    const solicitarButton = screen.getByRole('button', { name: 'Solicitar Orçamento' })
    const especialistaButton = screen.getByRole('button', { name: 'Falar com um Especialista' })
    
    await userEvent.click(solicitarButton)
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank'
    )

    await userEvent.click(especialistaButton)
    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank'
    )

    windowOpenSpy.mockRestore()
  })
})
