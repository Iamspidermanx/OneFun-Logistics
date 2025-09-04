import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Hero.jsx'
import About from './About.jsx'
import Courier from './Courier.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <About />
    <Courier />
    <Contact />
    <Footer />
  </StrictMode>,
)
