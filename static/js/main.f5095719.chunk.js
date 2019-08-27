(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(t,e,i){t.exports=i(27)},26:function(t,e){CanvasRenderingContext2D.prototype.line=function(t,e,i,a){this.beginPath(),this.moveTo(t,e),this.lineTo(i,a),this.stroke()}},27:function(t,e,i){"use strict";i.r(e);var a=i(0),r=i.n(a),n=i(11),c=i.n(n),s=i(1),o=i(8),l=function(t,e){if(void 0!==typeof t.getContext){!function(){for(var t=["webkit","moz"],e=0;e<t.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[t[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[e]+"CancelAnimationFrame"]||window[t[e]+"CancelRequestAnimationFrame"]}();var i=t.getContext("2d"),a=(new Date).getTime(),r=0,n=0,c=0,s=0;t.simulation=e,e.init(t),function t(){for(window.requestAnimationFrame(t),r=(new Date).getTime(),n=Math.min((r-a)/1e3,.03),s=0,(c+=n)<1/60&&(c=1/60);c>=1/60&&s<1;)e.fixedUpdate(1/60),c-=1/60,s++;s>=1&&(c=0),e.update(n),e.render(i),a=r}()}},h=i(5),u=i(6),p=i(2);i(26);p.Vector.prototype.rotate=function(t){var e=this._x,i=this._y;return this._x=e*Math.cos(t)-i*Math.sin(t),this._y=e*Math.sin(t)+i*Math.cos(t),this},p.Vector.prototype.rotateTrig=function(t,e){var i=this._x,a=this._y;return this._x=i*e-a*t,this._y=i*t+a*e,this},p.Vector.prototype.angle=function(){return Math.atan2(this._y,this._x)},p.Vector.prototype.clampSq=function(t,e){return this.lengthSq()>e&&this.unit().multiplyByScalar(t),this};var d=function(){function t(e){Object(h.a)(this,t),this.canvas=e,this.position=new p.Vector(Math.random()*e.width,Math.random()*e.height),this.velocity=new p.Vector(10*Math.random()-5,10*Math.random()-5),this.effectMultiplier=.1+.9*Math.random(),this.flockingMultiplier=.6+.4*Math.random(),this.cw=e.width,this.ch=e.height,this.space="",this.color="#0000FF",this.panicTimer=0}return Object(u.a)(t,[{key:"draw",value:function(t){for(var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=[new p.Vector(10,0),new p.Vector(-5,5),new p.Vector(-5,-5)],a=this.velocity.angle(),r=Math.sin(a),n=Math.cos(a),c=0;c<i.length;c++)i[c].rotateTrig(r,n).add(this.position);t.beginPath(),t.fillStyle=e&&this.panicTimer>0?"#FFAA00":this.color,t.moveTo(i[0].x,i[0].y);for(var s=1;s<i.length;s++)t.lineTo(i[s].x,i[s].y);t.fill()}}]),t}(),f=function(){function t(e){Object(h.a)(this,t),this.spaces={},this.spaceSize=e}return Object(u.a)(t,[{key:"clear",value:function(){for(var t in this.spaces)if(this.spaces.hasOwnProperty(t)){for(var e=this.spaces[t],i=0,a=e.length;i<a;i++)e[i].__space=null;e.length=0}}},{key:"resize",value:function(t){this.spaceSize=t,this.clear()}},{key:"createSpace",value:function(t,e,i){var a=[];a.neighbors=[],this.spaces[i]=a;for(var r=t-1;r<=t+1;r++)for(var n=e-1;n<=e+1;n++){var c="".concat(r,",").concat(n);if(this.spaces.hasOwnProperty(c)){var s=this.spaces[c];s.neighbors.push(a),s!==a&&a.neighbors.push(s)}}}},{key:"registerPosition",value:function(t,e){var i=Math.floor(e.x/this.spaceSize),a=Math.floor(e.y/this.spaceSize),r="".concat(i,",").concat(a);if(t.__space!==r){if(this.spaces.hasOwnProperty(t.__space))for(var n=this.spaces[t.__space],c=0;c<n.length;c++)if(n[c]===t){n.splice(c,1);break}t.__space=r,this.spaces.hasOwnProperty(r)||this.createSpace(i,a,r),this.spaces[r].includes(t)||this.spaces[r].push(t)}}},{key:"itemsFromAdjacentSpaces",value:function(t){var e=Math.floor(t.x/this.spaceSize),i=Math.floor(t.y/this.spaceSize),a="".concat(e,",").concat(i);if(!this.spaces.hasOwnProperty(a))return[];for(var r=this.spaces[a],n=[],c=0,s=r.neighbors.length;c<s;c++)for(var o=r.neighbors[c],l=0,h=o.length;l<h;l++)n.push(o[l]);return n}}]),t}(),m=function(){function t(){Object(h.a)(this,t)}return Object(u.a)(t,[{key:"init",value:function(t){this.canvas=t,this.width=t.width,this.height=t.height,this.birds=[];for(var e=0;e<2500;e++){var i=new d(t);i.index=e,this.birds.push(i)}this.spaces=new f(10),this.setupBirds({count:100,speed:50,maxSpeed:100,fov:270,repulseDistance:15,approachDistance:30,repulseValue:3,approachValue:.5,linearRepulse:!1,linearApproach:!1,individualFlocking:!1}),this.setupAttraction({circleMode:!0,circleDiameter1:200,circleDiameter2:400,circleValue:1,boxWidth1:500,boxWidth2:700,boxHeight1:50,boxHeight2:100,boxValue:1}),this.setRedBird(!0),this.setupPredator({radius1:30,radius2:150,colorPanic:!1,panicTime:4}),this.setPredator(!1),this.setPredatorPosition(0,0),this.setLinearPredator(!0),this.setPanicReduction(.2),this.setPanicAmplification(10),this.setTriggerVisualizations(!1),this.centerX=.5*t.width,this.centerY=.5*t.height}},{key:"setupBirds",value:function(t){var e=t.count,i=t.speed,a=t.maxSpeed,r=t.fov,n=t.repulseDistance,c=t.approachDistance,s=t.repulseValue,o=t.approachValue,l=t.linearRepulse,h=t.linearApproach,u=t.individualFlocking;this.setBirdCount(e),this.setFlightSpeed(i),this.setMaxSpeed(a),this.setFov(r),this.setRepulseDistance(n),this.setApproachDistance(c),this.setRepulseValue(s),this.setApproachValue(o),this.setLinearRepulse(l),this.setLinearApproach(h),this.setIndividualFlocking(u)}},{key:"setBirdCount",value:function(t){this.birdCount=t,this.birdCount!==this.previousBirdCount&&(this.birdCount<this.previousBirdCount&&this.spaces.clear(),this.previousBirdCount=this.birdCount)}},{key:"setApproachDistance",value:function(t){this.approachDistance=t,this.approachSq=this.approachDistance*this.approachDistance;var e=Math.max(this.approachDistance,this.repulseDistance);this.spaces.spaceSize!==e&&this.spaces.resize(e)}},{key:"setRepulseDistance",value:function(t){this.repulseDistance=t,this.repulseSq=this.repulseDistance*this.repulseDistance;var e=Math.max(this.approachDistance,this.repulseDistance);this.spaces.spaceSize!==e&&this.spaces.resize(e)}},{key:"setFlightSpeed",value:function(t){this.flightSpeed=t,this.predatorValue=2.5*t}},{key:"setMaxSpeed",value:function(t){this.maxSpeed=t,this.maxSpeedSq=this.maxSpeed*this.maxSpeed}},{key:"setApproachValue",value:function(t){this.approachValue=t}},{key:"setRepulseValue",value:function(t){this.repulseValue=t}},{key:"setLinearApproach",value:function(t){this.linearApproach=t}},{key:"setLinearRepulse",value:function(t){this.linearRepulse=t}},{key:"setFov",value:function(t){this.fov=t;var e=t*Math.PI/180;180===this.fov?this.fovTestAngle=0:this.fovTestAngle=(e-Math.PI)/2,this.fovTestSin=Math.sin(this.fovTestAngle),this.fovTestCos=Math.cos(this.fovTestAngle)}},{key:"setupAttraction",value:function(t){var e=t.circleMode,i=t.circleDiameter1,a=t.circleDiameter2,r=t.circleValue,n=t.boxWidth1,c=t.boxWidth2,s=t.boxHeight1,o=t.boxHeight2,l=t.boxValue;this.setCircleAttractMode(e),this.setCenterAttractDiameter(i),this.setCenterAttractFarthestDiameter(a),this.setCenterAttractValue(r),this.setBoxAttractWidth(n),this.setBoxAttractFarthestWidth(c),this.setBoxAttractHeight(s),this.setBoxAttractFarthestHeight(o),this.setBoxAttractValue(l)}},{key:"setCircleAttractMode",value:function(t){this.circleCenterMode=t}},{key:"setCenterAttractDiameter",value:function(t){this.centerAttractRadius=.5*t,this.centerAttractRadiusSq=this.centerAttractRadius*this.centerAttractRadius}},{key:"setCenterAttractFarthestDiameter",value:function(t){this.centerAttractFarthestRadius=.5*t,this.centerAttractFarthestRadiusSq=this.centerAttractFarthestRadius*this.centerAttractFarthestRadius}},{key:"setCenterAttractValue",value:function(t){this.centerAttractValue=t}},{key:"setBoxAttractValue",value:function(t){this.boxAttractValue=t}},{key:"setBoxAttractWidth",value:function(t){this.boxAttractHorizontalDist=.5*t}},{key:"setBoxAttractFarthestWidth",value:function(t){this.boxAttractFarthestHorizontalDist=.5*t}},{key:"setBoxAttractHeight",value:function(t){this.boxAttractVerticalDist=.5*t}},{key:"setBoxAttractFarthestHeight",value:function(t){this.boxAttractFarthestVerticalDist=.5*t}},{key:"setPredatorPosition",value:function(t,e){this.predatorPosition=new p.Vector(t,e)}},{key:"setPredator",value:function(t){this.predator=t}},{key:"setupPredator",value:function(t){var e=t.radius1,i=t.radius2,a=t.colorPanic,r=t.panicTime;this.predatorFullEffectRadius=e,this.predatorFullEffectRadiusSq=e*e,this.predatorMaxRadius=i,this.predatorMaxRadiusSq=i*i,this.panicTime=r,this.panicSlowdownTime=.25*r,this.colorPanic=a}},{key:"setPredatorValue",value:function(t){this.predatorValue=t}},{key:"setLinearPredator",value:function(t){this.linearPredator=t}},{key:"setPanicReduction",value:function(t){this.panicReduction=t}},{key:"setPanicAmplification",value:function(t){this.panicAmplification=t}},{key:"setRedBird",value:function(t){this.redBird=t,this.birds[0].color=this.redBird?"#FF0000":"#0000FF"}},{key:"setTriggerVisualizations",value:function(t){this.triggerVisualizations=t}},{key:"setIndividualFlocking",value:function(t){this.individualFlocking=t}},{key:"flockBehaviour",value:function(t,e){var i=this,a=this.flightSpeed;t.panicTimer>0&&(t.panicTimer>this.panicSlowdownTime?a*=1.5:a*=1+t.panicTimer/this.panicSlowdownTime*.5,t.panicTimer-=e),t.velocity.unit().multiplyByScalar(a),this.spaces.registerPosition(t,t.position);var r=this.approachDistance-this.repulseDistance;if(this.fov>0&&this.spaces.itemsFromAdjacentSpaces(t.position).forEach(function(e){var a=e.position.clone().subtract(t.position),n=a.lengthSq(),c=Math.max(i.approachSq,i.repulseSq),s=i.individualFlocking?t.flockingMultiplier:1;if(!(t===e||n>c)){if(i.fov<360){if(180===i.fov&&t.velocity.dot(a)<0)return;if(180!==i.fov){var o=a.clone().rotateTrig(i.fovTestSin,i.fovTestCos),l=a.clone().rotateTrig(-i.fovTestSin,i.fovTestCos);if(i.fov<180&&(t.velocity.dot(o)<0||t.velocity.dot(l)<0)||i.fov>180&&t.velocity.dot(o)<0&&t.velocity.dot(l)<0)return}}e.panicTimer>t.panicTimer+.5*i.panicTime&&(t.panicTimer=e.panicTimer-i.panicReduction);var h=e.panicTimer>0&&e.panicTimer>t.panicTimer?i.panicAmplification:t.panicTimer>0?.1:1;if(n<i.repulseSq&&e.panicTimer<=0)if(i.linearRepulse){var u=(i.repulseDistance-Math.sqrt(n))/i.repulseDistance;a.reverse().unit().multiplyByScalar(i.repulseValue*u*s)}else a.reverse().unit().multiplyByScalar(i.repulseValue*s);else if(i.linearApproach){var p=(r-(Math.sqrt(n)-i.repulseDistance))/(i.approachDistance-i.repulseDistance);a=e.velocity.clone().unit().multiplyByScalar(i.approachValue*p*s*h)}else a=e.velocity.clone().unit().multiplyByScalar(i.approachValue*s*h);t.velocity.add(a)}}),this.circleCenterMode){var n=this.centerX-t.position.x,c=this.centerY-t.position.y,s=n*n+c*c;if(s>this.centerAttractRadiusSq)if(s<this.centerAttractFarthestRadiusSq){var o=(Math.sqrt(s)-this.centerAttractRadius)/(this.centerAttractFarthestRadius-this.centerAttractRadius);t.velocity.add(new p.Vector(n,c).unit().multiplyByScalar(this.centerAttractValue*o*t.effectMultiplier))}else t.velocity.add(new p.Vector(n,c).unit().multiplyByScalar(this.centerAttractValue*t.effectMultiplier))}else{var l=this.centerX-t.position.x,h=this.centerY-t.position.y,u=Math.abs(l),d=Math.abs(h);if(u>this.boxAttractHorizontalDist)if(u<this.boxAttractFarthestHorizontalDist){var f=(u-this.boxAttractHorizontalDist)/(this.boxAttractFarthestHorizontalDist-this.boxAttractHorizontalDist);t.velocity.add(new p.Vector(Math.sign(l),0).multiplyByScalar(this.boxAttractValue*f*t.effectMultiplier))}else t.velocity.add(new p.Vector(Math.sign(l),0).multiplyByScalar(this.boxAttractValue*t.effectMultiplier));if(d>this.boxAttractVerticalDist)if(d<this.boxAttractFarthestVerticalDist){var m=(d-this.boxAttractVerticalDist)/(this.boxAttractFarthestVerticalDist-this.boxAttractVerticalDist);t.velocity.add(new p.Vector(0,Math.sign(h)).multiplyByScalar(this.boxAttractValue*m*t.effectMultiplier))}else t.velocity.add(new p.Vector(0,Math.sign(h)).multiplyByScalar(this.boxAttractValue*t.effectMultiplier))}if(this.predator){var v=t.position.x-this.predatorPosition.x,g=t.position.y-this.predatorPosition.y,x=v*v+g*g;if(x<this.predatorMaxRadiusSq){if(x<this.predatorFullEffectRadiusSq)t.velocity.add(new p.Vector(v,g).unit().multiplyByScalar(this.predatorValue*t.effectMultiplier));else{var b=1-(Math.sqrt(x)-this.predatorFullEffectRadius)/(this.predatorMaxRadius-this.predatorFullEffectRadius);t.velocity.add(new p.Vector(v,g).unit().multiplyByScalar(this.predatorValue*b*t.effectMultiplier))}t.panicTimer=this.panicTime}}t.velocity.clampSq(this.maxSpeed,this.maxSpeedSq),t.position.add(t.velocity.multiplyByScalar(e))}},{key:"fixedUpdate",value:function(t){for(var e=0;e<this.birdCount;e++){var i=this.birds[e];this.flockBehaviour(i,t)}}},{key:"update",value:function(t){}},{key:"renderCircleAttractMode",value:function(t){t.fillStyle="#DDDDDD",t.fillRect(0,0,this.width,this.height),t.beginPath(),t.fillStyle="#EEEEEE",t.arc(this.centerX,this.centerY,this.centerAttractFarthestRadius,0,2*Math.PI),t.fill(),t.beginPath(),t.fillStyle="#FFFFFF",t.arc(this.centerX,this.centerY,this.centerAttractRadius,0,2*Math.PI),t.fill()}},{key:"renderBoxAttractMode",value:function(t){t.fillStyle="#DDDDDD",t.fillRect(0,0,this.width,this.height),t.fillStyle="#EEEEEE";var e=Math.max(this.boxAttractFarthestHorizontalDist,this.boxAttractHorizontalDist),i=Math.max(this.boxAttractFarthestVerticalDist,this.boxAttractVerticalDist);t.fillRect(this.centerX-e,this.centerY-i,2*e,2*i),t.fillStyle="#FFFFFF",t.fillRect(this.centerX-this.boxAttractHorizontalDist,this.centerY-this.boxAttractVerticalDist,2*this.boxAttractHorizontalDist,2*this.boxAttractVerticalDist),t.lineWidth=.2,t.line(this.centerX-e,0,this.centerX-e,this.height),t.line(this.centerX+e,0,this.centerX+e,this.height),t.line(0,this.centerY-i,this.width,this.centerY-i),t.line(0,this.centerY+i,this.width,this.centerY+i),t.line(this.centerX-this.boxAttractHorizontalDist,0,this.centerX-this.boxAttractHorizontalDist,this.height),t.line(this.centerX+this.boxAttractHorizontalDist,0,this.centerX+this.boxAttractHorizontalDist,this.height),t.line(0,this.centerY-this.boxAttractVerticalDist,this.width,this.centerY-this.boxAttractVerticalDist),t.line(0,this.centerY+this.boxAttractVerticalDist,this.width,this.centerY+this.boxAttractVerticalDist)}},{key:"renderPredator",value:function(t){t.fillStyle="#D5AAAAAA",t.beginPath(),t.arc(this.predatorPosition.x,this.predatorPosition.y,this.predatorMaxRadius,0,2*Math.PI),t.fill(),t.fillStyle="#DD8888AA",t.beginPath(),t.arc(this.predatorPosition.x,this.predatorPosition.y,this.predatorFullEffectRadius,0,2*Math.PI),t.fill()}},{key:"renderBirdTriggers",value:function(t,e){var i=e.velocity.angle(),a=this.fov/180*Math.PI;this.repulseDistance<this.approachDistance&&(t.fillStyle="#88CC8888",t.beginPath(),t.moveTo(e.position.x,e.position.y),t.arc(e.position.x,e.position.y,this.approachDistance,i-a/2,i+a/2),t.fill()),t.fillStyle="#CC888888",t.beginPath(),t.moveTo(e.position.x,e.position.y),t.arc(e.position.x,e.position.y,this.repulseDistance,i-a/2,i+a/2),t.fill()}},{key:"render",value:function(t){t.clearRect(0,0,this.width,this.height),this.triggerVisualizations&&(this.circleCenterMode?this.renderCircleAttractMode(t):this.renderBoxAttractMode(t),this.predator&&this.renderPredator(t)),this.triggerVisualizations&&this.redBird&&this.renderBirdTriggers(t,this.birds[0]);for(var e=this.birdCount-1;e>=0;e--){this.birds[e].draw(t,this.colorPanic)}}}]),t}(),v=function(){return new m},g=i(12),x=function(t){var e=t.label,i=t.value,a=t.step,n=t.min,c=t.max,s=t.onChange,o=t.suffix,l=void 0===o?"":o;return r.a.createElement("div",{style:{marginTop:"5px",marginLeft:"5px",marginRight:"5px",marginBottom:"5px"}},r.a.createElement("div",null,"".concat(e,": ").concat(i).concat(l)),r.a.createElement(g.a,{axis:"x",xstep:a,xmin:n,xmax:c,x:i,onChange:s()}))},b=i(15),y=function(t){var e=t.label,i=t.value,a=t.onChange,n=t.onLabel,c=void 0===n?"On":n,s=t.offLabel,o=void 0===s?"Off":s;return r.a.createElement("div",{style:{marginTop:"5px",marginLeft:"5px",marginRight:"5px",marginBottom:"5px"}},r.a.createElement(b.a,{style:{marginRight:"10px"},value:i,onChange:a()}),"".concat(e,": ").concat(i?c:o))},A=function(t){var e=t.force,i=t.changeForce,a=t.diameter,n=t.changeDiameter,c=t.maxDiameter,s=t.changeMaxDiameter;return r.a.createElement("div",null,r.a.createElement(x,{label:"Min Diameter",value:a,min:0,max:2e3,step:10,onChange:n}),r.a.createElement(x,{label:"Max Diameter",value:c,min:0,max:2e3,step:10,onChange:s}),r.a.createElement(x,{label:"Attract force",value:e.toFixed(1),min:0,max:10,step:.1,onChange:i}))},D=function(t){var e=t.force,i=t.changeForce,a=t.width,n=t.changeWidth,c=t.height,s=t.changeHeight,o=t.maxWidth,l=t.changeMaxWidth,h=t.maxHeight,u=t.changeMaxHeight;return r.a.createElement("div",null,r.a.createElement(x,{label:"Min Width",value:a,min:0,max:2e3,step:10,onChange:n}),r.a.createElement(x,{label:"Min Height",value:c,min:0,max:2e3,step:10,onChange:s}),r.a.createElement(x,{label:"Max Width",value:o,min:0,max:2e3,step:10,onChange:l}),r.a.createElement(x,{label:"Max Height",value:h,min:0,max:2e3,step:10,onChange:u}),r.a.createElement(x,{label:"Attract force",value:e.toFixed(1),min:0,max:10,step:.1,onChange:i}))},V=function(t){var e=t.fov,i=t.approachDistance,n=t.repulseDistance,c=Object(a.useRef)(null),s=null;return Object(a.useEffect)(function(){var t=c.current;null===s&&(s=t.getContext("2d")),s.clearRect(0,0,t.width,t.height);var a=.5*t.width,r=.5*t.height,o=-.5*Math.PI,l=e/180*Math.PI;n<i&&(s.fillStyle="#88CC8888",s.beginPath(),s.moveTo(a,r),s.arc(a,r,i,o-l/2,o+l/2),s.fill()),s.fillStyle="#CC888888",s.beginPath(),s.moveTo(a,r),s.arc(a,r,n,o-l/2,o+l/2),s.fill();for(var h=[new p.Vector(10,0),new p.Vector(-5,5),new p.Vector(-5,-5)],u=Math.sin(o),d=Math.cos(o),f=0;f<h.length;f++)h[f].rotateTrig(u,d).add(new p.Vector(a,r));s.beginPath(),s.fillStyle="#FF0000",s.moveTo(h[0].x,h[0].y);for(var m=1;m<h.length;m++)s.lineTo(h[m].x,h[m].y);s.fill()}),r.a.createElement("div",{style:{margin:"5px"}},r.a.createElement("canvas",{style:{border:" 1px solid #aaa"},ref:c,width:"200",height:"200"}))},M=function(){var t=Object(a.useState)({count:1500,speed:50,maxSpeed:120,fov:200,repulseDistance:30,approachDistance:60,repulseValue:3,approachValue:.5,linearRepulse:1,linearApproach:0,individualFlocking:0}),e=Object(o.a)(t,2),i=e[0],n=e[1],c=Object(a.useState)({circleMode:0,circleDiameter1:200,circleDiameter2:400,circleValue:1,boxWidth1:500,boxWidth2:700,boxHeight1:50,boxHeight2:100,boxValue:1}),h=Object(o.a)(c,2),u=h[0],p=h[1],d=Object(a.useState)({radius1:110,radius2:150,colorPanic:0,panicTime:4}),f=Object(o.a)(d,2),m=f[0],g=f[1],b=Object(a.useState)({triggers:0,redBird:1}),M=Object(o.a)(b,2),w=M[0],S=M[1],E=Object(a.useRef)(null),F={display:"inline-block",verticalAlign:"top",width:"200px",marginLeft:"5px",marginRight:"5px"},C=function(t){var e=t.count,a=t.speed,r=t.maxSpeed,c=t.fov,s=t.repulseDistance,o=t.approachDistance,l=t.repulseValue,h=t.approachValue,u=t.linearRepulse,p=t.linearApproach,d=t.individualFlocking,f={count:e,speed:a>r&&a===i.speed?r:a,maxSpeed:a>r&&r===i.maxSpeed?a:r,fov:c,repulseDistance:s,approachDistance:o,repulseValue:l,approachValue:h,linearRepulse:u,linearApproach:p,individualFlocking:d};n(f),E.current.simulation.setupBirds(f)},R=function(t){var e=t.circleMode,i=t.circleDiameter1,a=t.circleDiameter2,r=t.circleValue,n=t.boxWidth1,c=t.boxWidth2,s=t.boxHeight1,o=t.boxHeight2,l=t.boxValue,h={circleMode:e,circleDiameter1:i>a&&u.circleDiameter1===i?a:i,circleDiameter2:i>a&&u.circleDiameter2===a?i:a,circleValue:r,boxWidth1:n>c&&u.boxWidth1===n?c:n,boxWidth2:n>c&&u.boxWidth2===c?n:c,boxHeight1:s>o&&u.boxHeight1===s?o:s,boxHeight2:s>o&&u.boxHeight2===o?s:o,boxValue:l};p(h),E.current.simulation.setupAttraction(h)},k=function(t){var e=t.triggers,i=t.redBird;S({triggers:e,redBird:i}),E.current.simulation.setRedBird(i),E.current.simulation.setTriggerVisualizations(e)},P=function(t){var e=t.radius1,i=t.radius2,a=t.colorPanic,r=t.panicTime,n={radius1:e>i&&e===m.radius1?i:e,radius2:e>i&&i===m.radius2?e:i,colorPanic:a,panicTime:r};g(n),E.current.simulation.setupPredator(n)};return Object(a.useEffect)(function(){return console.log("start hook"),l(E.current,v()),E.current.simulation.setupBirds(i),E.current.simulation.setupAttraction(u),E.current.simulation.setupPredator(m),E.current.simulation.setRedBird(w.redBird),E.current.simulation.setTriggerVisualizations(w.triggers),window.addEventListener("mousedown",function(t){var e=E.current.getBoundingClientRect();t.clientX<e.left||t.clientY<e.top||t.clientX>e.right||t.clientY>e.bottom||(t.preventDefault(),E.current.simulation.setPredator(!0))}),window.addEventListener("mouseup",function(t){var e=E.current.getBoundingClientRect();t.clientX<e.left||t.clientY<e.top||t.clientX>e.right||t.clientY>e.bottom||E.current.simulation.setPredator(!1)}),window.addEventListener("mousemove",function(t){var e=E.current.getBoundingClientRect();if(t.clientX<e.left||t.clientY<e.top||t.clientX>e.right||t.clientY>e.bottom)E.current.simulation.setPredator(!1);else{t.preventDefault();var i=(t.clientX-e.left)/(e.right-e.left)*E.current.width,a=(t.clientY-e.top)/(e.bottom-e.top)*E.current.height;E.current.simulation.setPredatorPosition(i,a)}}),function(){window.removeEventListener("mousemove"),window.removeEventListener("mouseup"),window.removeEventListener("mousedown")}},[]),r.a.createElement("div",null,r.a.createElement("canvas",{style:{border:" 1px solid #aaa"},ref:E,width:"900",height:"600"}),r.a.createElement("div",{style:{paddingLeft:"25px",paddingRight:"25px"}},r.a.createElement("div",{style:F},r.a.createElement(x,{label:"Birds",value:i.count,min:10,max:2500,step:10,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{count:e}))}}}),r.a.createElement(x,{label:"Bird speed",value:i.speed,min:0,max:200,step:1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{speed:e}))}}}),r.a.createElement(x,{label:"Max speed",value:i.maxSpeed,min:0,max:200,step:1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{maxSpeed:e}))}}}),r.a.createElement(x,{label:"FOV",value:i.fov,suffix:"\xb0",min:0,max:360,step:1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{fov:e}))}}})),r.a.createElement("div",{style:F},r.a.createElement(x,{label:"Approach distance",value:i.approachDistance,min:0,max:200,step:1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{approachDistance:e}))}}}),r.a.createElement(x,{label:"Approach value",value:i.approachValue.toFixed(1),min:0,max:10,step:.1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{approachValue:e}))}}}),r.a.createElement(x,{label:"Repulse distance",value:i.repulseDistance,min:0,max:200,step:1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{repulseDistance:e}))}}}),r.a.createElement(x,{label:"Repulse value",value:i.repulseValue.toFixed(1),min:0,max:10,step:.1,onChange:function(){return function(t){var e=t.x;return C(Object(s.a)({},i,{repulseValue:e}))}}})),r.a.createElement("div",{style:F},r.a.createElement(V,{fov:i.fov,approachDistance:i.approachDistance,repulseDistance:i.repulseDistance})),r.a.createElement("div",{style:F},r.a.createElement(y,{label:"Linear approach",value:i.linearApproach,onChange:function(){return function(t){return C(Object(s.a)({},i,{linearApproach:t}))}}}),r.a.createElement(y,{label:"Linear repulse",value:i.linearRepulse,onChange:function(){return function(t){return C(Object(s.a)({},i,{linearRepulse:t}))}}}),r.a.createElement(y,{label:"Flocking variance",value:i.individualFlocking,onChange:function(){return function(t){return C(Object(s.a)({},i,{individualFlocking:t}))}}}),r.a.createElement(y,{label:"Red bird",value:w.redBird,onChange:function(){return function(t){return k(Object(s.a)({},w,{redBird:t}))}}}),r.a.createElement(y,{label:"Show triggers",value:w.triggers,onChange:function(){return function(t){return k(Object(s.a)({},w,{triggers:t}))}}})),r.a.createElement("div",{style:F},r.a.createElement(y,{label:"Attract mode",value:u.circleMode,onLabel:"Circle",offLabel:"Box",onChange:function(){return function(t){return R(Object(s.a)({},u,{circleMode:t}))}}}),u.circleMode?r.a.createElement(A,{diameter:u.circleDiameter1,changeDiameter:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{circleDiameter1:e}))}},maxDiameter:u.circleDiameter2,changeMaxDiameter:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{circleDiameter2:e}))}},force:u.circleValue,changeForce:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{circleValue:e}))}}}):r.a.createElement(D,{force:u.boxValue,changeForce:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{boxValue:e}))}},width:u.boxWidth1,changeWidth:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{boxWidth1:e}))}},height:u.boxHeight1,changeHeight:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{boxHeight1:e}))}},maxWidth:u.boxWidth2,changeMaxWidth:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{boxWidth2:e}))}},maxHeight:u.boxHeight2,changeMaxHeight:function(){return function(t){var e=t.x;return R(Object(s.a)({},u,{boxHeight2:e}))}}})),r.a.createElement("div",{style:F},r.a.createElement("div",{style:{margin:"5px"}},"Predator"),r.a.createElement(x,{label:"Min Radius",value:m.radius1,min:0,max:500,step:5,onChange:function(){return function(t){var e=t.x;return P(Object(s.a)({},m,{radius1:e}))}}}),r.a.createElement(x,{label:"Max Radius",value:m.radius2,min:0,max:500,step:5,onChange:function(){return function(t){var e=t.x;return P(Object(s.a)({},m,{radius2:e}))}}}),r.a.createElement(x,{label:"Panic Time",value:m.panicTime.toFixed(1),min:0,max:20,step:.1,onChange:function(){return function(t){var e=t.x;return P(Object(s.a)({},m,{panicTime:e}))}}}),r.a.createElement(y,{label:"Color panic",value:m.colorPanic,onChange:function(){return function(t){return P(Object(s.a)({},m,{colorPanic:t}))}}}))))},w=function(){return r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement("p",null,"Copyright (c) Jussi Enroos 2019",r.a.createElement("br",null),r.a.createElement("a",{href:"https://github.com/McDevon/flocking-simulation"},"Source")," with MIT license"))},S=function(t){return Object(a.useEffect)(function(){console.log("app effect")}),r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:"900px"}},r.a.createElement(M,null),r.a.createElement(w,null))};c.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.f5095719.chunk.js.map