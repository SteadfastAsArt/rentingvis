/* In the Name of GOD */
var map;
/* the Graphic Drawing Tool */
var tb;  // tb = new Draw(map);

/* LAYER-Lists: */
// 0.HouseResults layer

/*
 * Attribute-reco has its own layer due to its potential
 * large output, so we need to classify them using color,
 * classification fields will be 'price'
 */
var houseRecoLayer;
/*each query EXCEPT reco*/
var houseBasic;

// 1.Spatial Query
/*1.1 */
var polygonLayer;
var poiRangeLayer;
var poiLayer;
var optimalLayer;

var detailLayer;


var svgPath = "M44.484,52.531l5.236-1.218c0.537-0.125,0.994-0.674,1.019-1.226l0.706-15.374c0.025-0.552-0.285-1.3-0.693-1.672" +
    " L39.574,22.87c-0.408-0.372-1.017-0.321-1.358,0.112L25.429,39.188c-0.342,0.434-0.62,1.233-0.62,1.785V57.8" +
    " c0,0.552,0.426,0.863,0.952,0.695l6.99-2.24c0.525-0.169,0.952-0.753,0.952-1.305V38.135c0-0.552,0.44-1.087,0.981-1.194" +
    " l7.844-1.551c0.542-0.107,0.981,0.254,0.981,0.806v15.561C43.511,52.31,43.947,52.656,44.484,52.531z" +
    " M19.221,43.833c0.42,0.358,1.034,0.294,1.371-0.144l17.711-23.042c0.337-0.438,0.939-0.491,1.347-0.118l15.731,14.396" +
    " c0.407,0.373,1.049,0.354,1.434-0.042l0.991-1.02c0.385-0.396,0.372-1.026-0.028-1.407L40.244,15.76" +
    " c-0.4-0.381-1.137-0.865-1.644-1.083L24.503,8.65c-0.508-0.217-1.073-0.21-1.263,0.016c-0.19,0.226,0.066,0.591,0.57,0.815" +
    " l4.532,2.014c0.505,0.224,0.914,0.854,0.914,1.406v1.353c0,0.552,0.448,1.004,1,1.009l1.233,0.011c0.552,0.005,1,0.457,1,1.009" +
    " v8.452c0,0.552-0.442,1.072-0.987,1.161L20.24,27.736c-0.545,0.089-1.385-0.044-1.875-0.297l-4.668-2.41" +
    " c-0.491-0.253-0.889-0.906-0.889-1.458v-1.493c0-0.552-0.288-0.657-0.643-0.234l-7.179,8.541c-0.356,0.423-0.303,1.056,0.117,1.415" +
    " L19.221,43.833z" +
    " M15.139,24.091l3.525,1.82c0.491,0.253,1.33,0.386,1.875,0.297l9.669-1.58c0.545-0.089,0.987-0.609,0.987-1.161v-5.933" +
    " c0-0.552-0.448-1.004-1-1.009l-1.233-0.011c-0.552-0.005-1-0.456-1-1.009v-1.819c0-0.552-0.409-1.182-0.914-1.406l-4.589-2.039" +
    " c-0.505-0.224-1.353-0.316-1.894-0.207l-5.334,1.084c-0.541,0.11-0.98,0.647-0.98,1.199v10.315" +
    " C14.25,23.185,14.648,23.838,15.139,24.091z" +
    " M20.486,45.485c-0.352,0.425-0.977,0.48-1.397,0.121l-5.891-5.03c-0.42-0.359-0.76-0.202-0.76,0.351v5.87" +
    " c0,0.552,0.325,1.308,0.725,1.689l9.781,9.285c0.4,0.38,0.725,0.241,0.725-0.311v-14.82c0-0.552-0.285-0.655-0.637-0.229" +
    " L20.486,45.485z";

