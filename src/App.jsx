import StaticTop from './components/StaticTop.jsx'
import StaticBottom from './components/StaticBottom.jsx'
import Home from './components/Home.jsx'
import MarqueeBanner from './components/MarqueeBanner.jsx'
import About from './components/About.jsx'
import Features from './components/Features.jsx'
import Compartments from './components/Compartments.jsx'
import Pricing from './components/Pricing.jsx'
import WhyUs from './components/WhyUs.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import StudyTime from './components/StudyTime.jsx'
import Rules from './components/Rules.jsx'
import Booking from './components/Booking.jsx'
// import FaqContainer from './components/FaqContainer.jsx'
import QuickCTA from './components/QuickCTA.jsx'
import OwnerDetails from './components/OwnerDetails.jsx'
// import Maps from './components/Maps.jsx'

function App() {
  return (
    <>
      <StaticTop />
      <Home />
      <MarqueeBanner/>
      <About />
      <Features />
      {/* <Compartments /> */}
      <Pricing />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <StudyTime />
      <Rules />
      <Booking />
      <OwnerDetails/>
      {/* <Maps /> */}
      {/* <FaqContainer /> */}
      <QuickCTA />
      <StaticBottom />
    </>
  )
}

export default App