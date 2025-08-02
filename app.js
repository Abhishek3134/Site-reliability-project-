// SRE Project Showcase Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeTechCards();
    initializeCharts();
});

// Navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav__item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.dataset.section;
            
            console.log('Navigating to section:', targetSection); // Debug log
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('nav__item--active'));
            this.classList.add('nav__item--active');
            
            // Update active section
            sections.forEach(section => {
                section.classList.remove('section--active');
                console.log('Removing active from:', section.id); // Debug log
            });
            
            const targetSectionElement = document.getElementById(targetSection);
            if (targetSectionElement) {
                targetSectionElement.classList.add('section--active');
                console.log('Adding active to:', targetSection); // Debug log
            } else {
                console.error('Target section not found:', targetSection);
            }
            
            // Initialize charts when specific sections are shown
            setTimeout(() => {
                if (targetSection === 'monitoring') {
                    initializeMonitoringCharts();
                } else if (targetSection === 'chaos') {
                    initializeChaosChart();
                } else if (targetSection === 'results') {
                    initializeResultsChart();
                }
            }, 150);
            
            // Smooth scroll to top
            smoothScrollToTop();
        });
    });
}

// Tech stack cards interaction
function initializeTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const techName = this.dataset.tech;
            const detailsElement = document.getElementById(`${techName}-details`);
            
            if (detailsElement) {
                // Toggle details visibility
                if (detailsElement.classList.contains('active')) {
                    detailsElement.classList.remove('active');
                } else {
                    // Hide all other details first
                    document.querySelectorAll('.tech-details').forEach(details => {
                        details.classList.remove('active');
                    });
                    detailsElement.classList.add('active');
                }
            }
        });
    });
}

// Chart initialization
function initializeCharts() {
    // Charts are initialized when their respective sections are activated
    // This prevents issues with hidden canvases
}

function initializeMonitoringCharts() {
    // SLO Burn Rate Chart
    const burnRateCtx = document.getElementById('burnRateChart');
    if (burnRateCtx && !burnRateCtx.chartInstance) {
        burnRateCtx.chartInstance = new Chart(burnRateCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'Error Budget Burn Rate',
                    data: [0.02, 0.01, 0.03, 0.02, 0.01, 0.02, 0.01],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Alert Threshold',
                    data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
                    borderColor: '#B4413C',
                    backgroundColor: 'rgba(180, 65, 60, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'SLO Burn Rate (24h)',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                    },
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.15,
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                            callback: function(value) {
                                return (value * 100).toFixed(1) + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Error Budget Chart
    const errorBudgetCtx = document.getElementById('errorBudgetChart');
    if (errorBudgetCtx && !errorBudgetCtx.chartInstance) {
        errorBudgetCtx.chartInstance = new Chart(errorBudgetCtx, {
            type: 'doughnut',
            data: {
                labels: ['Remaining Budget', 'Used Budget'],
                datasets: [{
                    data: [92, 8],
                    backgroundColor: ['#1FB8CD', '#FFC185'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Error Budget Status (30 days)',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

function initializeChaosChart() {
    const chaosCtx = document.getElementById('chaosChart');
    if (chaosCtx && !chaosCtx.chartInstance) {
        chaosCtx.chartInstance = new Chart(chaosCtx, {
            type: 'radar',
            data: {
                labels: ['Pod Failures', 'Network Latency', 'Database Failover', 'Service Mesh', 'Load Testing', 'Resource Exhaustion'],
                datasets: [{
                    label: 'Resilience Score',
                    data: [99, 98, 95, 97, 94, 96],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Chaos Engineering Resilience Scores',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                    },
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                            backdropColor: 'transparent',
                            min: 80,
                            max: 100,
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }
}

function initializeResultsChart() {
    const resultsCtx = document.getElementById('resultsChart');
    if (resultsCtx && !resultsCtx.chartInstance) {
        resultsCtx.chartInstance = new Chart(resultsCtx, {
            type: 'bar',
            data: {
                labels: ['Service Uptime', 'MTTR', 'Deployment Frequency', 'Failed Deployments', 'Alert Noise'],
                datasets: [{
                    label: 'Before Implementation',
                    data: [99.9, 45, 1, 12, 500],
                    backgroundColor: '#B4413C'
                }, {
                    label: 'After Implementation',
                    data: [99.99, 8, 7, 2, 50],
                    backgroundColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Before vs After: Key Metrics Improvement',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                    },
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim()
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim()
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Utility function to handle theme changes for charts
function updateChartColors() {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
    const textSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim();
    
    // Update all existing charts with new colors
    Chart.helpers.each(Chart.instances, function(instance) {
        if (instance.options.plugins && instance.options.plugins.title) {
            instance.options.plugins.title.color = textColor;
        }
        if (instance.options.plugins && instance.options.plugins.legend) {
            instance.options.plugins.legend.labels.color = textColor;
        }
        if (instance.options.scales) {
            Object.keys(instance.options.scales).forEach(scaleKey => {
                const scale = instance.options.scales[scaleKey];
                if (scale.ticks) {
                    scale.ticks.color = textSecondaryColor;
                }
                if (scale.pointLabels) {
                    scale.pointLabels.color = textSecondaryColor;
                }
            });
        }
        instance.update();
    });
}

// Smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Handle theme changes (if theme switcher is added in the future)
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-color-scheme') {
            setTimeout(updateChartColors, 100);
        }
    });
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-color-scheme']
});

// Handle media query changes for dark mode
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(function() {
        setTimeout(updateChartColors, 100);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const activeNav = document.querySelector('.nav__item--active');
    const navItems = Array.from(document.querySelectorAll('.nav__item'));
    const currentIndex = navItems.indexOf(activeNav);
    
    let newIndex = currentIndex;
    
    switch (e.key) {
        case 'ArrowLeft':
            newIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
            break;
        case 'ArrowRight':
            newIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
            break;
        case 'Home':
            newIndex = 0;
            break;
        case 'End':
            newIndex = navItems.length - 1;
            break;
        default:
            return;
    }
    
    e.preventDefault();
    navItems[newIndex].click();
    navItems[newIndex].focus();
});

// Add focus management for better accessibility
document.querySelectorAll('.nav__item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'tab');
    
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Enhanced error handling for chart initialization
function safeChartInit(callback, context) {
    try {
        callback();
    } catch (error) {
        console.warn(`Chart initialization failed: ${context}`, error);
        // Optionally show a user-friendly message
    }
}

// Add animation delays for better perceived performance
function animateElements() {
    const activeSection = document.querySelector('.section--active');
    if (activeSection) {
        const cards = activeSection.querySelectorAll('.card, .tech-card, .practice-card, .chaos-card, .result-card, .monitoring-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
}

// Initialize animations when sections become active
document.addEventListener('DOMContentLoaded', function() {
    // Initial animation on page load
    setTimeout(animateElements, 300);
});

// Performance optimization: Destroy charts when not visible
function cleanupCharts() {
    const hiddenSections = document.querySelectorAll('.section:not(.section--active)');
    
    hiddenSections.forEach(section => {
        const canvases = section.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (canvas.chartInstance) {
                canvas.chartInstance.destroy();
                canvas.chartInstance = null;
            }
        });
    });
}

// Add event listener for navigation to cleanup charts
document.querySelectorAll('.nav__item').forEach(item => {
    item.addEventListener('click', function() {
        setTimeout(() => {
            cleanupCharts();
            animateElements();
        }, 100);
    });
});