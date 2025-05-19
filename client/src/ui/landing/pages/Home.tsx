import Accommodation from "../organisms/landingPage/Accommodation"
import Blogs from "../organisms/landingPage/Blogs"
import FindYouAtVenus from "../organisms/landingPage/FindYouAtVenus"
import Hero from "../organisms/landingPage/Hero"
import PlacesandSights from "../organisms/landingPage/PlacesandSights"
import Reviews from "../organisms/landingPage/Reviews"
import Tranquility from "../organisms/landingPage/Tranquility"

const Home = () => {
    return (
        <div >
            <Hero />
            <FindYouAtVenus />
            <Tranquility />
            <Accommodation />
            <PlacesandSights />
            <Reviews />
            <Blogs />
        </div>
    )
}

export default Home
