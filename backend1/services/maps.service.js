// const axios = require('axios');

// module.exports.getAddressCoordinate = async (address) => {
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             const location = response.data.results[ 0 ].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     } 
// }


// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {


//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {

//             if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             return response.data.rows[ 0 ].elements[ 0 ];
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }

//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }


// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             return response.data.predictions.map(prediction => prediction.description).filter(value => value);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }




// ................................................



// const axios = require('axios');

// module.exports.getAddressCoordinate = async (address) => {
//     const apiKey = process.env.ORS_API_KEY;
//     const url = 'https://api.openrouteservice.org/geocode/search';

//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 'Authorization': apiKey,
//             },
//             params: {
//                 text: address,
//                 size: 1
//             }
//         });

//         const features = response.data.features;

//         if (features && features.length > 0) {
//             const coords = features[0].geometry.coordinates;
//             return {
//                 lng: coords[0],
//                 ltd: coords[1]
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }




const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const url = 'https://nominatim.openstreetmap.org/search';

    try {
        const response = await axios.get(url, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'YourAppName/1.0 (your@email.com)' // Required by Nominatim usage policy
            }
        });

        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
            const location = data[0];
            return {
                lng: parseFloat(location.lon),
                ltd: parseFloat(location.lat)
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
















// by this code we get human redable distance and time   and this will based on ors(open routing system)

// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     // Helper: Convert seconds to readable time
//     const formatDuration = (seconds) => {
//         const days = Math.floor(seconds / (24 * 3600));
//         seconds %= (24 * 3600);
//         const hours = Math.floor(seconds / 3600);
//         seconds %= 3600;
//         const minutes = Math.floor(seconds / 60);

//         let result = '';
//         if (days > 0) result += `${days} day${days > 1 ? 's' : ''} `;
//         if (hours > 0) result += `${hours} hr${hours > 1 ? 's' : ''} `;
//         if (minutes > 0) result += `${minutes} min${minutes > 1 ? 's' : ''}`;

//         return result.trim();
//     };

//     // Helper: Convert meters to readable km
//     const formatDistance = (meters) => {
//         return `${(meters / 1000).toFixed(2)} km`;
//     };

//     // Helper to get coordinates from address
//     async function getCoordinates(address) {
//         const geoUrl = `https://api.openrouteservice.org/geocode/search?api_key=${process.env.ORS_API_KEY}&text=${encodeURIComponent(address)}`;
//         const response = await axios.get(geoUrl);
//         const features = response.data.features;

//         if (!features.length) {
//             throw new Error('No coordinates found');
//         }

//         const [lng, lat] = features[0].geometry.coordinates;
//         return { lat, lng };
//     }

//     try {
//         const originCoords = await getCoordinates(origin);
//         const destinationCoords = await getCoordinates(destination);

//         const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
//         const requestBody = {
//             coordinates: [
//                 [originCoords.lng, originCoords.lat],
//                 [destinationCoords.lng, destinationCoords.lat]
//             ]
//         };

//         const response = await axios.post(url, requestBody, {
//             headers: {
//                 'Authorization': process.env.ORS_API_KEY,
//                 'Content-Type': 'application/json'
//             }
//         });

//         const data = response.data;

//         if (!data.routes || !data.routes.length) {
//             throw new Error('No routes found');
//         }

//         const result = data.routes[0].summary;

//         // 🔥 Only this return part changed
//         return {
//             distance: formatDistance(result.distance),
//             duration: formatDuration(result.duration)
//         };

//     } catch (err) {
//         console.error(err);
//         throw err;
   
//     } 
// };
  





// another method for best suggetion by nominatim software of map api 
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // 🧭 Helper function to get coordinates from address using Nominatim
    async function getCoordinates(address) {
        const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

        const response = await axios.get(geoUrl, {
            headers: {
                'User-Agent': 'YourAppName/1.0 (your@email.com)'  // Required by Nominatim TOS
            }
        });

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error(`No coordinates found for address: ${address}`);
        }

        return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
        };
    }

    try {
        // 1. Get coordinates
        const originCoords = await getCoordinates(origin);
        const destinationCoords = await getCoordinates(destination);

        // 2. Request route from OpenRouteService or Mapbox (still using ORS here)
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
        const requestBody = {
            coordinates: [
                [originCoords.lng, originCoords.lat],
                [destinationCoords.lng, destinationCoords.lat]
            ]
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                'Authorization': process.env.ORS_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;

        if (!data.routes || !data.routes.length) {
            throw new Error('No routes found');
        }

        const summary = data.routes[0].summary;

        // 3. Convert duration to readable format
        const seconds = summary.duration;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        let durationText = '';
        if (hours > 0) durationText += `${hours} hr `;
        if (minutes > 0) durationText += `${minutes} min`;

        return {
            distance_meters: summary.distance,
            duration_seconds: summary.duration,
            duration_text: durationText.trim()
        };

    } catch (err) {
        console.error(err);
        throw err;
    }
};





// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.ORS_API_KEY;
//     const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(input)}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data && response.data.features.length > 0) {
//             return response.data.features
//                 .map(feature => feature.properties.label)
//                 .filter(value => value);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// };








// another method for best suggetion by nominatim software of map api 

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
      throw new Error('Query is required');
    }
  
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'YourAppName (your@email.com)'
        }
      });
  
      return response.data.map(item => ({
        value: item.display_name,
        terms: Object.values(item.address), // rough equivalent to Google `terms`
        lat: item.lat,
        lon: item.lon,
        type: item.type
      }));
    } catch (err) {
      console.error(err);
      throw new Error('Failed to fetch suggestions');
    }
  };
  


  