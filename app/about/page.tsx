import AboutHero from "@/components/about-hero"
import AboutMission from "@/components/about-mission"
import AboutProcess from "@/components/about-process"
import AboutTeam from "@/components/about-team"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AboutHero />
        <div className="mx-5">
        <AboutMission />
        </div>
        <AboutProcess />
        {/* <div className="mx-5">
        <AboutTeam />
        </div> */}
      </main>
      <Footer />
    </div>
  )
}
