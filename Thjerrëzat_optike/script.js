const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let measurements = [];

function draw(D, dm, dv) {

    ctx.clearRect(0, 0, 900, 500);

    const axisY = 250;

    const objectX = 120;
    const screenX = 780;

    // Optical axis

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(50, axisY);
    ctx.lineTo(850, axisY);
    ctx.stroke();

    // OBJECT A

    const objectHeight = 90;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(objectX, axisY);
    ctx.lineTo(objectX, axisY - objectHeight);
    ctx.stroke();

    // Arrow

    ctx.beginPath();
    ctx.moveTo(objectX - 8, axisY - objectHeight + 15);
    ctx.lineTo(objectX, axisY - objectHeight);
    ctx.lineTo(objectX + 8, axisY - objectHeight + 15);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText("A", objectX - 18, axisY - objectHeight - 10);

    // SCREEN

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(screenX, axisY - 180);
    ctx.lineTo(screenX, axisY + 180);
    ctx.stroke();

    // IMAGE ON SCREEN

    const imageHeightBig = 158;
    const imageHeightSmall = 25;

    // BIG IMAGE

    ctx.strokeStyle = "#ffffff";

    ctx.beginPath();
    ctx.moveTo(screenX, axisY);
    ctx.lineTo(screenX, axisY + imageHeightBig);
    ctx.stroke();

    // SMALL IMAGE

    ctx.strokeStyle = "#38bdf8";

    ctx.beginPath();
    ctx.moveTo(screenX, axisY);
    ctx.lineTo(screenX, axisY + imageHeightSmall);
    ctx.stroke();

    // Labels

    ctx.fillStyle = "#ffffff";
    ctx.fillText("BI", screenX + 12, axisY + imageHeightBig);

    ctx.fillStyle = "#38bdf8";
    ctx.fillText("BII", screenX + 12, axisY + imageHeightSmall);

    // FIRST LENS (fixed)

    const lens1X = 360;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(lens1X, axisY - objectHeight);
    ctx.quadraticCurveTo(lens1X + 15, axisY, lens1X, axisY + objectHeight);

    ctx.moveTo(lens1X, axisY - objectHeight);
    ctx.quadraticCurveTo(lens1X - 15, axisY, lens1X, axisY + objectHeight);

    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.fillText("I", lens1X - 5, axisY - objectHeight - 15);

    // SECOND LENS (movable)

    const d = dm - dv;

    const lens2X = lens1X + d * 5;

    ctx.strokeStyle = "#38bdf8";

    ctx.beginPath();
    ctx.moveTo(lens2X, axisY - objectHeight);
    ctx.quadraticCurveTo(lens2X + 15, axisY, lens2X, axisY + objectHeight);

    ctx.moveTo(lens2X, axisY - objectHeight);
    ctx.quadraticCurveTo(lens2X - 15, axisY, lens2X, axisY + objectHeight);

    ctx.stroke();

    // DISTANCE d

    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(lens1X, axisY + 140);
    ctx.lineTo(lens2X, axisY + 140);
    ctx.stroke();

    ctx.fillStyle = "#facc15";
    ctx.fillText("d", (lens1X + lens2X) / 2, axisY + 160);

    // =========================
    // RAYS FIRST POSITION
    // =========================

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;

    // Parallel ray

    ctx.beginPath();
    ctx.moveTo(objectX, axisY - objectHeight);
    ctx.lineTo(lens1X, axisY - objectHeight);
    ctx.lineTo(screenX, axisY + imageHeightBig);
    ctx.stroke();

    // Central ray

    // Central ray (FIRST LENS - straight line through lens center)
    const x1 = objectX;
    const y1 = axisY - objectHeight;

    const x2 = lens1X;
    const y2 = axisY;

    // extend same line to screen
    const dx = x2 - x1;
    const dy = y2 - y1;

    const t = (screenX - x1) / dx;
    const screenY = y1 + dy * t;

    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(screenX, screenY);
    ctx.stroke();

    // =========================
    // RAYS SECOND POSITION
    // =========================

    ctx.strokeStyle = "#38bdf8";

    // Parallel ray

    ctx.beginPath();
    ctx.moveTo(objectX, axisY - objectHeight);
    ctx.lineTo(lens2X, axisY - objectHeight);
    ctx.lineTo(screenX, axisY + imageHeightSmall);
    ctx.stroke();

    // Central ray

    ctx.beginPath();
    ctx.moveTo(objectX, axisY - objectHeight);
    ctx.lineTo(lens2X, axisY);
    ctx.lineTo(screenX, axisY + imageHeightSmall);
    ctx.stroke();

    // CONSTRUCTION LINES

    ctx.setLineDash([7, 7]);

    ctx.strokeStyle = "#64748b";

    ctx.beginPath();
    ctx.moveTo(objectX, axisY - objectHeight);
    ctx.lineTo(screenX, axisY + imageHeightBig);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(objectX, axisY - objectHeight);
    ctx.lineTo(screenX, axisY + imageHeightSmall);
    ctx.stroke();

    ctx.setLineDash([]);
}

function addMeasurement() {

    const D =
        parseFloat(document.getElementById("D").value);

    const dm =
        parseFloat(document.getElementById("dm").value);

    const dv =
        parseFloat(document.getElementById("dv").value);

    const d = dm - dv;

    const f =
        ((D * D) - (d * d)) / (4 * D);

    measurements.push({
        D,
        dm,
        dv,
        d,
        f
    });

    updateTable();
    updateStatistics();
    draw(D, dm, dv);

}

function updateTable() {

    const table =
        document.getElementById("tableBody");

    table.innerHTML = "";

    measurements.forEach((m, index) => {

        table.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${m.D.toFixed(2)}</td>
            <td>${m.dm.toFixed(2)}</td>
            <td>${m.dv.toFixed(2)}</td>
            <td>${m.d.toFixed(2)}</td>
            <td>${m.f.toFixed(2)}</td>
        </tr>
        `;
    });

}

function updateStatistics() {

    const fValues =
        measurements.map(m => m.f);

    const fm =
        fValues.reduce((a, b) => a + b, 0) / fValues.length;

    const fmax =
        Math.max(...fValues);

    const fmin =
        Math.min(...fValues);

    const deltaf =
        fmax - fmin;

    const delta =
        (deltaf / fm) * 100;

    document.getElementById("fm")
        .innerText = fm.toFixed(2) + " cm";

    document.getElementById("deltaf")
        .innerText = deltaf.toFixed(2) + " cm";

    document.getElementById("delta")
        .innerText = delta.toFixed(2) + " %";

}

draw(100, 70, 30);