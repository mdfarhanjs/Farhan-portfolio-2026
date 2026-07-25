/* ── THEME ── */
const root=document.documentElement,btn=document.getElementById('themeToggle');
let dark=true;
btn.addEventListener('click',()=>{dark=!dark;root.setAttribute('data-theme',dark?'dark':'light');btn.textContent=dark?'☀️':'🌙'});

/* ── DESKTOP CURSOR ── */
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
if(cursor&&ring){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
  (function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)})();
  document.querySelectorAll('a,button,.skill-cell,.cert-cell,.m-cert-card,.about-card,.contact-item,.edu-card,.exp-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='52px';ring.style.height='52px'});
    el.addEventListener('mouseleave',()=>{ring.style.width='36px';ring.style.height='36px'});
  });
}

/* ── MOBILE HAMBURGER ── */
const menuBtn=document.getElementById('menuBtn'),mobileNav=document.getElementById('mobileNav');
menuBtn.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
});
function closeMobileNav(){
  mobileNav.classList.remove('open');
  menuBtn.classList.remove('open');
  document.body.style.overflow='';
}
// Close on outside tap
document.addEventListener('click',e=>{
  if(mobileNav.classList.contains('open')&&!mobileNav.contains(e.target)&&!menuBtn.contains(e.target))closeMobileNav();
});

/* ── REVEAL OBSERVER ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ── SKILL BARS ── */
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.sk-bar-fill').forEach(b=>{b.style.width=b.dataset.w+'%'});
      barObs.unobserve(e.target);
    }
  });
},{threshold:.2});
document.querySelectorAll('.skills-grid').forEach(el=>{
  el.querySelectorAll('.sk-bar-fill').forEach(b=>b.style.width='0');
  barObs.observe(el);
});

/* ── MODAL ── */
function openModal(){
  const el=document.getElementById('certOverlay');
  el.style.display='flex';
  document.body.style.overflow='hidden';
  setTimeout(()=>el.classList.add('open'),10);
}
function closeModal(){
  const el=document.getElementById('certOverlay');
  el.classList.remove('open');
  document.body.style.overflow='';
  setTimeout(()=>{el.style.display='none'},300);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

/* ── TOUCH SWIPE DOWN TO CLOSE MODAL ── */
let touchStartY=0;
const modalBox=document.getElementById('modalBox');
modalBox.addEventListener('touchstart',e=>{touchStartY=e.touches[0].clientY},{passive:true});
modalBox.addEventListener('touchmove',e=>{
  if(modalBox.scrollTop===0&&e.touches[0].clientY-touchStartY>60)closeModal();
},{passive:true});
