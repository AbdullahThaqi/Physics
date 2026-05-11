let data = [];

const ctx = document.getElementById("chart");
const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "a / b",
            data: [],
            borderWidth: 2
        }]
    }
});

function draw(alpha, beta) {

    const c = document.getElementById("sim");
    const ctx = c.getContext("2d");

    ctx.clearRect(0, 0, 500, 500);

    const cx = 250;
    const cy = 250;

    // axes
    ctx.strokeStyle = "#334";
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, 500);
    ctx.moveTo(0, cy);
    ctx.lineTo(500, cy);
    ctx.stroke();

    const radA = alpha * Math.PI / 180;
    const xa = cx - Math.cos(radA) * 200;
    const ya = cy + Math.sin(radA) * 200;

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(xa, ya);
    ctx.stroke();

    const radB = beta * Math.PI / 180;
    const xb = cx + Math.cos(radB) * 200;
    const yb = cy - Math.sin(radB) * 200;

    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(xb, yb);
    ctx.stroke();
}

function addMeasurement() {

    let alpha = parseFloat(document.getElementById("alpha").value);
    let beta = parseFloat(document.getElementById("beta").value);
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);

    let n = a / b;

    data.push({ alpha, beta, a, b, n });

    let table = document.getElementById("table");

    let row = table.insertRow();
    row.innerHTML = `
        <td>${alpha}</td>
        <td>${beta}</td>
        <td>${a}</td>
        <td>${b}</td>
        <td>${n.toFixed(3)}</td>
    `;

    // UPDATE GRAPH
    chart.data.labels.push(data.length);
    chart.data.datasets[0].data.push(n);
    chart.update();

    // AVERAGE n
    let avg = data.reduce((s, x) => s + x.n, 0) / data.length;
    document.getElementById("navg").innerText = avg.toFixed(3);

    draw(alpha, beta);
}

// initial draw
draw(30, 20);