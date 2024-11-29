import {Hero,Fact1,Choose,Secure,Procedure,Fact2,Values,AboutUs} from '../Sections';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Home(){

    return(
        <div>
            <Navbar/>
            <Hero/>
            <Choose/>
            <Fact1/>
            <Secure/>
            <Procedure/>
            <Fact2/>
            <AboutUs/>
            <Values/>
            <Footer/>
        </div>
    );
}

export default Home;