let karte = L.map("map");



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
}

karte.addLayer(
    kartenlayer.bmapgelaende
)

const layerControl = L.control.layers({
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
}).addTo(karte);

karte.setView(
    [47.267222, 11.392778],
    15
);

//console.log(AWS);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations"); //await lässt einen darauf warten, dass der nächste Aufruf abschlossen wird
    const stations = await response.json(); //Umwandeln --> Alle Daten die in AWS KONStante waren sind nun in Stations Konstante
    const awsTIROL = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer: ", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum: ", date);
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe (m): ${layer.feature.geometry.coordinates[2]} <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
    Datum: ${date.toLocaleDateString("de-AT")}
           ${date.toLocaleTimeString("de-AT")} <br>
           Windgeschwindigkeit (km/h): 
           ${layer.feature.properties.WG ? layer.feature.properties.WG : `keine Daten`}
           <hr>
           <footer> Land Tirol - <a href ="data.tirol.gv.at"> data.tirol.gv.at</a></footer> 
           `;
        })
        .addTo(awsTIROL); // erzeugt 168 Marker
    //Ich hänge sie nicht direkt an die Karte, sondern pack sie in die Featuregroup
    karte.fitBounds(awsTIROL.getBounds());
    layerControl.addOverlay(awsTIROL, "wetterstationen tirol");


    //Windrichtungen anzeigen
    const windlayer = L.featureGroup(); //Feature-Group erstellen 
    L.geoJson(stations, { //neuer GeoJson-Layer
        pointToLayer: function (feature, latlng) { //für jeden Punkt
            if (feature.properties.WR) { //Wenn es die Property Wr überhaupt im Feature gibt,
                let color = 'black'; //macht ihn schwarz
                if (feature.properties.WR > 20) { // Pfeil ist normalerweise black, wenn > 20 wird sie rot
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })
                });
            }
        }
    }).addTo(windlayer); //hänge das ganze an meinen windlayer
    layerControl.addOverlay(windlayer, "Windrichtung")
    //windlayer.addTo(karte) //wird direkt angezeift

    // Temperaturlayer anzeigen
    const temperaturLayer = L.featureGroup(); //Feature-Group erstellen 
    let farbPalette = [
        [-30, "#646664"],
        [-28, "#8c8a8c"],
        [-26, "#b4b2b4"],
        [-24, "#cccecc"],
        [-22, "#e4e6e4"],
        [-20, "#772d76"],
        [-18, "#b123b0"],
        [-16, "#d219d1"],
        [-14, "#f0f"],
        [-12, "#ff94ff"],
        [-10, "#3800d1"],
        [-8, "#325afe"],
        [-6, "#2695ff"],
        [-4, "#00cdff"],
        [-2, "#00fffe"],
        [0, "#007800"],
        [2, "#009d00"],
        [4, "#00bc02"],
        [6, "#00e200"],
        [8, "#0f0"],
        [10, "#fcff00"],
        [12, "#fdf200"],
        [14, "#fde100"],
        [16, "#ffd100"],
        [18, "#ffbd00"],
        [20, "#ffad00"],
        [22, "#ff9c00"],
        [24, "#ff7800"],
        [26, "red"],
        [28, "#f30102"],
        [30, "#d20000"],
        [32, "#c10000"],
        [34, "#b10000"],
        [36, "#a10000"],
        [38, "#900000"],
        [40, "#770100"],
        [42, "#5f0100"],
        [44, "#460101"],
        [46, "#2e0203"]
    ];

    L.geoJson(stations, { //neuer GeoJson-Layer
        pointToLayer: function (feature, latlng) { //für jeden Punkt
            if (feature.properties.LT) {
                let color //= farbPalette[farbPalette.length - 1][1]; //length =10
                for (let i = 0; i < farbPalette.length; i++) {
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]) {
                        color = farbPalette[i][1];
                        break;
                    }
                }

                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer); //hängt das ganze an meinen templayer
    layerControl.addOverlay(temperaturLayer, "temperatur")
    //temperaturLayer.addTo(karte) //wird direkt angezeift




    // relative Feuchte
    const relfeuchtelayer = L.featureGroup()
    farbPalette = [ //1. Array
        [30, "#EEE"], // 1. SChwelle 2. Farbe
        [40, "#DDD"],
        [50, "#C6C9CE"],
        [60, "#BBB"],
        [70, "#AAC"],
        [80, "#9998DD"],
        [90, "#8788EE"],
        [99, "#7677E1"],

    ]

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                let color; // = farbPalette[farbPalette.length - 1][1]; //length = 8 //WARUM diese Zeile überhaupt, ändert nichts sie rauszunehmen?
                console.log(color);
                for (let i = 0; i < farbPalette.length; i++) {
                    if (feature.properties.RH < farbPalette[i][0]) { //Schwellenwert
                        color = farbPalette[i][1]; //Farbe
                        break; //wenn der Wert kleiner ist als die SChwelle, dann ist er sowieso kleiner als alle anderen Schwellen
                    }

                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="luftfeuchtelabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });

            }
        }
    }).addTo(relfeuchtelayer); //hängt das ganze an meinen templayer
    layerControl.addOverlay(relfeuchtelayer, "relative Luffeuchte")
    // relfeuchtelayer.addTo(karte) //wird direkt angezeift

    let farbe = //Array definieren
        [0, "blau"], //einzelne weitere Arrays --> verschachtelter Array mit einer LEngth von 3
        [5, "gelb"],
        [10, "rot"],
];
farben.length;
farben[2] //einzelne Elemente Ansprechen im Array -- farben[2] wirft gesamten array '10, "rot"' aus -- farben [2][1] wird nur 'rot' aus
for (let i = 0; i < farben.length; i++) { //Schleife  
    console.log(farben[i]);
}

//Windlayer
const windglayer = L.featureGroup()
farbPalette = [
    [3, "#00b900"], // 1. SChwelle 2. Farbe
    [4, "#DDD#10cd24"],
    [5, "#C6C#72d4759CE"],
    [6, "#fed6d3"],
    [7, "##ffb6b3"],
    [8, "##ff9e9a"],
    [9, "#ff8281"],
    [10, "##ff6160"],
    [11, "#ff453c"],
    [50, "#ff200e"],

]

L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.WG) {
            let color; // = farbPalette[farbPalette.length - 1][1]; //length = 8 //WARUM diese Zeile überhaupt, ändert nichts sie rauszunehmen?
            console.log(color);
            for (let i = 0; i < farbPalette.length; i++) {
                if (feature.properties.WG < farbPalette[i][0]) { //Schwellenwert
                    color = farbPalette[i][1]; //Farbe
                    break;
                } else {
                    // weiter zum nächsten Schwellenwert
                }

            }
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<div class="windgLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                })
            });

        }
    }
}).addTo(windglayer); //hängt das ganze an meinen templayer
layerControl.addOverlay(windglayer, "Windgeschwindigkeit")
windglayer.addTo(karte) //wird direkt angezeift

}


loadStations();