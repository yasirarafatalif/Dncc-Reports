import React from 'react';
import HowItWork from '../HowItWork';
import Slider from './Slider';
import OurTeam from './OurTeam';
import FeutureSection from './FeutureSection';
import UserRoleSection from './UserRoleSection';
import LatestResloved from './LatestResloved';


const Home = () => {
    return (
        <div>
            
             <Slider></Slider>
             <LatestResloved></LatestResloved>
             <FeutureSection></FeutureSection>
             <UserRoleSection></UserRoleSection>

             <OurTeam></OurTeam>

             

             <HowItWork></HowItWork>
            
        </div>
    );
};

export default Home;