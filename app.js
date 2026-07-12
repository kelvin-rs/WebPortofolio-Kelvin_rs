// ==========================================================================
// KELVIN'S PORTFOLIO ENGINE (app.js)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initializations
    initTypewriter();
    initNavScrollHighlight();
    initProjectFilters();
});

// ==========================================================================
// 1. TYPEWRITER EFFECT
// ==========================================================================
function initTypewriter() {
    const target = document.getElementById('typewriter-text');
    if (!target) return;
    
    const text = "Saya adalah mahasiswa Sarjana Terapan Teknik Telekomunikasi di Politeknik Elektronika Negeri Surabaya (PENS) yang memiliki ketertarikan mendalam pada pengembangan perangkat lunak, sistem tertanam (embedded systems), dan Internet of Things (IoT).";
    let index = 0;
    
    // Clear initial markup
    target.textContent = "";
    
    function type() {
        if (index < text.length) {
            target.textContent += text.charAt(index);
            index++;
            setTimeout(type, 25);
        }
    }
    
    setTimeout(type, 400);
}

// ==========================================================================
// 2. TIMELINE TRACK TAB SWITCHER
// ==========================================================================
function switchTimelineTab(tabName) {
    const btnExp = document.getElementById('btn-tab-exp');
    const btnEdu = document.getElementById('btn-tab-edu');
    const trackExp = document.getElementById('timeline-exp');
    const trackEdu = document.getElementById('timeline-edu');

    if (tabName === 'exp') {
        btnExp.classList.add('active');
        btnEdu.classList.remove('active');
        trackExp.classList.add('active');
        trackEdu.classList.remove('active');
    } else {
        btnExp.classList.remove('active');
        btnEdu.classList.add('active');
        trackExp.classList.remove('active');
        trackEdu.classList.add('active');
    }
}

// Make accessible globally
window.switchTimelineTab = switchTimelineTab;

// ==========================================================================
// 3. NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================================================
function initNavScrollHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 4. PROJECTS INTERACTIVE FILTERS
// ==========================================================================
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Switch active class
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter projects
            cards.forEach(card => {
                const categoryAttr = card.getAttribute('data-category');
                if (!categoryAttr) return;
                const categories = categoryAttr.split(' ');

                // Clear any pending layout transitions for this card to prevent overlapping state bugs
                if (card.dataset.filterTimeout) {
                    clearTimeout(parseInt(card.dataset.filterTimeout));
                    card.dataset.filterTimeout = "";
                }
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    // Trigger browser reflow to ensure display change applies before transition
                    void card.offsetHeight;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    const timeoutId = setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                    card.dataset.filterTimeout = timeoutId.toString();
                }
            });
        });
    });
}

