      var map, tb;//地图对象，工具条
      require([
              "esri/map", "esri/toolbars/draw",
              "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
              "esri/symbols/SimpleFillSymbol", "esri/symbols/CartographicLineSymbol", 
              "esri/graphic", "esri/tasks/LengthsParameters","esri/tasks/AreasAndLengthsParameters",
              "esri/Color", "dojo/dom", "dojo/on", "esri/geometry/Point","esri/tasks/GeometryService","dojo/domReady!"
      ], function(
                Map, Draw,
                SimpleMarkerSymbol, SimpleLineSymbol,
                SimpleFillSymbol, CartographicLineSymbol, 
                Graphic, LengthsParameters,AreasAndLengthsParameters,
                Color, dom, on,Point,GeometryService
      ) {
                map = new Map("map");
                var layer = new esri.layers. ArcGISDynamicMapServiceLayer 
                            ("http://localhost:6080/arcgis/rest/services/Topology/MapServer"); 
                map.addLayer(layer);
                map.on("load", initToolbar());
                // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
                var markerSymbol = new SimpleMarkerSymbol();
                markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
                markerSymbol.setColor(new Color("#00FFFF"));

                // lineSymbol used for freehand polyline, polyline and line. 
                var lineSymbol = new CartographicLineSymbol(
                  CartographicLineSymbol.STYLE_SOLID,
                  new Color([255,0,0]), 10, 
                  CartographicLineSymbol.CAP_ROUND,
                  CartographicLineSymbol.JOIN_MITER, 5
                );

        // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
        // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png

           var fillSymbol = new SimpleFillSymbol(
          "solid",
          new SimpleLineSymbol("solid", new Color([195, 176, 23]), 2), 
          null
        );

//初始化工具条
        function initToolbar() {
          tb = new esri.toolbars.Draw(map);
          tb.on("draw-end", addGraphic);
          tb.on("draw-end",showMeasureResults);

          // event delegation so a click handler is not
          // needed for each individual button
          on(dom.byId("toolbar"), "click", function(evt) 
          {
                  if ( evt.target.id === "toolbar" ) 
                  {
                          return;
                  }
                  var tool = evt.target.id.toLowerCase();
                  map.disableMapNavigation();
                  tb.activate(tool);
          });
        }
//        添加图形对象到地图
        function addGraphic(evt) {
          //deactivate the toolbar and clear existing graphics 
          tb.deactivate(); 
          map.enableMapNavigation();
          // figure out which symbol to use
          var symbol;
          console.log(evt.geometry.type);
          if ( evt.geometry.type === "point" || evt.geometry.type === "multipoint") 
          {
                  symbol = markerSymbol;
          } 
          else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") 
          {
                  symbol = lineSymbol;
          }
          else {
            symbol = fillSymbol;
          }

          map.graphics.add(new Graphic(evt.geometry, symbol));
        }

          //显示测量结果
      var gsvc = new GeometryService("http://localhost:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      var showPt=null;
      function showMeasureResults(evt){
        var geometry = evt.geometry;
          switch (geometry.type) {
                case "polyline":{
                  var length = geometry.paths[0].length;
                  showPt = new Point(geometry.paths[0][length-1],map.spatialReference);
                  var lengthParams = new LengthsParameters();
                  lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
                  lengthParams.polylines = [geometry];
                  var apple=gsvc.lengths(lengthParams);
                  console.log(apple);
                  break;
                }
                case "polygon":{
                  showPt = new Point(geometry.rings[0][0],map.spatialReference);
                  var areasAndLengthParams = new AreasAndLengthsParameters();
                  areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
                  areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_METERS;
                  gsvc.simplify([geometry], function(simplifiedGeometries) {
                    areasAndLengthParams.polygons = simplifiedGeometries;
                    gsvc.areasAndLengths(areasAndLengthParams);
                  });
                  break;
          }
}
}

      gsvc.on("lengths-complete",outputLength);
      function outputLength(evtObj){
        var result = evtObj.result;
/*        showmeasureInfo(showPt, result.lengths[0].toFixed(3), "千米");*/
        console.log('长度：'+result.lengths[0].toFixed(3));
      };
      gsvc.on("areas-and-lengths-complete",outputAreaAndLength);
      function outputAreaAndLength(evtObj){
        var result = evtObj.result;
/*        showmeasureInfo(showPt, result.areas[0].toFixed(3), "平方千米");*/
        console.log('面积：'+result.areas[0].toFixed(3));
        console.log('周长：'+result.lengths[0].toFixed(3));
      };


});