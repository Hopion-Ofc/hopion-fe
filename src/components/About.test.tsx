import { describe, it, expect, vi, afterEach } from 'vitest'
import type { Mock } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import About from './About'
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

describe('About Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should render the About component', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByText('Sobre a Hopion')).toBeInTheDocument()
  })

  it('should render the main description', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByText(/A Hopion nasceu com um propósito simples/i)).toBeInTheDocument()
  })

  it('should render contact button', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByRole('button', { name: 'Entrar em contato' })).toBeInTheDocument()
  })

  it('should render all service tabs in desktop', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByText('Landing Pages')).toBeInTheDocument()
    expect(screen.getByText('Sistemas e Aplicações Web')).toBeInTheDocument()
    expect(screen.getByText('Integrações e Automações')).toBeInTheDocument()
    expect(screen.getByText('Consultoria Técnica')).toBeInTheDocument()
  })

  it('should render navigation arrows in mobile', () => {
    ;(useIsMobile as Mock).mockReturnValue(true)
    const { container } = render(<About />)
    const arrows = container.querySelectorAll('svg')
    expect(arrows.length).toBeGreaterThan(0)
  })

  it('should change active tab when clicked', async () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    
    const sistemasTab = screen.getAllByText('Sistemas e Aplicações Web')[0]
    await userEvent.click(sistemasTab)
    
    expect(screen.getAllByText('Sistemas e Aplicações Web').length).toBeGreaterThan(0)
  })

  it('should render service cards', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByText('Landing Pages Otimizadas')).toBeInTheDocument()
    expect(screen.getByText('SEO & Identidade Visual')).toBeInTheDocument()
  })

  it('should render three info cards', () => {
    ;(useIsMobile as Mock).mockReturnValue(false)
    render(<About />)
    expect(screen.getByText('Somos apaixonados por transformar ideias em projetos reais.')).toBeInTheDocument()
    expect(screen.getByText('Tecnologia que entrega')).toBeInTheDocument()
    expect(screen.getByText('Feito para você')).toBeInTheDocument()
  })
})