// ==========================================================================
// 5. MODAL WINDOW DETAILS (PROJECTS & CERTIFICATES)
// ==========================================================================
const projectDatabase = {
    'abmas': {
        title: 'Portal E-Commerce Tani Banyu Urip',
        client: 'Pengabdian Masyarakat PENS',
        duration: 'April 2026 - Sekarang',
        tech: ['Next.js', 'PostgreSQL', 'TailwindCSS', 'RESTful API'],
        images: ['assets/project/Pengabdian Masyarakat.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Portal web e-commerce terintegrasi untuk mendigitalisasi alur pemasaran hasil pertanian Kelompok Tani (Poktan) Banyu Urip.</p>
            <p style="margin-bottom:15px;">Saya merancang backend menggunakan RESTful API dan database relasional PostgreSQL, serta mengimplementasikan dashboard administrasi bagi petani untuk mengelola inventaris produk dan memantau status pesanan masuk secara real-time.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Meningkatkan efisiensi pemasaran produk pertanian lokal.</li>
                <li>Visualisasi grafik penjualan dan laporan rekap transaksi otomatis.</li>
                <li>Antarmuka ramah pengguna (Mobile-responsive) untuk kenyamanan petani.</li>
            </ul>
        `
    },
    'ais-sdr': {
        title: 'AIS SDR Vessel Mapping Portal',
        client: 'Riset Penelitian Lokal Kampus PENS',
        duration: 'Februari 2026 - Sekarang',
        tech: ['Python', 'RTL-SDR RF Hardware', 'Leaflet JS', 'WebSockets', 'Next.js', 'MySQL'],
        images: ['assets/project/dirgan.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Sistem ini dikembangkan untuk menangkap transmisi data navigasi otomatis (Automatic Identification System) kapal laut secara mandiri menggunakan radio telemetry receiver RTL-SDR.</p>
            <p style="margin-bottom:15px;">Sinyal RF yang ditangkap di frekuensi 161.975 MHz & 162.025 MHz di-demodulasi dengan script Python, didekodekan menjadi format data koordinat, dan dikirimkan secara konstan menggunakan WebSockets untuk digambar real-time di atas peta antarmuka website berbasis Leaflet JS.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Mengurangi ketergantungan API pihak ketiga untuk pelacakan kapal pantai timur.</li>
                <li>Integrasi pemrosesan sinyal radio dengan visualisasi pemetaan web modern.</li>
                <li>Visualisasi lintasan kapal dengan interpolasi koordinat GPS presisi tinggi.</li>
            </ul>
        `
    },
    'e-proc': {
        title: 'E-Procurement SILOG Group Portal',
        client: 'CV. Javatekno Mitra Solusi',
        duration: 'Desember 2024 - Maret 2025',
        tech: ['React.js', 'Next.js', 'TailwindCSS', 'RESTful API Integration'],
        images: ['assets/project/silog.png'],
        desc: `
            <p style="margin-bottom:15px;">Aplikasi E-Procurement berskala enterprise yang dirancang khusus untuk memotong birokrasi pengadaan barang logistik internal SILOG Group secara efisien dan transparan.</p>
            <p style="margin-bottom:15px;">Saya bertanggung jawab penuh atas perancangan modular frontend. Mengimplementasikan halaman audit berkas, enkripsi form penawaran harga vendor, dan pembuatan dasbor visual yang responsif bagi manajer pengadaan.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Integrasi dynamic forms dengan validasi data masukan berlapis.</li>
                <li>Desain sistem state global menggunakan React Context untuk data keranjang pengadaan.</li>
                <li>Pemuatan halaman yang optimal dengan optimasi Next.js Static Site Generation (SSG).</li>
            </ul>
        `
    },
    'rc-car': {
        title: 'ESP32 Radio-Controlled Mobile Robot',
        client: 'Unit Kegiatan Mahasiswa E-Trans PENS',
        duration: 'Februari 2026 - Juni 2026',
        tech: ['C++ (Arduino)', 'ESP32 Core', 'ESP-NOW Connection Protocol', 'Sensors & Actuators'],
        images: ['assets/project/E-Trans.jpeg','assets/project/MobilRC.jpeg','assets/project/MobilRC1.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Pengembangan robot mobil RC dengan media kendali khusus berbasis frekuensi nirkabel 2.4GHz. Proyek ini memprioritaskan latensi respons kemudi sekecil mungkin agar robot lincah bermanuver.</p>
            <p style="margin-bottom:15px;">Menggunakan protokol nirkabel ESP-NOW yang tertanam pada mikrokontroler ESP32 ganda (satu sebagai pemancar remot kontrol dan satu di sasis robot) untuk bertukar data input analog joystick secara instan.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Perakitan modul driver motor H-Bridge untuk akselerasi dan pengereman dinamis.</li>
                <li>Penyusunan regulator catu daya step-down DC untuk mengamankan tegangan kerja chip.</li>
                <li>Desain PCB kustom untuk meminimalkan kabel jumper sasis robot.</li>
            </ul>
        `
    },
    'umkm-batu': {
        title: 'E-Commerce UMKM Kota Batu',
        client: 'PT. Promedia Citra Informatindo',
        duration: 'Januari 2023 - Juni 2023',
        tech: ['React Native', 'Laravel PHP', 'Yii2 Framework', 'MySQL Database'],
        images: [''],
        desc: `
            <p style="margin-bottom:15px;">Solusi digitalisasi UMKM pariwisata Kota Batu yang mencakup pembuatan platform toko online berbasis website (Laravel) serta aplikasi mobile konsumen Android/iOS (React Native).</p>
            <p style="margin-bottom:15px;">Saya bertugas menyambungkan RESTful API yang ditulis menggunakan backend Yii2 dengan interface React Native, membangun manajemen autentikasi JWT token, serta penanganan notifikasi pengiriman pesanan.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Sistem pembayaran gateway lokal terintegrasi.</li>
                <li>Optimasi rendering asset gambar katalog produk di sisi aplikasi mobile.</li>
                <li>Dashboard monitoring transaksi terpusat bagi pelaku UMKM.</li>
            </ul>
        `
    },
    'line-follower': {
        title: 'High-Speed Line Follower Robot',
        client: 'UKM Roboholic PENS',
        duration: 'Februari 2025 - Juni 2025',
        tech: ['C/C++', 'STM32 Microcontroller', 'Analog Photodiode Array', 'PID Feedback Logic'],
        images: ['assets/project/roboholic.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Membangun robot otonom berkecepatan tinggi yang berjalan mengikuti rute garis hitam pada lintasan putih dengan kalkulasi PID presisi.</p>
            <p style="margin-bottom:15px;">Menulis logika perbandingan array sensor photodioda analog untuk menghitung nilai error penyimpangan posisi robot, kemudian melakukan output kendali Pulse-Width Modulation (PWM) pada driver motor DC.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Kalibrasi sensor otomatis sebelum robot diluncurkan.</li>
                <li>Penerapan kontroler proporsional, integral, dan diferensial untuk meminimalisir drift di tikungan tajam.</li>
                <li>STM32 hardware registers configuration untuk pembacaan analog berkecepatan tinggi.</li>
            </ul>
        `
    },
    'school-sys': {
        title: 'E-Legalisir & Inventaris Laboratorium',
        client: 'SMK Negeri 1 Jenangan Ponorogo',
        duration: 'Januari 2024 - Maret 2024',
        tech: ['Laravel', 'MySQL', 'Bootstrap', 'Role-Based Authentication'],
        images: ['assets/project/E-Legalisir.jpg','assets/project/Maintenance.jpg'],
        desc: `
            <p style="margin-bottom:15px;">Dua aplikasi manajemen terpisah untuk otomatisasi administrasi internal SMKN 1 Jenangan.</p>
            <p style="margin-bottom:15px;"><strong>E-Legalisir Digital:</strong> Memotong waktu tunggu legalisasi ijazah alumni secara fisik dengan menyediakan sistem submit scan ijazah online yang diverifikasi langsung oleh operator sekolah dengan tanda tangan digital enkripsi unik.</p>
            <p style="margin-bottom:15px;"><strong>Inventaris Laboratorium:</strong> Sistem pencatatan status peminjaman, jumlah aset, audit log, dan status kondisi peralatan laboratorium komputer.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Autentikasi role berlapis (Alumni, Guru, Staff Admin, Kepala Lab).</li>
                <li>Export data rekapitulasi inventaris otomatis ke format Excel/PDF.</li>
                <li>Notifikasi email pengingat keterlambatan pengembalian barang pinjaman.</li>
            </ul>
        `
    },
    'smart-home': {
        title: 'IoT Smart Home & Weather Monitoring',
        client: 'PENS Telecommunication Projects',
        duration: 'Mei 2025',
        tech: ['ESP32', 'DHT11 Sensor', 'Firebase RTDB', 'Next.js', 'TailwindCSS'],
        images: ['assets/project/Smart-Home.png'],
        desc: `
            <p style="margin-bottom:15px;">Sistem otomasi rumah pintar terintegrasi dengan Firebase Realtime Database. Membaca suhu, kelembaban, dan status lampu secara real-time dari mikrokontroler ESP32 dan divisualisasikan pada dasbor web Next.js.</p>
            <p style="margin-bottom:15px;">Proyek ini memudahkan pemantauan parameter kondisi ruangan secara instan serta memberikan kendali penuh terhadap saklar elektronik dari jarak jauh.</p>
        `
    },
    'kmipn': {
        title: 'KMIPN VIII - Smart IoT Incubator',
        client: 'Politeknik Elektronika Negeri Surabaya',
        duration: 'Sedang Berlangsung (2026)',
        tech: ['IoT Core', 'AI Edge', 'Raspberry Pi', 'React Native', 'MQTT'],
        images: ['assets/project/VIREON-KMIPN2026.jpeg','assets/project/VIREON1-KMIPN2026.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Proyek pengembangan inkubator pintar untuk budidaya tanaman presisi tinggi yang didaftarkan pada cabang lomba Piranti Cerdas KMIPN VIII 2026.</p>
            <p style="margin-bottom:15px;">Menggunakan AI Edge untuk pendeteksian penyakit daun tanaman secara lokal dengan TensorFlow Lite pada Raspberry Pi, dan mengirim notifikasi alert ke aplikasi mobile via protokol MQTT.</p>
        `
    },
    'face-rec': {
        title: 'AI Face Recognition Smart Attendance',
        client: 'Final Project Competition PENS',
        duration: 'Juli 2025',
        tech: ['Python', 'OpenCV', 'Raspberry Pi 4', 'Next.js', 'MySQL'],
        images: ['assets/project/face.png'],
        desc: `
            <p style="margin-bottom:15px;">Sistem presensi kelas pintar berbasis pengenalan wajah otonom.</p>
            <p style="margin-bottom:15px;">Menggunakan library OpenCV dan model dlib pada Raspberry Pi untuk mencocokkan wajah siswa secara real-time dan mencatat status kehadiran secara otomatis di database MySQL terpusat.</p>
        `
    },
};

let currentCarouselIndex = 0;

function moveModalCarousel(direction) {
    const items = document.querySelectorAll('.modal-carousel-item');
    const dots = document.querySelectorAll('.indicator-dot');
    if (!items.length) return;

    items[currentCarouselIndex].classList.remove('active');
    if (dots.length) dots[currentCarouselIndex].classList.remove('active');

    currentCarouselIndex = (currentCarouselIndex + direction + items.length) % items.length;

    items[currentCarouselIndex].classList.add('active');
    if (dots.length) dots[currentCarouselIndex].classList.add('active');
}

function setModalCarousel(index) {
    const items = document.querySelectorAll('.modal-carousel-item');
    const dots = document.querySelectorAll('.indicator-dot');
    if (!items.length || index < 0 || index >= items.length) return;

    items[currentCarouselIndex].classList.remove('active');
    if (dots.length) dots[currentCarouselIndex].classList.remove('active');

    currentCarouselIndex = index;

    items[currentCarouselIndex].classList.add('active');
    if (dots.length) dots[currentCarouselIndex].classList.add('active');
}

window.moveModalCarousel = moveModalCarousel;
window.setModalCarousel = setModalCarousel;

function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    const modal = document.getElementById('global-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = `Informasi Proyek`;

    // Reset Carousel Index
    currentCarouselIndex = 0;

    let carouselHTML = '';
    if (data.images && data.images.length > 0) {
        carouselHTML = `
            <div class="modal-carousel" style="margin-bottom: 15px;">
                <div class="modal-carousel-inner">
                    ${data.images.map((img, idx) => `
                        <div class="modal-carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${img}" alt="Project image ${idx + 1}" onerror="this.src='https://via.placeholder.com/800x500?text=Project+Image'">
                        </div>
                    `).join('')}
                </div>
                ${data.images.length > 1 ? `
                    <button class="carousel-control prev" onclick="moveModalCarousel(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="carousel-control next" onclick="moveModalCarousel(1)"><i class="fa-solid fa-chevron-right"></i></button>
                    <div class="carousel-indicators">
                        ${data.images.map((_, idx) => `
                            <span class="indicator-dot ${idx === 0 ? 'active' : ''}" onclick="setModalCarousel(${idx})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    const tagsHTML = data.tech.map(t => `<span class="tech-tag" style="background:rgba(88, 12, 20, 0.05); color:var(--primary-red); border-color:rgba(88, 12, 20, 0.1);">${t}</span>`).join(' ');

    modalContent.innerHTML = `
        <div class="modal-project-details" style="display:flex; flex-direction:column; gap:15px; text-align:left;">
            ${carouselHTML}
            <h3 style="font-size:1.3rem; color:var(--text-bright); line-height:1.3;">${data.title}</h3>
            <div style="font-size:0.82rem; color:var(--text-muted); display:flex; flex-direction:column; gap:4px;">
                <div><strong>Lembaga/Mitra:</strong> ${data.client}</div>
                <div><strong>Masa Pelaksanaan:</strong> ${data.duration}</div>
            </div>
            <hr style="border:none; border-top:1px solid var(--border-color); margin:5px 0;">
            <div class="project-detailed-description" style="color:var(--text-primary); font-size:0.95rem; line-height:1.7;">
                ${data.desc}
            </div>
            <div style="margin-top:10px;">
                <div style="font-size:0.82rem; color:var(--text-muted); margin-bottom:8px; font-weight:700;">Teknologi Yang Digunakan:</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function openCertModal(name, pdfPath, issuer, year, desc) {
    const modal = document.getElementById('global-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = `Sertifikat Kredensial`;
    
    modalContent.innerHTML = `
        <div class="modal-cert-details" style="display:flex; flex-direction:column; gap:15px; text-align:left;">
            <h3 style="font-size:1.3rem; color:var(--text-bright); line-height:1.3;">${name}</h3>
            <div style="font-size:0.82rem; color:var(--text-muted); display:flex; flex-direction:column; gap:4px;">
                <div><strong>Penerbit:</strong> ${issuer}</div>
                <div><strong>Tahun Diperoleh:</strong> ${year}</div>
            </div>
            <hr style="border:none; border-top:1px solid var(--border-color); margin:5px 0;">
            <p style="color:var(--text-primary); font-size:0.95rem; line-height:1.6;">
                ${desc}
            </p>
            <div style="margin-top:10px; display:flex; gap:10px;">
                <a href="assets/Sertifikat/${pdfPath}" download class="btn btn-primary" style="padding:10px 20px; font-size:0.85rem; width:100%; border-radius:8px; text-decoration:none; text-align:center;">
                    <i class="fa-solid fa-download"></i> Unduh Sertifikat (PDF)
                </a>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('global-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

window.openProjectModal = openProjectModal;
window.openCertModal = openCertModal;
window.closeModal = closeModal;

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==========================================================================
// 6. CONTACT FORM SUBMISSION
// ==========================================================================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const statusArea = document.getElementById('form-status');

    if (!statusArea) return;

    // Simulate sending animation
    statusArea.innerHTML = `<span style="color:var(--primary-red); font-weight: 600;"><i class="fa-solid fa-spinner fa-spin"></i> Sedang mengirimkan pesan Anda...</span>`;

    setTimeout(() => {
        // Mock success response
        statusArea.innerHTML = `
            <div style="border:1px solid rgba(5, 150, 105, 0.3); background:rgba(5, 150, 105, 0.05); padding:12px; border-radius:6px; margin-top:10px; color:#059669;">
                <span style="font-weight:bold;"><i class="fa-solid fa-circle-check"></i> Pesan Berhasil Dikirim!</span><br>
                <span style="font-size:0.82rem; margin-top:4px; display:inline-block; color:var(--text-primary);">
                    Terima kasih <strong>${escapeHtml(nameInput.value)}</strong>. Pesan Anda telah kami terima dan akan dibalas secepatnya.
                </span>
            </div>
        `;
        
        // Reset fields
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
    }, 1500);
}

// Simple HTML escaping helper for security
function escapeHtml(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return string.replace(/[&<>"']/g, function(m) { return map[m]; });
}

window.handleFormSubmit = handleFormSubmit;

// ==========================================================================
// 7. TIMELINE POPUP MODAL LOGIC (EXPERIENCE & EDUCATION)
// ==========================================================================
const timelineDatabase = {
    'exp-abmas': {
        title: 'Pengabdian Masyarakat (Prodi Telekomunikasi)',
        institution: 'Program Studi Teknik Telekomunikasi PENS',
        role: 'Full Stack Web Developer',
        duration: 'April 2026 – Sekarang',
        images: ['assets/project/Pengabdian Masyarakat.jpeg'],
        desc: 'Membangun portal pemasaran web terpadu untuk Kelompok Tani (Poktan) Banyu Urip guna mempermudah akses pemasaran produk dan memperluas distribusi secara digital. Sistem ini memudahkan petani mengelola stok produk pertanian, memproses pesanan pembeli secara digital, dan meningkatkan jangkauan pemasaran ke luar daerah.'
    },
    'exp-penelitian': {
        title: 'Penelitian Lokal (Sistem Pemetaan Kapal AIS)',
        institution: 'Laboratorium Telekomunikasi PENS',
        role: 'Embedded Systems & Web Developer',
        duration: 'Februari 2026 – Sekarang',
        images: ['assets/project/Penelitian-Lokal.jpeg'],
        desc: 'Mengembangkan infrastruktur website pemetaan data transmisi Automatic Identification System (AIS) berbasis RTL-SDR receiver untuk menangkap koordinat sinyal kapal laut. Data ditangkap, didekode secara real-time melalui server Python, dan disalurkan melalui WebSockets untuk dipetakan secara dinamis pada Leaflet JS.'
    },
    'exp-earo': {
        title: 'Programming Division (EARO UAV Team)',
        institution: 'EEPIS Airplane Robot (EARO) Team',
        role: 'Programming Division Member',
        duration: 'Mei 2025 – Desember 2025',
        images: ['assets/project/Dirgantara.jpeg'],
        desc: 'Mengembangkan sistem kendali penerbangan otonom untuk UAV (Unmanned Aerial Vehicle), mengonfigurasi mission planner, serta pemrograman sensor telemetri jarak jauh untuk mendukung stabilitas dan ketepatan navigasi wahana udara EARO.'
    },
    'exp-dies-natalis': {
        title: 'Panitia Dies Natalis PENS ke-37',
        institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
        role: 'Staff Operasional',
        duration: 'Agustus 2025',
        images: ['assets/Sertifikat/Dies Natalis PENS-37.png'],
        desc: 'Bertanggung jawab atas pengelolaan operasional perlengkapan, logistik, kebutuhan peralatan acara, dan persiapan teknis panggung untuk mendukung kelancaran seluruh rangkaian kegiatan Dies Natalis PENS ke-37.'
    },
    'exp-fpc': {
        title: 'Panitia Final Project Competition (FPC)',
        institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
        role: 'Staff Operasional',
        duration: 'Juli 2025',
        images: ['assets/project/fpc.jpeg'],
        desc: 'Bertanggung jawab dalam penyiapan sarana, perlengkapan stand kompetisi, pengelolaan tata letak ruang pameran, serta distribusi logistik bagi para peserta dan dewan juri Final Project Competition mahasiswa akhir PENS.'
    },
    'exp-etrans': {
        title: 'Robotics & IoT Engineer',
        institution: 'UKM E-Trans PENS',
        role: 'Robotics & IoT Engineer',
        duration: 'Februari 2026 – Juni 2026',
        images: ['assets/project/E-Trans.jpeg'],
        desc: 'Merancang dan mengimplementasikan modul kendali nirkabel serta perakitan sasis/mekanik untuk Robot Mobil RC (Radio Controlled) dengan latensi kontrol minimal berbasis ESP32. Menggunakan protokol komunikasi nirkabel ESP-NOW yang tertanam langsung pada mikrokontroler untuk pergerakan motor DC dan kemudi servo secara instan.'
    },
    'exp-roboholic': {
        title: 'Hardware & Control Programmer',
        institution: 'UKM Roboholic PENS',
        role: 'Hardware & Control Programmer',
        duration: 'Februari 2025 – Juni 2025',
        images: ['assets/project/roboholic.jpeg'],
        desc: 'Mendesain algoritma PID controller presisi tinggi untuk Robot Line Follower otomatis, meningkatkan akurasi pembacaan sensor photodioda analog, dan mempercepat respons pergerakan motor DC pada mikrokontroler STM32.'
    },
    'exp-javatekno': {
        title: 'Frontend Web Developer (Internship)',
        institution: 'CV. Javatekno Mitra Solusi',
        role: 'Frontend Web Developer (Internship)',
        duration: 'Desember 2024 – Maret 2025',
        images: ['assets/project/silog.png'],
        desc: 'Mengembangkan arsitektur antarmuka (Frontend) untuk aplikasi web E-Procurement berskala enterprise untuk SILOG Group demi efisiensi pengadaan barang secara digital menggunakan React.js, Next.js, dan TailwindCSS.'
    },
    'exp-smk': {
        title: 'Full Stack Developer (E-Legalisir & Inventaris)',
        institution: 'SMKN 1 Jenangan',
        role: 'Full Stack Developer',
        duration: 'Januari 2024 – Maret 2024',
        images: ['assets/project/E-Legalisir.jpg'],
        desc: 'Membangun sistem internal "E-Legalisir Digital" untuk mempermudah alumni dalam legalisasi berkas secara online, serta merancang platform "Sistem Manajemen Inventaris Barang Aset" untuk efisiensi audit inventaris di setiap laboratorium sekolah.'
    },
    'exp-promedia': {
        title: 'Mobile & Web Developer (Internship)',
        institution: 'PT. Promedia Citra Informatindo',
        role: 'Mobile & Web Developer (Internship)',
        duration: 'Januari 2023 – Juni 2023',
        images: ['assets/project/KMIPN-V.png'],
        desc: 'Mengembangkan dan meluncurkan sistem E-Commerce terintegrasi untuk UMKM Kota Batu dalam bentuk website (Laravel/Yii2) & aplikasi mobile konsumen (React Native). Berkontribusi aktif pula pada tim developer utama dalam membangun website resmi kompetisi KMIPN-V.'
    },
    'exp-gandini': {
        title: 'Active Member & Community Speaker',
        institution: 'Gandini Dev Community SMKN 1 JENANGAN',
        role: 'Active Member & Speaker',
        duration: 'September 2021 – Februari 2024',
        images: [''],
        desc: 'Menjadi partisipan aktif komunitas sejak 2021 dalam diskusi coding dan project sharing, serta naik menjadi Pemateri Komunitas (2023-2024) membawakan materi seputar pemrograman web dasar bagi anggota baru.'
    },
    'edu-pens': {
        title: 'D4 Teknik Telekomunikasi',
        institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
        role: 'D4 Teknik Telekomunikasi',
        duration: '2024 - Sekarang',
        images: ['assets/resource/PENS.jpg'],
        desc: 'Mendalami rekayasa sistem transmisi nirkabel, jaringan komputer, pemrosesan sinyal digital, mikrokontroler canggih, radio telecommunication (RF), serta integrasi IoT. Aktif berpartisipasi dalam UKM Robotika & Riset penelitian dosen.'
    },
    'edu-smk': {
        title: 'Rekayasa Perangkat Lunak (RPL)',
        institution: 'SMK Negeri 1 Jenangan',
        role: 'Rekayasa Perangkat Lunak (RPL)',
        duration: '2021 - 2024',
        images: ['assets/resource/SMKN1JENANGAN.jpeg'],
        desc: 'Mempelajari dasar-dasar pemrograman algoritma, basis data (MySQL), pemrograman orientasi objek (OOP), pemrograman web statis/dinamis, pengembangan aplikasi desktop, dan dasar-dasar embedded systems sederhana.'
    }
};

function openTimelineModal(itemId) {
    const data = timelineDatabase[itemId];
    if (!data) return;

    const modal = document.getElementById('global-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    if (!modal || !modalTitle || !modalContent) return;

    modalTitle.textContent = `Aktivitas Detail`;

    // Reset Carousel Index
    currentCarouselIndex = 0;

    let carouselHTML = '';
    if (data.images && data.images.length > 0) {
        carouselHTML = `
            <div class="modal-carousel" style="margin-bottom: 15px;">
                <div class="modal-carousel-inner">
                    ${data.images.map((img, idx) => `
                        <div class="modal-carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${img}" alt="Activity image ${idx + 1}" onerror="this.src='https://via.placeholder.com/800x500?text=Activity+Image'">
                        </div>
                    `).join('')}
                </div>
                ${data.images.length > 1 ? `
                    <button class="carousel-control prev" onclick="moveModalCarousel(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="carousel-control next" onclick="moveModalCarousel(1)"><i class="fa-solid fa-chevron-right"></i></button>
                    <div class="carousel-indicators">
                        ${data.images.map((_, idx) => `
                            <span class="indicator-dot ${idx === 0 ? 'active' : ''}" onclick="setModalCarousel(${idx})"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    modalContent.innerHTML = `
        <div class="modal-timeline-details" style="display:flex; flex-direction:column; gap:15px; text-align:left;">
            ${carouselHTML}
            <h3 style="font-size:1.3rem; color:var(--text-bright); line-height:1.3;">${data.title}</h3>
            <div style="font-size:0.82rem; color:var(--text-muted); display:flex; flex-direction:column; gap:4px;">
                <div><strong>Lembaga / Instansi:</strong> ${data.institution}</div>
                <div><strong>Peran / Bidang:</strong> ${data.role}</div>
                <div><strong>Masa Pelaksanaan:</strong> ${data.duration}</div>
            </div>
            <hr style="border:none; border-top:1px solid var(--border-color); margin:5px 0;">
            <p style="color:var(--text-primary); font-size:0.95rem; line-height:1.7;">
                ${data.desc}
            </p>
        </div>
    `;

    modal.classList.add('active');
}

window.openTimelineModal = openTimelineModal;
