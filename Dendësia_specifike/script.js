document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.getElementById("inputContainer");
    const outputTable = document.getElementById("outputTable");
    const secondTable = document.getElementById("secondTable");
    const calculateBtn = document.getElementById("calculateBtn");

    const setMeasurementsBtn = document.getElementById("setMeasurementsBtn");
    const numMeasurementsInput = document.getElementById("numMeasurements");

    let numMeasurements = 0;
    let inputFields = [];

    setMeasurementsBtn.addEventListener("click", () => {
        numMeasurements = parseInt(numMeasurementsInput.value);

        if (isNaN(numMeasurements) || numMeasurements <= 0) {
            alert("Ju lutem shënoni një numër valid.");
            return;
        }

        inputContainer.innerHTML = "";

        inputFields = [];
        for (let i = 1; i <= numMeasurements; i++) {
            const row = document.createElement("div");
            row.innerHTML = `
                <h4>Matja ${i}</h4>
                k: <input type="number" id="k${i}" value="10"> 
                n: <input type="number" id="n${i}" value="0"> 
                m: <input type="number" id="m${i}" value="50">
            `;
            inputContainer.appendChild(row);
            inputFields.push({ k: `k${i}`, n: `n${i}`, m: `m${i}` });
        }

        calculateBtn.style.display = 'inline-block';
    });

    calculateBtn.addEventListener("click", () => {
        let LValues = [];
        let kValues = [];
        let nValues = [];
        let weightValues = [1, 2, 10, 3, 7, 7, 9, 12];
        let objects = ["Druri", "Goma", "Bakri", "Alumini", "Zinku", "Hekuri", "Çeliku", "Plumbi"];

        inputFields.forEach((field, index) => {
            const k = parseFloat(document.getElementById(field.k).value);
            const n = parseFloat(document.getElementById(field.n).value);
            const m = parseFloat(document.getElementById(field.m).value);

            const L = ((k + n / m)).toFixed(2);
            kValues.push(k);
            nValues.push(n);
            LValues.push(parseFloat(L));
        });

        const Lm = (LValues.reduce((acc, val) => acc + val, 0) / LValues.length).toFixed(6);

        const Lmax = Math.max(...LValues);
        const deltaL = (Lmax - Lm).toFixed(6);
        const deltaLPercentage = ((deltaL / Lm) * 100).toFixed(6);

        let tableHTML = `
            <tr>
                <th>Nr. I matjeve</th>
                <th>k</th>
                <th>n</th>
                <th>L</th>
                <th>Lm</th>
                <th>ΔL</th>
                <th>ΔL/Lm * 100%</th>
            </tr>
        `;


        LValues.forEach((L, i) => {
            tableHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${kValues[i]}</td>
                    <td>${nValues[i]}</td>
                    <td>${L} mm</td>
                    ${i === 0
                    ? `<td rowspan="${LValues.length}">${Lm} mm</td>
                           <td rowspan="${LValues.length}">${deltaL} mm</td>
                           <td rowspan="${LValues.length}">${deltaLPercentage}%</td>`
                    : ""}
                </tr>
            `;
        });

        let secondTableHTML = `
        <tr>
            <th>Trupat</th>
            <th>m</th>
            <th>Lm</th>
            <th>V</th>
            <th>ρ = m/V</th>
            <th>γ = ρ * g</th>
        </tr>
    `;

        objects.forEach((object, index) => {
            secondTableHTML += `
            <tr>
                <td>${objects[index]}</td>
                <td>${weightValues[index]}g</td>
                <td>${Lm} mm</td>
                <td>${(Math.pow(Lm, 3)).toFixed(10)} m³</td>
                <td>${(weightValues[index]).toFixed(6) / Math.pow(Lm, 3)} kg/m³</td>
                <td>${(weightValues[index]).toFixed(6) / Math.pow(Lm, 3) * 9.81} N/m</td>
            </tr>
        `;
        });

        outputTable.innerHTML = tableHTML;
        secondTable.innerHTML = secondTableHTML;
    });
});
