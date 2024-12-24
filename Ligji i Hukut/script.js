document.getElementById("setMeasurementsBtn").addEventListener("click", function () {
    const numMeasurements = parseInt(document.getElementById("numMeasurements").value);
    const measurementsContainer = document.getElementById("measurementsContainer");
    measurementsContainer.innerHTML = "";

    for (let i = 1; i <= numMeasurements; i++) {
        const row = document.createElement("div");
        row.innerHTML = `
            <h4>Matja ${i}</h4>
            m (g): <input type="number" id="m${i}" placeholder="Masa" step="0.01">
            l₁ (mm): <input type="number" id="l1${i}" placeholder="Gjatësia" step="0.01">
        `;
        measurementsContainer.appendChild(row);
    }
    document.getElementById("calculateBtn").style.display = "inline-block";
});

document.getElementById("calculateBtn").addEventListener("click", function () {
    const l0 = parseFloat(document.getElementById("l₀").value);
    const numMeasurements = parseInt(document.getElementById("numMeasurements").value);
    const resultsTable = document.getElementById("resultsTable");
    const summaryTable = document.getElementById("summaryTable");

    if (isNaN(l0)) {
        alert("Ju lutem shënoni një gjatësi valide (l₀).");
        return;
    }

    resultsTable.innerHTML = `
        <tr>
            <th>m (g)</th>
            <th>l₀ (mm)</th>
            <th>l₁ (mm)</th>
            <th>Δl (mm)</th>
            <th>F (N)</th>
            <th>k (N/m)</th>
            <th>E (1/k)</th>
        </tr>
    `;

    let kValues = [];
    let EValues = [];
    let masses = [];
    let deltaHeights = [];

    for (let i = 1; i <= numMeasurements; i++) {
        const m = parseFloat(document.getElementById(`m${i}`).value);
        const l1 = parseFloat(document.getElementById(`l1${i}`).value);

        if (isNaN(m) || isNaN(l1)) {
            alert(`Ju lutem shënoni vlera valide për matjet ${i}.`);
            return;
        }

        const g = 9.81;
        const deltaL = l1 - l0;
        const F = (m / 1000) * g;
        const k = F / (deltaL / 1000);
        const E = 1 / k;

        kValues.push(k);
        EValues.push(E);
        masses.push(m);
        deltaHeights.push(deltaL);

        const row = `
            <tr>
                <td>${m.toFixed(2)}</td>
                <td>${l0.toFixed(2)}</td>
                <td>${l1.toFixed(2)}</td>
                <td>${deltaL.toFixed(2)}</td>
                <td>${F.toFixed(4)}</td>
                <td>${k.toFixed(4)}</td>
                <td>${E.toFixed(4)}</td>
            </tr>
        `;
        resultsTable.innerHTML += row;
    }

    const Km = kValues.reduce((acc, val) => acc + val, 0) / kValues.length;
    const Em = EValues.reduce((acc, val) => acc + val, 0) / EValues.length;

    const maxK = Math.max(...kValues);
    let deltaKValues = [];
    let SkValues = [];
    for (let i = 0; i < kValues.length; i++) {
        const deltaK = maxK - Km;
        deltaKValues.push(deltaK);
        SkValues.push(deltaK / maxK);
    }

    const summaryRow = `
        <tr>
            <td>${Km.toFixed(4)}</td>
            <td>${(Math.max(...deltaKValues)).toFixed(4)}</td>
            <td>${(Math.max(...SkValues)).toFixed(4)}</td>
            <td>${Em.toFixed(4)}</td>
        </tr>
    `;
    summaryTable.innerHTML = `
        <tr>
            <th>kₘ</th>
            <th>Δk</th>
            <th>Sₖ</th>
            <th>Eₘ</th>
        </tr>` + summaryRow;

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: masses,
            datasets: [{
                label: 'Δl (mm) vs Masa (g)',
                data: deltaHeights,
                borderColor: '#2575fc',
                backgroundColor: 'rgba(37, 117, 252, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Masa (g)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Δl (mm)'
                    }
                }
            }
        }
    });
});
