var poiQueryRenderer;
var houseQueryRenderer;



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

require( [
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Point", "esri/toolbars/draw",
    "esri/layers/GraphicsLayer", "esri/graphic",
    "esri/Color", "esri/InfoTemplate",
    "dojo/dom", "dojo/on", "dojo/domReady!"
], function(
    SimpleMarkerSymbol,
    Point, Draw,
    GraphicsLayer, Graphic,
    Color, InfoTemplate, dom, on
) {
    function poiQueryRender(json) {
        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setColor(new Color("#9955FF"));
        markerSymbol.setSize(6);

        poiLayer.clear();

        for (i in json) {
            var graphic = new Graphic(new Point(json[i].lon, json[i].lat), markerSymbol);
            var content = "地址: " + json[i].address;
            content += "<br>联系电话: " + json[i].tel;
            var infoTemplate = new InfoTemplate(json[i].name, content);
            graphic.setInfoTemplate(infoTemplate);
            poiLayer.add(graphic);
        }
    }
    poiQueryRenderer = poiQueryRender;

    function houseQueryRender(json) {
        var markerSymbol = new SimpleMarkerSymbol();
        //markerSymbol.setPath(svgPath);
        //markerSymbol.setColor(new Color("#00343F"));
        markerSymbol.setColor(new Color("#FFFF77"));
        markerSymbol.setSize(9);

        houseBasic.clear();

        for (i in json) {
            var graphic = new Graphic(new Point(json[i].lon, json[i].lat), markerSymbol);
            var content = "面积(平方米): " + json[i].area;
            content += "<br>价格: " + json[i].price;
            content += "<br>房屋结构: " + json[i].structure;

            var infoTemplate = new InfoTemplate(json[i].commname, content);
            graphic.setInfoTemplate(infoTemplate);
            //map.graphics.add(graphic);
            houseBasic.add(graphic)
        }
    }
    houseQueryRenderer = houseQueryRender;

});