'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWindowScroll } from '@/hooks/useScrollProgress'
import Link from 'next/link'

interface NavItem {
  id: string
  label: string
  href?: string // For page links (like /cosmos)
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'timeline', label: 'Journey' },
  { id: 'cosmos', label: 'Cosmos', href: '/cosmos' },
  { id: 'memories', label: 'Memories' },
  { id: 'contact', label: 'Contact' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY, scrollDirection } = useWindowScroll()

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach(({ id, href }) => {
      // Only observe sections (not page links)
      if (!href) {
        const element = document.getElementById(id)
        if (element) observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  const showNav = scrollY < 100 || scrollDirection === 'up'

  return (
    <>
      {/* Desktop Navigation - Fixed sidebar dots */}
      <motion.nav
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: showNav ? 1 : 0, x: showNav ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map(({ id, label, href }) => {
          // Page link (like Cosmos)
          if (href) {
            return (
              <Link
                key={id}
                href={href}
                className="group flex items-center gap-3"
                aria-label={`Navigate to ${label}`}
              >
                <span className="text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right text-star-dim group-hover:text-nova">
                  {label}
                </span>
                <span className="w-3 h-3 rounded-full border-2 transition-all duration-300 bg-transparent border-pulsar group-hover:border-nova group-hover:bg-nova/20 scale-75 group-hover:scale-100" />
              </Link>
            )
          }

          // Section anchor
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group flex items-center gap-3"
              aria-label={`Navigate to ${label}`}
            >
              <span
                className={`
                  text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 text-right
                  ${activeSection === id ? 'text-nova' : 'text-star-dim'}
                `}
              >
                {label}
              </span>
              <span
                className={`
                  w-3 h-3 rounded-full border-2 transition-all duration-300
                  ${activeSection === id
                    ? 'bg-nova border-nova scale-100'
                    : 'bg-transparent border-star-dim group-hover:border-nova scale-75 group-hover:scale-100'
                  }
                `}
              />
            </button>
          )
        })}
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 lg:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-nebula/80 backdrop-blur-sm border border-cosmos flex items-center justify-center"
          aria-label="Toggle navigation"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              className="w-5 h-0.5 bg-star-bright block"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-star-bright block"
              animate={{ opacity: isOpen ? 0 : 1 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-star-bright block"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
            />
          </div>
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-void/95 backdrop-blur-lg" />
            <nav className="relative h-full flex items-center justify-center px-6">
              <ul className="space-y-5 sm:space-y-6 text-center">
                {navItems.map(({ id, label, href }, index) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {href ? (
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl sm:text-2xl font-display transition-colors duration-300 text-pulsar hover:text-nova"
                      >
                        {label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`
                          text-xl sm:text-2xl font-display transition-colors duration-300
                          ${activeSection === id ? 'text-nova' : 'text-star-bright hover:text-nova'}
                        `}
                      >
                        {label}
                      </button>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
