const cropForm = document.getElementById("cropForm");
const cropList = document.getElementById("cropList");
const cropCount = document.getElementById("cropCount");
const message = document.getElementById("message");

let crops = [];

async function loadCrops() {
    try {
        const response = await fetch("/api/crops");
        if (!response.ok) throw new Error("API mavjud emas");
        crops = await response.json();
        localStorage.setItem("smartAgricultureCrops", JSON.stringify(crops));
        showCrops();
    } catch (error) {
        // GitHub Pages kabi statik hostingda backend bo'lmasa,
        // ma'lumotlarni brauzer xotirasidan o'qiymiz.
        crops = JSON.parse(localStorage.getItem("smartAgricultureCrops") || "[]");
        showCrops();
        message.textContent = "Demo rejimi: ma'lumotlar ushbu brauzerda saqlanadi.";
    }
}

cropForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("cropName").value.trim();
    const area = Number(document.getElementById("cropArea").value);

    if (!name || !Number.isFinite(area) || area <= 0) {
        alert("Ma'lumotlarni to'g'ri kiriting!");
        return;
    }

    try {
        const response = await fetch("/api/crops", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, area })
        });

        if (!response.ok) throw new Error("Server xatosi");
        await loadCrops();
    } catch (error) {
        // Backendga ulanish imkoni bo'lmasa, demo rejimida saqlash.
        crops.push({ id: Date.now(), name, area });
        localStorage.setItem("smartAgricultureCrops", JSON.stringify(crops));
        showCrops();
        message.textContent = "Demo rejimi: ekin brauzerda saqlandi.";
    }

    cropForm.reset();
});

function showCrops() {
    cropList.innerHTML = "";

    crops.forEach((crop, index) => {
        const row = document.createElement("tr");

        [index + 1, crop.name, crop.area + " gektar"].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        cropList.appendChild(row);
    });

    cropCount.textContent = crops.length;

    if (crops.length === 0) {
        message.textContent = "Hozircha ekinlar mavjud emas.";
    } else {
        message.textContent = "Jami " + crops.length + " ta ekin mavjud.";
    }
}

loadCrops();
