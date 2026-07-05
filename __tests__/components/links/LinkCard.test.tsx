import { render, screen } from '@testing-library/react'
import LinkCard from '@/components/links/LinkCard'

describe('LinkCard', () => {
  const defaultProps = {
    name: 'Instagram',
    href: 'https://instagram.com/saithsfuff',
    icon: '/images/links/instagram.png',
  }

  describe('anchor element attributes', () => {
    it('renders an anchor with the correct href', () => {
      render(<LinkCard {...defaultProps} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://instagram.com/saithsfuff')
    })

    it('opens in a new tab with target="_blank"', () => {
      render(<LinkCard {...defaultProps} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('includes rel="noopener noreferrer" for security', () => {
      render(<LinkCard {...defaultProps} />)
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('name display and truncation', () => {
    it('displays the name text', () => {
      render(<LinkCard {...defaultProps} />)
      expect(screen.getByText('Instagram')).toBeInTheDocument()
    })

    it('applies display classes to the name element', () => {
      render(<LinkCard {...defaultProps} />)
      const nameEl = screen.getByText('Instagram')
      expect(nameEl).toHaveClass('font-display')
      expect(nameEl).toHaveClass('text-center')
    })
  })

  describe('description rendering', () => {
    it('renders description text when provided', () => {
      render(<LinkCard {...defaultProps} description="Invite your friends!" />)
      expect(screen.getByText('Invite your friends!')).toBeInTheDocument()
    })

    it('does not render description element when description is absent', () => {
      render(<LinkCard {...defaultProps} />)
      // Only the name text, the sr-only text, and the icon should be rendered
      // No description element should exist
      expect(screen.queryByText('Invite your friends!')).not.toBeInTheDocument()
    })

    it('applies line-clamp-2 to the description for truncation', () => {
      render(
        <LinkCard
          {...defaultProps}
          description="Use code 'SAITHSFUFF' for 15% off every month at Kinetic Hosting!"
        />
      )
      const descEl = screen.getByText(
        "Use code 'SAITHSFUFF' for 15% off every month at Kinetic Hosting!"
      )
      expect(descEl).toHaveClass('line-clamp-2')
    })
  })

  describe('accessibility', () => {
    it('includes visually-hidden "(opens in new tab)" text', () => {
      render(<LinkCard {...defaultProps} />)
      const srText = screen.getByText('(opens in new tab)')
      expect(srText).toBeInTheDocument()
      expect(srText).toHaveClass('sr-only')
    })
  })

  describe('focus indicator', () => {
    it('applies focus-visible ring classes to the anchor', () => {
      render(<LinkCard {...defaultProps} />)
      const link = screen.getByRole('link')
      expect(link).toHaveClass('focus-visible:ring-2')
      expect(link).toHaveClass('focus-visible:ring-pink-400')
    })
  })
})
