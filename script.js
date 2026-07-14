const photos = [
  { id: 1,  cat:'landscape', title:'Ridge Line',      src:'https://picsum.photos/id/1015/900/1100' },
  { id: 2,  cat:'urban',     title:'Overpass',         src:'https://picsum.photos/id/1024/900/1100' },
  { id: 3,  cat:'portrait',  title:'Study No. 3',      src:'https://picsum.photos/id/1027/900/1100' },
  { id: 4,  cat:'landscape', title:'Low Tide',         src:'https://picsum.photos/id/1035/900/1100' },
  { id: 5,  cat:'nature',    title:'Fern Grove',       src:'https://picsum.photos/id/1043/900/1100' },
  { id: 6,  cat:'urban',     title:'Fire Escape',      src:'https://picsum.photos/id/1048/900/1100' },
  { id: 7,  cat:'nature',    title:'Moss & Stone',     src:'https://picsum.photos/id/1053/900/1100' },
  { id: 8,  cat:'portrait',  title:'Study No. 7',      src:'https://picsum.photos/id/1062/900/1100' },
  { id: 9,  cat:'landscape', title:'Long Valley',      src:'https://picsum.photos/id/1074/900/1100' },
  { id:10,  cat:'urban',     title:'Night Grid',       src:'https://picsum.photos/id/1084/900/1100' },
  { id:11,  cat:'nature',    title:'Timber Line',      src:'https://picsum.photos/id/1080/900/1100' },
  { id:12,  cat:'portrait',  title:'Study No. 11',     src:'https://picsum.photos/id/1005/900/1100' },
];

const categories = ['all', ...new Set(photos.map(p => p.cat))];
const filtersEl = document.getElementById('filters');
const gridEl = document.getElementById('grid');
let currentFilter = 'all';
let currentIndex = 0;
let visiblePhotos = photos;

function renderFilters(){
  filtersEl.innerHTML = categories.map(c =>
    `<button data-cat="${c}" class="${c===currentFilter?'active':''}">${c}</button>`
  ).join('');
}

function renderGrid(){
  visiblePhotos = currentFilter === 'all' ? photos : photos.filter(p => p.cat === currentFilter);
  gridEl.innerHTML = visiblePhotos.map((p, i) => `
    <figure data-index="${i}" style="animation-delay:${i * 0.04}s">
      <img src="${p.src}" alt="${p.title}" loading="lazy">
      <figcaption>${p.title} — <em>${p.cat}</em></figcaption>
    </figure>
  `).join('');
}

filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if(!btn) return;
  currentFilter = btn.dataset.cat;
  renderFilters();
  renderGrid();
});

gridEl.addEventListener('click', e => {
  const fig = e.target.closest('figure');
  if(!fig) return;
  currentIndex = Number(fig.dataset.index);
  openLightbox();
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');

function openLightbox(){
  updateLightbox();
  lightbox.classList.add('open');
}
function updateLightbox(){
  const p = visiblePhotos[currentIndex];
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbCaption.textContent = `${p.title} · ${p.cat} · ${currentIndex + 1} / ${visiblePhotos.length}`;
}
function closeLightbox(){ lightbox.classList.remove('open'); }
function nextImg(){ currentIndex = (currentIndex + 1) % visiblePhotos.length; updateLightbox(); }
function prevImg(){ currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length; updateLightbox(); }

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', nextImg);
document.getElementById('lbPrev').addEventListener('click', prevImg);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => {
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeLightbox();
  if(e.key === 'ArrowRight') nextImg();
  if(e.key === 'ArrowLeft') prevImg();
});

renderFilters();
renderGrid();
