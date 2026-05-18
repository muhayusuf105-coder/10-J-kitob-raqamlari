// ── MA'LUMOTLAR ──────────────────────────────────────────────────────────────
const SUBJECTS = [
  "Ona tili","Adabiyot","Rus tili","Rus tili 2","Matematika","Geometriya",
  "Tarix","Geografiya","Fizika","Kimyo","Tarbiya","Biologiya",
  "Jismoniy","Harbiya","Texnologiya","Axborot","Oz. tarix","Yor. tarix"
];

const students = [
  {n:1,  name:"Abduraxmonov O",  r:[39,54,133,97,93,105,2,null,26,23,0,50,14,17,73,105,97,99,51]},
  {n:2,  name:"Bahrullayev",     r:[47,70,95,99,63,32,68,114,69,0,116,1,26,57,112,19,28,110,null]},
  {n:3,  name:"Begimov",     r:[2,7,71,78,40,18,109,83,20,0,105,86,83,67,124,15,22,88,null]},
  {n:4,  name:"Naziqulov",      r:[74,43,34,10,13,48,59,112,112,0,77,58,67,58,107,12,33,12,null]},
  {n:5,  name:"Ibrohimov",       r:[63,69,54,39,111,4,92,61,3,0,62,31,99,5,85,9,21,58,null]},
  {n:6,  name:"Tiloberdiyeva",   r:[87,4,60,59,104,45,19,86,19,0,100,74,59,86,109,26,42,33,null]},
  {n:7,  name:"Bozorova S",      r:[102,10,113,6,16,32,65,101,30,0,22,7,22,65,90,25,40,79,null]},
  {n:8,  name:"Safarov E",       r:[113,71,2,7,15,113,50,87,29,0,113,35,95,14,98,81,109,99,null]},
  {n:9,  name:"Ortiqboyeva",     r:[86,98,47,11,14,74,49,18,46,0,12,71,56,79,132,16,46,92,null]},
  {n:10, name:"O'rozov A",         r:[33,19,36,102,6,88,73,72,88,0,75,61,35,72,28,23,11,6,null]},
  {n:11, name:"Otaxonov O",      r:[7,9,93,5,80,13,36,100,41,0,20,92,116,73,37,24,112,28,null]},
  {n:12, name:"Shomurodov S",    r:[28,12,118,51,21,110,75,9,85,0,74,34,18,93,134,116,56,6,null]},
  {n:13, name:"Hakimov O",       r:[36,8,34,44,13,64,116,98,5,0,111,30,30,74,3,14,46,101,null]},
  {n:14, name:"Rahimova Ch",     r:[27,53,120,8,30,99,101,119,97,0,4,95,105,53,83,107,47,72,null]},
  {n:15, name:"Abduqahhorov B",  r:[114,25,114,64,36,70,null,24,14,0,99,80,32,30,69,18,4,17,null]},
  {n:16, name:"Nuriddinov Rh",   r:[15,72,124,53,59,43,97,5,27,0,39,12,115,61,72,99,98,41,null]},
];

// ── HOLAT ────────────────────────────────────────────────────────────────────
let nameAsc   = true;
let colorOn   = true;
let sortColIdx = null; // null = default order
let sortColAsc = true;
let currentData = [...students];
let darkMode  = false;

// ── YORDAMCHI FUNKSIYALAR ─────────────────────────────────────────────────────
function getValid(arr){ return arr.filter(v => v !== null && v !== undefined); }
function sum(arr){ return getValid(arr).reduce((a,b)=>a+b,0); }
function avg(arr){ const v=getValid(arr); return v.length ? (sum(v)/v.length) : null; }
function maxVal(arr){ const v=getValid(arr); return v.length ? Math.max(...v) : null; }
function minVal(arr){ const v=getValid(arr); return v.length ? Math.min(...v) : null; }

function colorClass(v){
  if(v===null||v===undefined) return '';
  if(v===0)   return 'c-zero';
  if(v<=40)   return 'c-low';
  if(v<=80)   return 'c-mid';
  if(v<=120)  return 'c-high';
  return 'c-top';
}

function cell(v, colored){
  if(v===null||v===undefined) return { html:'<span class="empty">–</span>', cls:'' };
  const cls = colored ? colorClass(v) : '';
  return { html:'<span class="num">'+v+'</span>', cls };
}

// ── STATISTIKA PANELINI YANGILASH ─────────────────────────────────────────────
function updateStats(data){
  const active = data.filter(s => getValid(s.r).length > 0);
  document.getElementById('statTotal').textContent  = data.length;
  document.getElementById('statActive').textContent = active.length;

  const allNums = data.flatMap(s => getValid(s.r));
  if(allNums.length){
    document.getElementById('statMax').textContent = Math.max(...allNums);
    document.getElementById('statMin').textContent = Math.min(...allNums);
    const a = (allNums.reduce((x,y)=>x+y,0)/allNums.length).toFixed(1);
    document.getElementById('statAvg').textContent = a;
  } else {
    ['statMax','statMin','statAvg'].forEach(id => document.getElementById(id).textContent='–');
  }
}

