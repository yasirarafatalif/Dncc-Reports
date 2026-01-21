import React from 'react';
import HowItWork from '../HowItWork';
import Slider from './Slider';
import OurTeam from './OurTeam';
import FeutureSection from './FeutureSection';
import UserRoleSection from './UserRoleSection';
import LatestResloved from './LatestResloved';
import PremiumSection from './PremiumSection';
import PopularIssues from './PopularIssues';
import Testimonials from './Testimonials';
import CTASection from './CTASection';
import LiveCityStats from './LiveCityStats';


const Home = () => {
    return (
        <div>
            <title>Home</title>
            
             <Slider></Slider>

             <LiveCityStats></LiveCityStats>


             <LatestResloved></LatestResloved>
              <PopularIssues></PopularIssues>
             <HowItWork></HowItWork>

             <FeutureSection></FeutureSection>

             <PremiumSection></PremiumSection>

            
             
             
             <UserRoleSection></UserRoleSection>

             <OurTeam></OurTeam>
              
             
             <CTASection></CTASection>
             <Testimonials></Testimonials>

             

            
            
        </div>
    );
};

export default Home;