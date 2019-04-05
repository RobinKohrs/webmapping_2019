// alert("Hallo Welt");

const div = document.getElementById("map")
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//console.log(breite,laenge,titel)

// Karte initialisieren


let  karte = L.map("map");

//console.log(karte);

//aus Ausschnitt zoomen

karte. setView(
[breite, laenge],
13
);

//openstreetmap hinzufügen
//L.tileLayer("http://{s}.tile.osm.org./{z}/{x}/{y}.png").addTo(karte);

const kartenlayer = {

    osm : L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { 
  subdomains: ["a", "b", "c"], 
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}),
geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
  subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
  attribution : 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
}),
stamen_toner : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png" , {
  subdomains : ["a","b","c"],
  attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}),
stamen_terrain : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg" , {
  subdomains : ["a","b","c"],
  attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}),
stamen_watercolor : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" , {
  subdomains : ["a","b","c"],
  attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
})
};


  L.control.Layers({
    "Stamen Toner" : kartenlayer.stamen_toner,
    "Stamen Terrain" : kartenlayer.stamen_terrain,
    "Stamen Watercolor" : kartenlayer.stamen_watercolor,
    "Geoland Basemap" : kartenlayer.geolandbasemap,
  }).addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);
//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();

