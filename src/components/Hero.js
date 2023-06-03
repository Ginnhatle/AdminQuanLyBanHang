import React from 'react';
import ImgHeader from '../img/zyro.png'
import {Link} from "react-router-dom";

const Hero = () => {
    return <section className={'h-[800px] bg-header bg-cover bg-no-repeat bg-center py-24'}>
        <div className="container mx-auto flex justify-around h-full">
            <div className={'flex flex-col justify-center'}>
                <div className={'font-semibold flex items-center uppercase'}>
                    <div className={'w-10 h-[2px] bg-red-500 mr-3'}></div>
                    New Trend
                </div>
                <h1 className={'text-[70px] leading-[1.1] font-light mb-4'}>
                    AUTUMN SLAE STYLISH<br/>
                    <span className={'font-semibold'}>WOMENS</span>
                </h1>
                <Link to={'/'} className={'self-start uppercase font-semibold border-b-2 border-primary'}>
                    Discover more
                </Link>
            </div>
            <div className={'hidden lg:block'}>
                <img src={ImgHeader} alt=""/>
            </div>
        </div>
    </section>;
};

export default Hero;
