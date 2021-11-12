var autoScript = function(target) {
    devices.detect();
    var $selector = document.getElementsByClassName(target);

    Splitting({
        target: $selector,
        by: 'chars'
    });

    var $autoScriptSection = document.querySelector('.auto-script-section');
    var $txts = document.querySelectorAll('.char');
    var txtNum = $txts.length;
    var $btn = document.querySelectorAll('.auto-script-control button');
    var $zoomArea = $autoScriptSection.querySelector('.zoom-area');
    var nowZoom = 100;
    var nowSpeed = 300;
    var btnCase = null;
    var cn = null;
    
    for (i = 0; i < txtNum; i++) {
        if(i < txtNum) $txts[i].setAttribute('data-num', i);
    };

    $autoScriptSection.setAttribute('data-total', txtNum);
    var autoStart = function(n) {
        var speed = nowSpeed;
        $autoScriptSection.setAttribute('data-speed', speed)
        setTimeout(function(){
            $txts[n-1].classList.add('on');
        }, speed);
        if(n < txtNum) {
            if(btnCase === "start") {
                cn = n = n + 1;
                setTimeout(function() {
                    autoStart(n);
                }, speed);
                $autoScriptSection.classList.remove('pause');
            } else if(btnCase === "pause") {
                $autoScriptSection.classList.add('pause');
            } else if(btnCase === "reset") {
                cn = n = 0;
                $txts.classList.remove('on');
            }
        } else {
            alert('다 읽었어요');
        }
    }

    var playFn = function() {
        $autoScriptSection.classList.remove('no-ani');
        btnCase = 'start';
        autoStart(cn);
    }

    var pauseFn = function() {
        console.log('pause');
        btnCase = 'pause';
        autoStart(cn);
    }

    var stopFn = function() {
        btnCase = 'reset';
        autoStart(1);
        $autoScriptSection.classList.remove('pause');
    }

    var speedFn = function(s) {
        nowSpeed = s;
    }

    var resetFn = function(s) {
        stopFn();
        speedFn(300);
        nowZoom = 100;
        zooms();
    }

    var zoomOut = function(s) {
        nowZoom = nowZoom - 10;
        if(nowZoom < 70) alert("더 이상 축소할 수 없습니다.");
        if(nowZoom <= 70) nowZoom = 70;
        zooms();
    }

    var zoomIN = function(s) {
        nowZoom = nowZoom + 10;
        if(nowZoom > 150) alert("더 이상 확대할 수 없습니다.");
        if(nowZoom >= 150) nowZoom = 150;
        zooms();
    }

    var zooms = function(s) {
        var $html = document.querySelector('html');
        $zoomArea.style.zoom = nowZoom + '%';
        if($html.classList.contains('msie')) $zoomArea.style.width = (((100 / nowZoom) * 100) + "%");
    }

    var penColor = function(btn) {
        var $penColor = document.querySelector('.pen-color'),
            $colorList = $penColor.querySelector('.color-list'),
            $btnColor = $colorList.querySelectorAll('input[type="radio"]');
        $penColor.classList.toggle('open');
        var sDown = function() {
            $colorList.classList.add('active');
            $colorList.style.height = 'auto';
            var height = $colorList.clientHeight + 'px';
            $colorList.style.height = '0px';
            setTimeout(function () {
                $colorList.style.height = height;
            }, 0);
        };
        var sUp = function() {
            $colorList.style.height = '0px';
            $colorList.addEventListener('transitionend', function () {
                $colorList.classList.remove('active');
            }, {
                once: true
            });
        };
        (!$colorList.classList.contains('active')) ? sDown() : sUp();

        var colorChk = function(e) {
            var $target = e.target;
            var color = $target.nextElementSibling.getAttribute('data-color');
            var $section = document.querySelector('.auto-script-section');
            $section.setAttribute('pen-color', color);
            btn.setAttribute('data-color', color);
            sUp();
        };

        for (i = 0; i < $btnColor.length; i++) {
            $btnColor[i].addEventListener("change", colorChk);
        }

        document.addEventListener('click', function(e) {
            if(fnClosest(e.target, '.pen-color') === null) sUp();
        }, false);
    }
    
    var btnControl = function(e) {
        var $target = e.target;
        var $class = $target.getAttribute('data-btn');
        switch($class) {
            case 'start':
                playFn();
                break;
            case 'pause':
                pauseFn();
                break;
            case 'reset':
                resetFn();
                break;
            case 's-up2':
                speedFn(100);
                break;
            case 's-up1':
                speedFn(200);
                break;
            case 's-default':
                speedFn(300);
                break;
            case 's-down1':
                speedFn(400);
                break;
            case 's-down2':
                speedFn(500);
                break;
            case 'zoomIN':
                zoomIN();
                break;
            case 'zoomOut':
                zoomOut();
                break;
            case 'color-open':
                penColor(this);
                break;
        }
    }

    for (b = 0; b < $btn.length; b++) {
        $btn[b].addEventListener("click", btnControl);
    }

    var txtTrigger = function(e) {
        var $target = e.target;
        var _current = $target.getAttribute('data-num');
        $autoScriptSection.classList.add('no-ani');
        for (i = 0; i < txtNum; i++) {
            (_current >= i) ? $txts[i].classList.add('on') : $txts[i].classList.remove('on');
        }
        cn = Number(_current);
        pauseFn();
    }

    for (i = 0; i < txtNum; i++) {
        $txts[i].addEventListener("click", txtTrigger);
    }
}