var svglocate = "M12 5c1.609 0 3.12.614 4.254 1.73 1.126 1.107 1.746 2.579 1.746 4.14s-.62 3.03-1.745 4.139l-4.255 4.184-4.254-4.186c-1.125-1.107-1.745-2.576-1.745-4.139s.62-3.032 1.745-4.141c1.135-1.113 2.647-1.727 4.254-1.727m0-2c-2.047 0-4.096.768-5.657 2.305-3.124 3.074-3.124 8.057 0 11.131l5.657 5.563 5.657-5.565c3.124-3.072 3.124-8.056 0-11.129-1.561-1.537-3.609-2.305-5.657-2.305zM12 8.499c.668 0 1.296.26 1.768.731.976.976.976 2.562 0 3.537-.473.472-1.1.731-1.768.731s-1.295-.26-1.768-.731c-.976-.976-.976-2.562 0-3.537.473-.471 1.101-.731 1.768-.731m0-1c-.896 0-1.792.342-2.475 1.024-1.367 1.367-1.367 3.584 0 4.951.684.684 1.578 1.024 2.475 1.024s1.792-.342 2.475-1.024c1.366-1.367 1.366-3.584 0-4.951-.683-.683-1.579-1.024-2.475-1.024z";
var svglocate1 = "M5.469,0.021 C2.453,0.021 0.009,2.317 0.009,5.151 C0.009,5.883 0.175,6.579 0.467,7.208 L5.469,15.876 L10.469,7.208 C10.763,6.579 10.928,5.884 10.928,5.151 C10.928,2.316 8.484,0.021 5.469,0.021 L5.469,0.021 Z M5.492,9.042 C3.535,9.042 1.95,7.446 1.95,5.475 C1.95,3.506 3.535,1.91 5.492,1.91 C7.446,1.91 9.031,3.507 9.031,5.475 C9.031,7.446 7.446,9.042 5.492,9.042 L5.492,9.042 Z" +
    "M7.979,5.504 C7.979,6.88 6.871,7.996 5.5,7.996 C4.133,7.996 3.023,6.88 3.023,5.504 C3.023,4.131 4.132,3.014 5.5,3.014 C6.87,3.014 7.979,4.131 7.979,5.504 L7.979,5.504 Z";


