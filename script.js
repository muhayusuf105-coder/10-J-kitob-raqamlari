const students = [
  { n: 1, name: "Abduraxmonov O", r: [39, 54, 133, 97, 93, 105, 2, null, 26, 23, 0, 50, 14, 17, 73, 105, 97, 99, 51] },
  { n: 2, name: "Bahrullayev", r: [47, 70, 95, 99, 63, 32, 68, 114, 69, 0, 116, 1, 26, 57, 112, 19, 28, 110, null] },
  { n: 3, name: "Begimov", r: [2, 7, 71, 78, 40, 18, 109, 83, 20, 0, 105, 86, 83, 67, 124, 15, 22, 88, null] },
  { n: 4, name: "Naxirqulov", r: [74, 43, 34, 10, 13, 48, 59, 112, 112, 0, 77, 58, 67, 58, 107, 12, 33, 12, null] },
  { n: 5, name: "Ibrohimov", r: [63, 69, 54, 39, 111, 4, 92, 61, 3, 0, 62, 31, 99, 5, 85, 9, 21, 58, null] },
  { n: 6, name: "Tiloberdiyeva", r: [87, 4, 60, 59, 104, 45, 19, 86, 19, 0, 100, 74, 59, 86, 109, 26, 42, 33, null] },
  { n: 7, name: "Boxorova S", r: [102, 10, 113, 6, 16, 32, 65, 101, 30, 0, 22, 7, 22, 65, 90, 25, 40, 79, null] },
  { n: 8, name: "Safarov E", r: [113, 71, 2, 7, 15, 113, 50, 87, 29, 0, 113, 35, 95, 14, 98, 81, 109, 99, null] },
  { n: 9, name: "Ortigboyeva", r: [86, 98, 47, 11, 14, 74, 49, 18, 46, 0, 12, 71, 56, 79, 132, 16, 46, 92, null] },
  { n: 10, name: "Yorov A", r: [33, 19, 36, 102, 6, 88, 73, 72, 88, 0, 75, 61, 35, 72, 28, 23, 11, 6, null] },
  { n: 11, name: "Otaxonov O", r: [7, 9, 93, 5, 80, 13, 36, 100, 41, 0, 20, 92, 116, 73, 37, 24, 112, 28, null] },
  { n: 12, name: "Shamurodov S", r: [28, 12, 118, 51, 21, 110, 75, 9, 85, 0, 74, 34, 18, 93, 134, 116, 56, 6, null] },
  { n: 13, name: "Halimov O", r: [36, 8, 34, 44, 13, 64, 116, 98, 5, 0, 111, 30, 30, 74, 3, 14, 46, 101, null] },
  { n: 14, name: "Rahimova Ch", r: [27, 53, 120, 8, 30, 99, 101, 119, 97, 0, 4, 95, 105, 53, 83, 107, 47, 72, null] },
  { n: 15, name: "Abdugafforov B", r: [114, 25, 114, 64, 36, 70, null, 24, 14, 0, 99, 80, 32, 30, 69, 18, 4, 17, null] },
  { n: 16, name: "Nuriddinov Rh", r: [15, 72, 124, 53, 59, 43, 97, 5, 27, 0, 39, 12, 115, 61, 72, 99, 98, 41, null] },
  { n: 17, name: "Xodirqulov O", r: [93, 31, 88, 61, 109, 108, 102, 96, 68, 0, 34, 99, 16, 31, 26, 97, 30, 24, null] },
  { n: 18, name: "Abdullayeva O", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 19, name: "Toshmatova O", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 20, name: "Toshmatov M", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 21, name: "Toshmatov B", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 22, name: "Normatova M", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 23, name: "Mirmanova P", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 24, name: "Yusupova S", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 25, name: "Qodratullayev B", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 26, name: "Xolmirzoyeva K", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  { n: 27, name: "Yunusov Sh", r: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
];

function cell(v) {
  if (v === null || v === undefined) return '<span class="empty">–</span>';
  return '<span class="num">' + v + '</span>';
}

function render(data) {
  document.getElementById('tbody').innerHTML = data.map(s =>
    '<tr><td>' + s.n + '</td><td>' + s.name + '</td>' + s.r.map(v => '<td>' + cell(v) + '</td>').join('') + '</tr>'
  ).join('');
  document.getElementById('count').textContent = data.length + " ta o'quvchi";
}

let asc = true;
function sortByName() {
  render([...students].sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  asc = !asc;
}

document.getElementById('search').addEventListener('input', e => {
  render(students.filter(s => s.name.toLowerCase().includes(e.target.value.toLowerCase())));
});

render(students);
