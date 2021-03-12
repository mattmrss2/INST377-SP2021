<<<<<<< HEAD

async function windowActions() {

    const form = document.querySelector(".userform");
    const search = document.querySelector("#search");
    const list = document.querySelector(".results")
    
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

    //list


    //const request = await get('/api');
    //const data = await request.json();

    const request = await fetch(endpoint);
        //.then(blob => blob.json())
        //.then(data => places.push(...data));

    const places = await request.json();

    function findMatches(wordToMatch, places) {
        return places.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.name.match(regex) || place.category.match(regex);
        });
    }

    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, places);
        if (event.target.value ==="")
        {
          list.innerHTML = "";
        }
        else 
        {
        const html = matchArray.map(place => {
          const regex = new RegExp(event.target.value, 'gi');
          const nameMatch = place.name.replace(regex, `<span class='hl'>${event.target.value}</span>`);
          const catMatch = place.category.replace(regex, `<span class='hl'>${event.target.value}</span>`)
            return `
                <div class="result">
                    <li>
                        <span class="name is-capitalized is-size-4">
                          ${nameMatch.toLowerCase()}
                        </span>
                        <span class="category is-capitalized">
                          ${catMatch.toLowerCase()}
                        </span>
                        <address>
                          ${place.address_line_1.toUpperCase()}<br>
                          ${place.zip}
                        </address>
                    </li>
                </div>
                `
        }).join('');

        list.innerHTML = html;
      }
    }

    search.addEventListener('change', displayMatches);
    search.addEventListener('keyup', (evt) => {
        displayMatches(evt)
    });
    
=======
function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
>>>>>>> 44bd7ef0cd348ea6aef94554251d3fe6a0efbcf4
}

window.onload = windowActions;