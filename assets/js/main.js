const burger=document.getElementById('burger');
const menu=document.getElementById('menu');
if(burger&&menu){burger.addEventListener('click',()=>{menu.classList.toggle('open')});}
const setActive=()=>{
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('nav.menu a[data-nav]').forEach(a=>{
    const href=a.getAttribute('href');
    a.classList.toggle('active', href && (href===path || (path==='index.html' && href==='index.html')));
  });
};
setActive();
const year=document.getElementById('year');
if(year){year.textContent=new Date().getFullYear();}
const consultForm=document.getElementById('consultForm');
if(consultForm){
  consultForm.addEventListener('submit',e=>{
    e.preventDefault();
    const nama=document.getElementById('nama')?.value?.trim()||'';
    const alamat=document.getElementById('alamat')?.value?.trim()||'';
    const konsultasi=document.getElementById('konsultasi')?.value?.trim()||'';
    if(!nama||!alamat||!konsultasi){return;}
    const nomor='6281234567890';
    const text=`Halo Pak Yono, saya ingin konsultasi.%0A%0ANama: ${encodeURIComponent(nama)}%0AAlamat: ${encodeURIComponent(alamat)}%0ADetail: ${encodeURIComponent(konsultasi)}`;
    const url=`https://wa.me/${nomor}?text=${text}`;
    window.open(url,'_blank','noopener');
  });
}
document.querySelectorAll('.consult-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const service=btn.getAttribute('data-service')||'Layanan';
    const price=btn.getAttribute('data-price')||'';
    const nomor='6281234567890';
    const text=`Halo Pak Yono, saya tertarik layanan ${encodeURIComponent(service)}.%0AHarga: ${encodeURIComponent(price)}.%0ABoleh info ketersediaan dan estimasi waktu?`;
    window.open(`https://wa.me/${nomor}?text=${text}`,'_blank','noopener');
  });
});
