import React from 'react';
import Navbar from './../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './../Components/Footer/Footer';

const MainLayOut = () => {
    return (
        <div>
            <Navbar>

            </Navbar>

            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default MainLayOut;