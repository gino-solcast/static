window.mapboxConfig = {
  style: "mapbox://styles/solcast/clxjli2z6008h01pudwyx80kx",
  accessToken:
    "pk.eyJ1Ijoic29sY2FzdCIsImEiOiJjbHBrbmZybjUwMXhuMm5wZHZkYTl2cHgzIn0.JoR-him1ia9CPTHOTTNIXw",
  showMarkers: true,
  markerColor: "#3FB1CE",
  showControls: false,
  showLegend: true,
  legend: {
    title: "GHI (Long-term average annual total, kWh/m<sup>2</sup>/yr)",
    color: "gist_ncar",
    min: 0,
    max: 308,
  },
  showIconLegend: false,
  use3dTerrain: true,
  spinGlobe: true,
  secondsPerRotation: 180,
  maxSpinZoom: 2,
  showStars: true,
  title: "Long Term Average Solar Rad",
  subtitle: "Subtitle",
  location: {
    center: [0, 1],
    projection: "globe",
    zoom: 1,
    minZoom: 1,
    maxZoom: 15,
    pitch: 0,
    bearing: 0,
  },
  tileUrl:
    "s3://solcast-visualisation-test/longterm-average-raw/long_term_avg.tif",
  tileDataMeasurement: "kWh/m<sup>2</sup>/yr",
  tileDataScalar: 8.76,
  layers: [
    {
      id: "ocean_highres",
      type: "fill",
      source: {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      },
      "source-layer": "water",
      paint: {
        "fill-color": "#205787",
      },
      minzoom: 0,
    },
    {
      id: "long-term-avg",
      type: "raster",
      source: {
        type: "raster",
        tiles: [
          `https://tiles.solcast.com.au/test/cog/tiles/{z}/{x}/{y}@1x?url=s3://solcast-visualisation-test/longterm-average/long_term_avg_40k.tif&rescale=0,308&colormap_name=gist_ncar`,
        ],
        tileSize: 256,
        attribution: '&copy; <a href="https://solcast.com/">Solcast</a>',
      },
      paint: {
        "raster-opacity": 0.9,
      },
      depth: "admin-1-boundary",
      allowPopup: true,
    },
    {
      id: "bankability",
      type: "symbol",
      source: {
        type: "vector",
        url: "mapbox://solcast.clx2jzd3d3x7d1uqtipqbueuv-4oz23",
      },
      "source-layer": "bankable_sites",
      layout: {
        "icon-image": "bankable",
        "icon-size": 0.75,
        "icon-allow-overlap": true,
      },
      paint: {
        "icon-opacity": 0.8,
      },
      minzoom: 2,
      allowPopup: true,
    },
  ],
  icons: [
    {
      url: "https://static.solcast.com/assets/icons/validation_site.png",
      id: "bankable",
      name: "Validation Sites",
      layer_id: "bankability",
    },
    {
      url: "https://static.solcast.com/assets/icons/unmetered_site.png",
      id: "unmetered",
      name: "Unmetered Sites",
    },
    {
      url: "https://static.solcast.com/assets/icons/solar_site.png",
      id: "utility",
      name: "Solar Sites",
    },
    {
      url: "https://static.solcast.com/assets/icons/lta_icon.png",
      id: "lta",
      name: "Long Term Average",
      layer_id: "long-term-avg",
    },
  ],
};
