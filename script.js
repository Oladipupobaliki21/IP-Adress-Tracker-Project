const API_KEY = "at_FAXGm8fZpa9KGQeOCB6o9CeGIS58a";

const ipEl = document.getElementById("ip");
const locationEl = document.getElementById("location");
const timezoneEl = document.getElementById("timezone");
const ispEl = document.getElementById("isp");
const form = document.getElementById("ip-form");
const input = document.getElementById("ip-input");

let map = L.map("map").setView([0, 0], 13);
let marker;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Fetch IP 
async function fetchIPData(query = "") {
  const url = query
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&domain=${query}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  updateUI(data);
}

function updateUI(data) {
  ipEl.textContent = data.ip;
  locationEl.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezoneEl.textContent = `UTC ${data.location.timezone}`;
  ispEl.textContent = data.isp;

  const { lat, lng } = data.location;

  map.setView([lat, lng], 13);

  if (marker) {
    marker.setLatLng([lat, lng]);
  } else {
    marker = L.marker([lat, lng]).addTo(map);
  }
}

// Initial load
fetchIPData();

// Search
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    fetchIPData(input.value.trim());
    input.value = "";
  }
});
