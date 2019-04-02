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
L.tileLayer("http://{s}.tile.osm.org./{z}/{x}/{y}.png").addTo(karte);

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
karte.fitBounds (markerGruppe.getBounds());



