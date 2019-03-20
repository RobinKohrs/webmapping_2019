// alert("Hallo Welt");

const div = document.getElementById("map")
const lat = div.getAttribute("data-lat");
const lng = div.getAttribute("data-lng");
const title = div.getAttribute("data-title");

console.log("breite=",lat, "länge="lng,title)

alert(lat);
alert(lng);
alert(title);