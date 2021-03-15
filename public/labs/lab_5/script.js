// const { filter } = require("cypress/types/bluebird");

function mapInit() {

  let mymap = L.map('mapid').setView([38.9897, -76.9378], 13);
  
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
  // // use your assignment 1 data handling code here
  // const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  // const request = await fetch(endpoint)
  // const restaurants = await request.json()
  // console.log(restaurants)
  // function findMatches(ZipToMatch, restaurants){
  //  return restaurants.filter(place => {
  //    const regex = new RegExp(ZipToMatch, 'gi')
  //    return place.zip.match(regex)
  //   });
  // }

    const form = document.querySelector(".search-form");
    const search = document.querySelector("#search");
    const list = document.querySelector(".results")
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    const request = await fetch(endpoint);
    const data = await request.json();

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
      const firstFive = filtered.slice(0,5)
      console.log(search.value)
      list.innerHTML = ""

      if (search.value.length < 1) {
        console.log(search)
        list.innerHTML = ""
      } else {
      firstFive.forEach((item) => {
        const longLat = item.geocoded_column_1.coordinates;
        const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction).bindPopup(`<div class="list-header is-size-5 is-capitalized">${item.name.toLowerCase()}</div><address class="is-size-6">${item.address_line_1}</address><div class="is-capitalized is-size-6">${item.zip}</div>`).openPopup();

        const appendItem = document.createElement('li');
        appendItem.classList.add('block');
        appendItem.classList.add('list-item');
        appendItem.classList.add('result')
        appendItem.innerHTML = `<div class="list-header is-size-5 is-capitalized">${item.name.toLowerCase()}</div><address class="is-size-6">${item.address_line_1}</address><div class="is-capitalized is-size-6">${item.zip}</div>`;
        list.append(appendItem);
        // console.log(firstFive[0].geocoded_column_1.coordinates[1], firstFive[0].geocoded_column_1.coordinates[0])
        mapObjectFromFunction.setView([firstFive[0].geocoded_column_1.coordinates[1], firstFive[0].geocoded_column_1.coordinates[0]])
      
      });
    }
    });
  
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;