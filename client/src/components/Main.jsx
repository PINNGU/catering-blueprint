import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import "./Main.css"
import Reviews from "./Reviews.jsx"
import Description from "./Description.jsx"
import Showcase from "./Showcase.jsx"
import About from "./About.jsx"
import Gallery from "./Gallery.jsx"

function Main(){
    
    return (
        <div class ="main">

            <div className='compartment' id="one">
                  <div className='background'>
                      <div className='overlay'></div>
                        <div className="content">
                          <header className='main-title-site'>
                            <h2>gotova hrana</h2>
                            <h1>SAVRŠEN ZALOGAJ</h1>
                          </header>
                          <Reviews></Reviews>
                        
                        </div>
                  </div>
      
    
            </div>


            <div className='compartment' id ="two">
              <div className="background">
                  <div className='overlay'></div>
                          <div className="content">
                            <div className='grid'>
                              <div></div>
                              <Description></Description>
                              <div></div>
                              <Showcase></Showcase>
                              <div></div>
                              
                            </div>
                            
                            
                          </div>
              </div>

            </div>

            <div className='compartment' id ="three">
                  <div className="background">
                    <div className='overlay'></div>
                          <div className="content">
                                <div className='grid-two'>
                                    <div></div>
                                    <About></About>
                                    <div></div>
                                    <Gallery></Gallery>
                                    <div></div>
                                  
                                </div>
                                
                            
                          </div>
                  </div>
            </div>  
        </div>
    );
};

export default Main;