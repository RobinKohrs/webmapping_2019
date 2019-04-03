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



//openstreetmap hinzufügen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {   //{} --> steht für Objekt   [] --> array,   //{s} kann Server für Kartenbibliotheken 
  subdomains: ["a","b","c"], //Server
  attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(karte); //an die Karte hängen

L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
subdomains : ["maps","maps1","maps2","maps3","maps4"],
attribution : 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
}).addTo(karte);

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

for (let blick of ADLERBLICKE) { //Marker erzeugen und dann popup dranhängen
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