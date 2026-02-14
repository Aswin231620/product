document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-links li');
    const screens = document.querySelectorAll('.screen');

    function navigateTo(targetId) {
        // Update Nav
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Screen
        screens.forEach(screen => {
            if (screen.id === targetId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });

        // If navigating to stats, refresh charts
        if (targetId === 'screen-4') {
            renderCharts();
        }
    }

    // Expose to window for onclick handlers
    window.navigateTo = navigateTo;

    // Attach click listeners to nav items
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });

    // Task Logic
    window.toggleTask = function(btn) {
        if (btn.innerText === 'Start') {
            btn.innerText = 'Complete';
            btn.style.backgroundColor = '#10B981'; // Green
            btn.style.borderColor = '#10B981';
            btn.style.color = 'white';
        } else {
            btn.innerText = 'Completed';
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }
    };

    // Charts Initialization
    let bandChartInstance = null;
    let accuracyChartInstance = null;

    function renderCharts() {
        const bandCtx = document.getElementById('bandChart').getContext('2d');
        const accCtx = document.getElementById('accuracyChart').getContext('2d');

        // Destroy if exists to avoid "canvas already in use" errors if rendered multiple times
        if (bandChartInstance) bandChartInstance.destroy();
        if (accuracyChartInstance) accuracyChartInstance.destroy();

        // Band Prediction Chart
        bandChartInstance = new Chart(bandCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Predicted Band Score',
                    data: [6.0, 6.2, 6.5, 7.0], // Mock data
                    borderColor: '#0066FF',
                    backgroundColor: 'rgba(0, 102, 255, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 5.0,
                        max: 9.0,
                        title: { display: true, text: 'Band Score' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Accuracy Trend Chart
        accuracyChartInstance = new Chart(accCtx, {
            type: 'bar',
            data: {
                labels: ['Reading', 'Listening', 'Writing', 'Speaking'],
                datasets: [{
                    label: 'Accuracy %',
                    data: [75, 82, 65, 70],
                    backgroundColor: [
                        '#4D94FF',
                        '#4D94FF',
                        '#FF5C5C', // Low score alert color
                        '#4D94FF'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Initialize charts once if starting on screen 4 (rare but good practice)
    if (document.querySelector('#screen-4.active')) {
        renderCharts();
    }
});