!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.Splitting=n()}(this,function(){"use strict"
var u=document,d=u.createTextNode.bind(u)
function l(t,n,e){t.style.setProperty(n,e)}function f(t,n){return t.appendChild(n)}function p(t,n,e,r){var i=u.createElement("span")
return n&&(i.className=n),e&&(!r&&i.setAttribute("data-"+n,e),i.textContent=e),t&&f(t,i)||i}function n(t,n){return t&&0!=t.length?t.nodeName?[t]:[].slice.call(t[0].nodeName?t:(n||u).querySelectorAll(t)):[]}function h(t,n){t&&t.some(n)}var a={}
function t(t,n,e,r){return{by:t,depends:n,key:e,split:r}}function i(t){return function n(e,t,r){var i=r.indexOf(e)
if(-1==i){r.unshift(e)
var u=a[e]
if(!u)throw new Error("plugin not loaded: "+e)
h(u.depends,function(t){n(t,e,r)})}else{var o=r.indexOf(t)
r.splice(i,1),r.splice(o,0,e)}return r}(t,0,[]).map((n=a,function(t){return n[t]}))
var n}function e(t){a[t.by]=t}function v(t,r,i,u,o){t.normalize()
var a=[],s=document.createDocumentFragment()
u&&a.push(t.previousSibling)
var c=[]
return n(t.childNodes).some(function(t){if(!t.tagName||t.hasChildNodes()){if(t.childNodes&&t.childNodes.length)return c.push(t),void a.push.apply(a,v(t,r,i,u,o))
var n=t.wholeText||"",e=n.trim()
e.length&&(" "===n[0]&&c.push(d(" ")),h(e.split(i),function(t,n){n&&o&&c.push(p(s,"char space"," ",o))
var e=p(s,r,t)
a.push(e),c.push(e)})," "===n[n.length-1]&&c.push(p(s,"char space"," ",o)))}else c.push(t)}),h(c,function(t){f(s,t)}),t.innerHTML="",f(t,s),a}var o="words",r=t(o,0,"word",function(t){return v(t,"word",/\s+/,0,1)}),m="chars",s=t(m,[o],"char",function(t,e,n){var r=[]
return h(n[o],function(t,n){r.push.apply(r,v(t,"char","",e.whitespace&&n))}),r})
function c(r){var f=(r=r||{}).key
return n(r.target||"[data-splitting]").map(function(s){var c=s["🍌"]
if(!r.force&&c)return c
c=s["🍌"]={el:s}
var t,n=r.by||(t="splitting",s.getAttribute("data-"+t))
n&&"true"!=n||(n=m)
var e=i(n),d=function(t,n){for(var e in n)t[e]=n[e]
return t}({},r)
return h(e,function(t){if(t.split){var n=t.by,e=(f?"-"+f:"")+t.key,r=t.split(s,d,c)
e&&(i=s,a=(o="--"+e)+"-index",h(u=r,function(t,n){Array.isArray(t)?h(t,function(t){l(t,a,n)}):l(t,a,n)}),l(i,o+"-total",u.length)),c[n]=r,s.classList.add(n)}var i,u,o,a}),s.classList.add("splitting"),c})}return c.html=function(t){var n=(t=t||{}).target=p()
return n.innerHTML=t.content,c(t),n.outerHTML},(c.add=e)(r),e(s),c})

