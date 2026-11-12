# Smart Agriculture Farm Management System

Smart Agriculture — fermer xo'jaligidagi ekinlar va yer maydonlarini boshqarish uchun o'quv maqsadidagi client-server veb ilova.

## Imkoniyatlar

- Ekin nomi va yer maydonini kiritish
- Ekinlar ro'yxatini ko'rish
- Jami ekinlar sonini ko'rish
- REST API orqali client-server aloqa
- Docker konteynerida ishga tushirish
- Docker volume orqali ma'lumotlarni saqlab qolish
- Backend mavjud bo'lmagan statik demo rejimida brauzer xotirasidan foydalanish

## Texnologiyalar

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express
- Container: Docker, Docker Compose
- Ma'lumot saqlash: JSON fayl (Docker volume)

## Loyiha tuzilishi

```
smart-agriculture-system/
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server/
│   ├── server.js
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Lokal ishga tushirish

Node.js 20 yoki undan yangi versiya kerak.

```bash
cd server
npm install
npm start
```

Brauzerda http://localhost:3000 manzilini oching.

## Docker orqali ishga tushirish

Docker Desktop va Docker Compose o'rnatilgan bo'lishi kerak.

```bash
docker compose up --build
```

Brauzer: http://localhost:3000

API tekshiruvi: http://localhost:3000/api/health

Konteynerni to'xtatish:

```bash
docker compose down
```

## API

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET | /api/health | Server holatini tekshirish |
| GET | /api/crops | Ekinlar ro'yxatini olish |
| POST | /api/crops | Yangi ekin qo'shish |

POST so'rov namunasi:

```json
{
  "name": "Paxta",
  "area": 2.5
}
```

## Hosting haqida

GitHub repozitoriyasi loyiha kodini ommaga ko'rsatadi. GitHub Pages faqat frontend demo qismini joylashtirishi mumkin; Node.js API va Docker konteyneri uchun Docker qo'llaydigan alohida hosting kerak bo'ladi. Hozircha serverni Docker orqali lokal kompyuterda ishga tushirish ko'rsatilgan.

## Mualliflik / o'quv loyiha

Ushbu loyiha ta'limiy amaliy ish sifatida tayyorlangan.


## GitHub Pages demo

Frontend demo deploys automatically from the repository root using GitHub Actions. The backend API and Docker app run separately using Docker Compose.
