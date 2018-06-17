!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={bind:function(t){var e=t.querySelectorAll("[checkbox-type=single]"),n=t.querySelector("[checkbox-type=all]");t.addEventListener("change",function(t){var i=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e)).filter(function(t){return t.checked});if("all"===t.target.getAttribute("checkbox-type"))if(i.length!==e.length)for(var r=0;r<e.length;r++)e[r].checked=t.target.checked;else t.target.checked=!0;else switch(i.length){case 0:t.target.checked=!0;break;case e.length:n.checked=!0;break;default:n.checked=!1}})},init:function(){document.getElementById("select-wrapper").querySelectorAll("input").forEach(function(t){t.checked=!0})},getSelectedItems:function(){var t=[],e=[];return document.getElementById("region-wrapper").querySelectorAll("[checkbox-type=single]").forEach(function(e){e.checked&&t.push(e.value)}),document.getElementById("product-wrapper").querySelectorAll("[checkbox-type=single]").forEach(function(t){t.checked&&e.push(t.value)}),{region:t,product:e}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(n(4)),r=a(n(0));function a(t){return t&&t.__esModule?t:{default:t}}function o(){for(var t=document.getElementById("table-wrapper");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("table");t.appendChild(e);var n=document.createElement("tbody");e.appendChild(n),n.innerHTML="<tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr>";var i=r.default.getSelectedItems(),a=1===i.region.length&&i.region.length<i.product.length;if(a){var o=n.rows[0].cells[0].innerText;n.rows[0].cells[0].innerText=n.rows[0].cells[1].innerText,n.rows[0].cells[1].innerText=o}h(i).forEach(function(t,e){var r=document.createElement("tr");a?e%i.product.length==0?r.innerHTML="<td rowspan="+i.product.length+">"+t.region+"</td><td>"+t.product+"</td>":r.innerHTML="<td>"+t.product+"</td>":e%i.region.length==0?r.innerHTML="<td rowspan="+i.region.length+">"+t.product+"</td><td>"+t.region+"</td>":r.innerHTML="<td>"+t.region+"</td>",t.sale.forEach(function(t){r.innerHTML+="<td>"+t+"</td>"}),n.appendChild(r)})}function h(t){var e=[];return i.default.forEach(function(n){t.region.indexOf(n.region)>-1&&t.product.indexOf(n.product)>-1&&e.push(n)}),e}e.default={render:o,init:function(){o()},getData:h}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=o(n(1)),a=o(n(0));function o(t){return t&&t.__esModule?t:{default:t}}function h(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}var c=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.container=e,this.margin=n.margin||10,this.pointRadius=n.pointRadius||2.5,this.width=document.documentElement.clientWidth/2,this.height=document.documentElement.clientHeight-350,this.colors=["#f44242","#f48c41","#f4e541","#9af441","#41f4df","#41aff4","#4143f4","#ca41f4","#f4419d"],this.init()}return i(t,[{key:"init",value:function(){this.container.width=this.width,this.container.height=this.height,this.ctx=this.container.getContext("2d"),this.ctx.clearRect(0,0,this.width,this.height),this.drawAxes();var t=r.default.getData(a.default.getSelectedItems()).map(function(t){return t.sale});this.drawLines(t)}},{key:"set",value:function(t){this.data=t,this.ctx.clearRect(0,0,this.width,this.height),this.drawLine(),this.drawAxes()}},{key:"drawAxes",value:function(){this.ctx.moveTo(this.margin,this.height-this.margin),this.ctx.lineTo(this.margin,this.margin),this.ctx.moveTo(this.margin,this.height-this.margin),this.ctx.lineTo(this.width-this.margin,this.height-this.margin),this.ctx.lineWidth=2,this.ctx.strokeStyle="rgb(0,0,0)",this.ctx.stroke()}},{key:"drawLine",value:function(t,e){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"rgb(0,0,0)";t&&(this.data=t);var r=void 0,a=(this.width-2*this.margin)/(2*this.data.length+1);e||(e=(this.height-2*this.margin)/Math.max.apply(Math,h(this.data))),this.data.forEach(function(t,o){var h=n.margin+a*(2*o+1),c=n.height-n.margin-e*t;n.ctx.beginPath(),n.ctx.arc(h,c,n.pointRadius,0,2*Math.PI),n.ctx.fillStyle=i,n.ctx.fill(),o&&(n.ctx.beginPath(),n.ctx.moveTo(r.x,r.y),n.ctx.lineTo(h,c),n.ctx.strokeStyle=i,n.ctx.stroke()),r={x:h,y:c}})}},{key:"drawLines",value:function(t){var e=this,n=Math.max.apply(Math,h(t.map(function(t){return Math.max.apply(Math,h(t))}))),i=(this.height-2*this.margin)/n;t.forEach(function(t,n){e.drawLine(t,i,e.colors[n])})}}]),t}();e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var r=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=n.data||[],this.margin=n.margin||10,this.barColor=n.barColor||"lightblue",this.axisColor=n.axisColor||"rgb(0,0,0)",this.container=e,this.width=document.documentElement.clientWidth/2,this.height=document.documentElement.clientHeight-350,this.init()}return i(t,[{key:"init",value:function(){this.setAttributes(this.container,{width:this.width,height:this.height})}},{key:"set",value:function(t){this.data=t,this.clear(),this.drawAxes(),this.drawBars()}},{key:"clear",value:function(){for(;this.container.firstChild;)this.container.removeChild(this.container.firstChild)}},{key:"drawAxes",value:function(){var t=document.createElementNS("http://www.w3.org/2000/svg","line");this.setAttributes(t,{x1:this.margin,y1:this.height-this.margin,x2:this.margin,y2:this.margin,stroke:this.axisColor,"stroke-width":2}),this.container.appendChild(t);var e=document.createElementNS("http://www.w3.org/2000/svg","line");this.setAttributes(e,{x1:this.margin,y1:this.height-this.margin,x2:this.width-this.margin,y2:this.height-this.margin,stroke:this.axisColor,"stroke-width":2}),this.container.appendChild(e)}},{key:"drawBars",value:function(){var t=this,e=(this.width-2*this.margin)/(2*this.data.length+1),n=(this.height-2*this.margin)/Math.max.apply(Math,function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(this.data));this.data.forEach(function(i,r){var a=n*i,o=document.createElementNS("http://www.w3.org/2000/svg","rect");t.setAttributes(o,{x:t.margin+e*(2*r+1),y:t.height-t.margin-a-2,width:e,height:a,fill:t.barColor}),t.container.appendChild(o)})}},{key:"setAttributes",value:function(t,e){for(var n in e)t.setAttributeNS(null,n,e[n])}}]),t}();e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=[{product:"手机",region:"华东",sale:[120,100,140,160,180,185,190,210,230,245,255,270]},{product:"手机",region:"华北",sale:[80,70,90,110,130,145,150,160,170,185,190,200]},{product:"手机",region:"华南",sale:[220,200,240,250,260,270,280,295,310,335,355,380]},{product:"笔记本",region:"华东",sale:[50,60,80,110,30,20,70,30,420,30,20,20]},{product:"笔记本",region:"华北",sale:[30,35,50,70,20,15,30,50,710,130,20,20]},{product:"笔记本",region:"华南",sale:[80,120,130,140,70,75,120,90,550,120,110,100]},{product:"智能音箱",region:"华东",sale:[10,30,4,5,6,5,4,5,6,5,5,25]},{product:"智能音箱",region:"华北",sale:[15,50,15,15,12,11,11,12,12,14,12,40]},{product:"智能音箱",region:"华南",sale:[10,40,10,6,5,6,8,6,6,6,7,26]}]},,function(t,e,n){},function(t,e,n){"use strict";h(n(6));var i=h(n(1)),r=h(n(0)),a=h(n(3)),o=h(n(2));function h(t){return t&&t.__esModule?t:{default:t}}r.default.bind(document.getElementById("region-wrapper")),r.default.bind(document.getElementById("product-wrapper")),r.default.init(),i.default.init();var c=new a.default(document.getElementById("svg")),s=new o.default(document.getElementById("canvas"));window.addEventListener("mouseover",function(t){if("TD"===t.target.nodeName){var e=t.target.parentNode,n=[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(e.childNodes)).map(function(t){return t.innerText}).slice(2);c.set(n),s.set(n)}else s.init()}),window.addEventListener("change",function(){i.default.render(),s.init()})}]);