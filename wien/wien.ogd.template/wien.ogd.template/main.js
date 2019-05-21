/* Wien OGD Beispiele */

let karte = L.map("map"); //leaflet bibliothek wird aufgerufen mit der Variable = Karte und dem div = map

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
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
    })
};

const layerControl = L.control.layers({ //kleines Zeichen rechts oben in der Karte
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 12); //Zoomfakttor 12


const url = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD &srsName=EPSG:4326&outputFormat=json';



function makeMarker(feature, latlng) { //Funktionsname 
    const fotoicon = L.icon({ //icon erzeugen --> wo liegt das Bild und wie groß?
        iconUrl: 'http://www.data.wien.gv.at/icons/sehenswuerdigogd.png',
        iconSize: [36, 36]
    });

    const sightmarker = L.marker(latlng, { //Marker erzeugen und Position
        icon: fotoicon //dann gebe ich dem Marker das Icon, sonst wäre er blau
    });

    sightmarker.bindPopup(`
 <h3>${feature.properties.NAME}</h3>  
 <p>${feature.properties.BEMERKUNG}</p>
 <hr>
 <footer><a href="${feature.properties.WEITERE_INF}" target="_blan">Weblink</a></footer>
 `);

    return sightmarker; //funktion gibt Marker zurück
}


async function loadSights(url) { //damit man es laden kann muss man eine Funktion definieren
    const sehenswuerdigkeitenclusterGruppe = L.markerClusterGroup(); //erzeugen von featureGroup -- markerClusterGroup ist so definiert und kann nicht geändert werden
    const response = await fetch(url); //innerhalb der asynchronen funktion abwarten bis das fetch fertig ist
    const sightsData = await response.json(); //in json umwandeln
    const geoJson = L.geoJson(sightsData, { //Wert der GeoJson Varibale wird in einer KOnstante gespeichert jetzt
        pointToLayer: makeMarker //wie wird der Punkt in einen Layer umgewandelt? //Funktionsname
    });
    sehenswuerdigkeitenclusterGruppe.addLayer(geoJson); //fühe GeoJson zu ClusterGruppe
    karte.addLayer(sehenswuerdigkeitenclusterGruppe);
    layerControl.addOverlay(sehenswuerdigkeitenclusterGruppe, "Sehenswürdigkeiten")


    const suchFeld = new L.Control.Search({
        layer: sehenswuerdigkeitenclusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false,
    });
    karte.addControl(suchFeld);
}

loadSights(url);


const scale = L.control.scale({
    imperial: true,
    metric: true
});
karte.addControl(scale);

const wege = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERLINIEOGD&srsName=EPSG:4326&outputFormat=json';

function linienPopup(feature, layer) {
    const popup = `
    <h3>${feature.properties.NAME}</h3>
    <p><a href="${feature.properties.WEITERE_INF}"Weblink</a></p>
    `;
    layer.bindPopup(popup);
}

async function loadWege(wege) {
    const antwort = await fetch(wege);
    const wegeData = await antwort.json();
    const wegeJson = L.geoJson(wegeData, {
        style: function () {
            return {
                color: "red"
            };
        },
        onEachFeature: linienPopup //variablenname
    });
    karte.addLayer(wegeJson);
    layerControl.addOverlay(wegeJson, "Spazierweg");
}
loadWege(wege);