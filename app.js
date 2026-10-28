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
        title: 'Website Profil & Pemasaran Melon Honey Poktan Banyu Urip',
        client: 'Pengabdian Masyarakat PENS',
        duration: 'April 2026 - Sekarang',
        tech: ['Next.js', 'Supabase', 'TailwindCSS'],
        images: [
            'assets/project/Pengmas-beranda.png',
            'assets/project/Pengmas-Katalog.png',
            'assets/project/Pengmas-Budidaya.png',
            'assets/project/Pengmas-Tentang kami.png'
        ],
        desc: `
            <p style="margin-bottom:15px;">Website profil kelompok tani dan platform pemasaran digital terpadu untuk memperkenalkan profil kelompok tani serta mendigitalisasi alur pemasaran produk unggulan budidaya Melon Honey Kelompok Tani (Poktan) Banyu Urip.</p>
            <p style="margin-bottom:15px;">Saya merancang dan mengintegrasikan arsitektur database cloud menggunakan Supabase untuk mengelola katalog produk, informasi budidaya tani, serta pengelolaan data produk dan pemesanan secara real-time.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Menyediakan profil interaktif serta informasi edukasi budidaya Melon Honey Poktan Banyu Urip.</li>
                <li>Digitalisasi katalog produk pertanian untuk memperluas jangkauan pemasaran dan pembeli.</li>
                <li>Integrasi database cloud andal dan terstruktur dengan Supabase.</li>
                <li>Antarmuka modern dan responsif (Mobile-friendly) untuk kenyamanan pengunjung dan petani.</li>
            </ul>
        `
    },
    'ais-sdr': {
        title: 'Low-Cost AIS Vessel Tracking System for Real-Time Web Visualization',
        client: 'Hibah Penelitian Lokal PENS – Jurnal ECOTIPE (Vol. 13 No. 2, 2026)',
        duration: 'Februari 2026 – Sekarang',
        tech: ['RTL-SDR V4', 'Raspberry Pi 3 B+', 'C Language (GMSK/NRZI/CRC16)', 'MariaDB', 'Leaflet.js', 'VHF Maritime Radio'],
        images: [
            'assets/project/AIS.jpeg',
            'assets/project/AIS4.jpeg',
            'assets/project/AIS3.jpeg',
            'assets/project/AIS1.jpeg',
            'assets/project/AIS2.jpeg'
        ],
        desc: `
            <p style="margin-bottom:15px;">Sistem pemantauan maritim terintegrasi berbasis <em>edge-computing</em> berbiaya rendah untuk akuisisi sinyal Automatic Identification System (AIS), dekoding pesan, manajemen database, dan visualisasi spasial real-time yang dipublikasikan pada <strong>Jurnal ECOTIPE</strong> (Vol. 13 No. 2, Oktober 2026, hal. 233–242).</p>
            <p style="margin-bottom:15px;">Arsitektur sistem menyatukan seluruh alur pemrosesan dari frekuensi radio (RF) hingga penyajian informasi maritim berbasis web interaktif:</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li><strong>Akuisisi Sinyal RF:</strong> Menangkap siaran AIS kanal VHF maritim (161.975 MHz & 162.025 MHz) menggunakan antena VHF dan penerima Software Defined Radio (RTL-SDR V4) dengan sampling rate 300 kHz dan gain 80 dB.</li>
                <li><strong>Pipeline Dekoding Bahasa C (Edge Computing):</strong> Dijalankan langsung pada Raspberry Pi 3 Model B+ menggunakan algoritma berbasis C yang ringan, mencakup demodulasi GMSK, dekoding NRZI, ekstraksi frame, dan verifikasi integritas paket data CRC16.</li>
                <li><strong>Manajemen Data & Web GIS:</strong> Menyimpan record kapal (MMSI, koordinat GPS, kecepatan SOG, arah COG, status navigasi) ke MariaDB secara otomatis dan menyajikannya via peta interaktif Leaflet.js dengan fitur penelusuran lintasan historis (<em>historical trajectory reconstruction</em>).</li>
                <li><strong>Maritime Analytics Dashboard:</strong> Menyajikan statistik lalu lintas perairan secara komprehensif, mencakup komposisi armada kapal, distribusi kecepatan, serta negara asal kapal.</li>
                <li><strong>Hasil Validasi Lapangan di Pelabuhan Tanjung Perak:</strong> Memproses 13.357 pesan AIS valid selama 60 menit pengamatan (rata-rata throughput 3,71 pesan/detik) dengan latensi <em>end-to-end</em> sangat rendah (0–2 detik) dan mendeteksi 114 armada kapal aktif.</li>
            </ul>
            <div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">
                <a href="https://ecotipe.ubb.ac.id/index.php/ecotipe/article/view/4612" target="_blank" class="btn btn-primary" style="padding:9px 16px; font-size:0.82rem; border-radius:6px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-book-open"></i> Baca Publikasi Jurnal ECOTIPE
                </a>
                <a href="https://doi.org/10.33019/jurnalecotipe.v13i2.4612" target="_blank" class="btn btn-secondary" style="padding:9px 16px; font-size:0.82rem; border-radius:6px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> DOI: 10.33019/jurnalecotipe.v13i2.4612
                </a>
                <a href="https://github.com/kelvin-rs/Web-Mapping-Data-Kapal-AIS" target="_blank" class="btn btn-secondary" style="padding:9px 16px; font-size:0.82rem; border-radius:6px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                    <i class="fa-brands fa-github"></i> Repositori GitHub
                </a>
            </div>
        `
    },
    'e-proc': {
        title: 'E-Procurement SILOG Group Portal',
        client: 'CV. Javatekno Mitra Solusi',
        duration: 'Desember 2024 - Maret 2025',
        tech: ['React.js', 'Next.js', 'TailwindCSS'],
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
        tech: ['ESP32', '3D Modeling (Chassis & Parts)', 'Motor Driver (H-Bridge)', 'C++ (Arduino)', 'Servo Actuator', 'ESP-NOW'],
        images: ['assets/project/MobilRC1.jpeg', 'assets/project/MobilRC.jpeg', 'assets/project/E-Trans.jpeg'],
        desc: `
            <p style="margin-bottom:15px;">Pengembangan robot mobil Radio-Controlled (RC) yang memadukan perancangan mekanik model 3D dengan kendali nirkabel responsif berbasis mikrokontroler ESP32.</p>
            <p style="margin-bottom:15px;">Fokus utama pengerjaan berpusat pada pembuatan 3D model sasis bodi dan struktur kemudi mobil, serta pemrograman ESP32 untuk mengontrol modul motor driver dan motor servo:</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li><strong>Pembuatan 3D Model Mobil:</strong> Mendesain struktur 3D sasis, rangka dudukan baterai, struktur kemudi servo depan (warna merah), dan pelat penutup atas dengan potongan ventilasi logo agar presisi saat dirakit.</li>
                <li><strong>Kontrol Motor Driver via ESP32:</strong> Memprogram mikrokontroler ESP32 untuk mengirimkan sinyal kendali PWM ke modul motor driver guna mengatur laju putaran motor DC roda belakang (akselerasi & pengereman) serta sudut kemudi servo depan.</li>
                <li><strong>Transmisi Nirkabel Cepat (ESP-NOW):</strong> Memanfaatkan protokol nirkabel 2.4GHz ESP-NOW untuk komunikasi langsung antara unit pengendali remot dan mobil RC dengan latensi respons mendekati nol.</li>
                <li><strong>Integrasi Daya & Pengkabelan:</strong> Menghubungkan baterai Li-ion dengan modul step-down DC regulator secara modular untuk menyuplai tegangan kerja yang stabil ke ESP32, motor driver, dan servo.</li>
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
    'e-legalisir': {
        title: 'E-Legalisir Ijazah Digital SMKN 1 Jenangan',
        client: 'SMK Negeri 1 Jenangan Ponorogo',
        duration: 'Januari 2024 - Maret 2024',
        tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Digital Verification'],
        images: ['assets/project/E-Legalisir.jpg'],
        desc: `
            <p style="margin-bottom:15px;">Platform web pelayanan legalisasi dokumen ijazah dan transkrip nilai secara digital untuk mempermudah alumni SMK Negeri 1 Jenangan Ponorogo dalam permohonan legalisir tanpa harus datang langsung ke sekolah.</p>
            <p style="margin-bottom:15px;">Sistem ini mengotomatiskan alur verifikasi berkas alumni dengan mencocokkan data NISN dan biodata siswa pada database sekolah, serta memungkinkan staf tata usaha memvalidasi berkas dan menerbitkan pengesahan secara aman.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Formulir pengajuan online dengan verifikasi identitas alumni berbasis NISN dan nama orang tua.</li>
                <li>Panel dashboard manajemen berkas masuk bagi staf administrasi dan operator sekolah.</li>
                <li>Pelacakan progres pengesahan dokumen secara transparan dan efisien.</li>
                <li>Penyimpanan arsip digital dokumen legalisir terpusat pada database MySQL.</li>
            </ul>
        `
    },
    'e-inventory': {
        title: 'Sistem Informasi Inventaris Laboratorium SMKN 1 Jenangan',
        client: 'SMK Negeri 1 Jenangan Ponorogo',
        duration: 'Januari 2024 - Maret 2024',
        tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Chart.js'],
        images: ['assets/project/Maintenance.jpg'],
        desc: `
            <p style="margin-bottom:15px;">Sistem informasi manajemen inventaris dan aset fasilitas laboratorium berbasis web yang dikembangkan khusus untuk SMKN 1 Jenangan Ponorogo.</p>
            <p style="margin-bottom:15px;">Aplikasi ini mendigitalisasi pencatatan sarana dan prasarana di seluruh laboratorium kejuruan, memantau kondisi alat, memonitor mutasi barang antar ruangan, serta menyajikan grafik kondisi aset secara real-time bagi pengelola lab.</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li>Dashboard analitik visual grafik kondisi kelayakan barang (baik, rusak ringan, rusak berat).</li>
                <li>Pengelolaan data master terstruktur meliputi kategori, ruangan lab, jurusan, tipe barang, dan mutasi barang.</li>
                <li>Fitur audit log pencatatan keluar-masuk serta mutasi aset fasilitas laboratorium.</li>
                <li>Ekspor rekapitulasi data inventaris untuk pelaporan berkala inventaris sekolah.</li>
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
        title: 'VIREON: AI Mangrove Waste Classifier & Mitigation Platform',
        client: 'KMIPN VIII 2026 - Kategori Hackathon (Tim KatanyaOKE)',
        duration: 'Juli 2026',
        tech: ['Flutter', 'YOLO (Object Detection)', 'CNN (Deep Learning)', 'FastAPI', 'Nest.js', 'Supabase', 'Decision Support System (DSS)'],
        images: [
            'assets/project/VIREON-KMIPN2026.jpeg',
            'assets/project/VIREON1-KMIPN2026.jpeg',
            'assets/project/VIREON3.png',
            'assets/project/VIREON4.png'
        ],
        desc: `
            <p style="margin-bottom:15px;">Inovasi platform <em>citizen science</em> berbasis kecerdasan buatan (AI) yang digagas oleh Tim KatanyaOKE pada cabang lomba <strong>Hackathon KMIPN VIII 2026</strong> untuk menanggulangi ancaman degradasi ekologis di kawasan mangrove pesisir timur Surabaya (Wonorejo & Muara Kali Jagir).</p>
            <p style="margin-bottom:15px;">Platform ini mengintegrasikan aplikasi mobile cross-platform berbasis Flutter dengan arsitektur microservices cerdas:</p>
            <ul style="padding-left:20px; color:var(--text-muted); font-size:0.88rem; display:flex; flex-direction:column; gap:8px;">
                <li><strong>Deteksi Limbah Padat (YOLO):</strong> Mengidentifikasi dan mengestimasi keparahan makrodebris (plastik, botol, styrofoam, ban) yang menjerat sistem perakaran nafas mangrove secara real-time melalui kamera smartphone.</li>
                <li><strong>Klasifikasi Limbah Cair (CNN):</strong> Menganalisis anomali visual pada permukaan perairan seperti busa surfaktan dan perubahan warna akibat pembuangan limbah industri muara sungai.</li>
                <li><strong>Decision Support System (DSS):</strong> Mengolah data temuan jenis limbah dan titik koordinat GPS untuk mengklasifikasikan tingkat bahaya (Rendah, Sedang, Tinggi) serta menghasilkan rekomendasi tindakan mitigasi fisik yang aman bagi perakaran mangrove.</li>
                <li><strong>Arsitektur Backend & Cloud:</strong> Memadukan Nest.js untuk manajemen API, FastAPI untuk inferensi deep learning yang responsif, serta Supabase untuk autentikasi, penyimpanan citra (object storage), dan pemetaan geospasial limbah.</li>
            </ul>
            <p style="margin-top:15px; font-size:0.84rem; color:var(--text-muted); font-style:italic;">*Catatan: Karya ini merupakan proposal gagasan inovasi teknologi informatika pada ajang kompetisi nasional KMIPN VIII 2026 (Tahap Seleksi Proposal).*</p>
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
        institution: 'Program Studi D4 Teknik Telekomunikasi PENS',
        role: 'Full Stack Web Developer',
        duration: 'April 2026 – Sekarang',
        images: ['assets/project/Pengabdian Masyarakat.jpeg', 'assets/project/Pengmas-beranda.png', 'assets/project/Pengmas-Katalog.png', 'assets/project/Pengmas-Tentang kami.png', 'assets/project/Pengmas-Budidaya.png'],
        desc: 'Membangun website profil dan platform pemasaran digital terpadu untuk Kelompok Tani (Poktan) Banyu Urip guna mempermudah akses pemasaran produk unggulan budidaya Melon Honey serta memperluas jangkauan distribusi secara digital menggunakan integrasi database Supabase.'
    },
    'exp-penelitian': {
        title: 'Penelitian Riset Dosen PENS (Jurnal ECOTIPE)',
        institution: 'Laboratorium Telekomunikasi PENS',
        role: 'Embedded SDR & Web GIS Developer',
        duration: 'Februari 2026 – Sekarang',
        images: ['assets/project/Penelitian-Lokal.jpeg', 'assets/project/AIS4.jpeg', 'assets/project/AIS.jpeg', 'assets/project/AIS3.jpeg'],
        desc: 'Mengembangkan sistem edge-computing penerima sinyal maritim Automatic Identification System (AIS) berbasis RTL-SDR V4 dan Raspberry Pi dengan algoritma dekoding bahasa C (GMSK/NRZI/CRC16), manajemen database MariaDB, serta visualisasi web real-time dan analisis pergerakan kapal berbasis Leaflet.js yang telah diterbitkan pada Jurnal ECOTIPE (Vol. 13 No. 2, Oktober 2026).'
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
        role: 'Staff Operasional (Perkab)',
        duration: 'Agustus 2025',
        images: ['assets/Sertifikat/Dies Natalis PENS-37.png'],
        desc: 'Bertanggung jawab atas pengelolaan operasional perlengkapan, logistik, kebutuhan peralatan acara, dan persiapan teknis panggung untuk mendukung kelancaran seluruh rangkaian kegiatan Dies Natalis PENS ke-37.'
    },
    'exp-fpc': {
        title: 'Panitia Final Project Competition (FPC)',
        institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
        role: 'Staff Operasional (Perkab)',
        duration: 'Juli 2025',
        images: ['assets/project/FPC.jpeg'],
        desc: 'Bertanggung jawab dalam penyiapan sarana, perlengkapan stand kompetisi, pengelolaan tata letak ruang pameran, serta distribusi logistik bagi para peserta dan dewan juri Final Project Competition mahasiswa akhir PENS.'
    },
    'exp-etrans': {
        title: 'Robotics & IoT Engineer',
        institution: 'UKM E-Trans PENS',
        role: 'Robotics & IoT Engineer',
        duration: 'Februari 2026 – Juni 2026',
        images: ['assets/project/MobilRC1.jpeg', 'assets/project/MobilRC.jpeg', 'assets/project/E-Trans.jpeg'],
        desc: 'Merancang 3D model sasis bodi dan struktur kemudi mobil RC, serta memprogram mikrokontroler ESP32 untuk mengontrol modul motor driver penggerak roda DC dan motor servo kemudi via transmisi nirkabel ESP-NOW berlatensi rendah.'
    },
    'exp-roboholic': {
        title: 'Hardware & Control Programmer',
        institution: 'UKM Roboholic PENS',
        role: 'Hardware & Control Programmer',
        duration: 'Februari 2025 – Juni 2025',
        images: ['assets/project/Roboholic.jpeg'],
        desc: 'Mendesain algoritma PID controller presisi tinggi untuk Robot Line Follower otomatis, meningkatkan akurasi pembacaan sensor photodioda analog, dan mempercepat respons pergerakan motor DC pada mikrokontroler STM32.'
    },
    'exp-javatekno': {
        title: 'Frontend Web Developer (Internship)',
        institution: 'CV. Javatekno Mitra Solusi',
        role: 'Frontend Web Developer (Internship)',
        duration: 'Desember 2024 – Maret 2025',
        images: ['assets/project/Silog.png'],
        desc: 'Mengembangkan arsitektur antarmuka (Frontend) untuk aplikasi web E-Procurement berskala enterprise untuk SILOG Group demi efisiensi pengadaan barang secara digital menggunakan React.js, Next.js, dan TailwindCSS.'
    },
    'exp-smk': {
        title: 'Full Stack Developer (E-Legalisir & Inventaris Lab)',
        institution: 'SMKN 1 Jenangan',
        role: 'Full Stack Developer',
        duration: 'Januari 2024 – Maret 2024',
        images: ['assets/project/E-Legalisir.jpg', 'assets/project/Maintenance.jpg'],
        desc: 'Membangun platform sistem "E-Legalisir Digital" untuk memfasilitasi legalisasi ijazah online bagi alumni, serta mengembangkan "Sistem Informasi Inventaris Laboratorium" berbasis web guna mendata fasilitas sarana prasarana, mutasi alat, dan grafik kondisi kelayakan inventaris laboratorium SMKN 1 Jenangan.'
    },
    'exp-promedia': {
        title: 'Mobile & Web Developer (Internship)',
        institution: 'PT. Promedia Citra Informatindo',
        role: 'Mobile & Web Developer (Internship)',
        duration: 'Januari 2023 – Juni 2023',
        images: [],
        desc: 'Mengembangkan sistem E-Commerce terintegrasi untuk UMKM Kota Batu dalam bentuk website (Laravel/Yii2) & aplikasi mobile konsumen (React Native). Berkontribusi aktif pada perancangan antarmuka pengguna, autentikasi API JWT, dan penanganan data katalog produk.'
    },
    'exp-gandini': {
        title: 'Active Member & Community Speaker',
        institution: 'Gandini Dev Community SMKN 1 JENANGAN',
        role: 'Active Member & Speaker',
        duration: 'September 2021 – Februari 2024',
        images: [],
        desc: 'Menjadi partisipan aktif komunitas sejak 2021 dalam diskusi coding dan project sharing, serta naik menjadi Pemateri Komunitas (2023-2024) membawakan materi seputar pemrograman web dasar bagi anggota baru.'
    },
    'edu-pens': {
        title: 'D4 Teknik Telekomunikasi',
        institution: 'Politeknik Elektronika Negeri Surabaya (PENS)',
        role: 'D4 Teknik Telekomunikasi',
        duration: '2024 - Sekarang',
        images: ['assets/resource/PENS.jpg'],
        desc: 'Mendalami rekayasa sistem transmisi nirkabel, jaringan komputer, pemrosesan sinyal digital, mikrokontroler canggih, radio telecommunication (RF), serta integrasi IoT. Aktif berpartisipasi dalam riset penelitian dosen dan publikasi ilmiah.'
    },
    'edu-smk': {
        title: 'Rekayasa Perangkat Lunak (RPL)',
        institution: 'SMK Negeri 1 Jenangan',
        role: 'Rekayasa Perangkat Lunak (RPL)',
        duration: '2021 - 2024',
        images: ['assets/resource/SMKN1JENANGAN.jpeg'],
        desc: 'Mempelajari dasar-dasar rekayasa perangkat lunak, perancangan basis data relasional (MySQL), pemrograman berorientasi objek (OOP), pemrograman web statis/dinamis, pengembangan aplikasi desktop, dan pengenalan embedded systems.'
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
    const validImages = (data.images || []).filter(img => img && typeof img === 'string' && img.trim() !== '');
    if (validImages.length > 0) {
        carouselHTML = `
            <div class="modal-carousel" style="margin-bottom: 15px;">
                <div class="modal-carousel-inner">
                    ${validImages.map((img, idx) => `
                        <div class="modal-carousel-item ${idx === 0 ? 'active' : ''}">
                            <img src="${img}" alt="Activity image ${idx + 1}" onerror="this.src='https://via.placeholder.com/800x500?text=Activity+Image'">
                        </div>
                    `).join('')}
                </div>
                ${validImages.length > 1 ? `
                    <button class="carousel-control prev" onclick="moveModalCarousel(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="carousel-control next" onclick="moveModalCarousel(1)"><i class="fa-solid fa-chevron-right"></i></button>
                    <div class="carousel-indicators">
                        ${validImages.map((_, idx) => `
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
