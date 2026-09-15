const lessons=[...document.querySelectorAll('.lesson')];
const navLinks=[...document.querySelectorAll('.nav-group a[data-seq]')];
const completeButtons=[...document.querySelectorAll('[data-complete]')];
const storageKey='sti4si-bdr-completed-v1';
let completed=new Set(JSON.parse(localStorage.getItem(storageKey)||'[]').map(Number));
function refreshProgress(){
  completeButtons.forEach(b=>{const n=Number(b.dataset.complete);b.classList.toggle('done',completed.has(n));b.textContent=completed.has(n)?'✓ Séquence étudiée':'✓ Marquer comme étudiée'});
  navLinks.forEach(a=>a.classList.toggle('done',completed.has(Number(a.dataset.seq))));
  const pct=Math.round(completed.size/30*100);document.querySelector('#progressBar').style.width=pct+'%';document.querySelector('#progressText').textContent=`${completed.size} / 30 séquences étudiées`;
  localStorage.setItem(storageKey,JSON.stringify([...completed].sort((a,b)=>a-b)));
}
completeButtons.forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.complete);completed.has(n)?completed.delete(n):completed.add(n);refreshProgress()}));
refreshProgress();
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.dataset.seq===e.target.dataset.sequence));history.replaceState(null,'','#seq-'+e.target.dataset.sequence)}})},{rootMargin:'-20% 0px -68% 0px',threshold:0});
lessons.forEach(s=>observer.observe(s));
const sidebar=document.querySelector('.course-sidebar'),toggle=document.querySelector('#tocToggle');
toggle?.addEventListener('click',()=>sidebar.classList.toggle('open'));
navLinks.forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape')sidebar.classList.remove('open')});