// ── JADVALNI RENDER QILISH ────────────────────────────────────────────────────
function render(data){
  currentData = data;
  const tbody = document.getElementById('tbody');
  const tbl   = document.getElementById('mainTable');
  if(colorOn) tbl.classList.add('color-enabled');
  else        tbl.classList.remove('color-enabled');

  tbody.innerHTML = data.map((s, idx) => {
    const s_sum = sum(s.r);
    const s_avg = avg(s.r);
    const validCount = getValid(s.r).length;
    const avgStr = s_avg !== null ? s_avg.toFixed(1) : '<span class="empty">–</span>';
    const sumStr = validCount > 0 ? s_sum : '<span class="empty">–</span>';

    const cells = s.r.map(v => {
      const {html, cls} = cell(v, colorOn);
      return `<td class="${cls}">${html}</td>`;
    }).join('');

    return `<tr onclick="openModal(${s.n})">
      <td>${idx+1}</td>
      <td>${s.name}</td>
      ${cells}
      <td>${sumStr}</td>
      <td>${avgStr}</td>
    </tr>`;
  }).join('');

  document.getElementById('count').textContent = data.length + " ta o'quvchi";
  updateStats(data);
}

// ── ISM BO'YICHA SARALASH ─────────────────────────────────────────────────────
function sortByName(){
  sortColIdx = -2;
  const sorted = [...currentData].sort((a,b) =>
    nameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
  nameAsc = !nameAsc;
  clearSortArrows();
  document.getElementById('arrow-name').textContent = nameAsc ? ' ↑' : ' ↓';
  render(sorted);
}

// ── USTUN BO'YICHA SARALASH ───────────────────────────────────────────────────
function sortByCol(colIdx){
  if(colIdx === -1) return; // tartib raqami ustuni — skip
  if(colIdx === -2){ sortByName(); return; }

  const arrowId = colIdx < 18 ? 'arrow-'+colIdx :
                  colIdx === 18 ? 'arrow-sum' : 'arrow-avg';

  if(sortColIdx === colIdx) sortColAsc = !sortColAsc;
  else { sortColIdx = colIdx; sortColAsc = true; }

  const sorted = [...currentData].sort((a,b) => {
    let va, vb;
    if(colIdx < 18){
      va = a.r[colIdx]; vb = b.r[colIdx];
    } else if(colIdx === 18){
      va = sum(a.r); vb = sum(b.r);
    } else {
      va = avg(a.r); vb = avg(b.r);
    }
    if(va===null||va===undefined) return 1;
    if(vb===null||vb===undefined) return -1;
    return sortColAsc ? va-vb : vb-va;
  });

  clearSortArrows();
  const el = document.getElementById(arrowId);
  if(el) el.textContent = sortColAsc ? ' ↑' : ' ↓';
  render(sorted);
}

function clearSortArrows(){
  document.querySelectorAll('.sort-arrow').forEach(el => el.textContent='');
}

// ── RANG TOGGLE ───────────────────────────────────────────────────────────────
function toggleColor(){
  colorOn = !colorOn;
  const btn = document.getElementById('colorToggle');
  const txt = document.getElementById('colorToggleText');
  txt.textContent = colorOn ? 'Yoqiq' : 'O\'chiq';
  btn.classList.toggle('active', colorOn);
  document.getElementById('legend').style.opacity = colorOn ? '1' : '.4';
  render(currentData);
}

// ── QORONG'U REJIM ────────────────────────────────────────────────────────────
document.getElementById('themeToggle').addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.querySelector('.theme-icon').textContent = darkMode ? '☀️' : '🌙';
});

// ── QIDIRUV ───────────────────────────────────────────────────────────────────
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  const filtered = students.filter(s => s.name.toLowerCase().includes(q));
  render(filtered);
});

// ── CSV EKSPORT ───────────────────────────────────────────────────────────────
function exportCSV(){
  const headers = ['#','Ism', ...SUBJECTS, 'Jami', "O'rtacha"];
  const rows = students.map(s => {
    const s_sum = getValid(s.r).length ? sum(s.r) : '';
    const s_avg = avg(s.r) !== null ? avg(s.r).toFixed(1) : '';
    const vals  = s.r.map(v => v === null ? '' : v);
    return [s.n, s.name, ...vals, s_sum, s_avg];
  });
  const csv = [headers, ...rows]
    .map(row => row.map(v => `"${v}"`).join(','))
    .join('\n');
  const blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'kitob_raqamlari.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// ── O'QUVCHI PROFIL MODALI ────────────────────────────────────────────────────
function openModal(n){
  const s = students.find(x => x.n === n);
  if(!s) return;

  const validNums = getValid(s.r);
  const s_sum = validNums.length ? sum(s.r) : null;
  const s_avg = avg(s.r);
  const s_max = maxVal(s.r);
  const s_min = validNums.length ? minVal(s.r) : null;

  document.getElementById('modalAvatar').textContent = s.name.charAt(0).toUpperCase();
  document.getElementById('modalName').textContent = s.name;
  document.getElementById('modalSub').textContent =
    validNums.length > 0 ? `${validNums.length} ta fan bo'yicha ma'lumot bor` : "Ma'lumot yo'q";

  document.getElementById('modalStats').innerHTML = `
    <div class="mstat"><span class="mstat-val">${s_sum !== null ? s_sum : '–'}</span><span class="mstat-lbl">Jami</span></div>
    <div class="mstat"><span class="mstat-val">${s_avg !== null ? s_avg.toFixed(1) : '–'}</span><span class="mstat-lbl">O'rtacha</span></div>
    <div class="mstat"><span class="mstat-val">${s_max !== null ? s_max : '–'}</span><span class="mstat-lbl">Eng yuqori</span></div>
  `;

  document.getElementById('modalBooks').innerHTML = SUBJECTS.map((sub, i) => {
    const v = s.r[i];
    const numHtml = (v === null || v === undefined)
      ? '<span class="mbook-empty">–</span>'
      : `<span class="mbook-num">${v}</span>`;
    return `<div class="mbook-row"><span class="mbook-name">${sub}</span>${numHtml}</div>`;
  }).join('');

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Klaviaturadan yopish
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});

// ── BOSHLASH ──────────────────────────────────────────────────────────────────
render(students);
