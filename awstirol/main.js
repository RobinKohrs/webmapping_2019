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
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://basemap.at“>basemap.at</a>'
    }),
}

karte.addLayer(
    kartenlayer.bmapgelaende
)

const layerControl = L.control.layers({
    "OpenStreetmap": kartenlayer.osm,
    "Stamen Toner": kartenlayer.stamen_toner,
    "Stamen Terrain": kartenlayer.stamen_terrain,
    "Basemap Gelände": kartenlayer.bmapgelaende,
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
                if (feature.properties.WR) {
                    let color = 'black';
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
            [0, "blue"],
            [1, "yellow"],
            [2, "orange"],
            [5, "red"],
        ];

        L.geoJson(stations, { //neuer GeoJson-Layer
            pointToLayer: function (feature, latlng) { //für jeden Punkt
                if (feature.properties.LT) {
                    let color = farbPalette[farbPalette.length - 1][1]; //length =10
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
        temperaturLayer.addTo(karte) //wird direkt angezeift




        // relative Feuchte
        const relfeuchte = L.featureGroup()
        farbPalette = [
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
                                let color = farbPalette[farbPalette.length - 1][1]; //length = 8
                                for (let i = 0; i < farbPalette; i++) {
                                    if (feature.properties.RH < farbPalette[i][0]) {
                                        color = farbPalette[i][1];
                                        break;
                                    }

                                }
                                return L.marker(latlng, {
                                    icon: L.divIcon({
                                        html: `<div class="luftfeuchteLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                                    })
                                });

                            }
                        }
                    }).addTo(relfeuchte); //hängt das ganze an meinen templayer
                    layerControl.addOverlay(relfeuchte, "relative Luffeuchte")
                    relfeuchte.addTo(karte) //wird direkt angezeift
        



                            loadStations();