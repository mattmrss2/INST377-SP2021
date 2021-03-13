function mapInit() {

  let mymap = L.map('mapid').setView([51.505, -0.09], 13);
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWF0dG1yc3MiLCJhIjoiY2ttNXF5bW44MGgyYTJ2cWxvdWs4NTdpeSJ9.w3Sk1_8cEyz5pHbP7ASBVQ'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  const request = await fetch(endpoint)
  const restaurants = await request.json()
  console.log(restaurants)
  function findMatches(ZipToMatch, restaurants){
   return restaurants.filter(place => {
     const regex = new RegExp(ZipToMatch, 'gi')
     return place.zip.match(regex)
    });
  }
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;