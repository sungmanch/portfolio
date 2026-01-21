'use client'

import { useState, useEffect, useCallback, RefObject } from 'react'

interface ScrollProgressOptions {
  threshold?: number
  offset?: number
}

export function useScrollProgress(
  ref: RefObject<HTMLElement>,
  options: ScrollProgressOptions = {}
) {
  const { threshold = 0, offset = 0 } = options
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const calculateProgress = useCallback(() => {
    if (!ref.current) return

    const element = ref.current
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // Calculate how much of the element has been scrolled through
    const scrollStart = windowHeight - offset
    const scrollEnd = -elementHeight + offset

    const currentPosition = rect.top
    const totalScrollDistance = scrollStart - scrollEnd

    // Progress from 0 to 1 as element scrolls through viewport
    const rawProgress = (scrollStart - currentPosition) / totalScrollDistance
    const clampedProgress = Math.max(0, Math.min(1, rawProgress))

    setProgress(clampedProgress)
    setIsInView(rect.top < windowHeight - threshold && rect.bottom > threshold)
  }, [ref, threshold, offset])

  useEffect(() => {
    calculateProgress()
    window.addEventListener('scroll', calculateProgress, { passive: true })
    window.addEventListener('resize', calculateProgress)

    return () => {
      window.removeEventListener('scroll', calculateProgress)
      window.removeEventListener('resize', calculateProgress)
    }
  }, [calculateProgress])

  return { progress, isInView }
}

export function useElementInView(
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}

export function useWindowScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up')
      setLastScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return { scrollY, scrollDirection }
}