require(["esri/map", "esri/dijit/Scalebar", "esri/geometry/Extent", "esri/layers/GraphicsLayer", "esri/layers/FeatureLayer", 'esri/layers/ArcGISTiledMapServiceLayer',
        "esri/layers/ArcGISDynamicMapServiceLayer", "dojo/dom", "dojo/on", "dojo/domReady!"],
    function( Map, Scalebar, Extent, GraphicsLayer, FeatureLayer, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, dom, on ) {
        map = new Map("map", {
        //basemap: "dark-gray-vector",
            //basemap: "osm",
        center: [120.1751, 30.2541],
        zoom: 14
            //extent: new Extent({xmin:-20098296,ymin:-2804413,xmax:5920428,ymax:15813776,spatialReference:{wkid:54032}
        });
        BaseMapURL = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
        var layer0 = new ArcGISTiledMapServiceLayer(BaseMapURL);
        map.addLayer(layer0);
        var scalebar = new Scalebar({
            map: map,
            scalebarStyle: "ruler",
            // "dual" displays both miles and kilometers
            // "english" is the default, which displays miles
            // use "metric" for kilometers
            scalebarUnit: "metric"
        });

        polygonLayer = new GraphicsLayer({ id: "query_polygon" });
        poiRangeLayer = new GraphicsLayer({ id: "query_poi" });
        poiLayer = new GraphicsLayer({ id: "poi" });
        optimalLayer = new GraphicsLayer({ id: "optimal" });
        houseRecoLayer = new GraphicsLayer({ id: "houseRecoLayer" });
        detailLayer = new GraphicsLayer({ id: "detailLayer" });
        houseBasic = new GraphicsLayer({ id: "houseBasic" });

        map.addLayer(polygonLayer);
        map.addLayer(poiRangeLayer);
        map.addLayer(poiLayer);
        map.addLayer(optimalLayer);
        map.addLayer(houseRecoLayer);
        map.addLayer(houseBasic);
        map.addLayer(detailLayer);



        serverURL = "http://localhost:6080/arcgis/rest/services/BaseMap/MapServer/";
        var featureLayer = new FeatureLayer(serverURL+"1");
        map.addLayer(featureLayer);

        locationURL = "http://222.205.72.136:6080/arcgis/rest/services/LocationMap/MapServer/";
        var layer1 = new ArcGISDynamicMapServiceLayer(locationURL);
        layer1.opacity = 0.5;
        map.addLayer(layer1);
        map.getLayer("layer2").hide();

        priceperURL = "http://222.205.72.136:6080/arcgis/rest/services/PricePerMap/MapServer/";
        var layer2 = new ArcGISDynamicMapServiceLayer(priceperURL);
        layer2.opacity = 0.5;
        map.addLayer(layer2);
        map.getLayer("layer3").hide();

        transportURL = "http://222.205.72.136:6080/arcgis/rest/services/TransportMap/MapServer/";
        var layer3 = new ArcGISDynamicMapServiceLayer(transportURL);
        layer3.opacity = 0.5;
        map.addLayer(layer3);
        map.getLayer("layer4").hide();

        environmentURL = "http://222.205.72.136:6080/arcgis/rest/services/EnvironmentMap/MapServer/";
        var layer4 = new ArcGISDynamicMapServiceLayer(environmentURL);
        layer4.opacity = 0.5;
        map.addLayer(layer4);
        map.getLayer("layer5").hide();

        educationURL = "http://222.205.72.136:6080/arcgis/rest/services/EducationMap/MapServer/";
        var layer5 = new ArcGISDynamicMapServiceLayer(educationURL);
        layer5.opacity = 0.5;
        map.addLayer(layer5);
        map.getLayer("layer6").hide();

        entertainmentURL = "http://222.205.72.136:6080/arcgis/rest/services/EntertainmentMap/MapServer/";
        var layer6 = new ArcGISDynamicMapServiceLayer(entertainmentURL);
        layer6.opacity = 0.5;
        map.addLayer(layer6);
        map.getLayer("layer7").hide();

        shopURL = "http://222.205.72.136:6080/arcgis/rest/services/ShopMap/MapServer/";
        var layer7 = new ArcGISDynamicMapServiceLayer(shopURL);
        layer7.opacity = 0.5;
        map.addLayer(layer7);
        map.getLayer("layer8").hide();

        financeURL = "http://222.205.72.136:6080/arcgis/rest/services/FinanceMap/MapServer/";
        var layer8 = new ArcGISDynamicMapServiceLayer(financeURL);
        layer8.opacity = 0.5;
        map.addLayer(layer8);
        map.getLayer("layer9").hide();

        lifeURL = "http://222.205.72.136:6080/arcgis/rest/services/LifeMap/MapServer/";
        var layer9 = new ArcGISDynamicMapServiceLayer(lifeURL);
        layer9.opacity = 0.5;
        map.addLayer(layer9);
        map.getLayer("layer10").hide();

        //console.log(map.layerIds);

        $("#location").click(function () {
            var sobu = document.getElementById('location');
            if (sobu.checked) {
                map.getLayer("layer2").show();
            } else {
                map.getLayer("layer2").hide();
            }
        });

        $("#priceper").click(function () {
            var sobu = document.getElementById('priceper');
            if (sobu.checked) {
                map.getLayer("layer3").show();
            } else {
                map.getLayer("layer3").hide();
            }
        });


        $("#transport").click(function () {
            var sobu = document.getElementById('transport');
            if (sobu.checked) {
                map.getLayer("layer4").show();
            } else {
                map.getLayer("layer4").hide();
            }
        });

        $("#environment").click(function () {
            var sobu = document.getElementById('environment');
            if (sobu.checked) {
                map.getLayer("layer5").show();
            } else {
                map.getLayer("layer5").hide();
            }
        });

        $("#education").click(function () {
            var sobu = document.getElementById('education');
            if (sobu.checked) {
                map.getLayer("layer6").show();
            } else {
                map.getLayer("layer6").hide();
            }
        });

        $("#entertainment").click(function () {
            var sobu = document.getElementById('entertainment');
            if (sobu.checked) {
                map.getLayer("layer7").show();
            } else {
                map.getLayer("layer7").hide();
            }
        });

        $("#shop").click(function () {
            var sobu = document.getElementById('shop');
            if (sobu.checked) {
                map.getLayer("layer8").show();
            } else {
                map.getLayer("layer8").hide();
            }
        });

        $("#finance").click(function () {
            var sobu = document.getElementById('finance');
            if (sobu.checked) {
                map.getLayer("layer9").show();
            } else {
                map.getLayer("layer9").hide();
            }
        });

        $("#life").click(function () {
            var sobu = document.getElementById('life');
            if (sobu.checked) {
                map.getLayer("layer10").show();
            } else {
                map.getLayer("layer10").hide();
            }
        });

});