dojo.require("esri.map");
dojo.require("esri.toolbars.draw");
dojo.require("esri.tasks.geometry");

var map, toolbar, symbol, geometryService;
function init()
{
   map = new esri.Map("map");
   var dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/Topology/MapServer");
   map.addLayer(dynamicMapServiceLayer);
   toolbar = new esri.toolbars.Draw(map);
   //添加toolbar画图完成后天事件监听调用doMeasure
   dojo.connect(toolbar, "onDrawEnd", doMeasure);
   
   //实例化GeometryService，地址为ags发布的GeometryServer
   geometryService = new esri.tasks.GeometryService("http://mypc/ArcGIS/rest/services/Geometry/GeometryServer");
   //添加onProjectComplete完成后事件监听
   dojo.connect(geometryService, "onProjectComplete", projectComplete);
}

//量算
function doMeasure(geometry)
{
   //更加类型设置显示样式
   switch (geometry.type)
   {
      case "polyline":
         var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0,0,0]), 2);
         break;
      case "polygon":
         var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25]));
         break;
   }
   //设置样式
   var graphic = new esri.Graphic(geometry, symbol);
   //清除上一次的画图内容
   map.graphics.clear();
   //
   map.graphics.add(graphic);
   //进行投影转换，完成后调用projectComplete
   geometryService.project([graphic],new esri.SpatialReference({"wkid":32618}));
}

//投影转换完成后调用方法
function projectComplete(graphics)
{
  //如果为线类型就进行lengths距离测算
  if(graphics[0].geometry.type=="polyline")
  {
     dojo.connect(geometryService, "onLengthsComplete", outputDistance);
     geometryService.lengths([graphics[0]]);
  }
  //如果为面类型需要先进行simplify操作在进行面积测算
  else if(graphics[0].geometry.type=="polygon")
  {
     dojo.connect(geometryService, "onSimplifyComplete", simplifyComplete);
     geometryService.simplify([graphics[0]]);
  }
}

//显示测量距离
function outputDistance(result)
{
   dojo.byId("distance").innerHTML = "距离："+dojo.number.format(result.lengths[0] / 1000) + "千米";
}

//显示测量面积
function outputAreaAndLength(result)
{
   dojo.byId("distance").innerHTML ="面积："+ dojo.number.format(result.areas[0] / 1000000) + "平方公里"+" 长度："+dojo.number.format(result.lengths[0]/1000) + "千米";
}

//对面对象simplify完成后调用方法
function simplifyComplete(graphics)
{
  dojo.connect(geometryService, "onAreasAndLengthsComplete", outputAreaAndLength);
  //进行面积测量
  geometryService.areasAndLengths(graphics);
}

dojo.addOnLoad(init);