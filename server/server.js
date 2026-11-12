const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "crops.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readCrops() {
    try {
        if (!fs.existsSync(DATA_FILE)) return [];
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        console.error("Ma'lumotlarni o'qishda xato:", error.message);
        return [];
    }
}

function saveCrops(crops) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(crops, null, 2));
}

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Smart Agriculture API" });
});

app.get("/api/crops", (req, res) => {
    res.json(readCrops());
});

app.post("/api/crops", (req, res) => {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const area = Number(req.body.area);

    if (!name || !Number.isFinite(area) || area <= 0) {
        return res.status(400).json({ message: "Ekin nomi va maydonini to'g'ri kiriting." });
    }

    const crops = readCrops();
    const crop = {
        id: Date.now(),
        name,
        area,
        createdAt: new Date().toISOString()
    };

    crops.push(crop);
    saveCrops(crops);
    res.status(201).json(crop);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Agriculture server http://localhost:${PORT} manzilida ishlayapti.`);
});
