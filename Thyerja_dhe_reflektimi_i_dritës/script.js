const canvas = document.getElementById("opticsCanvas");
const ctx = canvas.getContext("2d");

const chartCtx = document.getElementById("chartCanvas");

const opticsChart = new Chart(chartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'sin(α) / sin(β)',
            data: [],
            borderWidth: 3,
            tension: 0.3
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                }
            }
        }
    }
});

function drawOptics(angleDeg, betaDeg) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 350;
    const centerY = 250;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, 500);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    const angleRad = angleDeg * Math.PI / 180;
    const betaRad = betaDeg * Math.PI / 180;

    const incidentX = centerX - Math.cos(angleRad) * 250;
    const incidentY = centerY + Math.sin(angleRad) * 250;

    ctx.beginPath();
    ctx.moveTo(incidentX, incidentY);
    ctx.lineTo(centerX, centerY);
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#f43f5e";
    ctx.stroke();

    const reflectX = centerX - Math.cos(angleRad) * 250;
    const reflectY = centerY - Math.sin(angleRad) * 250;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(reflectX, reflectY);
    ctx.strokeStyle = "#22c55e";
    ctx.shadowColor = "#22c55e";
    ctx.stroke();

    const refractX = centerX + Math.cos(betaRad) * 250;
    const refractY = centerY - Math.sin(betaRad) * 250;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(refractX, refractY);
    ctx.strokeStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.stroke();

    ctx.shadowBlur = 0;

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText("α", incidentX - 40, incidentY);
    ctx.fillText("α", reflectX - 40, reflectY);
    ctx.fillText("β", refractX - 40, refractY);
}

document.getElementById("calculateBtn").addEventListener("click", () => {

    const alpha = parseFloat(document.getElementById("angle").value);

    const n2 = parseFloat(document.getElementById("material").value);

    const n1 = 1;

    const alphaRad = alpha * Math.PI / 180;

    const sinBeta = (n1 / n2) * Math.sin(alphaRad);

    const betaRad = Math.asin(sinBeta);

    const beta = betaRad * 180 / Math.PI;

    const reflection = alpha;

    const refractiveIndex = Math.sin(alphaRad) / Math.sin(betaRad);

    document.getElementById("reflectionResult").innerText =
        reflection.toFixed(2) + "°";

    document.getElementById("refractionResult").innerText =
        beta.toFixed(2) + "°";

    document.getElementById("sinAResult").innerText =
        Math.sin(alphaRad).toFixed(4);

    document.getElementById("sinBResult").innerText =
        Math.sin(betaRad).toFixed(4);

    document.getElementById("nResult").innerText =
        refractiveIndex.toFixed(4);

    drawOptics(alpha, beta);

    opticsChart.data.labels.push(alpha + "°");

    opticsChart.data.datasets[0].data.push(
        refractiveIndex.toFixed(3)
    );

    opticsChart.update();

});

drawOptics(45, 28);