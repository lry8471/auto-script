
    $.fn.autoScript = function(opts) {
        Splitting({
            target: this,
            by: 'chars'
        });

        $('.auto-script-content').animate({scrollTop:0}, 300);

        return this.each(function() {
            var $autoScriptSection = $('.auto-script-section'),
                $txt = $autoScriptSection.find('span.char'),
                txtNum = $txt.length,
                $btn = $('.auto-script-control button'),
                $zoomArea = $autoScriptSection.find('.zoom-area'),
                $table = $(this).find('table'),
                nowZoom = 100,
                nowSpeed = 300,
                btnCase = null,
                cn = null;
            $txt.each(function(n){
                if(n < txtNum) {
                    $(this).attr('data-num', n);
                    n = n + 1;
                }
            });
            $table.each(function(){
                var tableW = $(this).width(),
                    loadW = $(this).closest('.douc-load-section').width();
                if(tableW > loadW) $(this).closest('.douc-load-section').css('width', tableW+20);
            });
            //if(opts == 'off') return false;
            $autoScriptSection.attr('data-total', txtNum);
            var autoStart = function(n) {
                var speed = nowSpeed;
                $autoScriptSection.attr('data-speed', speed);
                $txt.eq(n).delay(speed).addClass('on');
                if(n < txtNum) {
                    if(btnCase === "start") {
                        cn = n = n + 1;
                        setTimeout(function() {
                            autoStart(n);
                        }, speed);
                        $autoScriptSection.removeClass('pause');
                    } else if(btnCase === "pause") {
                        $autoScriptSection.addClass('pause');
                    } else if(btnCase === "reset") {
                        cn = n = 0;
                        $txt.removeClass('on');
                    }
                } else {
                    alert('다 읽었어요');
                }
            }

            var playFn = function() {
                $autoScriptSection.removeClass('no-ani');
                setTimeout(function() {
                    btnCase = 'start';
                    autoStart(cn);
                }, 1000);
            }

            var pauseFn = function() {
                btnCase = 'pause';
                autoStart(cn);
            }

            var stopFn = function() {
                btnCase = 'reset';
                autoStart(1);
                $autoScriptSection.removeClass('pause');
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
                $('.zoom-area').css('zoom', nowZoom + '%');
                if($('html').hasClass('msie')) $zoomArea.width(((100 / nowZoom) * 100) + "%");
            }

            $btn.off().on('click', function(){
                var $this = $(this),
                    $class = $this.attr('data-btn');
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
                        penColor($this);
                        break;
                }
            });
            $txt.on('click', function() {
                var $this = $(this),
                    _current = $this.attr('data-num');
                $autoScriptSection.addClass('no-ani');
                for (var j = 0, charLeng = $txt.length; charLeng > j ; j++){
                    (_current >= j) ? $txt.eq(j).addClass('on') : $txt.eq(j).removeClass('on');
                }
                cn = Number(_current);
                pauseFn();
            });
        });
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