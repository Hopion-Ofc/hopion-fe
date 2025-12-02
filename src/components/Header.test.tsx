import { describe, it, expect, vi, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'
import { useIsMobile } from '../hooks/useIsMobile'

vi.mock('../hooks/useIsMobile', () => ({
  useIsMobile: vi.fn(),
}))

describe('Header Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render the Header component', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Header />)
    expect(screen.getByAltText('Hopion Logo')).toBeInTheDocument()
  })

  it('should render desktop menu when not mobile', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<Header />)
    expect(screen.getByText('Página inicial')).toBeInTheDocument()
    expect(screen.getByText('Sobre nós')).toBeInTheDocument()
    expect(screen.getByText('Serviços')).toBeInTheDocument()
    expect(screen.getByText('Contato')).toBeInTheDocument()
  })

  it('should render mobile menu button when mobile', () => {
    ;(useIsMobile as Mock).mockReturnValue(true)
    render(<Header />)
    const menuButton = screen.getByRole('img', { name: 'Hopion Logo' })
    expect(menuButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when button is clicked', async () => {
    ;(useIsMobile as Mock).mockReturnValue(true)
    const { container } = render(<Header />)
    const menuButton = container.querySelector('.cursor-pointer svg')
    
    expect(menuButton).toBeInTheDocument()
    
    if (menuButton?.parentElement) {
      await userEvent.click(menuButton.parentElement)
      expect(screen.getByText('Página inicial')).toBeInTheDocument()
      
      await userEvent.click(menuButton.parentElement)
      
      await waitFor(() => {
        expect(screen.queryByText('Página inicial')).not.toBeInTheDocument()
      }, { timeout: 200 })
    }
  })
})
