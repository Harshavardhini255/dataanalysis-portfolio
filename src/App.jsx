import { AppProvider } from './lib/AppContext'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Menu from './components/Menu'
import ChatWidget from './components/ChatWidget'
import { Marquee } from './components/primitives'
import Hero from './sections/Hero'
import Works from './sections/Works'
import About from './sections/About'
import Capabilities from './sections/Capabilities'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Journal from './sections/Journal'
import Contact from './sections/Contact'

function App() {
  return (
    <AppProvider>
      <Cursor />
      <Loader />
      <Nav />
      <Menu />
      <main className="relative z-10">
        <Hero />
        <Marquee
          items={['Data Analytics', 'Business Intelligence', 'Python', 'SQL', 'Power BI', 'AI-Driven Analytics']}
          duration={34}
          className="border-y border-line py-5 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl"
        />
        <Works />
        <About />
        <Capabilities />
        <Skills />
        <Experience />
        <Journal />
        <Contact />
      </main>
      <ChatWidget />
      <div className="noise pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />
    </AppProvider>
  )
}

export default App