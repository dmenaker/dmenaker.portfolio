
//create blank function to create info window dialog when DOM is ready
$(function () {
    $("#infowindow").dialog({
        scrollTop: 0,
        autoOpen: false,
        height: 400,
        width: 900
    
    });
    $("#infowindow").scrollTop(0);
    $(".info").click(function(){        
        $("#infowindow").dialog("open");
    });

});   

//add esri basemap tilelayers
var gray = L.esri.basemapLayer('DarkGray');
var imagery = L.esri.basemapLayer('ImageryFirefly');

//add osm basemap tilelayer
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'});

function createMap(){
        
    //create the map
    var map = L.map('mapid', {
        center: [40.07, -74.53], //y,x
        zoom: 14,
    });

    getData(map);

    var basemaps = {
        "Dark Gray": gray,
        "Street Maps": osm,
        "Imagery": imagery
    };
    

    
    
    
    L.control.layers(basemaps, overlaymaps).addTo(map);
    gray.addTo(map);

    //call getData function
    //getData(map);

};

//function to retrieve the data and place it on the map
function getData(map){
    //load the data
    $.ajax("data/Eagle.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            var eagle = L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }    
    });
    
    $.ajax("data/EmgServ.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            var emg = L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }    
    }); 
    
    $.ajax("data/Rec.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            var rec = L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }    
    });
    
    $.ajax("data/Mun.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            var mun = L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }    
    });
    
    $.ajax("data/Hos.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            var hos = L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(map);
        }    
    }); 
    
        var overlaymaps = {
        "Municipal": mun,
        "Emg Services": emg,
        "Hospitals": hos,
        "Recreation": rec
    };
    
};

//function to attach popups to each mapped feature
function onEachFeature(feature, layer) {
    
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};


//open the info window pane
//function openNav() {
//    document.getElementById("my_dataviz").style.width = "25%";
//    document.getElementById("mapid").style.width = "75%";
//  };
//
////close the info window pane
//function closeNav() {
//    document.getElementById("my_dataviz").style.width = "0";
//    document.getElementById("mapid").style.width = "100%";
//  };
//
////add interaction to states layer
//function onEachFeature(feature, states) {
//    states.on({
//        mouseover: highlightState,
//        mouseout: unhighlightState,
//        //click: openChart
//
//    });
//};
//
//function newLegend(mymap){
//    
//    var legend = L.control({position: "bottomleft"});
//
//    legend.onAdd = function(mymap){
//        var div = L.DomUtil.create("div", "legend");
//        div.innerHTML += "<h4>Drought Intensity</h4>";
//        div.innerHTML += '<i style="background: #fffe03"></i><span>D0-Abnormally Dry</span><br>';
//        div.innerHTML += '<i style="background: #ffcb99"></i><span>D1-Moderate Drought</span><br>';
//        div.innerHTML += '<i style="background: #fe6603"></i><span>D2-Severe Drought</span><br>';
//        div.innerHTML += '<i style="background: #fe0000"></i><span>D3-Extreme Drought</span><br>';
//        div.innerHTML += '<i style="background: #640000"></i><span>D4-Exceptional Drought</span><br>';
//        div.innerHTML += "<h4>Fire Size (Acres)</h4>";
//        div.innerHTML += '<img src="img/forest.png" height="10" width ="10"><text> < 1k</text><br>';
//        div.innerHTML += '<img src="img/forest.png" height="25" width ="25"><span> 1k - 5k</span><br>';
//        div.innerHTML += '<img src="img/forest.png" height="40" width ="40"><span> 5k - 50k</span><br>';
//        div.innerHTML += '<img src="img/forest.png" height="55" width ="55"><span> 50k - 100k</span><br>';
//        div.innerHTML += '<img src="img/forest.png" height="90" width ="90"><span> > 100k</span><br>';
//
//      return div;
//    };
// 
//    legend.addTo(mymap);  
//
//};

//create the map when the dom is ready
$(document).ready(createMap);