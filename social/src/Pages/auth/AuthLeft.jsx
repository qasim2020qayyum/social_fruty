import React from 'react'
import logo from '../../assets/imgs/logo.svg'
const AuthLeft = () => {
  return (
    <div className="col-md-5 login_screen_left">
            <div className=''>
              <footer className="login_left_footer">
                <div className='login_left_footer_img'>

                <img  src={logo} alt="" srcset="" />
                </div>
                <div>
                <p className='login_footer_heading'>Together We Grow, Field by Field</p>
                <p className='login_footer_text'>Trusted by the the E-Network Pvt, ltd. Copyrights Reserved @ 2024 <span id="year-copy" /> ©{" "}
                  <a href="https://fruitsauction.com/" target="_blank">
                    Fruity Chat
                  </a></p>
                
                </div>
              </footer>
            </div>
          </div>
  )
}

export default AuthLeft
