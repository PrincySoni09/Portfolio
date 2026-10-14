/* Shared header, footer, theme toggle, scroll reveal and count-up numbers */
document.documentElement.classList.add('js');
(function(){
  var EXT='.html',PRE='';
  var PAGES=[['index','Home'],['blog','Blog'],['resume','Resume'],['contact','Contact']];
  var root=document.documentElement;
  try{var t=localStorage.getItem('theme');if(t)root.setAttribute('data-theme',t)}catch(e){}
  function build(){
    var cur=window.PREVIEW?(location.hash||'#index').slice(1):document.body.dataset.page;
    document.getElementById('hdr').innerHTML='<header class="bar"><div class="bar-in"><b>Princy Soni</b><nav aria-label="Main">'+
      PAGES.map(function(p){return '<a href="'+PRE+p[0]+EXT+'"'+(p[0]===cur?' aria-current="page"':'')+'>'+p[1]+'</a>'}).join('')+
      '<button id="theme" aria-label="Toggle light or dark theme">Theme</button></nav></div></header>';
    document.getElementById('ftr').innerHTML='<footer>Princy Soni | Electronics and Communication Engineering, IIT Roorkee | E-Portfolio 2026</footer>';
  }
  document.addEventListener('click',function(e){
    if(e.target.id!=='theme')return;
    var d=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    var n=d?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(x){}
  });
  function count(el){
    var to=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),t0=null;
    function step(t){t0=t0||t;var p=Math.min((t-t0)/1200,1);el.textContent=(to*(1-Math.pow(1-p,3))).toFixed(dec);if(p<1)requestAnimationFrame(step)}
    requestAnimationFrame(step);
  }
  function watch(){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(count);io.unobserve(e.target)})},{threshold:.15});
    document.querySelectorAll('.rv:not(.in)').forEach(function(el){io.observe(el)});
  }
  build();watch();
  if(window.PREVIEW)addEventListener('hashchange',function(){build();window.scrollTo(0,0);setTimeout(watch,50)});
})();