var devices = {
	ua: {window:null,mac:null,chrome:null,firefox:null,opera:null,safari:null,edge:null,msie:null,ie11:null,ie10:null,ie9:null,ie8:null,android:null,ios:null,iphone:null,ipad:null,blackberry:null,operam:null,iem:null},
	boolean: function(){
		devices.ua.window = navigator.userAgent.match(/windows/i);
		devices.ua.mac = navigator.userAgent.match(/macintosh/i);
		devices.ua.chrome = navigator.userAgent.match(/chrome/i);
		devices.ua.firefox = navigator.userAgent.match(/firefox/i);
		devices.ua.opera = navigator.userAgent.match(/opera|OPR/i);
		devices.ua.safari = navigator.userAgent.match(/safari/i) && !devices.ua.chrome;
		devices.ua.edge = navigator.userAgent.match(/edge/i);
		devices.ua.msie = navigator.userAgent.match(/rv:11.0|msie/i);
		devices.ua.ie11 = navigator.userAgent.match(/rv:11.0/i);
		devices.ua.ie10 = navigator.userAgent.match(/msie 10.0/i);
		devices.ua.ie9 = navigator.userAgent.match(/msie 9.0/i);
		devices.ua.ie8 = navigator.userAgent.match(/msie 8.0/i);
		devices.ua.android = navigator.userAgent.match(/Android/i);
		devices.ua.ios = navigator.userAgent.match(/iPhone|iPad|iPod/i);
		devices.ua.iphone = navigator.userAgent.match(/iPhone/i);
		devices.ua.ipad = navigator.userAgent.match(/iPad/i);
		devices.ua.blackberry = navigator.userAgent.match(/BlackBerry/i);
		devices.ua.operam = navigator.userAgent.match(/Opera Mini/i);
		devices.ua.iem = navigator.userAgent.match(/IEMobile/i);
	},
	detect: function(){
		var html = document.querySelector('html');
		devices.boolean();
		html.removeAttribute('class');
		if(devices.ua.window || devices.ua.mac){
			devices.ua.window ? html.classList.add('window') : '';
			devices.ua.mac ? html.classList.add('mac') : '';
			devices.ua.chrome ? html.classList.add('chrome') : '';
			devices.ua.firefox ? html.classList.add('firefox') : '';
			devices.ua.opera ? html.classList.add('opera') : '';
			devices.ua.safari ? html.classList.add('safari') : '';
			devices.ua.edge ? html.classList.add('edge') : '';
			devices.ua.msie ? html.classList.add('msie') : '';
			devices.ua.ie11 ? html.classList.add('ie11') : '';
			devices.ua.ie10 ? html.classList.add('ie10') : '';
			devices.ua.ie9 ? html.classList.add('ie9') : '';
			devices.ua.ie8 ? html.classList.add('ie8') : '';
		} else {
			devices.ua.android ? html.classList.add('android') : '';
			devices.ua.ios ? html.classList.add('ios') : '';
			devices.ua.iphone ? html.classList.add('iphone') : '';
			devices.ua.ipad ? html.classList.add('ipad') : '';
			devices.ua.blackberry ? html.classList.add('blackberry') : '';
			devices.ua.operam ? html.classList.add('operam') : '';
			devices.ua.iem ? html.classList.add('iem') : '';
		}
	}
}



function fnClosest(elem,selector) {
	if (selector==null||selector.length<1){
		return false;
	}
	function dataAttribute(selector){
		var firstChar = selector.charAt(0), attribute, value = false, supports = 'classList' in document.documentElement;
		if (firstChar==="[") {
			selector = selector.substr( 0, selector.length - 1 );
			attribute = selector.split( '=' );
			if ( attribute.length > 1 ) {
				value = true;
				attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
			}
			attribute[0] = attribute[0].substr(1,attribute[0].length );
      if(attribute[0].indexOf("data-")<0){ attribute[0] = "data-"+attribute[0]; }
		}
		return [firstChar,attribute,value,supports];
	}
	function internalFind(selector,firstChar,attribute,value,supports,elem){
		while(elem!=null){
			var previous = elem;
			if(elem.nodeType==1){
				if ( firstChar === '.' ) {
					if ( supports ) {
						if ( elem.classList.contains( selector.substr(1) ) ) {
							return elem;
						}
					} else {
						if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
							return elem;
						}
					}
				}
				if ( firstChar === '#' ) {
					if ( elem.id === selector.substr(1) ) {
						return elem;
					}
				}
				if ( firstChar === '[' ) {
					if ( elem.hasAttribute( attribute[0] ) ) {
						if ( value ) {
							if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
								results.add(elem);
							}
						} else {
							results.add(elem);
						}
					}
				}
				if ( elem.nodeName.toLowerCase() === selector ) {
					return elem;
				}
			}
			elem = elem.previousElementSibling;
			if(elem===null){ elem = previous.parentNode; }
		}
		return null;
	}
	
	holder = dataAttribute(selector);
	return internalFind(selector,holder[0],holder[1],holder[2],holder[3],elem);
}