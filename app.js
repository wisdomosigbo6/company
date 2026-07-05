document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ENTERPRISE SPA ROUTING LOGIC ENGINE ---
    const navigationLinks = document.querySelectorAll(".nav-link");
    const pageViews = document.querySelectorAll(".page-view");

    function navigateToPage(targetPageId) {
        // Deactivate all views and navigational flags
        pageViews.forEach(view => view.classList.remove("active"));
        navigationLinks.forEach(link => link.classList.remove("active"));

        // Activate specified target elements
        const targetedView = document.getElementById(targetPageId);
        const targetedLink = document.querySelector(`[data-page="${targetPageId}"]`);

        if (targetedView) {
            targetedView.classList.add("active");
        }
        if (targetedLink) {
            targetedLink.classList.add("active");
        }
    }

    // Event hooks for structural URL anchor hashes
    window.addEventListener("hashchange", () => {
        const hash = window.location.hash.replace("#", "") || "home";
        navigateToPage(hash);
    });

    // Event hooks for targeted UI actionable elements
    navigationLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const pageTarget = link.getAttribute("data-page");
            window.location.hash = pageTarget;
        });
    });

    // Fallback initiation router check
    if(window.location.hash) {
        navigateToPage(window.location.hash.replace("#", ""));
    }


    // --- 2. LIVE DASHBOARD CHART PLATFORM (Chart.js Wrapper) ---
    const ctx = document.getElementById('outputChart').getContext('2d');
    
    // Seed initial historical metrics values 
    let productionData = [410, 415, 408, 422, 419, 430];
    let chartTimeLabels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

    const outputChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartTimeLabels,
            datasets: [{
                label: 'Gross Volumetric Production Yield Rate',
                data: productionData,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
                x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
            }
        }
    });


    // --- 3. LIVE AUTOMATED IOT TELEMETRY SIMULATION ---
    const pressureDisplayVal = document.getElementById("pressure-val");
    const flowDisplayVal = document.getElementById("flow-val");

    setInterval(() => {
        // Synthetically modulate telemetry values to simulate production activity
        const simulatedPressure = (1400 + Math.floor(Math.random() * 45)) + " PSI";
        const simulatedFlow = (47.0 + (Math.random() * 2.5)).toFixed(1) + " L/sec";

        pressureDisplayVal.innerText = simulatedPressure;
        flowDisplayVal.innerText = simulatedFlow;

        // Dynamically append new point data directly into live production yields chart UI
        const now = new Date();
        const timestampStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        outputChart.data.labels.push(timestampStr);
        outputChart.data.datasets[0].data.push(420 + Math.floor(Math.random() * 25));

        // Shift sliding visibility timeline buffer cap array sizes
        if(outputChart.data.labels.length > 7) {
            outputChart.data.labels.shift();
            outputChart.data.datasets[0].data.shift();
        }
        outputChart.update();

    }, 4000); // Trigger data updates sequentially every 4000ms


    // --- 4. SYSTEM NOTIFICATION CONTROLLER (Toast Broadcast) ---
    const toastElement = document.getElementById("toast-notification");
    const emergencyBtn = document.getElementById("emergency-alert-btn");

    function triggerSystemNotification(message, isUrgent = false) {
        toastElement.innerText = message;
        toastElement.style.borderLeftColor = isUrgent ? '#ef4444' : '#f59e0b';
        toastElement.classList.remove("hidden");

        // Clear notification message queue window automatically
        setTimeout(() => {
            toastElement.classList.add("hidden");
        }, 5000);
    }

    emergencyBtn.addEventListener("click", () => {
        triggerSystemNotification("ALERT: Emergency shutdown drill broadcast simulation initialized successfully.", true);
    });

    // Run a benign background diagnostic alert simulation broadcast check upon start 
    setTimeout(() => {
        triggerSystemNotification("System Notice: Automated diagnostic audit complete. All regional digital twin data pipelines verified.", false);
    }, 2500);
});


