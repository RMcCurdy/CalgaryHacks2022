# EcoMaps
Group 12 Soup Time submission for CalgaryHacks22

# Our Mission
EcoMaps wants to give commutors the opportunity to make smart and eco-friendly decisions when it comes to transportation. Providing the data in a simple but relevant way allows commutors and transit users to make more informed decisions about the way they travel. We hope to expand our service to have a greater, greener impact on the daily life of everyone.

# Background and Research
EcoMaps uses readily available emissions and fuel consumption data from Natural Resources Canada to create accurate ratings based on vehicle type. For simplicity, we've proken down the vehicles into three main catagories: cars, SUVs and trucks. Alongside this, transit data gathered from multiple cities is combined and used to get the average ridership numbers for buses. This allows for accurate emissions values per rider, meaning a more accurate EcoScore. For walking on foot, the EcoScore depriciates with distance and time. Walking is emissions friendly, but long distances make it unrealistic, therefore resulting in a lower score.

# APIs and Technical Analysis
EcoMaps uses multiple map and geocode APIs to recieve and calculate location and distance data. The Geocode API is used to get accurate Latitude and Longitude values from entered text strings. This location data can then be passed to the Bing Maps API where we recieve the distance and time values for multiple modes of transportation. Google Maps API is used concurrently to provide the visual map and markers for displaying the origin and destination points.
