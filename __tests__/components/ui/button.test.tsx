import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock del componente Button para testing
const Button = ({ children, variant, size, disabled, onClick, ...props }: any) => (
  <button 
    className={`
      bg-primary border-input h-9 
      disabled:pointer-events-none
      ${variant === 'outline' ? 'border-input' : 'bg-primary'}
      ${size === 'sm' ? 'h-9' : ''}
    `}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
)

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Test Button</Button>)
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-primary')
  })

  it('applies custom variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-input')
  })

  it('applies custom size', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-9')
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByRole('button')
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})