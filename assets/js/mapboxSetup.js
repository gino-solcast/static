const config = window.mapboxConfig;

let userInteracting = false;
let isFullScreen = false;

if (config.showLegend) {
  let legend = document.getElementById("mapbox-legend");
  let title = document.querySelector(".legend-title");
  legend.classList.add(config.legend.color);
  legend.setAttribute("data-min", config.legend.min);
  legend.setAttribute("data-max", config.legend.max * config.tileDataScalar);
  title.innerHTML = config.legend.title;
}

// Functions
const spinGlobe = (map) => {
  const zoom = map.getZoom();
  if (!userInteracting && config.spinGlobe && zoom < config.maxSpinZoom) {
    let distancePerSecond = 360 / config.secondsPerRotation;
    const center = map.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.easeTo({ center, duration: 1000, easing: (n) => n });
  }
};

const getDataFromClick = (lngLat) => {
  let dataUrl = `https://tiles.solcast.com.au/test/cog/point/${lngLat.lng},${lngLat.lat}?url=${config.tileUrl}`;
  return new Promise((resolve, reject) => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.values[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const addRemoveLayer = (layerId) => {
  const visibility = map.getLayoutProperty(layerId, "visibility");
  if (visibility === "visible") {
    map.setLayoutProperty(layerId, "visibility", "none");
  } else {
    map.setLayoutProperty(layerId, "visibility", "visible");
  }
};

const generateHtmlFromProperties = (properties) => {
  let html = "<div style='display: flex;flex-direction: column;'>";
  for (const property in properties) {
    html += `<div style="display:flex;justify-content:space-between;"><span>${property}</span><span>${properties[property]}</span></div>`;
  }
  html += "</div>";
  return html;
};

mapboxgl.accessToken = config.accessToken;
const map = new mapboxgl.Map({
  container: "map",
  attributionControl: false,
  style: config.style,
  center: config.location.center,
  projection: config.location.projection,
  zoom: config.location.zoom,
  minZoom: config.location.minZoom,
  maxZoom: config.location.maxZoom,
  pitch: config.location.pitch,
  bearing: config.location.bearing,
});

if (config.showControls) {
  map.addControl(new mapboxgl.NavigationControl());
}

map.addControl(new mapboxgl.FullscreenControl());
map.dragRotate.disable();

// Pause spinning on interaction
map.on("mousedown", () => {
  userInteracting = true;
});

// Restart spinning the globe when interaction is complete
map.on("mouseup", () => {
  userInteracting = false;
  spinGlobe(map);
});

// These events account for cases where the mouse has moved
// off the map, so 'mouseup' will not be fired.
map.on("dragend", () => {
  userInteracting = false;
  spinGlobe(map);
});

map.on("dragend", () => {
  userInteracting = false;
  spinGlobe(map);
});

map.on("pitchend", () => {
  userInteracting = false;
  spinGlobe(map);
});
map.on("rotateend", () => {
  userInteracting = false;
  spinGlobe(map);
});
map.on("moveend", () => {
  spinGlobe(map);
});

// Popup functionality
for (const layer in config.layers) {
  if (config.layers[layer].allowPopup) {
    console.log("Adding popup layer: ", config.layers[layer].id);
    map.on("click", config.layers[layer].id, (e) => {
      let features = map
        .queryRenderedFeatures(e.point)
        .find((f) => f.layer.id === config.layers[layer].id);
      let properties = features.properties;
      console.log("properties: ", properties);
      new mapboxgl.Popup({ closeOnClick: true, className: "flex-popup" })
        .setLngLat(e.lngLat)
        .setHTML(generateHtmlFromProperties(properties))
        .addTo(map);
    });
  }
}

const marker = new mapboxgl.Marker({
  draggable: true,
  color: config.markerColor,
})
  .setLngLat(config.location.center)
  .addTo(map);

map.on("click", (e) => {
  // check that none of the features have the same id as any of the layers
  // if they do, then we don't want to do anything
  const features = map.queryRenderedFeatures(e.point);
  for (const feature of features) {
    if (config.layers.find((layer) => layer.id === feature.layer.id)) {
      return;
    }
  }
  getDataFromClick(e.lngLat).then((data) => {
    new mapboxgl.Popup({ closeOnClick: true, className: "flex-popup" })
      .setLngLat(e.lngLat)
      .setHTML(
        `<div>${(data * config.tileDataScalar).toFixed(0)} ${
          config.tileDataMeasurement
        }</div>`
      )
      .addTo(map);
  });
  marker.setLngLat(e.lngLat);
});

map.on("load", () => {
  // 3D Terrain
  if (config.use3dTerrain) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });

    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
  }

  // Add all layers from config
  for (const layer in config.layers) {
    map.addLayer(config.layers[layer], config.layers[layer].depth);
  }
  // Load all icons from config
  for (const icon in config.icons) {
    map.loadImage(config.icons[icon].url, (error, image) => {
      if (error) throw error;
      map.addImage(config.icons[icon].id, image);
    });
  }

  if (config.showStars) {
    map.setFog({
      color: "rgb(186, 210, 235)", // Lower atmosphere
      "high-color": "rgb(36, 92, 223)", // Upper atmosphere
      "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
      "space-color": "rgb(11, 11, 25)", // Background color
      "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
    });

    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  }
});

spinGlobe(map);

// Attempt to get the location from query params
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (target, prop) => target.get(prop.toString()),
});

const flyToLocation = [params.longitude, params.latitude];

// Fly to location if query params are present
if (flyToLocation[0] && flyToLocation[1]) {
  map.flyTo({
    center: flyToLocation,
    zoom: 4,
    duration: 5000,
  });
}
