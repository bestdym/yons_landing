const burger=document.getElementById('burger');
const menu=document.getElementById('menu');
let navBackdrop=document.getElementById('nav-backdrop');
if(!navBackdrop){navBackdrop=document.createElement('div');navBackdrop.id='nav-backdrop';document.body.appendChild(navBackdrop);}
const toggleMenu=(open)=>{
  if(!(burger&&menu))return;
  const isOpen=(open!==undefined)?open:!menu.classList.contains('open');
  menu.classList.toggle('open',isOpen);
  document.body.classList.toggle('menu-open',isOpen);
  navBackdrop.classList.toggle('show',isOpen);
};
if(burger&&menu){
  burger.addEventListener('click',()=>toggleMenu());
  navBackdrop.addEventListener('click',()=>toggleMenu(false));
  document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
}
// Scrollspy active for single-page anchors
const navLinks=[...document.querySelectorAll('nav.menu a[data-nav]')];
const ids=navLinks.map(a=>a.getAttribute('href')).filter(Boolean).map(h=>h.startsWith('#')?h.slice(1):'').filter(Boolean);
const sections=ids.map(id=>document.getElementById(id)).filter(Boolean);
const activate=(id)=>{
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')===`#${id}`));
};
if(sections.length){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ activate(e.target.id); }
    });
  },{rootMargin:'-40% 0px -50% 0px', threshold:0.01});
  sections.forEach(s=>io.observe(s));
}
// Smooth scroll for in-page anchors
navLinks.forEach(a=>{
  const href=a.getAttribute('href')||'';
  if(href.startsWith('#')){
    a.addEventListener('click',e=>{
      e.preventDefault();
      const id=href.slice(1);
      const el=document.getElementById(id);
      if(el){
        const y=el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({top:y,behavior:'smooth'});
      }
    });
  }
});
const year=document.getElementById('year');
if(year){year.textContent=new Date().getFullYear();}
const consultForm=document.getElementById('consultForm');
if(consultForm){
  consultForm.addEventListener('submit',e=>{
    e.preventDefault();
    const nama=document.getElementById('nama')?.value?.trim()||'';
    const jenis=document.getElementById('jenis')?.value?.trim()||'';
    const konsultasi=document.getElementById('konsultasi')?.value?.trim()||'';
    if(!nama||!jenis||!konsultasi){return;}
    const nomor='6285156208963';
    const text=`Halo Pak Yono, saya ingin konsultasi.%0A%0ANama: ${encodeURIComponent(nama)}%0AJenis: ${encodeURIComponent(jenis)}%0ADetail: ${encodeURIComponent(konsultasi)}`;
    const url=`https://wa.me/${nomor}?text=${text}`;
    window.open(url,'_blank','noopener');
  });
}
document.querySelectorAll('.consult-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const service=btn.getAttribute('data-service')||'Layanan';
    const price=btn.getAttribute('data-price')||'';
    const nomor='6285156208963';
    const text=`Halo Pak Yono, saya tertarik layanan ${encodeURIComponent(service)}.%0AHarga: ${encodeURIComponent(price)}.%0ABoleh info ketersediaan dan estimasi waktu?`;
    window.open(`https://wa.me/${nomor}?text=${text}`,'_blank','noopener');
  });
});
document.querySelectorAll('.scroll-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const dir=parseInt(btn.dataset.dir||'1',10);
    const header=btn.closest('.group-header');
    let grid=header&&header.nextElementSibling;
    if(!(grid&&grid.classList.contains('catalog-grid'))){
      grid=header?.parentElement?.querySelector('.catalog-grid');
    }
    if(grid){
      const amount=Math.max(grid.clientWidth*0.9,200);
      grid.scrollBy({left:dir*amount,behavior:'smooth'});
    }
  });
});
// Overlay scroll-fab inside catalog-wrap
const wraps=document.querySelectorAll('.catalog-wrap');
wraps.forEach(wrap=>{
  const grid=wrap.querySelector('.catalog-grid');
  const leftBtn=wrap.querySelector('.scroll-fab.left');
  const rightBtn=wrap.querySelector('.scroll-fab.right');
  if(!grid||!leftBtn||!rightBtn) return;
  const update=()=>{
    const max=Math.max(0, grid.scrollWidth-grid.clientWidth);
    const atStart=grid.scrollLeft<=1;
    const atEnd=grid.scrollLeft>=max-1;
    const noOverflow=max<=1;
    wrap.classList.toggle('at-start',atStart);
    wrap.classList.toggle('at-end',atEnd);
    wrap.classList.toggle('no-overflow',noOverflow);
    if(noOverflow){
      leftBtn.setAttribute('hidden','');
      rightBtn.setAttribute('hidden','');
    }else{
      leftBtn.removeAttribute('hidden');
      rightBtn.removeAttribute('hidden');
      leftBtn.toggleAttribute('disabled',atStart);
      rightBtn.toggleAttribute('disabled',atEnd);
    }
  };
  update();
  grid.addEventListener('scroll',update,{passive:true});
  // Observe size changes
  if('ResizeObserver' in window){
    const ro=new ResizeObserver(()=>update());
    ro.observe(grid);
  }else{
    window.addEventListener('resize',update);
  }
  // Recalculate after images loaded
  grid.querySelectorAll('img').forEach(img=>{
    if(!img.complete){ img.addEventListener('load',update,{once:true}); }
  });
  // Extra tick for fonts/paint
  setTimeout(update,500);
  leftBtn.addEventListener('click',()=>grid.scrollBy({left:-Math.max(grid.clientWidth*0.9,200),behavior:'smooth'}));
  rightBtn.addEventListener('click',()=>grid.scrollBy({left: Math.max(grid.clientWidth*0.9,200),behavior:'smooth'}));
});
