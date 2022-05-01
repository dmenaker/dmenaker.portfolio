/* GEOG 575 Lab 1 Menaker, David */

//Function to instantiate the Leaflet map
function createMap(){
    
    //create the map
    var map = L.map('mapid', {
        center: [40.07, -74.53], //y,x
        zoom: 14
    });

    //add esri basemap tilelayer
    var esri = L.esri.basemapLayer('DarkGray').addTo(map);
    
    //add osm basemap tilelayer
    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    });   
    
    //define basemaps and add switcher control
    var basemaps = {
        "Dark": esri,
        "Light": osm
    };

    L.control.layers(basemaps).addTo(map);

    //call getData function
    getData(map);
};

//=====================================================================================================================

//function to retrieve the data and place it on the map
function getData(map){
    //load the data
    $.ajax("data/census_data.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response).addTo(map);
        }
    });
};

$(document).ready(createMap);