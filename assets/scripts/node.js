let daftarPesan = [];

function ambilDariStorage() {
    let tersimpan = localStorage.getItem("pesanKu");
    if (tersimpan) {
        daftarPesan = JSON.parse(tersimpan);
    }
}

function simpanKeStorage() {
    localStorage.setItem("pesanKu", JSON.stringify(daftarPesan));
}

function tambahPesan(nama, email, pesan) {
    let pesanBaru = {
        id: Date.now(),
        nama: nama,
        email: email,
        pesan: pesan,
        waktu: new Date().toLocaleString()
    };
    daftarPesan.push(pesanBaru);
    simpanKeStorage();
    
    if (document.getElementById("daftarPesan")) {
        tampilkanSemuaPesan();
    }
}

function tampilkanSemuaPesan() {
    let container = document.getElementById("daftarPesan");
    
    if (!container) return;
    
    if (daftarPesan.length === 0) {
        container.innerHTML = "<p>Belum ada pesan</p>";
        return;
    }
    
    let hasil = "";
    daftarPesan.forEach(p => {
        hasil += `
            <div class="pesan-item" data-id="${p.id}">
                <strong>${p.nama}</strong> 
                <small>${p.waktu}</small>
                <p>${p.pesan}</p>
                <button class="btn-hapus" data-id="${p.id}">Hapus</button>
            </div>
        `;
    });
    container.innerHTML = hasil;
    
    document.querySelectorAll(".btn-hapus").forEach(btn => {
        btn.addEventListener("click", function() {
            let idPesan = Number(this.getAttribute("data-id"));
            hapusPesanById(idPesan);
        });
    });
}

function hapusPesanById(id) {
    daftarPesan = daftarPesan.filter(p => p.id !== id);
    simpanKeStorage();
    tampilkanSemuaPesan();
    alert("Pesan dihapus!");
}

function cariPesan(nama) {
    let container = document.getElementById("daftarPesan");
    if (!container) return;
    
    let hasilCari = daftarPesan.filter(p => {
        return p.nama.toLowerCase().includes(nama.toLowerCase());
    });
    
    if (hasilCari.length === 0) {
        container.innerHTML = "<p>Tidak ada pesan dari nama tersebut</p>";
        return;
    }
    
    let hasil = "";
    hasilCari.forEach(p => {
        hasil += `
            <div class="pesan-item" data-id="${p.id}">
                <strong>${p.nama}</strong> 
                <small>${p.waktu}</small>
                <p>${p.pesan}</p>
                <button class="btn-hapus" data-id="${p.id}">Hapus</button>
            </div>
        `;
    });
    container.innerHTML = hasil;
    
    document.querySelectorAll(".btn-hapus").forEach(btn => {
        btn.addEventListener("click", function() {
            let idPesan = Number(this.getAttribute("data-id"));
            hapusPesanById(idPesan);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    ambilDariStorage();
    
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            
            let inputNama = document.getElementById("nama");
            let inputEmail = document.getElementById("email");
            let textareaPesan = document.getElementById("pesan");
            
            if (!inputNama || !inputEmail || !textareaPesan) return;
            
            let nama = inputNama.value;
            let email = inputEmail.value;
            let pesan = textareaPesan.value;
            
            if (nama === "" || email === "" || pesan === "") {
                alert("Semua harus diisi");
                return;
            }
            
            tambahPesan(nama, email, pesan);
            
            inputNama.value = "";
            inputEmail.value = "";
            textareaPesan.value = "";
            
            alert("Pesan terkirim!");
        });
    }
    
    if (document.getElementById("daftarPesan")) {
        tampilkanSemuaPesan();
    }
    
    let btnCari = document.getElementById("btnCari");
    let btnTampilSemua = document.getElementById("btnTampilSemua");
    let inputCari = document.getElementById("cariNama");
    
    if (btnCari) {
        btnCari.onclick = function() {
            if (inputCari.value === "") {
                alert("Masukkan nama");
                return;
            }
            cariPesan(inputCari.value);
        };
    }
    
    if (btnTampilSemua) {
        btnTampilSemua.onclick = function() {
            tampilkanSemuaPesan();
            inputCari.value = "";
        };
    }
});
