import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input Component', () => {
  it('should render input with label', () => {
    render(
      <Input label="Nome" />
    )

    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  })

  it('should render text input by default', () => {
    render(
      <Input label="Nome" />
    )

    const input = screen.getByLabelText('Nome')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should render email input when type is email', () => {
    render(
      <Input label="E-mail" type="email" />
    )

    const input = screen.getByLabelText('E-mail')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('should render textarea when type is textarea', () => {
    render(
      <Input label="Descrição" type="textarea" />
    )

    const textarea = screen.getByLabelText('Descrição')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('should apply default classes correctly', () => {
    render(
      <Input label="Nome" />
    )

    const input = screen.getByLabelText('Nome')
    expect(input).toHaveClass('w-full', 'px-4', 'py-2', 'rounded-2xl', 'border', 'bg-text-default', 'text-base', 'font-normal', 'focus:outline-none', 'focus:ring-2', 'focus:border-transparent')
  })

  it('should apply custom className', () => {
    render(
      <Input label="Nome" className="custom-class" />
    )

    const input = screen.getByLabelText('Nome')
    expect(input).toHaveClass('custom-class')
  })

  it('should display placeholder', () => {
    render(
      <Input label="Nome" placeholder="Digite seu nome" />
    )

    const input = screen.getByLabelText('Nome')
    expect(input).toHaveAttribute('placeholder', 'Digite seu nome')
  })

  it('should display value', () => {
    render(
      <Input label="Nome" value="João" onChange={() => {}} />
    )

    const input = screen.getByLabelText('Nome') as HTMLInputElement
    expect(input.value).toBe('João')
  })

  it('should call onChange when input value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Input label="Nome" onChange={handleChange} />
    )

    const input = screen.getByLabelText('Nome')
    await user.type(input, 'João')

    expect(handleChange).toHaveBeenCalled()
  })

  it('should have name attribute', () => {
    render(
      <Input label="Nome" name="nome" />
    )

    const input = screen.getByLabelText('Nome')
    expect(input).toHaveAttribute('name', 'nome')
  })

  it('should set textarea rows when type is textarea', () => {
    render(
      <Input label="Descrição" type="textarea" rows={6} />
    )

    const textarea = screen.getByLabelText('Descrição') as HTMLTextAreaElement
    expect(textarea.rows).toBe(6)
  })

  it('should use default rows for textarea when not specified', () => {
    render(
      <Input label="Descrição" type="textarea" />
    )

    const textarea = screen.getByLabelText('Descrição') as HTMLTextAreaElement
    expect(textarea.rows).toBe(4)
  })
})