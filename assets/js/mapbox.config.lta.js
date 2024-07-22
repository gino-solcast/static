console.log("config loaded")
const config = {
  style: "mapbox://styles/solcast/clxjli2z6008h01pudwyx80kx",
  accessToken:
    "pk.eyJ1Ijoic29sY2FzdCIsImEiOiJjbHBrbmZybjUwMXhuMm5wZHZkYTl2cHgzIn0.JoR-him1ia9CPTHOTTNIXw",
  showMarkers: true,
  markerColor: "#3FB1CE",
  showControls: false,
  showLegend: false,
  showIconLegend: false,
  use3dTerrain: true,
  spinGlobe: true,
  secondsPerRotation: 180,
  maxSpinZoom: 2,
  showStars: false,
  title: "Long Term Average Solar Rad",
  subtitle: "Subtitle",
  chapters: [
    {
      id: "slug-style-id",
      alignment: "left",
      hidden: false,
      title: "Display Title",
      image: "./path/to/image/source.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location: {
        center: [-122.418398, 37.759483],
        zoom: 8.5,
        pitch: 60,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [
        // {
        //     layer: 'layer-name',
        //     opacity: 1,
        //     duration: 5000
        // }
      ],
      onChapterExit: [
        // {
        //     layer: 'layer-name',
        //     opacity: 0
        // }
      ],
    },
    {
      id: "second-identifier",
      alignment: "right",
      hidden: false,
      title: "Second Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [-77.020636, 38.8869],
        zoom: 8.5,
        pitch: 60,
        bearing: -43.2,
        // flyTo additional controls-
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        //speed: 2, // make the flying slow
        //curve: 1, // change the speed at which it zooms out
      },
      mapAnimation: "flyTo",
      rotateAnimation: true,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "third-identifier",
      alignment: "left",
      hidden: false,
      title: "Third Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [6.15116, 46.20595],
        zoom: 12.52,
        pitch: 8.01,
        bearing: 0.0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "fourth-chapter",
      alignment: "fully",
      hidden: false,
      title: "Third Title",
      image: "./path/to/image/source.png",
      description: "Copy these sections to add to your story.",
      location: {
        center: [-58.54195, -34.716],
        zoom: 4,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      callback: "",
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
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
    },
  ],
  icons: [
    {
      url: "src/assets/validation_site.png",
      id: "bankable",
      name: "Validation Sites",
      layer_id: "bankability",
    },
    {
      url: "src/assets/unmetered_site.png",
      id: "unmetered",
      name: "Unmetered Sites",
    },
    {
      url: "src/assets/solar_site.png",
      id: "utility",
      name: "Solar Sites",
    },
    {
      url: "src/assets/lta_icon.png",
      id: "lta",
      name: "Long Term Average",
      layer_id: "long-term-avg",
    },
  ],
};
