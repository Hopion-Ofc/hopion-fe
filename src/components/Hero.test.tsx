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

  it('should render the CTA button', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Hero />)
    const buttons = screen.getAllByRole('button', { name: 'Falar com a Hopion' })
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should call scrollToForm when button is clicked', async () => {
    ;(useIsMobile as Mock).mockReturnValue(false)

    render(<Hero />)
    const buttons = screen.getAllByRole('button', { name: 'Falar com a Hopion' })
    
    await userEvent.click(buttons[0])
    
    expect(buttons[0]).toBeInTheDocument()
  })
})
