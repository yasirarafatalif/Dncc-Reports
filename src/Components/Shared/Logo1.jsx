import React from 'react';
import logoImg from '../../../public/logodemo.png'

const Logo1 = () => {
    return (
        <div>

            <div className='flex justify-center items-center'>



                <div>
                    <img
                        className='w-[70px] h-[60px]'
                        src={logoImg} alt="" srcset="" />
                </div>
                <div  className='mt-3'>

                    <span className="text-[#475669]  text-3xl font-bold font-[Poppins]">
                        agorikSheba
                    </span>
                </div>


            </div>



        </div>
    );
};

export default Logo1;