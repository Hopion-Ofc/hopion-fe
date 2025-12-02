import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <Hero />
      <About />
        <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Home
