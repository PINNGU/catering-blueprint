import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Main.css"
import MenuCard from './MenuCard'

function Main(){
    
    return (
        <div class ="main">

            <div className='compartment' id="one">
                  <div className='background'>
                      <div className='overlay'></div>
                        <div className="content">
                          <header className='main-title-site'>
                            <h2>TIP BIZNISA/KETERINGA</h2>
                            <h1>VELIKO IME BIZNISA/KET</h1>
                          </header>
                        
                        </div>
                  </div>
      
    
            </div>


            <div className='compartment' id ="two">
              <div className="background">
                  <div className='overlay'></div>
                          <div className="content">
                            
                          </div>
              </div>

            </div>
          <div className='compartment' id ="three">

          </div>  
        </div>
    );
};

export default Main;