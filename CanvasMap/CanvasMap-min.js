function Graticule(a,b){function c(a,b,c,d){var l;l=Math.PI/10;c=c.getContext("2d");c=new LineDrawer(0,b,a,c);for(a=0;5.5>a;a+=1)b=-Math.PI/2+a*l,c.projectDraw(d,b);c.stroke();for(a=0;5.5>a;a+=1)b=a*l,c.projectDraw(d,b);c.stroke()}function d(a,b,c,d){var l;l=2*Math.PI/19;c=c.getContext("2d");c=new LineDrawer(0,b,a,c);for(a=0;20>a;a+=1)b=-Math.PI+a*l,c.projectDraw(b,d);c.stroke()}this.render=function(e,f,h,g){var l,m,k;l=g.getContext("2d");l.save();l.translate(g.width/2,g.height/2);applyStyle(a,l);
for(m=0;m<360/b;m+=1){for(k=-Math.PI+m*b/180*Math.PI-f;k<-Math.PI;)k+=2*Math.PI;for(;k>Math.PI;)k-=2*Math.PI;c(e,h,g,k)}for(m=1;m<180/b;m+=1)f=-Math.PI/2+m*b/180*Math.PI,d(e,h,g,f);if("function"!==typeof e.isPoleInsideGraticule||!1===e.isPoleInsideGraticule())c(e,h,g,-Math.PI),c(e,h,g,Math.PI);d(e,h,g,-Math.PI/2);d(e,h,g,Math.PI/2);l.restore()};this.load=function(a,b,c){}}
function Layer(a,b){var c=this;this.dbfFile=this.shpFile=null;this.render=function(a,e,f,h){if(null!==c.shpFile)switch(c.shpFile.header.shapeType){case ShpType.SHAPE_POLYGON:case ShpType.SHAPE_POLYLINE:var g,l,m;g=h.getContext("2d");g.save();g.translate(h.width/2,h.height/2);applyStyle(b,g);e=new LineDrawer(e,f,a,g);for(a=0;a<c.shpFile.records.length;a+=1){f=c.shpFile.records[a];f=f.shape;for(h=0;h<f.rings.length;h+=1){l=f.rings[h];for(m=0;m<l.length;m+=1)e.intersectProjectDraw(l[m].x,l[m].y);e.stroke()}}g.restore();
break;case ShpType.SHAPE_POINT:var k,q,p,w,u,s;m=[];p=h.width/2;w=-h.height/2;g=h.getContext("2d");g.save();u="undefined"!==typeof b&&b.hasOwnProperty("fillStyle");s="undefined"!==typeof b&&b.hasOwnProperty("strokeStyle");u&&"undefined"!==typeof b.fillStyle&&(g.fillStyle=b.fillStyle);s&&"undefined"!==typeof b.strokeStyle&&(g.strokeStyle=b.strokeStyle);"undefined"!==typeof b&&(b.hasOwnProperty("lineWidth")&&"undefined"!==typeof b.lineWidth)&&(g.lineWidth=b.lineWidth);for(l=0;l<c.shpFile.records.length;l+=
1){k=c.shpFile.records[l];k=k.shape;q=k.x;for(q-=e;q<-Math.PI;)q+=2*Math.PI;for(;q>Math.PI;)q-=2*Math.PI;k=k.y;a.forward(q,k,m);k=m[0]*f+p;q=h.height-m[1]*f+w;u&&"undefined"!==typeof b.fillStyle&&g.fillRect(k-2,q-2,4,4);s&&"undefined"!==typeof b.strokeStyle&&g.strokeRect(k-2,q-2,4,4)}g.restore()}};this.load=function(b){function e(){alert("Failed to load "+a)}function f(){alert("Failed to load "+a)}function h(a){c.shpFile=new ShpFile(a.binaryResponse);switch(c.shpFile.header.shapeType){case ShpType.SHAPE_POLYGON:case ShpType.SHAPE_POLYLINE:a=
c.shpFile.records;var h=Math.PI/180,e,f,g,l,s,v,n,r,t,x,z,A,y;l=0;for(e=a.length;l<e;l+=1){y=a[l].shape;t=Number.MAX_VALUE;x=-Number.MAX_VALUE;z=Number.MAX_VALUE;A=-Number.MAX_VALUE;s=0;for(f=y.rings.length;s<f;s+=1){v=y.rings[s];n=0;for(g=v.length;n<g;n+=1)r=v[n].x*h,r>x&&(x=r),r<t&&(t=r),r>Math.PI?r=Math.PI:r<-Math.PI&&(r=-Math.PI),v[n].x=r,r=v[n].y*h,r>Math.PI/2?r=Math.PI/2:r<-Math.PI/2&&(r=-Math.PI/2),r>A&&(A=r),r<z&&(z=r),v[n].y=r}y.box.xMin=t;y.box.xMax=x;y.box.yMin=z;y.box.yMax=A}break;case ShpType.SHAPE_POINT:a=
c.shpFile.records;f=Math.PI/180;h=0;for(e=a.length;h<e;h+=1)g=a[h].shape,g.x*=f,g.y*=f}null!==c.dbfFile&&b.render()}function g(a){c.dbfFile=new DbfFile(a.binaryResponse);null!==c.shpFile&&b.render()}try{new BinaryAjax(a+".shp",h,e),new BinaryAjax(a+".dbf",g,f)}catch(l){alert(l)}}}function pointLineDistanceSquare(a,b,c,d,e,f){e-=c;f-=d;a=e*(d-b)-(c-a)*f;return a*a/(e*e+f*f)}function adjustLongitude(a,b){for(a-=b;a<-Math.PI;)a+=2*Math.PI;for(;a>Math.PI;)a-=2*Math.PI;return a}
function SphericalRotation(a){var b,c;b=Math.sin(a);c=Math.cos(a);this.getPoleLat=function(){return a};this.transform=function(a,e,f){var h,g;h=Math.sin(a);g=Math.cos(a);a=Math.sin(e);e=Math.cos(e);g*=e;f[0]=Math.atan2(e*h,b*g+c*a);a=b*a-c*g;f[1]=Math.asin(a)};this.transformInv=function(a,e,f){var h=Math.sin(a),g=Math.cos(a);a=Math.sin(e);e=Math.cos(e);g*=e;f[0]=Math.atan2(e*h,b*g-c*a);f[1]=Math.asin(b*a+c*g)}}
function LineDrawer(a,b,c,d){function e(a,m,q,v){var n,r,t=[];r=[];if(!(50<(v+=1)))a=adjustLongitude(a,q),c.forward(a,m,t),k?isFinite(t[0])&&isFinite(t[1])&&(d.beginPath(),d.moveTo(t[0]*b,-t[1]*b),k=!1):(q=0.5*(g+a),n=0.5*(l+m),c.forward(q,n,r),r=pointLineDistanceSquare(r[0],r[1],f,h,t[0],t[1]),isFinite(r)?(r>p&&(e(q,n,0,v),e(a,m,0,v)),d.lineTo(t[0]*b,-t[1]*b)):(d.stroke(),k=!0)),f=t[0],h=t[1],g=a,l=m}var f,h,g,l,m,k=!0,q,p;new SphericalRotation(Math.PI/4);q=0.25/b;p=q*q;this.stroke=function(){d.stroke();
k=!0};this.projectIntersectingLineTo=function(b,c,h,d){var f,g,t,x,l,k,m;f=b-h;g=c-d;t=Math.PI+a;x=-Math.PI+a;b>t?(l=Math.PI,m=d+g*(t-h)/f,k=-Math.PI):h>t?(l=-Math.PI,m=d+g*(t-h)/f,k=Math.PI):b<x?(l=-Math.PI,m=d+g*(x-h)/f,k=Math.PI):h<x&&(l=Math.PI,m=d+g*(x-h)/f,k=-Math.PI);e(l,m,0,1);this.stroke();e(k,m,0,1);e(b,c,a,1)};this.projectDraw=function(a,b){e(a,b,0,1)};this.intersectProjectDraw=function(b,c){var h;k?m=h=b-a<-Math.PI||b-a>Math.PI:h=b-a<-Math.PI||b-a>Math.PI;m!==h?(m=h,this.projectIntersectingLineTo(b,
c,g,l)):e(b,c,a,1)}}function backingScale(a){return(window.devicePixelRatio||1)/(a.webkitBackingStorePixelRatio||a.mozBackingStorePixelRatio||a.msBackingStorePixelRatio||a.oBackingStorePixelRatio||a.backingStorePixelRatio||1)}function applyStyle(a,b){var c,d;if("undefined"!==typeof a)for(c in a)a.hasOwnProperty(c)&&(d=a[c],"lineWidth"===c&&(d*=backingScale(b)),b[c]=d)}
function Map(a,b){var c,d=!0,e=0,f=1;c={forward:function(a,b,c){c[0]=a;c[1]=b}};this.load=function(){var b;for(b=0;b<a.length;b+=1)a[b].load(this)};this.getCanvas=function(){return b};this.getProjection=function(){return c};this.setProjection=function(a){c=a;this.render()};this.getCentralLongitude=function(){return e};this.setCentralLongitude=function(a){isNaN(a)||(e=a,e>Math.PI?e-=2*Math.PI:e<-Math.PI&&(e+=2*Math.PI),this.render())};this.setDraw=function(a){d=a;this.render()};this.isDrawn=function(){return d};
this.clear=function(){b.getContext("2d").clearRect(0,0,b.width,b.height)};this.getScale=function(){return f};this.setScale=function(a){f=a;this.render()};this.getMaximumHorizontalScale=function(){var a,d=[];"function"===typeof c.getGraticuleWidth?a=c.getGraticuleWidth():(c.forward(Math.PI,0,d),a=2*d[0],c.forward(Math.PI,Math.PI/2,d),a=Math.max(a,d[0]));return b.width/a};this.getMaximumVerticalScale=function(){var a,d=[];"function"===typeof c.getGraticuleHeight?a=c.getGraticuleHeight():(c.forward(0,
Math.PI/2,d),a=2*d[1],c.forward(Math.PI,Math.PI/2,d),a=Math.max(a,d[1]));return b.height/a};this.getGraticuleWidth=function(){var a,b=[];"function"===typeof c.getGraticuleWidth?a=c.getGraticuleWidth():(c.forward(Math.PI,0,b),a=2*b[0],c.forward(Math.PI,Math.PI/2,b),a=Math.max(a,b[0]));return a};this.getGraticuleHeight=function(){var a,b=[];"function"===typeof c.getGraticuleHeight?a=c.getGraticuleHeight():(c.forward(0,Math.PI/2,b),a=2*b[1],c.forward(Math.PI,Math.PI/2,b),a=Math.max(a,b[1]));return a};
this.scaleMapToCanvas=function(){var a,b;a=this.getMaximumHorizontalScale();b=this.getMaximumVerticalScale();this.setScale(Math.min(a,b))};this.render=function(){var h;this.clear();if(d)for(h=0;h<a.length;h+=1)a[h].render(c,e,f,b)};this.resize=function(a,c){var d=backingScale(b.getContext("2d"));b.setAttribute("width",a*d);b.setAttribute("height",c*d);this.scaleMapToCanvas();this.render()}}function createMap(a,b,c,d,e){a=new Map(a,c);a.setProjection(b);a.resize(d,e);a.load();return a}
function BinaryFileWrapper(a){this.position=0;this.bigEndian=!0;this.getByte=function(){var b=a.getByteAt(this.position);this.position++;return b};this.getLength=function(){return a.getLength()};this.getSByte=function(){var b=a.getSByteAt(this.position);this.position++;return b};this.getShort=function(){var b=a.getShortAt(this.position,this.bigEndian);this.position+=2;return b};this.getSShort=function(){var b=a.getSShortAt(this.position,this.bigEndian);this.position+=2;return b};this.getLong=function(){var b=
a.getLongAt(this.position,this.bigEndian);this.position+=4;return b};this.getSLong=function(){var b=a.getSLongAt(this.position,this.bigEndian);this.position+=4;return b};this.getString=function(b){var c=a.getStringAt(this.position,b);this.position+=b;return c};this.getDoubleAt=function(b,c){var d=a.getLongAt(b+(c?0:4),c),e=a.getLongAt(b+(c?4:0),c),f=(d>>20&2047)-1023;return 1*(d>>31?-1:1)*(d&1048575|1048576)/Math.pow(2,20)*Math.pow(2,f)+1*e/Math.pow(2,52)*Math.pow(2,f)};this.getDouble=function(){var a=
this.getDoubleAt(this.position,this.bigEndian);this.position+=8;return a};this.getChar=function(){var b=a.getCharAt(this.position);this.position++;return b}}function DbfFile(a){this.src=new BinaryFileWrapper(a);(new Date).getTime();this.header=new DbfHeader(this.src);(new Date).getTime();(new Date).getTime();this.records=[];for(a=0;a<this.header.recordCount;a++){var b=this.getRecord(a);this.records.push(b)}(new Date).getTime()}
DbfFile.prototype.getRecord=function(a){if(a>this.header.recordCount)throw new DbfError("",DbfError.ERROR_OUTOFBOUNDS);this.src.position=this.header.recordsOffset+a*this.header.recordSize;this.src.bigEndian=!1;return new DbfRecord(this.src,this.header)};
function DbfHeader(a){a.bigEndian=!1;this.version=a.getSByte();this.updateYear=1900+a.getByte();this.updateMonth=a.getByte();this.updateDay=a.getByte();this.recordCount=a.getLong();this.headerSize=a.getShort();this.recordSize=a.getShort();a.position+=2;this.incompleteTransaction=a.getByte();this.encrypted=a.getByte();a.position+=12;this.mdx=a.getByte();this.language=a.getByte();a.position+=2;for(this.fields=[];13!=a.getSByte();)a.position-=1,this.fields.push(new DbfField(a));this.recordsOffset=this.headerSize+
1}function DbfField(a){this.name=this.readZeroTermANSIString(a);a.position+=10-this.name.length;this.type=a.getByte();this.address=a.getLong();this.length=a.getByte();this.decimals=a.getByte();a.position+=2;this.id=a.getByte();a.position+=2;this.setFlag=a.getByte();a.position+=7;this.indexFlag=a.getByte()}DbfField.prototype.readZeroTermANSIString=function(a){for(var b=[],c;c=a.getByte();)b[b.length]=String.fromCharCode(c);return b.join("")};
function DbfRecord(a,b){this.offset=a.position;this.values={};for(var c=0;c<b.fields.length;c++){var d=b.fields[c];this.values[d.name]=a.getString(d.length)}}
var BinaryFile=function(a,b,c){var d=a,e=b||0,f=0;this.getRawData=function(){return d};"string"==typeof a?(f=c||d.length,this.getByteAt=function(a){return d.charCodeAt(a+e)&255}):"unknown"==typeof a&&(f=c||IEBinary_getLength(d),this.getByteAt=function(a){return IEBinary_getByteAt(d,a+e)});this.getLength=function(){return f};this.getSByteAt=function(a){a=this.getByteAt(a);return 127<a?a-256:a};this.getShortAt=function(a,b){var c=b?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+
this.getByteAt(a);0>c&&(c+=65536);return c};this.getSShortAt=function(a,b){var c=this.getShortAt(a,b);return 32767<c?c-65536:c};this.getLongAt=function(a,b){var c=this.getByteAt(a),d=this.getByteAt(a+1),e=this.getByteAt(a+2),f=this.getByteAt(a+3),c=b?(((c<<8)+d<<8)+e<<8)+f:(((f<<8)+e<<8)+d<<8)+c;0>c&&(c+=4294967296);return c};this.getSLongAt=function(a,b){var c=this.getLongAt(a,b);return 2147483647<c?c-4294967296:c};this.getStringAt=function(a,b){for(var c=[],d=a,e=0;d<a+b;d++,e++)c[e]=String.fromCharCode(this.getByteAt(d));
return c.join("")};this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))};this.toBase64=function(){return window.btoa(d)};this.fromBase64=function(a){d=window.atob(a)}},BinaryAjax=function(){function a(){var a=null;window.XMLHttpRequest?a=new XMLHttpRequest:window.ActiveXObject&&(a=new ActiveXObject("Microsoft.XMLHTTP"));return a}function b(b,c,f,h){var g=a();g?(c&&("undefined"!=typeof g.onload?g.onload=function(){"200"==g.status?c(this,h):f&&f();g=null}:g.onreadystatechange=function(){4==
g.readyState&&("200"==g.status?c(this,h):f&&f(),g=null)}),g.open("HEAD",b,!0),g.send(null)):f&&f()}function c(b,c,f,h,g,l,m){var k=a();if(k){var q=0;g&&!l&&(q=g[0]);var p=0;g&&(p=g[1]-g[0]+1);c&&("undefined"!=typeof k.onload?k.onload=function(){"200"==k.status||"206"==k.status||"0"==k.status?(k.binaryResponse=new BinaryFile(k.responseText,q,p),k.fileSize=m||k.getResponseHeader("Content-Length"),c(k,h)):f&&f();k=null}:k.onreadystatechange=function(){if(4==k.readyState){if("200"==k.status||"206"==k.status||
"0"==k.status){var a={status:k.status,binaryResponse:new BinaryFile(k.responseBody,q,p),fileSize:m||k.getResponseHeader("Content-Length")};c(a,h)}else f&&f();k=null}});k.open("GET",b,!0);k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");g&&l&&k.setRequestHeader("Range","bytes="+g[0]+"-"+g[1]);k.setRequestHeader("If-Modified-Since","Sat, 1 Jan 1970 00:00:00 GMT");k.send(null)}else f&&f()}return function(a,e,f,h,g){g?b(a,function(b){var m=parseInt(b.getResponseHeader("Content-Length"),
10);b=b.getResponseHeader("Accept-Ranges");var k;k=g[0];0>g[0]&&(k+=m);c(a,e,f,h,[k,k+g[1]-1],"bytes"==b,m)}):c(a,e,f,h)}}();document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n\tIEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n\tIEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n\x3c/script>\r\n");
window.CanvasRenderingContext2D||function(){function a(a){var b=a.srcElement;switch(a.propertyName){case "width":b.style.width=b.attributes.width.nodeValue+"px";b.getContext().clearRect();break;case "height":b.style.height=b.attributes.height.nodeValue+"px",b.getContext().clearRect()}}function b(a){a=a.srcElement;a.firstChild&&(a.firstChild.style.width=a.clientWidth+"px",a.firstChild.style.height=a.clientHeight+"px")}function c(){return[[1,0,0],[0,1,0],[0,0,1]]}function d(a,b){for(var d=c(),e=0;3>
e;e++)for(var f=0;3>f;f++){for(var h=0,g=0;3>g;g++)h+=a[e][g]*b[g][f];d[e][f]=h}return d}function e(a,b){b.fillStyle=a.fillStyle;b.lineCap=a.lineCap;b.lineJoin=a.lineJoin;b.lineWidth=a.lineWidth;b.miterLimit=a.miterLimit;b.shadowBlur=a.shadowBlur;b.shadowColor=a.shadowColor;b.shadowOffsetX=a.shadowOffsetX;b.shadowOffsetY=a.shadowOffsetY;b.strokeStyle=a.strokeStyle;b.arcScaleX_=a.arcScaleX_;b.arcScaleY_=a.arcScaleY_}function f(a){var b,c=1;a=String(a);if("rgb"==a.substring(0,3)){b=a.indexOf("(",3);
var d=a.indexOf(")",b+1),d=a.substring(b+1,d).split(",");b="#";for(var e=0;3>e;e++)b+=v[Number(d[e])];4==d.length&&"a"==a.substr(3,1)&&(c=d[3])}else b=a;return[b,c]}function h(a){switch(a){case "butt":return"flat";case "round":return"round";default:return"square"}}function g(a){this.m_=c();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=1*u;this.globalAlpha=1;this.canvas=a;var b=
a.ownerDocument.createElement("div");b.style.width=a.clientWidth+"px";b.style.height=a.clientHeight+"px";b.style.overflow="hidden";b.style.position="absolute";a.appendChild(b);this.element_=b;this.arcScaleY_=this.arcScaleX_=1}function l(a){this.type_=a;this.radius2_=this.radius1_=0;this.colors_=[];this.focus_={x:0,y:0}}function m(){}var k=Math,q=k.round,p=k.sin,w=k.cos,u=10,s=u/2,k={init:function(a){var b=a||document;if(/MSIE/.test(navigator.userAgent)&&!window.opera){var c=this;b.attachEvent("onreadystatechange",
function(){c.init_(b)})}},init_:function(a){if("complete"==a.readyState){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml");a.createStyleSheet().cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}";a=a.getElementsByTagName("canvas");for(var b=0;b<a.length;b++)a[b].getContext||this.initElement(a[b])}},fixElement_:function(a){var b=a.outerHTML,c=a.ownerDocument.createElement(b);if("/>"!=b.slice(-2)){for(var b=
"/"+a.tagName,d;(d=a.nextSibling)&&d.tagName!=b;)d.removeNode();d&&d.removeNode()}a.parentNode.replaceChild(c,a);return c},initElement:function(c){c=this.fixElement_(c);c.getContext=function(){return this.context_?this.context_:this.context_=new g(this)};c.attachEvent("onpropertychange",a);c.attachEvent("onresize",b);var d=c.attributes;d.width&&d.width.specified?c.style.width=d.width.nodeValue+"px":c.width=c.clientWidth;d.height&&d.height.specified?c.style.height=d.height.nodeValue+"px":c.height=
c.clientHeight;return c}};k.init();for(var v=[],n=0;16>n;n++)for(var r=0;16>r;r++)v[16*n+r]=n.toString(16)+r.toString(16);n=g.prototype;n.clearRect=function(){this.element_.innerHTML="";this.currentPath_=[]};n.beginPath=function(){this.currentPath_=[]};n.moveTo=function(a,b){this.currentPath_.push({type:"moveTo",x:a,y:b});this.currentX_=a;this.currentY_=b};n.lineTo=function(a,b){this.currentPath_.push({type:"lineTo",x:a,y:b});this.currentX_=a;this.currentY_=b};n.bezierCurveTo=function(a,b,c,d,e,f){this.currentPath_.push({type:"bezierCurveTo",
cp1x:a,cp1y:b,cp2x:c,cp2y:d,x:e,y:f});this.currentX_=e;this.currentY_=f};n.quadraticCurveTo=function(a,b,c,d){a=this.currentX_+2/3*(a-this.currentX_);b=this.currentY_+2/3*(b-this.currentY_);this.bezierCurveTo(a,b,a+(c-this.currentX_)/3,b+(d-this.currentY_)/3,c,d)};n.arc=function(a,b,c,d,e,f){c*=u;var h=f?"at":"wa",g=a+w(d)*c-s;d=b+p(d)*c-s;var l=a+w(e)*c-s;e=b+p(e)*c-s;g==l&&!f&&(g+=0.125);this.currentPath_.push({type:h,x:a,y:b,radius:c,xStart:g,yStart:d,xEnd:l,yEnd:e})};n.rect=function(a,b,c,d){this.moveTo(a,
b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath()};n.strokeRect=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.stroke()};n.fillRect=function(a,b,c,d){this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+d);this.lineTo(a,b+d);this.closePath();this.fill()};n.createLinearGradient=function(a,b,c,d){return new l("gradient")};n.createRadialGradient=function(a,b,c,d,e,f){d=
new l("gradientradial");d.radius1_=c;d.radius2_=f;d.focus_.x=a;d.focus_.y=b;return d};n.drawImage=function(a,b){var c,d,e,f,h,g,l,k;e=a.runtimeStyle.width;f=a.runtimeStyle.height;a.runtimeStyle.width="auto";a.runtimeStyle.height="auto";var m=a.width,n=a.height;a.runtimeStyle.width=e;a.runtimeStyle.height=f;if(3==arguments.length)c=arguments[1],d=arguments[2],h=g=0,l=e=m,k=f=n;else if(5==arguments.length)c=arguments[1],d=arguments[2],e=arguments[3],f=arguments[4],h=g=0,l=m,k=n;else if(9==arguments.length)h=
arguments[1],g=arguments[2],l=arguments[3],k=arguments[4],c=arguments[5],d=arguments[6],e=arguments[7],f=arguments[8];else throw"Invalid number of arguments";var p=this.getCoords_(c,d),r=[];r.push(" <g_vml_:group",' coordsize="',10*u,",",10*u,'"',' coordorigin="0,0"',' style="width:',10,";height:",10,";position:absolute;");if(1!=this.m_[0][0]||this.m_[0][1]){var s=[];s.push("M11='",this.m_[0][0],"',","M12='",this.m_[1][0],"',","M21='",this.m_[0][1],"',","M22='",this.m_[1][1],"',","Dx='",q(p.x/u),
"',","Dy='",q(p.y/u),"'");var v=this.getCoords_(c+e,d),w=this.getCoords_(c,d+f);c=this.getCoords_(c+e,d+f);p.x=Math.max(p.x,v.x,w.x,c.x);p.y=Math.max(p.y,v.y,w.y,c.y);r.push("padding:0 ",q(p.x/u),"px ",q(p.y/u),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",s.join(""),", sizingmethod='clip');")}else r.push("top:",q(p.y/u),"px;left:",q(p.x/u),"px;");r.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',u*e,";"," height:",u*f,';"',' cropleft="',h/m,'"',' croptop="',g/n,'"',' cropright="',
(m-h-l)/m,'"',' cropbottom="',(n-g-k)/n,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",r.join(""))};n.stroke=function(a){var b=[],c=f(a?this.fillStyle:this.strokeStyle),d=c[0],c=c[1]*this.globalAlpha;b.push("<g_vml_:shape",' fillcolor="',d,'"',' filled="',Boolean(a),'"',' style="position:absolute;width:',10,";height:",10,';"',' coordorigin="0 0" coordsize="',10*u," ",10*u,'"',' stroked="',!a,'"',' strokeweight="',this.lineWidth,'"',' strokecolor="',d,'"',' path="');for(var e=
null,g=null,l=null,k=null,m=0;m<this.currentPath_.length;m++){var n=this.currentPath_[m];if("moveTo"==n.type){b.push(" m ");var p=this.getCoords_(n.x,n.y);b.push(q(p.x),",",q(p.y))}else if("lineTo"==n.type)b.push(" l "),p=this.getCoords_(n.x,n.y),b.push(q(p.x),",",q(p.y));else if("close"==n.type)b.push(" x ");else if("bezierCurveTo"==n.type){b.push(" c ");var p=this.getCoords_(n.x,n.y),r=this.getCoords_(n.cp1x,n.cp1y),n=this.getCoords_(n.cp2x,n.cp2y);b.push(q(r.x),",",q(r.y),",",q(n.x),",",q(n.y),
",",q(p.x),",",q(p.y))}else if("at"==n.type||"wa"==n.type){b.push(" ",n.type," ");var p=this.getCoords_(n.x,n.y),r=this.getCoords_(n.xStart,n.yStart),s=this.getCoords_(n.xEnd,n.yEnd);b.push(q(p.x-this.arcScaleX_*n.radius),",",q(p.y-this.arcScaleY_*n.radius)," ",q(p.x+this.arcScaleX_*n.radius),",",q(p.y+this.arcScaleY_*n.radius)," ",q(r.x),",",q(r.y)," ",q(s.x),",",q(s.y))}if(p){if(null==e||p.x<e)e=p.x;if(null==l||p.x>l)l=p.x;if(null==g||p.y<g)g=p.y;if(null==k||p.y>k)k=p.y}}b.push(' ">');if("object"==
typeof this.fillStyle){d=a="50%";a=l-e;g=k-g;m=a>g?a:g;a=q(100*(this.fillStyle.focus_.x/a)+50)+"%";d=q(100*(this.fillStyle.focus_.y/g)+50)+"%";g=[];"gradientradial"==this.fillStyle.type_?(k=100*(this.fillStyle.radius1_/m),e=100*(this.fillStyle.radius2_/m)-k):(k=0,e=100);r=n=p=l=null;this.fillStyle.colors_.sort(function(a,b){return a.offset-b.offset});for(m=0;m<this.fillStyle.colors_.length;m++){s=this.fillStyle.colors_[m];g.push(s.offset*e+k,"% ",s.color,",");if(s.offset>l||null==l)l=s.offset,p=s.color;
if(s.offset<n||null==n)n=s.offset,r=s.color}g.pop();b.push("<g_vml_:fill",' color="',r,'"',' color2="',p,'"',' type="',this.fillStyle.type_,'"',' focusposition="',a,", ",d,'"',' colors="',g.join(""),'"',' opacity="',c,'" />')}else a?b.push('<g_vml_:fill color="',d,'" opacity="',c,'" />'):b.push("<g_vml_:stroke",' opacity="',c,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',h(this.lineCap),'"',' weight="',this.lineWidth,'px"',' color="',d,'" />');b.push("</g_vml_:shape>");
this.element_.insertAdjacentHTML("beforeEnd",b.join(""));this.currentPath_=[]};n.fill=function(){this.stroke(!0)};n.closePath=function(){this.currentPath_.push({type:"close"})};n.getCoords_=function(a,b){return{x:u*(a*this.m_[0][0]+b*this.m_[1][0]+this.m_[2][0])-s,y:u*(a*this.m_[0][1]+b*this.m_[1][1]+this.m_[2][1])-s}};n.save=function(){var a={};e(this,a);this.aStack_.push(a);this.mStack_.push(this.m_);this.m_=d(c(),this.m_)};n.restore=function(){e(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};
n.translate=function(a,b){this.m_=d([[1,0,0],[0,1,0],[a,b,1]],this.m_)};n.transform=function(a,b,c,e,f,g){this.m_=d([[a,b,0],[c,e,0],[f,g,1]],this.m_)};n.rotate=function(a){var b=w(a);a=p(a);this.m_=d([[b,a,0],[-a,b,0],[0,0,1]],this.m_)};n.scale=function(a,b){this.arcScaleX_*=a;this.arcScaleY_*=b;this.m_=d([[a,0,0],[0,b,0],[0,0,1]],this.m_)};n.clip=function(){};n.arcTo=function(){};n.createPattern=function(){return new m};l.prototype.addColorStop=function(a,b){b=f(b);this.colors_.push({offset:1-a,
color:b})};G_vmlCanvasManager=k;CanvasRenderingContext2D=g;CanvasGradient=l;CanvasPattern=m}();
function AlbersConic(){var a,b,c,d;this.toString=function(){return"Albers Conic"};this.initialize=function(e,f,h){var g,l;if(1E-10>Math.abs(f+h))throw c=NaN,Error("Standard latitudes of Albers conic too close to equator");g=Math.cos(f);l=Math.sin(f);c=1E-10<=Math.abs(f-h)?0.5*(l+Math.sin(h)):l;d=2*c;a=g*g+d*l;b=Math.sqrt(a-d*Math.sin(e))/c};this.forward=function(e,f,h){f=a-d*Math.sin(f);0>f&&(h[0]=NaN,h[1]=NaN);f=Math.sqrt(f)/c;e*=c;h[0]=f*Math.sin(e);h[1]=b-f*Math.cos(e)};this.initialize(0.25*Math.PI,
0.25*Math.PI,0.25*Math.PI)}function ArdenClose(){var a=88/180*Math.PI;this.toString=function(){return"Arden-Close"};this.forward=function(b,c,d){var e;c>a?c=a:c<-a&&(c=-a);e=Math.log(Math.tan(Math.PI/4+0.5*c));c=Math.sin(c);d[0]=b;d[1]=(e+c)/2}}
function Bonne(){var a=85/180*Math.PI,b=1/Math.tan(a);this.toString=function(){return"Bonne (Equal Area)"};this.getGraticuleHeight=function(){return 6};this.getStandardParallel=function(){return a};this.setStandardParallel=function(c){a=c;b=1/Math.tan(a)};this.forward=function(c,d,e){var f=b+a-d;c=c*Math.cos(d)/f;e[0]=f*Math.sin(c);e[1]=b-f*Math.cos(c)}}function Braun2(){this.toString=function(){return"Braun2"};this.forward=function(a,b,c){c[0]=a;c[1]=1.4*Math.sin(b)/(0.4+Math.cos(b))}}
function Canters1(){this.toString=function(){return"Canters Modified Sinusoidal I"};this.forward=function(a,b,c){var d=b*b,e=d*d;c[0]=a*Math.cos(b)/(1.1966+-0.387*d+-0.038*e);c[1]=b*(1.1966+-0.129*d+-0.0076*e)}}function Canters2(){var a=3*-0.0753;this.toString=function(){return"Canters Modified Sinusoidal II"};this.forward=function(b,c,d){var e=c*c,f=e*e;d[0]=b*Math.cos(c)/(1.1481+a*e+-0.075*f);d[1]=c*(1.1481+-0.0753*e+-0.015*f)}}
function CentralCylindrical(){var a=80/180*Math.PI;this.toString=function(){return"Central Cylindrical"};this.forward=function(b,c,d){c>a?c=a:c<-a&&(c=-a);d[0]=b;d[1]=Math.tan(c)}}function CylindricalStereographic(){var a=Math.cos(30/180*Math.PI);this.toString=function(){return"Cylindrical Stereographic"};this.getStandardParallel=function(){return Math.acos(a)};this.setStandardParallel=function(b){a=Math.cos(b)};this.forward=function(b,c,d){d[0]=b*a;d[1]=(1+a)*Math.tan(c/2)}}
function Eckert4(){this.toString=function(){return"Eckert IV"};this.forward=function(a,b,c){var d,e,f,h;d=3.5707963267948966*Math.sin(b);e=b*b;b*=0.895168+e*(0.0218849+0.00826809*e);for(h=6;0<h;--h)if(f=Math.cos(b),e=Math.sin(b),b-=e=(b+e*(f+2)-d)/(1+f*(f+2)-e*e),1E-7>Math.abs(e)){c[0]=0.4222382003157712*a*(1+Math.cos(b));c[1]=1.3265004281770023*Math.sin(b);return}c[0]=0.4222382003157712*a;c[1]=0>b?-1.3265004281770023:1.3265004281770023};this.inverse=function(a,b,c){b/=1.3265004;var d=Math.asin(b);
c[0]=a/(0.4222382*(1+Math.cos(d)));c[1]=Math.asin((d+b*Math.cos(d)+2*b)/(2+Math.PI/2))}}function EqualAreaCylindrical(){var a=Math.cos(30/180*Math.PI);this.toString=function(){return"Cylindrical Equal-Area"};this.getStandardParallel=function(){return Math.acos(a)};this.setStandardParallel=function(b){a=Math.cos(b)};this.forward=function(b,c,d){d[0]=b*a;d[1]=Math.sin(c)/a}}
function Equirectangular(){var a=Math.cos(30/180*Math.PI);this.toString=function(){return"Equirectangular"};this.getStandardParallel=function(){return Math.acos(a)};this.setStandardParallel=function(b){a=Math.cos(b)};this.forward=function(b,c,d){d[0]=b*a;d[1]=c};this.inverse=function(b,c,d){d[0]=b/a;d[1]=c}}
function Hammer(a){this.toString=function(){switch(a){case 0:return"Quartic Authalic";case 0.5:return"Hammer";default:return"Hammer Customized"}};this.forward=function(b,c,d){var e=Math.cos(c),f;b*=a;f=Math.sqrt(2/(1+e*Math.cos(b)));d[0]=f*e*Math.sin(b)/a;d[1]=f*Math.sin(c)};this.inverse=function(b,c,d){b*=a;var e=Math.sqrt(1-0.25*(b*b+c*c)),f=2*e*e-1;1E-10>Math.abs(f)?(d[0]=NaN,d[1]=NaN):(d[0]=Math.atan2(b*e,f)/a,d[1]=Math.asin(e*c))};this.setW=function(b){a=b;0.999999<=a?a=0.999999:0>a&&(a=0);0===
a&&(this.forward=this.quarticAuthalicForward,this.inverse=this.quarticAuthalicInverse)};this.setW(0===arguments.length?0.5:a);this.getW=function(){return a}}
function Hufnagel(){var a=0,b=0,c=Math.PI/2,d=2,e,f,h;this.forward=function(c,d,m){var k,q,p=0,w=0;if(0!==d){do{k=e/4*(2*p+(1+a-b/2)*Math.sin(2*p)+(a+b)/2*Math.sin(4*p)+b/2*Math.sin(6*p))-Math.PI*Math.sin(d);q=e/2*(1+(1+a-b/2)*Math.cos(2*p)+(a+b)*Math.cos(4*p)+3*b/2*Math.cos(6*p));k/=q;w+=1;if(!isFinite(k)||100<w){m[0]=NaN;m[1]=NaN;return}p-=k}while(1E-6<Math.abs(k))}d=Math.sqrt(1+a*Math.cos(2*p)+b*Math.cos(4*p));m[0]=f*d*h*c/Math.PI*Math.cos(p);m[1]=f*d/h*Math.sin(p)};this.init=function(){var g=
[],l;e=4*Math.PI/(2*c+(1+a-b/2)*Math.sin(2*c)+(a+b)/2*Math.sin(4*c)+b/2*Math.sin(6*c));f=Math.sqrt(e);h=1;this.forward(Math.PI,0,g);l=g[0];this.forward(0,Math.PI/2,g);h=Math.sqrt(d/(l/g[1]))};this.init();this.setA=function(b){a=b;this.init()};this.setB=function(a){b=a;this.init()};this.setPsiMax=function(a){c=a;this.init()};this.setAspectRatio=function(a){d=a;this.init()};this.toString=function(){return"Hufnagel"}}
function Kavrayskiy1(){var a=Math.PI/2,b=70/180*Math.PI,c,d;c=Math.log(Math.tan(0.5*(a+b)));d=1/Math.cos(b);this.toString=function(){return"Kavrayskiy I"};this.forward=function(e,f,h){h[0]=e;h[1]=f>b?(f-b)*d+c:f<-b?(f+b)*d-c:Math.log(Math.tan(0.5*(a+f)))}}function KharchenkoShabanova(){var a=Math.cos(10/180*Math.PI);this.toString=function(){return"Kharchenko-Shabanova"};this.forward=function(b,c,d){var e=c*c;d[0]=b*a;d[1]=c*(0.99+e*(0.0026263+0.10734*e))}}
function LambertAzimuthalEqualAreaPolar(){var a=Math.PI/4;this.toString=function(){return"Lambert Azimuthal Equal Area - Polar"};this.forward=function(b,c,d){c=2*Math.sin(a-0.5*c);d[0]=c*Math.sin(b);d[1]=c*-Math.cos(b)};this.getGraticuleWidth=function(){return 4};this.getGraticuleHeight=function(){return 4};this.isPoleInsideGraticule=function(){return!0}}
function LambertAzimuthalOblique(){var a=1,b=0;this.toString=function(){return"Lambert Azimuthal Oblique"};this.initialize=function(c){a=Math.cos(c);b=Math.sin(c)};this.forward=function(c,d,e){var f=Math.sin(d);d=Math.cos(d);var h=Math.cos(c),g=Math.sin(c);c=1+b*f+a*d*h;c=Math.sqrt(2/c);e[0]=c*d*g;e[1]=c*(a*f-b*d*h)};this.initialize(45*Math.PI/180)}
function LambertEqualAreaCylindrical(){this.toString=function(){return"Lambert Cylindrical Equal-Area"};this.forward=function(a,b,c){c[0]=a;c[1]=Math.sin(b)};this.inverse=function(a,b,c){c[0]=a;c[1]=Math.asin(b)}}function Mercator(){var a=Math.PI/2;this.toString=function(){return"Mercator"};this.forward=function(b,c,d){d[0]=b;d[1]=1.4844222297453322<c?Math.PI:-1.4844222297453322>c?-Math.PI:Math.log(Math.tan(0.5*(a+c)))}}
function Miller(){this.toString=function(){return"Miller"};this.forward=function(a,b,c){c[0]=a;c[1]=1.25*Math.log(Math.tan(Math.PI/4+0.4*b))}}function Miller2(){this.toString=function(){return"Miller II"};this.forward=function(a,b,c){c[0]=a;c[1]=1.5*Math.log(Math.tan(Math.PI/4+b/3))}}function MillerPerspective(){this.toString=function(){return"Miller Perspective"};this.forward=function(a,b,c){c[0]=a;c[1]=Math.sin(b/2)+Math.tan(b/2)}}
function MillerTransformation(){var a=Math.PI/2,b=1.5,c=1.5;this.toString=function(){return"Miller Transformation"};this.getM=function(){return c};this.setM=function(a){c=a};this.getN=function(){return b};this.setN=function(a){b=a};this.getAspectRatio=function(){return b*Math.log(Math.tan(0.5*a*(1+1/b)))/Math.PI};this.setAspectRatio=function(d){if(0.5>=d)c=b=1E4;else{for(var e=1.05,f=1,h,g;1E-4<Math.abs(f);)g=0.5*a*(1+1/e),f=e*Math.log(Math.tan(g))-d*Math.PI,h=Math.log(Math.tan(g)),g=Math.tan(g)*
Math.cos(g)*Math.cos(g)*e,e-=f/=h-0.5*a/g;c=b=e}};this.forward=function(d,e,f){f[0]=d;f[1]=c*Math.log(Math.tan(0.5*(a+e/b)))}}
function Mollweide(){var a,b,c;this.toString=function(){return"Mollweide"};(function(){var d=Math.PI/2,e,f=d+d;e=Math.sin(d);d=Math.sqrt(2*Math.PI*e/(f+Math.sin(f)));a=2*d/Math.PI;b=d/e;c=f+Math.sin(f)})();this.forward=function(d,e,f){var h,g,l;h=c*Math.sin(e);for(l=10;0!==l&&!(e-=g=(e+Math.sin(e)-h)/(1+Math.cos(e)),1E-7>Math.abs(g));l--);e=0===l?0>e?-Math.PI/2:Math.PI/2:0.5*e;f[0]=a*d*Math.cos(e);f[1]=b*Math.sin(e)};this.inverse=function(a,b,c){var h,g;h=0.70710678118655*b;b=Math.asin(h);g=Math.cos(b);
c[0]=1.11072073453959*a/g;c[1]=Math.asin(2*(b+h*g)/Math.PI)}}function NaturalEarth(){this.toString=function(){return"Natural Earth"};this.forward=function(a,b,c){var d=b*b,e=d*d;c[0]=a*(0.8707-0.131979*d+e*(-0.013791+e*(0.003971*d-0.001529*e)));c[1]=b*(1.007226+d*(0.015085+e*(-0.044475+0.028874*d-0.005916*e)))}}function Pavlov(){this.toString=function(){return"Pavlov"};this.forward=function(a,b,c){var d;d=b*b*b;c[0]=a;c[1]=b-0.1531/3*d-0.00534*d*b*b}}
function Robinson(){this.toString=function(){return"Robinson"};this.forward=function(a,b,c){var d=b*b;c[0]=a*(0.8507-d*(0.145+0.0104*d));c[1]=b*(0.9642-d*(0.0013+0.0129*d))}}function Sinusoidal(){this.toString=function(){return"Sinusoidal (Equal Area)"};this.forward=function(a,b,c){c[0]=a*Math.cos(b);c[1]=b};this.inverse=function(a,b,c){c[0]=a/Math.cos(b);c[1]=b}}
function Strebe1995(){var a=1.35,b=new Eckert4,c=new Mollweide,d=new Hammer;this.setScaleFactor=function(b){a=b};this.setForward1=function(a){b=a};this.setForward2=function(a){d=a};this.setInverse=function(a){c=a};this.toString=function(){return"Strebe 1995 (Equal Area)"};this.forward=function(e,f,h){b.forward(e,f,h);c.inverse(h[0]*a,h[1]/a,h);d.forward(h[0],h[1],h);h[0]/=a;h[1]*=a}}
function Tobler1(){this.toString=function(){return"Tobler I"};this.forward=function(a,b,c){c[0]=a;c[1]=b*(1+b*b/6)}}function Tobler2(){this.toString=function(){return"Tobler II"};this.forward=function(a,b,c){var d=b*b;c[0]=a;c[1]=b*(1+d/6+d*d/24)}}
function TransformableLambert(){function a(a,b,h){var g,p;a*=d;b=c*Math.sin(b);g=Math.sqrt(1-b*b);p=1+g*Math.cos(a);p=Math.sqrt(2/p);h[0]=e*p*g*Math.sin(a);h[1]=f*p*b}function b(a,b,c){c[0]=a*g;c[1]=Math.sin(b)/g}var c,d,e,f,h,g;this.initialize=function(l,m,k){1E-10>l&&1E-10>m?(this.forward=b,g=Math.sqrt(k/Math.PI)):(this.forward=a,l=Math.max(l,1E-10),m=Math.max(m,1E-10),c=Math.sin(m),d=l/Math.PI,m=Math.sqrt(k*Math.sin(m/2)/Math.sin(l/2)),k=Math.sqrt(c*d),e=m/k,f=1/(m*k));h=l===Math.PI};this.isPoleInsideGraticule=
function(){return h};this.getGraticuleWidth=function(){var a=[];this.forward(Math.PI-1E-6,0,a);return 2*a[0]};this.initialize(Math.PI/2,Math.PI/4,Math.sqrt(2))}
function TransverseTransformableLambert(){var a,b,c,d,e;this.initialize=function(f,h,g){f=Math.max(f,1E-7);h=Math.max(h,1E-7);a=Math.sin(h);b=f/Math.PI;f=Math.sqrt(g*Math.sin(h/2)/Math.sin(f/2));h=Math.sqrt(a*b);c=f/h;d=1/(f*h);e=1.5===g};this.forward=function(e,h,g){var l,m;e+=Math.PI/2;l=Math.cos(e);m=Math.cos(h);e=Math.atan2(m*Math.sin(e),Math.sin(h));e*=b;h=a*-m*l;l=Math.sqrt(1-h*h);m=1+l*Math.cos(e);m=Math.sqrt(2/m);g[1]=-c*m*l*Math.sin(e);g[0]=d*m*h};this.getGraticuleWidth=function(){return 4};
this.getGraticuleHeight=function(){return 4};this.isPoleInsideGraticule=function(){return e};this.initialize(Math.PI/2,Math.PI/4,1.5)}function Urmayev2(){this.toString=function(){return"Urmayev II"};this.forward=function(a,b,c){var d=b*b;c[0]=a;c[1]=b*(1+0.1275561329783*d+0.0133641090422587*d*d)}}function Urmayev3(){this.toString=function(){return"Urmayev III"};this.forward=function(a,b,c){c[0]=a;c[1]=b*(0.92813433+1.11426959/3*b*b)}}
function Wagner7(a){var b,c,d,e;this.toString=function(){return"Wagner VII"+(1!==a?" Customized":"")};this.forward=function(a,h,g){var l,m;h=b*Math.sin(h);l=Math.sqrt(1-h*h);m=Math.sqrt(2/(1+l*Math.cos(a*=c)));g[0]=d*m*l*Math.sin(a);g[1]=e*m*h};this.setW=function(f){var h;a=f;1<=a?a=1:1E-10>a&&(a=1E-10);b=Math.sin(65/180*Math.PI)*a+1-a;c=1/3*a+1-a;f=Math.sqrt((1.0745992166936478*a+1-a)/Math.sin(Math.PI/2*c));h=Math.sqrt(b*c);d=f/h;e=1/(f*h)};this.setW(0===arguments.length?1:a)}
function WagnerPseudocylindrical(){var a,b,c;this.toString=function(){return"Wagner Pseudocylindrical"};this.forward=function(d,e,f){this.setW(61.9/180*Math.PI,2.03);var h,g;e=a*Math.sin(e);h=Math.sqrt(1-e*e);g=Math.sqrt(2/(1+h));f[0]=b*g*h*d;f[1]=c*g*e};this.inverse=function(d,e,f){this.setW(65/180*Math.PI,2);sinO_2=e/(2*c);cosO_2=Math.sqrt(1-sinO_2*sinO_2);f[0]=d/b*cosO_2/(2*cosO_2*cosO_2-1);f[1]=Math.asin(2*sinO_2*cosO_2/a)};this.setW=function(d,e){1E-10>d&&(d=1E-10);a=Math.sin(d);var f=Math.sqrt(2*
e*Math.sin(d/2)/Math.PI),h=Math.sqrt(a);b=f/h;c=1/(f*h);console.log("CA",b);console.log("CB",c);console.log("m",a)}}function ShpFile(a){a=new BinaryFileWrapper(a);(new Date).getTime();this.header=new ShpHeader(a);(new Date).getTime();(new Date).getTime();for(this.records=[];;)try{this.records.push(new ShpRecord(a))}catch(b){b.id!==ShpError.ERROR_NODATA&&alert(b);break}(new Date).getTime()}
var ShpType={SHAPE_UNKNOWN:-1,SHAPE_NULL:0,SHAPE_POINT:1,SHAPE_POLYLINE:3,SHAPE_POLYGON:5,SHAPE_MULTIPOINT:8,SHAPE_POINTZ:11,SHAPE_POLYLINEZ:13,SHAPE_POLYGONZ:15,SHAPE_MULTIPOINTZ:18,SHAPE_POINTM:21,SHAPE_POLYLINEM:23,SHAPE_POLYGONM:25,SHAPE_MULTIPOINTM:28,SHAPE_MULTIPATCH:31};
function ShpHeader(a){100>a.getLength()&&alert("Not a valid shape file header (too small)");9994!=a.getSLong()&&alert("Not a valid signature. Expected 9994");a.position+=20;this.fileLength=a.getSLong();a.bigEndian=!1;this.version=a.getSLong();this.shapeType=a.getSLong();this.boundsXY={x:a.getDouble(),y:a.getDouble(),width:a.getDouble(),height:a.getDouble()};this.boundsZ={x:a.getDouble(),y:a.getDouble()};this.boundsM={x:a.getDouble(),y:a.getDouble()}}
function ShpRecord(a){var b=a.getLength()-a.position;if(0==b)throw new ShpError("No Data",ShpError.ERROR_NODATA);if(8>b)throw new ShpError("Not a valid record header (too small)");a.bigEndian=!0;this.number=a.getSLong();this.contentLength=a.getSLong();this.contentLengthBytes=2*this.contentLength-4;a.bigEndian=!1;this.shapeType=a.getSLong();switch(this.shapeType){case ShpType.SHAPE_POINT:this.shape=new ShpPoint(a,this.contentLengthBytes);break;case ShpType.SHAPE_POINTZ:this.shape=new ShpPointZ(a,this.contentLengthBytes);
break;case ShpType.SHAPE_POLYGON:this.shape=new ShpPolygon(a,this.contentLengthBytes);break;case ShpType.SHAPE_POLYLINE:this.shape=new ShpPolyline(a,this.contentLengthBytes);break;case ShpType.SHAPE_MULTIPATCH:case ShpType.SHAPE_MULTIPOINT:case ShpType.SHAPE_MULTIPOINTM:case ShpType.SHAPE_MULTIPOINTZ:case ShpType.SHAPE_POINTM:case ShpType.SHAPE_POLYGONM:case ShpType.SHAPE_POLYGONZ:case ShpType.SHAPE_POLYLINEZ:case ShpType.SHAPE_POLYLINEM:throw new ShpError(this.shapeType+" Shape type is currently unsupported by this library");
default:throw new ShpError("Encountered unknown shape type ("+this.shapeType+")");}}function ShpPoint(a,b){this.type=ShpType.SHAPE_POINT;if(a){if(a.getLength()-a.position<b)throw new ShpError("Not a Point record (too small)");this.x=0<b?a.getDouble():NaN;this.y=0<b?a.getDouble():NaN}}
function ShpPointZ(a,b){this.type=ShpType.SHAPE_POINTZ;if(a){if(a.getLength()-a.position<b)throw new ShpError("Not a Point record (too small)");this.x=0<b?a.getDouble():NaN;this.y=0<b?a.getDouble():NaN;this.z=16<b?a.getDouble():NaN;this.m=24<b?a.getDouble():NaN}}function ShpPolygon(a,b){ShpPolyline.apply(this,[a,b]);this.type=ShpType.SHAPE_POLYGON}
function ShpPolyline(a,b){this.type=ShpType.SHAPE_POLYLINE;this.rings=[];if(a){if(a.getLength()-a.position<b)throw new ShpError("Not a Polygon record (too small)");a.bigEndian=!1;this.box={x:a.getDouble(),y:a.getDouble(),width:a.getDouble(),height:a.getDouble()};for(var c=a.getSLong(),d=a.getSLong(),e=[];c--;){var f=a.getSLong();e.push(f)}for(c=[];d--;)c.push(new ShpPoint(a,16));d=0;for(e.shift();e.length;)f=e.shift(),this.rings.push(c.splice(0,f-d)),d=f;this.rings.push(c)}}
function ShpError(a,b){this.msg=a;this.id=b;this.toString=function(){return this.msg}}ShpError.ERROR_UNDEFINED=0;ShpError.ERROR_NODATA=1;
