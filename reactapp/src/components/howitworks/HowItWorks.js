import React from 'react';

const HowItWorks = () => {
    return (
        <div className='page-container'>
            <div className='about-header-container'>
                <h6 className='about-semi-header'>- what we're all -</h6>
                <h1 className='about-header'>ABOUT</h1>
            </div>
            <div className='content-card-container'>
                <div className='card-container'>
                    <div className='content-img'><img src="../../images/idea.png"></img></div>
                    <div className='content-header'>Background and Research</div>
                    <div className='content-descriptor'>
                        EcoMaps uses readily available emissions and fuel consumption data from Natural Resources Canada to create accurate ratings based on vehicle type. 
                        For simplicity, we've proken down the vehicles into three main catagories: cars, SUVs and trucks.
                        Alongside this, transit data gathered from multiple cities is combined and used to get the average ridership numbers for buses. 
                        This allows for accurate emissions values per rider, meaning a more accurate EcoScore. 
                        For walking on foot, the EcoScore depriciates with distance and time. 
                        Walking is emissions friendly, but long distances make it unrealistic, therefore resulting in a lower score.
                    </div>
                </div>
                <div className='card-container'>
                    <div className='content-img-reverse'><img src="../../images/api.png"></img></div>
                    <div className='content-header-reverse'>APIs and Technical Analysis </div>
                    <div className='content-descriptor'>
                        EcoMaps uses multiple map and geocode APIs to recieve and calculate location and distance data.
                        The Geocode API is used to get accurate Latitude and Longitude values from entered text strings. 
                        This location data can then be passed to the Bing Maps API where we recieve the distance and time values for multiple modes of transportation.
                        Google Maps API is used concurrently to provide the visual map and markers for displaying the origin and destination points.
                    </div>
                </div>
                <div className='card-container'>
                     <div className='content-img'><img src="../../images/mission.png"></img></div>
                    <div className='content-header'>Our Mission</div>
                    <div className='content-descriptor'>
                        EcoMaps wants to give commutors the opportunity to make smart and eco-friendly decisions when it comes to transportation. 
                        Providing the data in a simple but relevant way allows commutors and transit users to make more informed decisions about the way they travel. 
                        We hope to expand our service to have a greater, greener impact on the daily life of everyone.
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
