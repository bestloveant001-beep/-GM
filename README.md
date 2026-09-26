ดาวGM/
├── README.md               # คู่มือรวม
├── .env.example            # ตัวอย่างค่าลับ
├── .gitignore              # ไฟล์ที่ไม่อัปโหลด
├── package.json            # ข้อมูลโปรเจกต์
├── config/
│   └── world-data.json     # ข้อมูลโลกทั้งหมด
├── commands/
│   ├── start.js            # /ด่านตรวจ, /สร้างตัวละคร
│   ├── travel.js           # /เดินทาง, /แผนที่
│   ├── shop.js             # /ร้านค้า, /จ่าย
│   ├── arena.js            # /ลงทะเบียนแข่ง, /อันดับ
│   ├── info.js             # /สถานะ, /เอกสารโลก
│   └── admin.js            # คำสั่งแอดมิน
├── database/
│   └── user-db.js          # จัดเก็บข้อมูลผู้เล่น
└── index.js                # ไฟล์รันหลัก
