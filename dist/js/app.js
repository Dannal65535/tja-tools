!function(e){function t(t){for(var n,r,l=t[0],c=t[1],i=t[2],d=0,u=[];d<l.length;d++)r=l[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&u.push(o[r][0]),o[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(f&&f(t);u.length;)u.shift()();return s.push.apply(s,i||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,l=1;l<a.length;l++){var c=a[l];0!==o[c]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},o={0:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="dist/";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var f=c;s.push([104,1]),a()}({100:function(e,t){},101:function(e,t){},102:function(e,t,a){},103:function(e,t,a){},104:function(e,t,a){"use strict";a.r(t),a.d(t,"toFixedZero",(function(){return _}));var n=a(6),o=a(0),s=a.n(o),r=a(4),l=a(26),c=a.n(l),i=a(27),f=a.n(i);function d(e){const t=["TITLE","SUBTITLE","BPM","WAVE","OFFSET","DEMOSTART","GENRE"],a=["COURSE","LEVEL","BALLOON","SCOREINIT","SCOREDIFF","TTROWBEAT"],n=["START","END","GOGOSTART","GOGOEND","MEASURE","SCROLL","BPMCHANGE","DELAY","BRANCHSTART","BRANCHEND","SECTION","N","E","M","LEVELHOLD","BMSCROLL","HBSCROLL","BARLINEOFF","BARLINEON","TTBREAK","NEWLINE"];let o;if((o=e.match(/\/\/.*/))&&(e=e.substr(0,o.index).trim()),o=e.match(/^([A-Z]+):(.+)/i)){const e=o[1].toUpperCase(),n=o[2];if(t.includes(e))return{type:"header",scope:"global",name:e,value:n.trim()};if(a.includes(e))return{type:"header",scope:"course",name:e,value:n.trim()}}else if(o=e.match(/^#([A-Z]+)(?:\s+(.+))?/i)){const e=o[1].toUpperCase(),t=o[2]||"";if(n.includes(e))return{type:"command",name:e,value:t.trim()}}else if(o=e.match(/^(([0-9]|A|B|C|F|G)*,?)$/)){return{type:"data",data:o[1]}}return{type:"unknown",value:e}}function u(e,t){const a={course:"Oni",level:0,balloon:[],scoreInit:100,scoreDiff:100,ttRowBeat:16},n=[];let o=4,s=4,r={},l="",c=[],i="N",f="N",d=!1;for(const e of t)if("header"===e.type)switch(e.name){case"COURSE":a.course=e.value;break;case"LEVEL":a.level=parseInt(e.value,10);break;case"BALLOON":const t=e.value.split(/[^0-9]/).filter(e=>""!==e).map(e=>parseInt(e,10));a.balloon=t;break;case"SCOREINIT":a.scoreInit=parseInt(e.value,10);break;case"SCOREDIFF":a.scoreDiff=parseInt(e.value,10);break;case"TTROWBEAT":a.ttRowBeat=parseInt(e.value,10)}else if("command"===e.type)switch(e.name){case"BRANCHSTART":if(d)break;let t=e.value.split(",");"r"===t[0]?f=t.length>=3?"M":2===t.length?"E":"N":"p"===t[0]&&(f=t.length>=3&&parseFloat(t[2])<=100?"M":t.length>=2&&parseFloat(t[1])<=100?"E":"N");break;case"BRANCHEND":i=f;break;case"N":i="N";break;case"E":i="E";break;case"M":i="M";break;case"START":case"END":i="N",f="N",d=!1;break;default:if(i!=f)break;switch(e.name){case"MEASURE":let t=e.value.match(/(\d+)\/(\d+)/);if(!t)break;o=parseInt(t[1],10),s=parseInt(t[2],10);break;case"GOGOSTART":c.push({name:"gogoStart",position:l.length});break;case"GOGOEND":c.push({name:"gogoEnd",position:l.length});break;case"BARLINEON":c.push({name:"barlineon",position:l.length});break;case"BARLINEOFF":c.push({name:"barlineoff",position:l.length});break;case"SCROLL":c.push({name:"scroll",position:l.length,value:parseFloat(e.value)});break;case"BPMCHANGE":c.push({name:"bpm",position:l.length,value:parseFloat(e.value)});break;case"TTBREAK":case"NEWLINE":r.ttBreak=!0;break;case"LEVELHOLD":d=!0}}else if("data"===e.type&&i===f){let t=e.data;if(t.endsWith(",")){l+=t.slice(0,-1);const e={length:[o,s],properties:r,data:l,events:c};n.push(e),l="",c=[],r={}}else l+=t}if(n.length){let t=!1;for(let e=0;e<n[0].events.length;e++){const a=n[0].events[e];if("bpm"===a.name&&0===a.position){t=!0;break}}t||n[0].events.unshift({name:"bpm",position:0,value:e.bpm})}let u=0;switch(a.course.toLowerCase()){case"easy":case"0":u=0;break;case"normal":case"1":u=1;break;case"hard":case"2":u=2;break;case"oni":case"3":u=3;break;case"edit":case"ura":case"4":u=4}if(l)n.push({length:[o,s],properties:r,data:l,events:c});else for(let e of c)e.position=n[n.length-1].data.length,n[n.length-1].events.push(e);return console.log(n[n.length-1]),{course:u,headers:a,measures:n}}function p(e,t,a,n,o,s,r){e.beginPath(),e.moveTo(t,a),e.lineTo(n,o),e.lineWidth=s,e.strokeStyle=r,e.stroke(),e.closePath()}function h(e,t,a,n,o){e.beginPath(),e.arc(t,a,n,0,2*Math.PI,!1),e.fillStyle=o,e.fill(),e.closePath()}function g(e,t,a,n,o,s){e.fillStyle=s,e.fillRect(t,a,n,o)}function b(e,t,a,n,o,s){let r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"middle",l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"center";e.font=o,e.textBaseline=r,e.textAlign=l,e.fillStyle=s,e.fillText(n,t,a)}function m(e,t,a,n,o){let s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"middle",r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"center";b(e,t,a,n,'5px "Pixel 3x5"',o,s,r)}const v=e=>64+66*e,k=e=>24+48*e;function y(e,t){return{x:k(t),y:v(e)+34}}function x(e,t,a,n){let o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];const{x:s,y:r}=y(t,a);h(e,s,r,9,"#000"),o?(h(e,s,r,8,"#fff"),h(e,s,r,7,n)):h(e,s,r,8,n)}function E(e,t,a,n){const{x:o,y:s}=y(t,a);h(e,o,s,12,"#000"),h(e,o,s,11,"#fff"),h(e,o,s,9,n)}function B(e,t,a,n,o,s,r){let l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"body",{x:c,y:i}=y(a,n),{x:f,y:d}=y(o,s);const u="gogo"===l,p="bodyBig"===l,h=u?34:9+(p?3:0);i-=h,d-=h;const b=u?18:18+(p?6:0);if(a===o){const t=f-c;u?g(e,c,i,t,b,r):(g(e,c,i,t,b,"#000"),g(e,c,i+1,t,b-2,"#fff"),g(e,c,i+2,t,b-4,r))}else{const n=t[a].totalBeat,l=k(n)-c+24;u?g(e,c,i,l,b,r):(g(e,c,i,l,b,"#000"),g(e,c,i+1,l,b-2,"#fff"),g(e,c,i+2,l,b-4,r));for(let n=a+1;n<o;n++){let a=v(n),o=k(t[n].totalBeat)+24;u?g(e,0,a,o,b,r):(a+=25-(p?3:0),g(e,0,a,o,b,"#000"),g(e,0,a+1,o,b-2,"#fff"),g(e,0,a+2,o,b-4,r))}const f=k(s);u?g(e,0,d,f,b,r):(g(e,0,d,f,b,"#000"),g(e,0,d+1,f,b-2,"#fff"),g(e,0,d+2,f,b-4,r))}}function O(e,t,a,n,o,s){x(e,a,n,"#fe4"),x(e,o,s,"#fe4"),B(e,t,a,n,o,s,"#fe4","body")}function R(e,t,a,n,o,s){E(e,a,n,"#fe4"),E(e,o,s,"#fe4"),B(e,t,a,n,o,s,"#fe4","bodyBig")}function T(e,t,a,n,o,s,r){x(e,o,s,"#fb4"),B(e,t,a,n,o,s,"#fb4","body"),x(e,a,n,"#fb4",!1);const{x:l,y:c}=y(a,n);m(e,l,c+.5,r.toString(),"#000")}var S=function(e,t){const a=function(e){const t=[],a=[];let n=0,o=0,s=!1;for(let r=0;r<e.measures.length;r++){const l=e.measures[r],c=l.length[0]/l.length[1]*4;for(let e=0;e<l.events.length;e++){const a=l.events[e],o=c/(l.data.length||1)*a.position;"bpm"===a.name?t.push({type:"bpm",value:a.value,beat:n+o}):"gogoStart"===a.name?t.push({type:"gogoStart",beat:n+o}):"gogoEnd"===a.name&&t.push({type:"gogoEnd",beat:n+o})}for(let t=0;t<l.data.length;t++){const r=l.data.charAt(t);let i={type:"",beat:n+c/l.data.length*t};switch(r){case"1":i.type="don";break;case"2":i.type="kat";break;case"3":case"A":i.type="donBig";break;case"4":case"B":i.type="katBig";break;case"5":i.type="renda";break;case"6":i.type="rendaBig";break;case"7":i.type="balloon",i.count=e.headers.balloon[o++];break;case"8":i.type="end",s&&(s=!1);break;case"9":!1===s&&(i.type="balloon",i.count=e.headers.balloon[o++],s=!0)}i.type&&a.push(i)}n+=c}return function(e,t){let a=120,n=0,o=0,s=0,r=0,l=[];for(;r<t.length;){let c=e[s],i=t[r];for(;c&&c.beat<=i;){if("bpm"===c.type){let e=c.beat-n;n+=e,o+=60/a*e,a=c.value}s++,c=e[s]}let f=i-n,d=60/a*f;l.push(o+d),n+=f,o+=d,r++}return l}(t,a.map(e=>e.beat)).forEach((e,t)=>{a[t].time=e}),{headers:e.headers,events:t,notes:a}}(e.courses[t]);return{statistics:function(e){const t=[0,0,0,0],a=[],n=[],o=[];let s=0,r=0,l=0,c=!1,i=0,f=!1,d=0,u=0,p=0,h=!1,g=!1,b=0,m=0,v=e.events[m],k=0,y=[[0,0,0,0,0],[0,0,0,0,0]],x=[0,0],E=[0,0],B=0;const O=["don","kat","donBig","katBig"];for(let R=0;R<e.notes.length;R++){const T=e.notes[R];if(v&&v.beat<=T.beat)do{"gogoStart"===v.type?k=1:"gogoEnd"===v.type&&(k=0),m+=1,v=e.events[m]}while(v&&v.beat<=T.beat);const S=O.indexOf(T.type);if(-1===S)if("renda"!==T.type&&"rendaBig"!==T.type)if("balloon"!==T.type){if("end"===T.type)if(c)a.push(T.time-i),n.length>0&&(n[n.length-1].isBigRenda==h&&n[n.length-1].isGoGoRenda==g&&a[n.length-1].toFixed(3)==(T.time-i).toFixed(3)||(b+=1)),n.push({isBigRenda:h,isGoGoRenda:g,rendaGroup:b}),c=!1;else if(f){const e=T.time-d,t=u/e;o.push([e,u]),f=!1,t<=60&&(x[p]+=u-1,E[p]+=1)}}else d=T.time,f=!0,u=T.count,p=k;else i=T.time,c=!0,h="rendaBig"===T.type?1:0,g=k;else{0===R&&(s=T.time),r=T.time,t[S]+=1,l+=1;const a=2===S||3===S,n=l<10?0:l<30?1:l<50?2:l<100?3:4;y[k][n]+=a?2:1;let o=e.headers.scoreInit+e.headers.scoreDiff*(l<10?0:l<30?1:l<50?2:l<100?4:8),c=10*Math.floor(o/10);k&&(c=10*Math.floor(1.2*c/10)),a&&(c*=2),B+=c}}return{totalCombo:l,notes:t,length:r-s,rendas:a,rendaExtends:n,balloons:o,score:{score:B,notes:y,balloon:x,balloonPop:E}}}(a),graph:function(e){const t=[];let a={don:0,kat:0},n=0;const o=e.notes[e.notes.length-1].time/100,s=["don","kat","donBig","katBig"];for(let r=0;r<e.notes.length;r++){const l=e.notes[r];if(-1!==s.indexOf(l.type)){for(;(t.length+1)*o<=l.time;){const e=a.don+a.kat;n<e&&(n=e),t.push(a),a={don:0,kat:0}}"don"===l.type||"donBig"===l.type?a.don+=1:"kat"!==l.type&&"katBig"!==l.type||(a.kat+=1)}}for(;t.length<100;)t.push({don:0,kat:0});return{timeframe:o,max:n,data:t}}(a)}};a(102),a(103);const A=s()("#charset-utf-8").first(),F=s()("#charset-shift-jis").first(),w=s()("#charset-gb18030").first(),N=s()("#editor-live").first(),C=s()("#auto-scroll-to-bottom").first(),L=s()(".editor-process"),I=s()(".area-editor .input"),G=s()(".area-errors .errors"),M=s()(".renda-head");let P=null,D="",j="preview";function U(e){G.text(e)}function H(){s()(".controls-diff .button.is-active").removeClass("is-active"),s()(".controls-diff .btn-diff-".concat(D)).addClass("is-active"),s()(".controls-page .button.is-active").removeClass("is-active"),s()(".controls-page .btn-page-".concat(j)).addClass("is-active"),s()(".area-pages .page").addClass("is-hidden"),s()(".area-pages .page-".concat(j)).removeClass("is-hidden"),"preview"===j&&""!==D?V():s()("#tja-preview").remove(),"statistics"===j&&function(){if(""===D)return;try{!function(e){const{statistics:t,graph:a}=e;s()(".stat-total-combo").text(t.totalCombo);const n=P.courses[D],{scoreInit:o,scoreDiff:l}=n.headers,c=e=>10*Math.floor(e/10),i=[0,1,2,4,8].map(e=>c(o+l*e)),f=i.map(e=>c(1.2*e)),d=i.map((e,a)=>t.score.notes[0][a]*e).reduce((e,t)=>e+t,0)+f.map((e,a)=>t.score.notes[1][a]*e).reduce((e,t)=>e+t,0)+300*t.score.balloon[0]+360*t.score.balloon[1]+5e3*t.score.balloonPop[0]+6e3*t.score.balloonPop[1]+1e4*Math.floor(t.totalCombo/100);t.rendas.length?s()(".stat-max-score").text("".concat(d," 点 + 連打")):s()(".stat-max-score").text("".concat(d," 点"));let u=0,p=0,h=!0;for(let e=0;e<n.measures.length;e++)for(let t=0;t<n.measures[e].events.length;t++)if("bpm"===n.measures[e].events[t].name){let a=n.measures[e].events[t].value;h?(u=a,p=a,h=!1):(u>a&&(u=a),p<a&&(p=a))}u.toFixed(2)!=p.toFixed(2)?s()(".stat-bpm").text(_(u.toFixed(2))+"-"+_(p.toFixed(2))):s()(".stat-bpm").text(_(p.toFixed(2)));s()(".stat-don-small").text(t.notes[0]),s()(".stat-don-big").text(t.notes[2]),s()(".stat-kat-small").text(t.notes[1]),s()(".stat-kat-big").text(t.notes[3]);const g=t.notes[0]+t.notes[2],b=t.notes[1]+t.notes[3];s()(".stat-don").text(g),s()(".stat-kat").text(b);const m=g/t.totalCombo*100,v=100-m;s()(".stat-don-ratio").text(m.toFixed(2)+"%"),s()(".stat-kat-ratio").text(v.toFixed(2)+"%"),s()(".stat-density").text(((t.totalCombo-1)/t.length).toFixed(2)),s()(".stat-length").text(t.length.toFixed(2)),s()(".stat-renda").text(t.rendas.map(e=>e.toFixed(3)+"秒").join(" + ")),s()(".stat-renda-total").text(t.rendas.reduce((e,t)=>e+t,0).toFixed(3)+"秒"),s()(".stat-balloon").html(t.balloons.map(e=>"".concat(e[1],"打 / ").concat(e[0].toFixed(3),"秒 = ").concat((e[1]/e[0]).toFixed(3)," 打/秒")).join("<br>"));const k=r.b().rangeRound([0,600]),y=r.c().rangeRound([200,0]),x=5*Math.ceil(a.max/5),E=[...Array(x/5+1).keys()].map(e=>5*e);s()(".stat-graph").empty();const B=r.d(".stat-graph").attr("width",650).attr("height",240).append("g").attr("transform","translate(30, 20)"),O=r.e().keys(["don","kat"])(a.data);k.domain(O[0].map((e,t)=>t)),y.domain([0,5*Math.ceil(a.max/5)]);const R=()=>r.a(y).ticks(5).tickValues(E);B.append("g").attr("class","grid").call(R().tickSize(-600).tickFormat(""));B.selectAll(".layer").data(O).enter().append("g").attr("class","layer").style("fill",(e,t)=>["#f44e","#44fe"][t]).selectAll("rect").data(e=>e).enter().append("rect").attr("x",(e,t)=>k(t)).attr("y",e=>y(e[1])).attr("height",e=>y(e[0])-y(e[1])).attr("width",k.bandwidth),B.append("g").attr("class","axis-y").call(R())}(S(P,D))}catch(e){console.error(e),U(e.message)}}()}function W(){try{P=function(e){const t=e.split(/(\r\n|\r|\n)/).map(e=>e.trim()),a={title:"",subtitle:"",bpm:120,wave:"",offset:0,demoStart:0,genre:""},n={};let o,s=[];for(o=0;o<t.length;o++){const e=t[o];if(""===e)continue;const r=d(e);if("header"===r.type&&"global"===r.scope)switch(r.name){case"TITLE":a.title=r.value;break;case"SUBTITLE":a.subtitle=r.value;break;case"BPM":a.bpm=parseFloat(r.value);break;case"WAVE":a.wave=r.value;break;case"OFFSET":a.offset=parseFloat(r.value);break;case"DEMOSTART":a.demoStart=parseFloat(r.value);break;case"GENRE":a.genre=r.value}else if("header"===r.type&&"course"===r.scope){if("COURSE"===r.name&&s.length){const e=u(a,s);n[e.course]=e,s=[]}s.push(r)}else("command"===r.type||"data"===r.type)&&s.push(r)}if(s.length){const e=u(a,s);n[e.course]=e}return{headers:a,courses:n}}(I.first().value),s()(".controls-diff .button").addClass("is-hidden");for(let e in P.courses)s()(".controls-diff .btn-diff-".concat(e)).removeClass("is-hidden");U("No error")}catch(e){console.error(e),U(e.message)}}function V(){""!==D&&(s()("#tja-preview").remove(),document.fonts.load('5px "Pixel 3x5"').then(()=>{try{const e=function(e,t){const a=e.courses[t],n=a.headers.ttRowBeat,o=[];let s=[],r=0;for(let e=0;e<a.measures.length;e++){const t=a.measures[e],l=t.length[0]/t.length[1]*4;(n<r+l||t.properties.ttBreak)&&(o.push({beats:r,measures:s}),s=[],r=0),s.push(t),r+=l}s.length&&o.push({beats:r,measures:s});const l=24+48*n+24,c=64+66*o.length+8,i=document.createElement("canvas");i.width=l,i.height=c,document.body.appendChild(i);const f=i.getContext("2d");try{g(f,0,0,l,c,"#cccccc");for(let e=0;e<o.length;e++){const t=o[e],a=t.beats;t.measures;t.totalBeat=a;const n=24+48*a+24,s=v(e);g(f,0,s+18,n,32,"#000"),g(f,0,s+18+2,n,28,"#fff"),g(f,0,s+18+4,n,24,"#999")}b(f,8,8,4===a.course?e.headers.title+"(裏譜面)":e.headers.title,"bold 28px sans-serif","#000","top","left");const t=[5,7,8,10,10];b(f,8,40,["かんたん","ふつう","むずかしい","おに","おに"][a.course]+" "+"★".repeat(a.headers.level)+"☆".repeat(Math.max(t[a.course]-a.headers.level,0)),"bold 20px sans-serif","#000","top","left");let n,s=!1,r=1,d=!0;for(let e=0;e<o.length;e++){const t=o[e].measures;let a=0;for(let n=0;n<t.length;n++){const r=t[n],l=r.length[0]/r.length[1]*4;r.rowBeat=a;for(let t=0;t<r.events.length;t++){const n=r.events[t],c=a+l/(r.data.length||1)*n.position;"gogoStart"!==n.name||s?"gogoEnd"===n.name&&s&&(B(f,o,s[0],s[1],e,c,"#fbb","gogo"),s=!1):s=[e,c]}a+=l}}for(let e=0;e<o.length;e++){const t=o[e].measures;let a=0;const s=v(e);for(let l=0;l<t.length;l++){const c=k(a),i=t[l],u=i.length[0]/i.length[1]*4,h=s+18;for(let e=0;e<2*i.length[0]+1;e++){const t=e/i.length[1]*2,n=k(a+t);p(f,n,h,n,h+32,2,"#fff"+(e%2?"4":"8"))}n=d;for(let e=0;e<i.events.length;e++){const t=i.events[e];"barlineon"===t.name?(d=!0,0===t.position&&(n=!0)):"barlineoff"===t.name&&(d=!1,0===t.position&&(n=!1))}for(let e=0;e<i.events.length;e++){const t=i.events[e],o=u/(i.data.length||1)*t.position,r=k(a+o);"scroll"===t.name?((n||t.position>0)&&p(f,r,s,r,s+50,2,"#444"),m(f,r+2,s+18-13,"HS "+_(t.value.toFixed(2)),"#f00","bottom","left")):"bpm"===t.name&&((n||t.position>0)&&p(f,r,s,r,s+50,2,"#444"),m(f,r+2,s+18-7,"BPM "+_(t.value.toFixed(2)),"#00f","bottom","left"))}if(n&&p(f,c,s,c,s+50,2,"#fff"),m(f,c+2,s+18-1,r.toString(),"#000","bottom","left"),r+=1,a+=u,n=d,e===o.length-1&&l===t.length-1)n=!1;else if(l===t.length-1){const t=o[e+1].measures[0];for(let e=0;e<t.events.length;e++){const a=t.events[e];"barlineon"===a.name?0===a.position&&(n=!0):"barlineoff"===a.name&&0===a.position&&(n=!1)}}else for(let e=0;e<t[l+1].events.length;e++){const a=t[l+1].events[e];"barlineon"===a.name?0===a.position&&(n=!0):"barlineoff"===a.name&&0===a.position&&(n=!1)}if(n&&l+1===t.length){const e=k(a);p(f,e,s,e,s+50,2,"#fff")}}}let u=0,h=!1;for(let e=0;e<o.length;e++){const t=o[e].measures;for(let e=0;e<t.length;e++){const a=t[e];for(let e=a.data.length;e>=0;e--){const t=a.data.charAt(e);"7"===t?u+=1:"9"!==t||h?"8"===t&&h&&(h=!1):(h=1,u+=1)}}}if(a.headers.balloon.length<u)throw new Error("BALLOON count mismatch");let y=!1,S=!1;for(let e=o.length-1;e>=0;e--){const t=o[e].measures;for(let n=t.length-1;n>=0;n--){const s=t[n],r=s.length[0]/s.length[1]*4;for(let t=s.data.length;t>=0;t--){const n=s.data.charAt(t),l=s.rowBeat+r/s.data.length*t;if("0"!==n&&"9"!==n&&S){S[0];const e=S[S.length-1],t=a.headers.balloon[u-1];T(f,o,e[0],e[1],y[0],y[1],t),u-=1,y=!1,S=!1}switch(n){case"1":x(f,e,l,"#f33");break;case"2":x(f,e,l,"#5cf");break;case"3":case"A":E(f,e,l,"#f33");break;case"4":case"B":E(f,e,l,"#5cf");break;case"5":O(f,o,e,l,y[0],y[1]),y=!1;break;case"6":R(f,o,e,l,y[0],y[1]),y=!1;break;case"7":const t=a.headers.balloon[u-1];T(f,o,e,l,y[0],y[1],t),u-=1,y=!1;break;case"8":y=[e,l];break;case"9":S||(S=[]),S.push([e,l]);break;case"C":x(f,e,l,"#000");break;case"F":x(f,e,l,"#ddd");break;case"G":E(f,e,l,"#f3f")}}}}return document.body.removeChild(i),i}catch(e){throw document.body.removeChild(i),e}}(P,D),t=document.createElement("img");t.id="tja-preview",t.src=e.toDataURL(),s()(".page-preview").append(t),U("No error")}catch(e){console.error(e),U(e.message)}}))}function _(e){let t=e;for(;;){if("0"!==t.charAt(t.length-1)){if("."===t.charAt(t.length-1)){t=t.slice(0,-1);break}break}t=t.slice(0,-1)}return t}L.on("click",()=>{W(),V()}),M.on("click",()=>{if(""===D)return;const e=S(P,D),{statistics:t,graph:a}=e;!function(e,t){let a="",n=0,o=!0;const s=t.reduce((e,t)=>Math.max(e,t.rendaGroup),-1);for(let r=0;r<e.length;r++)if(t[r].rendaGroup!=n&&(n+=1,o=!0),o){t[r].isBigRenda&&(a+="SIZE(16){"),t[r].isGoGoRenda&&(a+="''"),a+="約"+e[r].toFixed(3)+"秒",t[r].isGoGoRenda&&(a+="''"),t[r].isBigRenda&&(a+="}");let l=t.reduce((e,t)=>t.rendaGroup===n?e+1:e,0);l>1&&(a+="×"+l),t[r].rendaGroup!=s&&(a+="－"),o=!1}e.length>1&&(a+="： 合計約"+e.reduce((e,t)=>e+t,0).toFixed(3)+"秒"),""!=a&&navigator.clipboard.writeText("-連打秒数目安・・・"+a)}(t.rendas,t.rendaExtends)}),I.on("input",()=>{N.checked&&(W(),H(),C.checked&&setTimeout(()=>{let e=document.getElementById("area-pages");e.scrollTo(0,e.scrollHeight)},100))}),I.on("dragover",e=>{e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="cppy"}),I.on("drop",e=>{e.stopPropagation(),e.preventDefault();const t=e.dataTransfer.files[0],a=new FileReader;a.onload=e=>{const t=e.target.result,a=new Uint8Array(t),o=n.Buffer.from(a);let s;s=A.checked?"UTF-8":F.checked?"Shift-JIS":w.checked?"GB18030":c.a.detect(o);const r=f.a.decode(o,s);I.first().value=r,D="",W(),H()},a.readAsArrayBuffer(t)}),s()(".controls-diff .button").on("click",e=>{const t=s()(e.target).data("value");D=t,H()}),s()(".controls-page .button").on("click",e=>{const t=s()(e.target).data("value");j=t,H()}),I.first().value&&W(),H()}});