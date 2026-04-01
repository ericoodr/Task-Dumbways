// TIPE DATA & VARIABEL
let nama = "Enrico Danu P";              // String buat nama di header
let umur = 22;                           // Number buat umur di about
let aktif = true;                        // Boolean buat status tombol
let skill = ["HTML", "CSS", "JS"];       // Array buat daftar skill
let kontak = {                           // Object buat data kontak
    email: "enrico@gmail.com",
    github: "github.com/ericoodr",
    kota: "Jakarta"
};

// FUNCTION
function sapa(nama) {                    // Declaration - sapa user
    return `Halo ${nama}, selamat datang!`;
}
const tanggal = function() {              // Expression - tampilin tanggal
    return new Date().toLocaleDateString('id-ID');
};
const hitungUmur = (tahun) => new Date().getFullYear() - tahun; // Arrow - hitung umur

// LOOPING
for(let i = 1; i <= 3; i++) console.log(`Project ${i}`);     // For loop
let a = 0; while(a < 2) { console.log(`Load ${a}`); a++; }   // While loop
for(let s of skill) console.log(`Skill: ${s}`);              // For...of
for(let k in kontak) console.log(`${k}: ${kontak[k]}`);      // For...in

// RENDERING
let tentang = {                          // Data profil
    nama: "Enrico Danu Prasetya",
    hobi: ["Coding", "Design", "Gaming"],
    perkenalan: function() { return `Hi, saya ${this.nama}!`; }
};
let proyek = [                           // Data project
    { judul: "Website Portfolio", tahun: 2024 },
    { judul: "website onlineshop", tahun: 2024 }
];

function gantiHalaman(halaman) {          // Ganti konten sesuai menu
    let tempat = document.getElementById('content');
    if(halaman === 'about') tempat.innerHTML = tampilAbout();
    else if(halaman === 'proyek') tempat.innerHTML = tampilProyek();
    else if(halaman === 'skill') tempat.innerHTML = tampilSkill();
    else if(halaman === 'kontak') tempat.innerHTML = tampilKontak();
}

function tampilAbout() {                  // Halaman about
    return `<div class="card">
        <h3>Tentang Saya</h3>
        <p>${tentang.perkenalan()}</p>
        <p>Umur: ${hitungUmur(2002)} tahun</p>
        <p>Kota: ${kontak.kota}</p>
        <p>Hobi: ${tentang.hobi.join(", ")}</p>
    </div>`;
}

function tampilProyek() {                 // Halaman proyek
    let html = "<h3>Proyek Saya</h3>";
    proyek.forEach(p => {
        html += `<div class="card"><strong>${p.judul}</strong> - ${p.tahun}</div>`;
    });
    return html;
}

function tampilSkill() {                  // Halaman skill
    let html = "<div class='card'><h3>Skill Saya</h3>";
    for(let i = 0; i < skill.length; i++) {
        html += `<span class="badge">${skill[i]}</span>`;
    }
    return html + "</div>";
}

function tampilKontak() {                 // Halaman kontak + form
    return `<div class="card">
        <h3>Hubungi Saya</h3>
        <form id="formPesan">
            <input type="text" id="namaInput" placeholder="Nama" required>
            <input type="email" id="emailInput" placeholder="Email" required>
            <textarea id="pesanInput" rows="3" placeholder="Pesan" required></textarea>
            <button type="submit">Kirim</button>
        </form>
        <p>📧 ${kontak.email} | 💻 ${kontak.github}</p>
    </div>`;
}

// HANDLE FORM
function kirimPesan(e) {
    e.preventDefault();
    let nama = document.getElementById('namaInput').value;
    let email = document.getElementById('emailInput').value;
    let pesan = document.getElementById('pesanInput').value;
    
    if(nama && email && pesan) {
        let dataBaru = { nama, email, pesan, waktu: new Date().toLocaleString() };
        let semua = localStorage.getItem('pesan') ? JSON.parse(localStorage.getItem('pesan')) : [];
        semua.push(dataBaru);
        localStorage.setItem('pesan', JSON.stringify(semua));
        document.getElementById('formPesan').reset();
        alert(`Makasih ${nama}, pesan diterima!`);
        tampilSemuaPesan();
    } else alert('Isi semua ya!');
}

function tampilSemuaPesan() {
    let tempat = document.getElementById('daftarPesan');
    if(!tempat) return;
    let semua = localStorage.getItem('pesan') ? JSON.parse(localStorage.getItem('pesan')) : [];
    if(semua.length === 0) tempat.innerHTML = '<p>Belum ada pesan</p>';
    else {
        let html = '';
        for(let i = 0; i < semua.length; i++) {
            html += `<div class="pesan-item"><strong>${semua[i].nama}</strong> (${semua[i].email})<br><small>${semua[i].waktu}</small><p>${semua[i].pesan}</p></div>`;
        }
        tempat.innerHTML = html;
    }
}
// JALANKAN
document.addEventListener('DOMContentLoaded', () => {
    gantiHalaman('about');
    tampilSemuaPesan();
    document.addEventListener('submit', e => { if(e.target.id === 'formPesan') kirimPesan(e); });
    let tombol = document.querySelectorAll('.nav-btn');
    for(let i = 0; i < tombol.length; i++) {
        tombol[i].onclick = () => gantiHalaman(tombol[i].dataset.page);
    }
    console.log(sapa(nama), tanggal());
});