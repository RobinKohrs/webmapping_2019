// alert("Hallo Welt");

const div = document.getElementById("map")
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//console.log(breite,laenge,titel)

// Karte initialisieren


let karte = L.map("map");

//console.log(karte);

//aus Ausschnitt zoomen

karte.setView(
    [breite, laenge],
    13
);

//openstreetmap hinzufügen
//L.tileLayer("http://{s}.tile.osm.org./{z}/{x}/{y}.png").addTo(karte);

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
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
    nz_topo: L.tileLayer("http://tiles-a.data-cdn.linz.govt.nz/services;key=4ea67c32032c4af3bb657b77ceb603cb/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png", { //Wie eichtig sind die Namen z.B. nz_topo und woher kommen sie
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="https://data.linz.govt.nz/layer/2343-nz-mainland-topo50-gridless-maps/">CC BY 4.0 Land Information New Zealand</a>'
    }),
    linz_nz_aerial_imagery: L.tileLayer("https://tiles-a.data-cdn.linz.govt.nz/services;key=56742d94dd12449bb5d9ea994389aa6f/tiles/v4/set=2/EPSG:3857/{z}/{x}/{y}.png", { //WARUM EINFACH EIN Z EINFÜGEN??
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="https://www.linz.govt.nz/data/licensing-and-using-data/attributing-elevation-or-aerial-imagery-data/">CC BY 4.0 Land Information New Zealand</a>'
    }),
    brazil: L.tileLayer("https://{s}.tiles.mapbox.com/v3/tmpsantos.hgda0m6h/{z}/{x}/{y}.png", {
        subdomains: ["mapa", "mapb", "mapc"],
        attribution: 'Map tiles by <a href="https://wiki.openstreetmap.org/wiki/IBGE_Tile_Layer">IBGE Brasil</a>'
    }),
};


L.control.layers({
    "Stamen Toner": kartenlayer.stamen_toner,
    "Stamen Terrain": kartenlayer.stamen_terrain,
    "Stamen Watercolor": kartenlayer.stamen_watercolor,
    "osm": kartenlayer.osm,
    "nz topo": kartenlayer.nz_topo,
    "nz aerial view": kartenlayer.linz_nz_aerial_imagery,
    "Areas urbans" : kartenlayer.brazil,
    
}).addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);
//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();


//plugins
karte.addControl(new L.Control.Fullscreen());
var coord = new L.Control.Coordinates()
coord.addTo(karte);
karte.on('click', function (e) {
    coord.setCoordinates(e);
});