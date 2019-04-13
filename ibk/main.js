let karte = L.map("map");



const kartenlayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    bmapgelaende : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
  subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
  attribution : 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
}),
}

karte.addLayer(
    kartenlayer.osm
)

L.control.layers({
    "OpenStreetmap": kartenlayer.osm,
    "Stamen Toner": kartenlayer.stamen_toner,
    "Stamen Terrain": kartenlayer.stamen_terrain,
    "Basemap Gelände" : kartenlayer.bmapgelaende,
}).addTo(karte);

karte.setView(
    [47.267222 , 11.392778],
    15
    );


//console.log(SPORTSTAETTEN);

let markerGruppe = L.featureGroup().addTo(karte)

for (let staette of SPORTSTAETTEN) { //For Schleife für Objekt
//console.log(staette);
// Piktogramm definieren
let piktogramm = L.icon ({
    iconUrl : `icons/icon_${staette.icon}_schwarz_auf_weiss_250px.png`
});

let pin1 = L.marker( //marker definieren
    [staette.lat, staette.lng], {
        icon : piktogramm
    }
    ).addTo(markerGruppe);// Marker in die Gruppe packen!!

    //Popup hinzufügen
    pin1.bindPopup(
      `<h1>Name ${staette.name}</h1>
                          <p>Adresse: ${staette.adresse}</p>
                          <em>Typ: ${staette.typ}</em>`
    );

  }


