//API




var clientId = 'AOLPRU3ZNR3O0E3WNSMHLPRMCMIEFC14D4Z4RG23V5UVC5YV';
var clientSecret = 'CU2VGYPCB3YLY30GRAELDK2032NDYVIUNLPXRR5NTPVPK2R4';
var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=+20190801';



// console.log(venuesURL);

// get list of venues

function loadVenues(){

var latlong = '-36.856855,174.764460';
var venuesURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll='+latlong;

fetch(venuesURL)
    .then(res=>res.json())
    .then((data)=>{
        return data.response.groups[0].items
    })
    .then( (data)=>{
        return data.map( (item)=>{
            // console.log(item)
            var venue = {
                id:item.venue.id,
                name:item.venue.name,
                address:item.venue.location.address,
                categories:item.venue.categories[0].shortName
            };
            return venue;

        });
    })
    .then( (data)=>{
        console.log(data)
    })
}
loadVenues();
// get list of 1 venue

function loadVenue(venueId){

    var venueURL = 'https://api.foursquare.com/v2/venues/'+venueId+key;



    fetch(venueURL)
        .then(res=>res.json())
        .then((data)=>{
            var item = data.response.venue;
            var venue = {
                name:item.name,
                description:item.description,
                category:item.categories[0].shortName,
                address:item.location.formattedAddress,
                photo:item.bestPhoto.prefix + '300x300'+ item.bestPhoto.suffix
            }

            console.log(venue);
        })
}
var id ='4b72691bf964a520287a2de3';
loadVenue(id);