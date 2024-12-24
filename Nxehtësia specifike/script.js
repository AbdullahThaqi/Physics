document.addEventListener("DOMContentLoaded", function () {
    const headers = ['r (m)', 'Fg (N)', 'Fr (N)', 'W (J)', 'Ctot (J/K)', 'ΔT (°C)', 'ΔQ (J)', 'η'];
    const thead = document.querySelector('#resultsTable thead');
    const headerRow = document.createElement('tr');
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    
    document.getElementById("calculateBtn").addEventListener("click", function () {
        const r1 = parseFloat(document.getElementById("r1").value);
        const r2 = parseFloat(document.getElementById("r2").value);
        const m = parseFloat(document.getElementById("m").value);
        const n = parseInt(document.getElementById("n").value);
        const Fd = parseFloat(document.getElementById("Fd").value);
        const c = parseFloat(document.getElementById("c").value);
        const t1 = parseFloat(document.getElementById("t1").value);
        const t2 = parseFloat(document.getElementById("t2").value);

        const g = 9.81;
        const PI = Math.PI;

        const r = ((r1 / 2) + (r2 / 2)) / 1000;
        const Fg = m * g;
        const Fr = Fg - Fd;
        const W = 2 * PI * r * n * Fr;
        const Ctot = m * c;
        const deltaT = t2 - t1;
        const deltaQ = Ctot * deltaT;
        const efficiency = W / deltaQ;

        const resultsTableBody = document.getElementById("resultsTableBody");

        const row = `
            <tr>
                <td>${r.toFixed(2)}</td>
                <td>${Fg.toFixed(2)}</td>
                <td>${Fr.toFixed(2)}</td>
                <td>${W.toFixed(2)}</td>
                <td>${Ctot.toFixed(2)}</td>
                <td>${deltaT.toFixed(2)}</td>
                <td>${deltaQ.toFixed(2)}</td>
                <td>${efficiency.toFixed(4)}</td>
            </tr>
        `;

        resultsTableBody.innerHTML = row;
    });
});
