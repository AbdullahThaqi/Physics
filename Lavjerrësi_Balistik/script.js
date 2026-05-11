const ctx = document.getElementById('velocityChart');

const velocityChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Shpejtësia e predhës v (m/s)',
            data: [],
            borderWidth: 3,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
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

document.getElementById("calculateBtn").addEventListener("click", () => {

    const m = parseFloat(document.getElementById("m").value);
    const M = parseFloat(document.getElementById("M").value);
    const l = parseFloat(document.getElementById("l").value);
    const angleDeg = parseFloat(document.getElementById("angle").value);

    const g = 9.81;

    const angleRad = angleDeg * Math.PI / 180;

    const h = l * (1 - Math.cos(angleRad));

    const V = Math.sqrt(2 * g * h);

    const v = ((M + m) / m) * V;

    const p = m * v;

    document.getElementById("heightResult").innerText =
        h.toFixed(4) + " m";

    document.getElementById("vResult").innerText =
        V.toFixed(4) + " m/s";

    document.getElementById("projectileResult").innerText =
        v.toFixed(4) + " m/s";

    document.getElementById("momentumResult").innerText =
        p.toFixed(4) + " kg·m/s";

    velocityChart.data.labels.push(angleDeg + "°");

    velocityChart.data.datasets[0].data.push(v.toFixed(2));

    velocityChart.update();

});