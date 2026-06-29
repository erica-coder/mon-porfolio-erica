// ===== CURSEUR =====
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
const label  = document.getElementById('cursor-label');
let mouseX=0,mouseY=0,ringX=0,ringY=0;
const sectionLabels = { hero:'✦ EXPLORE', about:'✦ DISCOVER', inspire:'✦ INSPIRE', skills:'✦ TECH', projects:'✦ BUILD', experience:'✦ JOURNEY', contact:'✦ CONNECT' };
document.addEventListener('mousemove', e => {
  mouseX=e.clientX; mouseY=e.clientY;
  cursor.style.left=mouseX+'px'; cursor.style.top=mouseY+'px';
  label.style.left=mouseX+'px'; label.style.top=mouseY+'px';
  spawnParticle(mouseX,mouseY);
  document.querySelectorAll('section[id]').forEach(sec => {
    const r=sec.getBoundingClientRect();
    if(r.top<=window.innerHeight/2 && r.bottom>=window.innerHeight/2)
      label.textContent=sectionLabels[sec.id]||'✦ EXPLORE';
  });
});
(function animRing(){ ringX+=(mouseX-ringX)*.12; ringY+=(mouseY-ringY)*.12; ring.style.left=ringX+'px'; ring.style.top=ringY+'px'; requestAnimationFrame(animRing); })();
document.querySelectorAll('a,button,.project-card,.skill-chip').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.width='28px';cursor.style.height='28px';cursor.style.background='var(--violet)';ring.style.width='60px';ring.style.height='60px';ring.style.opacity='1'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.width='16px';cursor.style.height='16px';cursor.style.background='var(--rose)';ring.style.width='40px';ring.style.height='40px';ring.style.opacity='.6'; });
});
// ===== TRAIL =====
let lastP=0;
function spawnParticle(x,y){
  const now=Date.now(); if(now-lastP<40)return; lastP=now;
  const shapes=['✦','✿','◆','·','✺','❋','♥'];
  const colors=['var(--violet)','var(--rose)','#e879f9','#fb7185','#f9a8d4'];
  const p=document.createElement('div'); p.className='trail-particle';
  const size=Math.random()*10+6;
  Object.assign(p.style,{left:x+'px',top:y+'px',fontSize:size+'px',lineHeight:'1',color:colors[Math.floor(Math.random()*colors.length)],transform:`translate(-50%,-50%) rotate(${Math.random()*360}deg)`});
  p.textContent=shapes[Math.floor(Math.random()*shapes.length)];
  document.body.appendChild(p); setTimeout(()=>p.remove(),700);
}
// ===== TYPEWRITER FUN =====
const funPhrases = [
  "transforme le café en code... et parfois en bugs. Mais surtout en code. ☕",
  "parle couramment JavaScript, Java, Python — et un peu le langage des erreurs 404.",
  "debug depuis 22h avec un sourire. Bon, peut-être pas un sourire. Mais je debug.",
  "crois sincèrement que les points-virgules manquants sont une forme d'art.",
  "suis la preuve vivante qu'on peut venir de Madagascar et coder pour le monde entier.",
  "passe mes nuits à coder et mes matins à relire ce que j'ai codé la nuit. Courage.",
  "Google Stack Overflow comme une pro. C'est aussi une compétence, non ?",
  "construis des apps qui résolvent de vrais problèmes — et parfois en crée de nouveaux.",
];
let phraseIndex=0, charIndex=0, isDeleting=false;
const typedEl=document.getElementById('typed-text');
function typeLoop(){
  const phrase=funPhrases[phraseIndex];
  if(!isDeleting){ typedEl.textContent=phrase.slice(0,charIndex+1); charIndex++; if(charIndex===phrase.length){ setTimeout(()=>{ isDeleting=true; typeLoop(); },2600); return; } }
  else { typedEl.textContent=phrase.slice(0,charIndex-1); charIndex--; if(charIndex===0){ isDeleting=false; phraseIndex=(phraseIndex+1)%funPhrases.length; } }
  setTimeout(typeLoop, isDeleting?38:62);
}
setTimeout(typeLoop, 1200);
// ===== CITATION IA =====
const QUOTE_THEMES = [
  'la persévérance en programmation',
  'l\'impact de la tech en Afrique',
  'l\'apprentissage continu',
  'le courage de coder sans filet',
  'être une femme dans la tech',
  'construire quelque chose depuis zéro',
  'les bugs comme opportunités',
  'l\'open source et le partage'
];

const FALLBACK_QUOTES = [
  'Chaque bug que tu corriges est une étoile de plus dans ton ciel de code. Continue.',
  'Le code que tu écris aujourd\'hui est le pont vers ton rêve de demain.',
  'Une développeuse malgache peut coder pour le monde entier. Ne doute jamais de ta force.',
  'La persévérance transforme les lignes de code en chefs-d\'œuvre.',
  'Ton clavier est ta plume. Madagascar est ton inspiration. Le monde est ton public.'
];

async function generateQuote() {
  const textEl = document.getElementById('inspire-text');
  const authorEl = document.getElementById('inspire-author');
  const tagsEl = document.getElementById('inspire-tags');
  const btn = document.getElementById('inspire-btn');
  
  const originalBtnHTML = btn.innerHTML;
  btn.innerHTML = '<span class="inspire-loading"></span>';
  
  try {
    const theme = QUOTE_THEMES[Math.floor(Math.random() * QUOTE_THEMES.length)];
    const quote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = quote;
      textEl.style.opacity = '1';
    }, 200);
    
    const tags = ['motivation', 'développement', 'Madagascar'];
    tagsEl.innerHTML = tags.map(t => `<span class="inspire-tag">${t}</span>`).join('');
  } catch (err) {
    textEl.textContent = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
  } finally {
    btn.innerHTML = originalBtnHTML;
  }
}

// ===== REVEAL ANIMATION =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));