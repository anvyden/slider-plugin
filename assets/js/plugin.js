"use strict";(self.webpackChunkslider_plugin=self.webpackChunkslider_plugin||[]).push([[975],{359:function(t,e,n){var o,i,r,s,a,c=n(897);!function(t){t.STATE_CHANGED="STATE_CHANGED",t.VALUE_CHANGED="VALUE_CHANGED"}(o||(o={})),function(t){t.VALUE_CHANGED="VALUE_CHANGED",t.VALUE_FROM_CHANGED="VALUE_FROM_CHANGED",t.VALUE_TO_CHANGED="VALUE_TO_CHANGED",t.VALUE_FROM_INCREMENT="VALUE_FROM_INCREMENT",t.VALUE_FROM_DECREMENT="VALUE_FROM_DECREMENT",t.VALUE_CHANGED_FROM_LABELS="VALUE_CHANGED_FROM_LABELS"}(i||(i={})),function(t){t.THUMB_VALUE_INCREMENT="THUMB_VALUE_INCREMENT",t.THUMB_VALUE_DECREMENT="THUMB_VALUE_DECREMENT",t.THUMB_VALUE_FROM_CHANGED="THUMB_VALUE_FROM_CHANGED",t.THUMB_VALUE_TO_CHANGED="THUMB_VALUE_TO_CHANGED"}(r||(r={})),function(t){t.LABEL_VALUE_CHANGED="LABEL_VALUE_CHANGED"}(s||(s={})),function(t){t.SCALE_VALUE_CHANGED="SCALE_VALUE_CHANGED"}(a||(a={}));var u,h=function(t,e,n){return 100/((t-e)/n)},l=function(t,e){var n=t.max,o=t.min,i=t.step,r=(e-o)/i*h(n,o,i);return r>100&&(r=100),r<0&&(r=0),r},p=function(t,e){var n=t.max,o=t.min,i=t.step,r=h(n,o,i),s=Math.round(e/r)*i;return e>=100?n:s+o},d=function(t,e,n){var o=e.orientation,i=n.querySelector(".js-slider__scale"),r=m(i),s=r.left,a=r.bottom,c=r.width,u=r.height,h=f(t),l=h.clientX,p=h.clientY;return"horizontal"===o?(l-s)/c*100:(a-p)/u*100},f=function(t){return{clientX:t.clientX,clientY:t.clientY}},m=function(t){var e=t.getBoundingClientRect(),n=e.width,o=e.height,i=e.bottom;return{left:e.left,bottom:i,width:n,height:o}},b=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))},E=function(){function t(){this.observers={}}return t.prototype.subscribe=function(t,e){var n=this.observers[t]||[];this.observers[t]=b(b([],n,!0),[e],!1)},t.prototype.emit=function(t,e){var n;null===(n=this.observers[t])||void 0===n||n.forEach((function(t){return t(e)}))},t}(),_=function(){return _=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},_.apply(this,arguments)},v=function(){function t(){}return t.prototype.checkState=function(t){var e=Object.keys(c.W),n=JSON.parse(JSON.stringify(t));Object.keys(n).forEach((function(t){e.includes(t)||delete n[t]}));var o=n.max,i=n.min,r=n.step,s=n.from,a=n.to,u=n.isRange,h=n.labels,l=h.addLabels,p=h.countOfLabels;return this.max=o,this.min=i,this.step=r,this.from=s,this.to=a,this.countOfLabels=p,this.addLabels=l,this.checkMaxMin(this.max,this.min),this.step=this.checkStep(this.max,this.min,this.step),this.countOfLabels=this.checkCountOfLabels(p),u?(this.checkMaxMinRange(this.from,this.to),this.from=this.checkFromRangeValue(this.from),this.to=this.checkToRangeValue(this.to)):this.from=this.checkFrom(this.from),_(_({},n),{max:this.max,min:this.min,step:this.step,from:this.from,to:this.to,labels:{addLabels:this.addLabels,countOfLabels:this.countOfLabels}})},t.prototype.checkStep=function(t,e,n){var o=t-e,i=Math.round(n);return i<0?c.W.step:(0===i&&(i+=1),i>o?o:i)},t.prototype.checkMaxMin=function(t,e){var n=Math.round(t),o=Math.round(e);if(n<o){var i=n;n=o,o=i}n===o&&(n+=1),this.max=n,this.min=o},t.prototype.convertValueToStep=function(t){var e=l({max:this.max,min:this.min,step:this.step},t);return p({max:this.max,min:this.min,step:this.step},e)},t.prototype.checkFromRangeValue=function(t){return t>=this.to&&(t=this.to),t},t.prototype.checkToRangeValue=function(t){return t<=this.from&&(t=this.from),t},t.prototype.checkMaxMinRange=function(t,e){var n=Math.round(t),o=Math.round(e),i=this.convertValueToStep(n),r=this.convertValueToStep(o);if(r<i){var s=i;i=r,r=s}this.from=i,this.to=r},t.prototype.checkFrom=function(t){var e=Math.round(t);return this.convertValueToStep(e)},t.prototype.checkCountOfLabels=function(t){var e=Math.round(t);return e>6||e<2?c.W.labels.countOfLabels:e},t}(),y=(u=function(t,e){return u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},u(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),A=function(){return A=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},A.apply(this,arguments)},g=function(t){function e(e){var n=t.call(this)||this;return n.state=c.W,n.validation=new v,n.setState(e),n}return y(e,t),e.prototype.setState=function(t){var e=A({},JSON.parse(JSON.stringify(this.state)));this.state=A(A({},e),this.validation.checkState(t)),this.emit(o.STATE_CHANGED,this.state)},e.prototype.getState=function(){return this.state},e.prototype.setValue=function(t,e){var n=this.checkStateValue(t,e);this.state=A(A({},this.state),this.validation.checkState(n)),"from"===t||"to"===t?this.emit(o.VALUE_CHANGED,this.state):this.emit(o.STATE_CHANGED,this.state)},e.prototype.getValue=function(t){return"addLabels"===t?this.state.labels.addLabels:"countOfLabels"===t?this.state.labels.countOfLabels:this.state[t]},e.prototype.increment=function(t){var e=this.state[t]+this.state.step,n=this.checkStateValue(t,e);this.state=A(A({},this.state),this.validation.checkState(n)),this.emit(o.VALUE_CHANGED,this.state)},e.prototype.decrement=function(t){var e=this.state[t]-this.state.step,n=this.checkStateValue(t,e);this.state=A(A({},this.state),this.validation.checkState(n)),this.emit(o.VALUE_CHANGED,this.state)},e.prototype.setValueFromPercent=function(t,e){var n=p(this.state,e);this.setValue(t,n)},e.prototype.getOptionByNearValue=function(t){var e=this.state,n=e.isRange,o=e.from,i=e.to;return n&&p(this.state,t)-o>=(i-o)/2?"to":"from"},e.prototype.checkStateValue=function(t,e){var n=A({},JSON.parse(JSON.stringify(this.state))),o="number"==typeof e,i="boolean"==typeof e,r="purple"===e||"green"===e,s="horizontal"===e||"vertical"===e,a="from"===t&&o&&this.state.isRange,c="to"===t&&o,u="from"===t&&o&&!this.state.isRange,h=("max"===t||"min"===t||"step"===t)&&o,l=("hasProgressBar"===t||"hasTooltips"===t||"isRange"===t)&&i,p="color"===t&&r,d="orientation"===t&&s,f="addLabels"===t&&i,m="countOfLabels"===t&&o;return a&&(n.from=this.validation.checkFromRangeValue(e)),c&&(n.to=this.validation.checkToRangeValue(e)),u&&(n.from=this.validation.checkFrom(e)),h&&(n[t]=e),l&&(n[t]=e),p&&(n[t]=e),d&&(n[t]=e),f&&(n.labels.addLabels=e),m&&(n.labels.countOfLabels=e),n},e}(E),L=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),T=function(t){function e(e,n){var o=t.call(this)||this;return o.state=e,o.root=n,o.init(),o}return L(e,t),e.prototype.getScale=function(){return this.scale},e.prototype.init=function(){var t=this.state.orientation,e="vertical"===t?t:"horizontal";this.scale=this.createScale(e),this.scale.addEventListener("pointerdown",this.handleScalePointerDown.bind(this))},e.prototype.createScale=function(t){var e=document.createElement("div");return e.classList.add("js-slider__scale","slider__scale","slider__scale--".concat(t)),e.setAttribute("data-id","scale"),e},e.prototype.handleScalePointerDown=function(t){if(this.isScale(t)){var e=d(t,this.state,this.root);this.emit(a.SCALE_VALUE_CHANGED,Number(e.toFixed(3)))}},e.prototype.isScale=function(t){var e=t.target;return"scale"===e.dataset.id||"progressBar"===e.dataset.id},e}(E),C=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),O=function(t){function e(e,n,o){var i=t.call(this)||this;return i.handleThumbKeyDown=function(t){var e=t.code;"Tab"!==e&&t.preventDefault();var n=i.thumbTarget===r.THUMB_VALUE_TO_CHANGED?"to":"from";"ArrowRight"!==e&&"ArrowUp"!==e||i.emit(r.THUMB_VALUE_INCREMENT,n),"ArrowLeft"!==e&&"ArrowDown"!==e||i.emit(r.THUMB_VALUE_DECREMENT,n)},i.state=e,i.root=n,i.dataId=o,i.init(),i}return C(e,t),e.prototype.getThumb=function(){return this.thumb},e.prototype.update=function(t){var e=t.orientation,n=t.from,o=t.to,i="vertical"===e?"bottom":"left";"thumb-second"===this.thumb.dataset.id?this.thumb.style[i]="".concat(l(this.state,o),"%"):this.thumb.style[i]="".concat(l(this.state,n),"%")},e.prototype.dragThumbAfterScaleClick=function(t){this.thumbTarget="to"===t?r.THUMB_VALUE_TO_CHANGED:r.THUMB_VALUE_FROM_CHANGED,this.handleThumbPointerDown()},e.prototype.init=function(){var t=this.state,e=t.orientation,n=t.color,o=t.from,i=t.to,r="vertical"===e?"bottom":"left";this.thumb=this.createThumb(e,n),"thumb-second"===this.thumb.dataset.id?this.thumb.style[r]="".concat(l(this.state,i),"%"):this.thumb.style[r]="".concat(l(this.state,o),"%"),this.thumb.addEventListener("pointerdown",this.checkThumbTarget.bind(this)),this.thumb.addEventListener("pointerdown",this.handleThumbPointerDown.bind(this)),this.thumb.addEventListener("keydown",this.checkThumbTarget.bind(this)),this.thumb.addEventListener("keydown",this.handleThumbKeyDown.bind(this))},e.prototype.createThumb=function(t,e){var n=this.state.isRange?"thumb-first":"thumb",o=this.dataId?this.dataId:n,i=document.createElement("div");return i.classList.add("slider__thumb","slider__thumb--".concat(t),"slider__thumb--".concat(e)),i.setAttribute("data-id",o),i.setAttribute("tabindex","0"),i.setAttribute("role","slider"),i},e.prototype.handleThumbPointerDown=function(){var t=this,e=function(e){e.preventDefault();var n=d(e,t.state,t.root);t.emit(t.thumbTarget,Number(n.toFixed(3)))},n=function(){document.removeEventListener("pointerup",n),document.removeEventListener("pointermove",e)};document.addEventListener("pointermove",e),document.addEventListener("pointerup",n),this.thumb.ondragstart=function(){return!1}},e.prototype.checkThumbTarget=function(t){var e=t.target,n="thumb-first"===e.dataset.id||"thumb"===e.dataset.id;this.thumbTarget=n?r.THUMB_VALUE_FROM_CHANGED:r.THUMB_VALUE_TO_CHANGED},e}(E),V=function(){function t(t){this.state=t,this.init()}return t.prototype.getProgressBar=function(){return this.progressBar},t.prototype.update=function(t){var e=t.orientation,n=t.isRange,o=t.from,i=t.to,r="horizontal"===e?"width":"height",s="horizontal"===e?"left":"bottom";this.setProgressBarValues(s,r,n,o,i)},t.prototype.init=function(){var t=this.state,e=t.orientation,n=t.color,o=t.from,i=t.to,r=t.isRange,s="horizontal"===e?"width":"height",a="horizontal"===e?"left":"bottom";this.progressBar=this.createProgressBar(e,n),this.setProgressBarValues(a,s,r,o,i)},t.prototype.createProgressBar=function(t,e){var n=document.createElement("div");return n.classList.add("slider__progress-bar","slider__progress-bar--".concat(t),"slider__progress-bar--".concat(e)),n.setAttribute("data-id","progressBar"),n},t.prototype.setProgressBarValues=function(t,e,n,o,i){if(n){var r=i-o;this.progressBar.style[t]="".concat(l(this.state,o),"%"),this.progressBar.style[e]="".concat(this.getValueFill(r),"%")}else this.progressBar.style[e]="".concat(l(this.state,o),"%")},t.prototype.getValueFill=function(t){var e=this.state,n=e.max,o=e.min,i=e.step;return t/i*h(n,o,i)},t}(),N=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),U=function(t){function e(e){var n=t.call(this)||this;return n.state=e,n.init(),n}return N(e,t),e.prototype.getLabels=function(){return this.labels},e.prototype.init=function(){var t=this.state,e=t.orientation,n=t.max,o=t.min,i=t.step,r=t.labels.countOfLabels;this.labels=this.createLabels(e,n,o,i,r),this.labels.addEventListener("pointerdown",this.handleLabelsPointerDown.bind(this))},e.prototype.createLabels=function(t,e,n,o,i){var r=this.getItems(t,i,e,n,o),s=document.createElement("div");return s.classList.add("slider__labels","slider__labels--".concat(t)),s.setAttribute("data-id","labels"),r.forEach((function(t){return s.insertAdjacentElement("beforeend",t)})),s},e.prototype.getItems=function(t,e,n,o,i){for(var r=this,s=[],a=[0,100],c=0;c<e-2;c++){var u=(n-o)/i,h=Math.round(u/(e-1)*(c+1))*i+o,d=Number(l(this.state,h).toFixed(3));a.push(d)}return a.filter((function(t,e){return a.indexOf(t)===e})).sort((function(t,e){return t-e})).forEach((function(e){var n=p(r.state,e),o=r.createLabel(t,n,e);s.push(o)})),s},e.prototype.createLabel=function(t,e,n){var o="vertical"===t?"bottom":"left",i=document.createElement("div");return i.classList.add("slider__labels-item"),i.setAttribute("data-value","".concat(n)),i.style[o]="".concat(n,"%"),i.innerHTML="".concat(e),i},e.prototype.handleLabelsPointerDown=function(t){var e=t.target,n=Number(e.dataset.value);this.emit(s.LABEL_VALUE_CHANGED,n)},e}(E),M=function(){function t(t,e){this.state=t,this.dataId=e,this.init()}return t.prototype.getTooltip=function(){return this.tooltip},t.prototype.update=function(t){var e=t.from,n=t.to;"tooltip-second"===this.tooltip.dataset.id?this.tooltipValue.textContent="".concat(n):this.tooltipValue.textContent="".concat(e)},t.prototype.init=function(){var t=this.state,e=t.orientation,n=t.color,o=t.from,i=t.to;this.tooltip=this.createTooltip(e,n,o,i)},t.prototype.createTooltip=function(t,e,n,o){var i=this.state.isRange?"tooltip-first":"tooltip",r=this.dataId?this.dataId:i,s=document.createElement("div");s.classList.add("tooltip","slider__tooltip","slider__tooltip--".concat(t),"slider__tooltip--".concat(e)),s.dataset.id=r;var a=document.createElement("span");return a.classList.add("tooltip__value"),a.textContent="".concat("tooltip-second"===r?o:n),this.tooltipValue=a,s.appendChild(a),s},t}(),w=function(){return w=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},w.apply(this,arguments)},S=function(){function t(t,e){this.root=e,this.state=t,this.init()}return t.prototype.getComponents=function(){return this.components},t.prototype.init=function(){var t=this.state.orientation,e=this.createSlider(t);this.components=this.createComponents(),this.scale=this.components.scale.getScale(),e.insertAdjacentElement("beforeend",this.scale),this.addElementsInScale(),this.root.insertAdjacentElement("beforeend",e)},t.prototype.createComponents=function(){var t=this.state.isRange,e={scale:new T(this.state,this.root),thumb:new O(this.state,this.root),progressBar:new V(this.state),labels:new U(this.state),tooltip:new M(this.state)};return t&&(e=w(w({},e),{thumbSecond:new O(this.state,this.root,"thumb-second"),tooltipSecond:new M(this.state,"tooltip-second")})),e},t.prototype.addElementsInScale=function(){var t=this.state,e=t.isRange,n=t.hasProgressBar,o=t.hasTooltips,i=t.labels.addLabels,r=this.components.thumb.getThumb(),s=this.components.progressBar.getProgressBar(),a=this.components.labels.getLabels(),c=this.components.tooltip.getTooltip();if(this.scale.insertAdjacentElement("afterbegin",r),e){var u=this.components.thumbSecond.getThumb();if(o){var h=this.components.tooltipSecond.getTooltip();u.insertAdjacentElement("beforeend",h)}var l=this.checkThumbsPosition()?"afterbegin":"beforeend";this.scale.insertAdjacentElement(l,u)}n&&this.scale.insertAdjacentElement("afterbegin",s),o&&r.insertAdjacentElement("beforeend",c),i&&this.scale.insertAdjacentElement("beforeend",a)},t.prototype.checkThumbsPosition=function(){var t=this.state,e=t.from,n=t.to,o=l(this.state,e),i=l(this.state,n);return 100===o&&100===i},t.prototype.createSlider=function(t){var e=document.createElement("div");return e.classList.add("js-slider","slider","slider--".concat(t)),e},t}(),H=function(){var t=function(e,n){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},t(e,n)};return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),D=function(t){function e(e,n){var o=t.call(this)||this;return o.state=e,o.root=n,o.init(e),o}return H(e,t),e.prototype.init=function(t){this.root.innerHTML="";var e=new S(t,this.root);this.sliderComponents=e.getComponents(),this.bindEvents(),t.isRange&&this.createUnitedTooltip(t)},e.prototype.update=function(t){[this.sliderComponents.thumb,this.sliderComponents.progressBar,this.sliderComponents.tooltip,this.sliderComponents.thumbSecond,this.sliderComponents.tooltipSecond].forEach((function(e){e&&e.update(t)})),t.isRange&&this.createUnitedTooltip(t)},e.prototype.setTargetThumb=function(t){var e=this.sliderComponents.thumb,n=this.sliderComponents.thumbSecond;"to"===t?n.dragThumbAfterScaleClick(t):e.dragThumbAfterScaleClick(t)},e.prototype.bindEvents=function(){this.bindThumbEvents(),this.bindLabelsEvents(),this.bindScaleEvents()},e.prototype.bindScaleEvents=function(){var t=this;this.sliderComponents.scale.subscribe(a.SCALE_VALUE_CHANGED,(function(e){t.emit(i.VALUE_CHANGED,e)}))},e.prototype.bindLabelsEvents=function(){var t=this;this.sliderComponents.labels.subscribe(s.LABEL_VALUE_CHANGED,(function(e){t.emit(i.VALUE_CHANGED_FROM_LABELS,e)}))},e.prototype.bindThumbEvents=function(){var t=this,e=this.sliderComponents,n=e.thumb,o=e.thumbSecond;n.subscribe(r.THUMB_VALUE_FROM_CHANGED,(function(e){t.emit(i.VALUE_FROM_CHANGED,e)})),n.subscribe(r.THUMB_VALUE_INCREMENT,(function(e){t.emit(i.VALUE_FROM_INCREMENT,e)})),n.subscribe(r.THUMB_VALUE_DECREMENT,(function(e){t.emit(i.VALUE_FROM_DECREMENT,e)})),o&&(this.setThumbZIndex(n,o),o.subscribe(r.THUMB_VALUE_TO_CHANGED,(function(e){t.emit(i.VALUE_TO_CHANGED,e)})),o.subscribe(r.THUMB_VALUE_INCREMENT,(function(e){t.emit(i.VALUE_FROM_INCREMENT,e)})),o.subscribe(r.THUMB_VALUE_DECREMENT,(function(e){t.emit(i.VALUE_FROM_DECREMENT,e)})))},e.prototype.setThumbZIndex=function(t,e){var n=t.getThumb(),o=e.getThumb();t.subscribe(r.THUMB_VALUE_FROM_CHANGED,(function(){n.style.zIndex="1",o.style.zIndex="0"})),e.subscribe(r.THUMB_VALUE_TO_CHANGED,(function(){n.style.zIndex="0",o.style.zIndex="1"}))},e.prototype.checkTooltipsOverlap=function(t,e,n){var o=e.getBoundingClientRect(),i=o.right,r=o.top,s=n.getBoundingClientRect(),a=s.left,c=s.bottom;return!(!("horizontal"===t&&i>=a)&&!("vertical"===t&&c>=r))},e.prototype.createUnitedTooltip=function(t){var e=t.from,n=t.to,o=t.orientation,i=this.sliderComponents.tooltip,r=this.sliderComponents.tooltipSecond,s=i.getTooltip(),a=r.getTooltip(),c=s.children[0];this.checkTooltipsOverlap(o,s,a)?(s.classList.add("tooltip--united"),c.textContent="".concat(e," – ").concat(n),a.style.visibility="hidden"):(s.classList.remove("tooltip--united"),a.style.visibility="visible")},e}(E),R=function(){function t(t,e){this.model=new g(t),this.view=new D(this.model.getState(),e),this.root=e,this.bindModelEvents(),this.bindViewEvents()}return t.prototype.bindModelEvents=function(){var t=this;this.model.subscribe(o.STATE_CHANGED,(function(e){t.view.init(e),t.dispatchUpdateEvent()})),this.model.subscribe(o.VALUE_CHANGED,(function(e){t.view.update(e),t.dispatchUpdateEvent()}))},t.prototype.bindViewEvents=function(){var t=this;this.view.subscribe(i.VALUE_CHANGED,(function(e){var n=t.model.getOptionByNearValue(e);t.model.setValueFromPercent(n,e),t.view.setTargetThumb(n)})),this.view.subscribe(i.VALUE_CHANGED_FROM_LABELS,(function(e){var n=t.model.getOptionByNearValue(e);t.model.setValueFromPercent(n,e)})),this.view.subscribe(i.VALUE_FROM_CHANGED,(function(e){t.model.setValueFromPercent("from",e)})),this.view.subscribe(i.VALUE_TO_CHANGED,(function(e){t.model.setValueFromPercent("to",e)})),this.view.subscribe(i.VALUE_FROM_INCREMENT,(function(e){t.model.increment(e)})),this.view.subscribe(i.VALUE_FROM_DECREMENT,(function(e){t.model.decrement(e)}))},t.prototype.updateEvent=function(){return new CustomEvent("update",{detail:this.model.getState()})},t.prototype.dispatchUpdateEvent=function(){this.root.dispatchEvent(this.updateEvent())},t}(),B=function(){return B=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},B.apply(this,arguments)},G={init:function(t){return this.each((function(){var e=B(B({},JSON.parse(JSON.stringify(c.W))),t);$(this).data("sliderPlugin",new R(e,this))}))},getState:function(){return $(this).data("sliderPlugin").model.getState()},getValue:function(t){return $(this).data("sliderPlugin").model.getValue(t)},setValue:function(t,e){$(this).data("sliderPlugin").model.setValue(t,e)},bindListener:function(t,e){$(this).on(t,(function(t){return e(t)}))}};$.fn.sliderPlugin=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=t[0],o=t.slice(1),i="string"==typeof n&&G[n];if(i)return G[n].apply(this,o);if("object"==typeof n||!n){var r=n||{};return G.init.call(this,r)}$.error('Метод с именем "'.concat(n,'" не существует для sliderPlugin'))}},897:function(t,e,n){n.d(e,{W:function(){return o}});var o={min:0,max:100,step:10,from:20,to:50,orientation:"horizontal",color:"green",isRange:!0,hasProgressBar:!0,hasTooltips:!0,labels:{addLabels:!0,countOfLabels:6}}}},function(t){var e;e=359,t(t.s=e)}]);