import useScrollWhenHashChange from '@/hooks/useScrollWhenHashChange'
import Welcome from './_components/Welcome'
import AboutUs from './_components/AboutUs'
import OurTeam from './_components/OurTeam'
import References from './_components/References'
function Home() {
  useScrollWhenHashChange()

  return (
    <div>
      <Welcome className="mt-16" />
      <div className="mt-16 mb-9 md:h-125 h-213" id="about-us">
        <AboutUs />
      </div>
      <div className="h-525 sm:h-288 md:h-288" id="our-team">
        <OurTeam />
      </div>
      <div className="mt-8 sm:h-200 md:h-143 h-225" id="references">
        <References />
      </div>
    </div>
  )
}

export default Home
