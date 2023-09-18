import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './Footer.css';
const Footer = () => {
  return (
    <footer id="footer">
        <div className='leftFooter'>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and ios mobile phone.</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="appstore" />
        </div>
        <div className='midFooter'>
            <h1>Cartify</h1>
            <p>High Quality is our first priroty. </p>
            <p>Copyrigths 2023 &copy; SunnyTomar</p>
        </div>

        <div className='rightFooter'>
            <h4>Follow us</h4>
            <a href="https://www.facebook.com/sunny.tomar.549221" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i>facebook</a>
            <a href="https://www.instagram.com/sunnytomar_/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i>instagram</a>
            <a href="https://www.linkedin.com/in/sunnytomar/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i>linkedin</a>
        </div>
            
    </footer>
  )
}

export default Footer