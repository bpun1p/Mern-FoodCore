import React from 'react'
import blacklogo from '../../assets/logo/logo-black.svg'
import {Link} from 'react-router-dom';

export default function AboutMe() {
    return (
    <>
        <div className='aboutme'>
            <Link to='/'>
                <img src={blacklogo} className='aboutme__logo' alt='foodcore logo'/>
            </Link>
            <h1 className='aboutme__name'>Barry Pun</h1>
            <h2>Email:</h2>
            <h4> barry_pun@hotmail.com</h4>
            <h2>Github:</h2>
            <h4> https://github.com/bpun1p</h4>
            <h2>LinkedIn:</h2> 
            <h4>https://www.linkedin.com/in/barry-pun-8b23451a3/</h4>
        </div>
    </>
    );
};
