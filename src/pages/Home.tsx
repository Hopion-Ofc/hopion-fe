import Hero from '../components/Hero'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-bg">
      <Hero />
      <div className="py-16 px-8">
        <Footer />
      </div>
    </div>
  )
}

export default Home
