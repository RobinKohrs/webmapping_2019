// alert("Hallo Welt");

const div = document.getElementById("map")
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");


const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");


//console.log(breite,laenge,titel)

// Karte initialisieren


let karte = L.map("map");

//console.log(karte);

//aus Ausschnitt zoomen


const kartenlayer = { //Objekt
  osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { //{} --> steht für Objekt   [] --> array,   //{s} kann Server für 
    subdomains: ["a", "b", "c"], //Server
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
  }),
  geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
  bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
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
  vogis: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
    subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
  }),
}







//kartenlayer.osm.addTo(karte);
//kartenlayer.geolandbasemap.addTo(karte);
//kartenlayer.bmapoverlay.addTo(karte);
//kartenlayer.bmapgrau.addTo(karte);
//kartenlayer.bmaphidpi.addTo(karte);
//kartenlayer.bmaporthofoto30cm.addTo(karte);
//kartenlayer.bmapgelaende.addTo(karte);
//kartenlayer.bmapoberflaeche.addTo(karte);

L.control.layers({
  "Geoland Basemap": kartenlayer.geolandbasemap,
  "Geoland Basemap Grau": kartenlayer.bmapgrau,
  "Geoland Orthophoto": kartenlayer.bmaporthofoto30cm,
  "OpenStreetmap": kartenlayer.osm,
  "Geoland Basemap Highdpi": kartenlayer.bmaphidpi,
  "Geoland Basemap Gelände": kartenlayer.bmapgelaende,
  "Geoland Basemap": kartenlayer.bmapoberflaeche,
  "Stamen Toner": kartenlayer.stamen_toner,
  "Stamen Terrain": kartenlayer.stamen_terrain,
  "Stamen Watercolor": kartenlayer.stamen_watercolor,
  "vogis": kartenlayer.vogis,
}).addTo(karte);

kartenlayer.bmapgrau.addTo(karte);



let markerGruppe = L.featureGroup().addTo(karte)
// Positionsmarker hinzufügen
let pin1 = L.marker(
  [breite1, laenge1]
).addTo(markerGruppe);

let pin2 = L.marker(
  [breite2, laenge2]
).addTo(markerGruppe);

//Popup zum Pin hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();

//Gruppe erzeugen!!

for (let blick of ADLERBLICKE) { //Marker erzeugen und dann popup dranhängen //blick könnte auch i sein
  let blickpin = L.marker( //marker definieren
    [blick.lat, blick.lng]
  ).addTo(markerGruppe); // Marker in die Gruppe packen!!
  blickpin.bindPopup(
    `<h1>Standort ${blick.standort}</h1>
                        <p>Höhe: ${blick.seehoehe}</p>
                        <em>Kunde: ${blick.kunde}</em>`
  );
}

// console.log(blickeGruppe.getBounds())
//Auf Adlerblicke zoomen
karte.fitBounds(markerGruppe.getBounds());
karte.addControl(new L.Control.Fullscreen());
var hash = new L.Hash(karte);
var coords = new L.Control.Coordinates() //PlugIn initialisiert
coords.addTo(karte); //plugin an die Karte hängen
karte.on('click', function (e) {
  coords.setCoordinates(e);
});

new L.GPX("AdlerwegEtappe04.gpx", { //datei adlerwegEtappe04.gpx soll geladen werden
  async: true,
  marker_options: {
    startIconUrl: 'images/pin-icon-start.png',
    endIconUrl: 'images/pin-icon-end.png',
    shadowUrl: 'images/pin-shadow.png',
  }
}).on('loaded', function (e) { //loaded-event wird getriggert
  karte.fitBounds(e.target.getBounds());
  const statsDiv = document.getElementById("stats"); //document holt das elemnt aus dem html-code was die id stats hat
  const minheight = e.target.get_elevation_min(); //Variablen definieren
  const maxheight = e.target.get_elevation_max();
  const verticalMeters = e.target.get_elevation_gain();
  statsDiv.innerHTML = `Routen Statistik: niedrigster Punkt: ${minheight} m, höchster Punkt: ${maxheight} m, Höhenunterschied: ${verticalMeters} m`;
}).on('addline', function (e) { //add-line Event
  //console.log('linie geladen');
  const controlElevation = L.control.elevation({
    //position: 'bottomright',
    //collapsed: true,
    detachedView: true, //außerhalb der Karte --> detached
    elevationDiv: "#elevation-div", //deswegen neue div
  });
  controlElevation.addTo(karte);
  controlElevation.addData(e.line);
  const gpxLinie = e.line.getLatLngs();
  for (let i = 1; i < gpxLinie.length; i += 1) {
    console.log(gpxLinie[i]);
    let p1 = gpxLinie[i - 1];
    let p2 = gpxLinie[i];
    let dist = karte.distance(
      [p1.lat, p2.lng],
      [p2.lat, p2.lng]
    );

    let delta = (p2.meta.ele - p1.meta.ele); //Höhenunterschied ausrechnen, 2.Punkt - 1. Punkt
    let proz = (dist != 0 ? delta / dist * 100.0 : 0).toFixed(1);

    console.log('Distanz: ', dist, 'Höhendiff', delta);
    let farbe =
      proz >= 10 ? "#d73027" :
      proz >= 6 ? "#fc8d59" :
      proz >= 2 ? "#fee08b" :
      proz >= 0 ? "#ffffbf" :
      proz >= -6 ? "#d9ef8b" :
      proz >= 10 ? "#91cf60" :
      "#1a9850";

    let segment = L.polyline(
      [
        [p1.lat, p1.lng],
        [p2.lat, p2.lng]
      ], {
        color: farbe,
      }
    ).addTo(karte);


  }

})