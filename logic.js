
// Set up map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-120.660310, 35.300521]),
    zoom: 7
  })
});

// Define data points
var data = data = [
  {
      "name": "Josiah Pang",
      "long": -120.670375,
      "lat": 35.272506
  },
  {
      "name": "Evan Zhang",
      "long": -122.043448,
      "lat": 37.309412
  },
  {
      "name": "Hayden Baker",
      "long": -119.794697,
      "lat": 36.785633
  },
  {
      "name": "Arun Shriram",
      "long": -122.043448,
      "lat": 37.309412
  },
  {
      "name": "Non Wajanakunakorn",
      "long": -120.670375,
      "lat": 35.272506
  },
  {
      "name": "Kevin Yoo",
      "long": -120.670375,
      "lat": 35.272506
  },
  {
    "name": "Justin Morgan",
    "long": -120.670375,
    "lat": 35.272506
  }
];

// Array of OL features
markerArr = [];

var style1 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 10,
    fill: new ol.style.Fill({color: '#eb7d34'}),
    stroke: new ol.style.Stroke({color: '#000000', width: 2})
  })
});

var style2 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 20, 
    fill: new ol.style.Fill({color: '#34eb77'}),
    stroke: new ol.style.Stroke({color: '#000000', width: 2})
  })
});

var style3 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 30,
    fill: new ol.style.Fill({color: '#eb3446'}),
    stroke: new ol.style.Stroke({color: '#000000', width: 2})
  })
});

var h = {};

// Collect data
for (var i = 0; i < data.length; i++) {
  var dataLat = data[i].lat;
  var dataLong = data[i].long;

  if ([dataLong, dataLat] in h) {
    h[[dataLong, dataLat]] = h[[dataLong, dataLat]] + 1;
  } else {
    h[[dataLong, dataLat]] = 1;
  }

}

// Find max and min points
var maxKey = Object.keys(h).reduce((a, b) => h[a] > h[b] ? a : b).split(',');
var minKey = Object.keys(h).reduce((a, b) => h[a] <= h[b] ? a : b).split(',');

var maxMarker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([maxKey[0], maxKey[1]])
  ),  
});

var minMarker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([minKey[0], minKey[1]])
  ),  
});
maxMarker.setStyle(style3);
minMarker.setStyle(style1);
markerArr.push(maxMarker);
markerArr.push(minMarker);


delete h[maxKey];
delete h[minKey];

// Find other points
for (var y in h) {
  var c = y.split(',');
  var long = c[0];
  var lat =c[1];
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([long, lat])
    ),  
  });
  marker.setStyle(style2);
  markerArr.push(marker);
}

var vectorSource = new ol.source.Vector({
  features: markerArr
});

var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource
});
map.addLayer(markerVectorLayer);