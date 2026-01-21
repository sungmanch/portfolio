import { Navigation } from '@/components/layout/Navigation'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Mission } from '@/components/sections/Mission'
import { Timeline } from '@/components/sections/Timeline'
import { Projects } from '@/components/sections/Projects'
import { Publications } from '@/components/sections/Publications'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Mission />
      <Timeline />
      <Projects />
      <Publications />
      <Contact />
    </main>
  )
}
