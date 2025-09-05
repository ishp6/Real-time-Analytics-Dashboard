/**
 * Real-time Analytics Dashboard
 * A comprehensive dashboard for monitoring system metrics and user activity
 * 
 * @author Your Name
 * @version 1.0.0
 */

class AnalyticsDashboard {
    constructor() {
        this.isMonitoring = false;
        this.monitoringInterval = null;
        this.updateInterval = 2000; // 2 seconds
        
        // Initialize data structure
        this.data = {
            users: 0,
            revenue: 0,
            orders: 0,
            performance: 98,
            trafficData: [],
            revenueData: []
        };
        
        // Activity templates for realistic simulation
        this.activities = [
            { icon: '👤', title: 'New user registration', type: 'user' },
            { icon: '💰', title: 'Payment processed', type: 'payment' },
            { icon: '📦', title: 'Order shipped', type: 'order' },
            { icon: '🔧', title: 'System maintenance', type: 'system' },
            { icon: '📱', title: 'Mobile app login', type: 'login' },
            { icon: '🛒', title: 'Cart abandoned', type: 'cart' },
            { icon: '⚠️', title: 'Server warning', type: 'warning' },
            { icon: '✅', title: 'Backup completed', type: 'success' },
            { icon: '🔔', title: 'New notification', type: 'notification' },
            { icon: '🌍', title: 'International access', type: 'global' }
        ];

        // Chart instances
        this.trafficChart = null;
        this.revenueChart = null;

        // Initialize the dashboard
        this.init();
    }

    /**
     * Initialize the dashboard components
     */
    init() {
        this.initializeCharts();
        this.bindEvents();
        this.generateInitialData();
        this.updateUI();
        
        // Add welcome message
        setTimeout(() => {
            this.addActivity('🎉', 'Dashboard initialized', 'Welcome to the real-time analytics dashboard');
        }, 500);
    }

    /**
     * Initialize Chart.js charts
     */
    initializeCharts() {
        this.initTrafficChart();
        this.initRevenueChart();
    }

    /**
     * Initialize the traffic monitoring chart
     */
    initTrafficChart() {
        const trafficCtx = document.getElementById('trafficChart').getContext('2d');
        
        this.trafficChart = new Chart(trafficCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Active Users',
                    data: [],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 123, 255, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#007bff',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 6,
                            color: '#666'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#666'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    /**
     * Initialize the revenue analytics chart
     */
    initRevenueChart() {
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        
        this.revenueChart = new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['Products', 'Services', 'Subscriptions', 'Other'],
                datasets: [{
                    data: [45, 30, 20, 5],
                    backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#ffc107',
                        '#dc3545'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            },
                            color: '#333'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        });
    }

    /**
     * Bind event listeners to control buttons
     */
    bindEvents() {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');

        startBtn.addEventListener('click', () => this.startMonitoring());
        stopBtn.addEventListener('click', () => this.stopMonitoring());
        resetBtn.addEventListener('click', () => this.resetData());

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.isMonitoring ? this.stopMonitoring() : this.startMonitoring();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.resetData();
                        break;
                }
            }
        });
    }

    /**
     * Generate initial data for charts
     */
    generateInitialData() {
        // Generate traffic data for the last 10 time periods
        for (let i = 0; i < 10; i++) {
            const time = new Date(Date.now() - (10 - i) * 60000);
            this.data.trafficData.push({
                time: this.formatTime(time),
                value: this.generateRealisticTrafficValue()
            });
        }

        // Set initial metrics
        this.data.users = Math.floor(Math.random() * 100) + 50;
        this.data.revenue = Math.floor(Math.random() * 10000) + 5000;
        this.data.orders = Math.floor(Math.random() * 20) + 10;
        this.data.performance = 95 + Math.random() * 4; // 95-99%
        
        this.updateCharts();
    }

    /**
     * Start real-time monitoring
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        const startBtn = document.getElementById('startBtn');
        
        startBtn.textContent = '✅ Monitoring Active';
        startBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
        startBtn.classList.add('pulse');
        
        this.monitoringInterval = setInterval(() => {
            this.updateData();
            this.updateUI();
            this.updateCharts();
            this.maybeAddRandomActivity();
        }, this.updateInterval);

        this.addActivity('🚀', 'Monitoring started', 'Real-time data monitoring is now active');
    }

    /**
     * Stop real-time monitoring
     */
    stopMonitoring() {
        if (!this.isMonitoring) return;
        
        this.isMonitoring = false;
        clearInterval(this.monitoringInterval);
        
        const startBtn = document.getElementById('startBtn');
        startBtn.textContent = '▶️ Start Monitoring';
        startBtn.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
        startBtn.classList.remove('pulse');
        
        this.addActivity('⏸️', 'Monitoring paused', 'Real-time data monitoring has been paused');
    }

    /**
     * Reset all dashboard data
     */
    resetData() {
        const wasMonitoring = this.isMonitoring;
        
        if (wasMonitoring) {
            this.stopMonitoring();
        }

        // Reset data structure
        this.data = {
            users: 0,
            revenue: 0,
            orders: 0,
            performance: 98,
            trafficData: [],
            revenueData: []
        };
        
        // Clear activity feed
        document.getElementById('activityList').innerHTML = '';
        
        // Regenerate initial data
        this.generateInitialData();
        this.updateUI();
        
        this.addActivity('🔄', 'Data reset', 'All dashboard data has been reset to initial state');
        
        // Resume monitoring if it was active
        if (wasMonitoring) {
            setTimeout(() => this.startMonitoring(), 1000);
        }
    }

    /**
     * Update data with simulated real-time changes
     */
    updateData() {
        // Update user count (can fluctuate)
        const userChange = Math.floor(Math.random() * 20) - 5; // -5 to +14
        this.data.users = Math.max(0, this.data.users + userChange);
        
        // Update revenue (generally increasing)
        const revenueIncrease = Math.floor(Math.random() * 800) + 100; // $100-$900
        this.data.revenue += revenueIncrease;
        
        // Update orders (can fluctuate)
        const orderChange = Math.floor(Math.random() * 8) - 2; // -2 to +5
        this.data.orders = Math.max(0, this.data.orders + orderChange);
        
        // Update performance (stays high but can fluctuate slightly)
        const performanceChange = (Math.random() - 0.5) * 3; // -1.5 to +1.5
        this.data.performance = Math.max(85, Math.min(100, this.data.performance + performanceChange));

        // Add new traffic data point
        const newTrafficPoint = {
            time: this.formatTime(new Date()),
            value: this.generateRealisticTrafficValue()
        };
        
        this.data.trafficData.push(newTrafficPoint);
        
        // Keep only last 15 data points for smooth visualization
        if (this.data.trafficData.length > 15) {
            this.data.trafficData.shift();
        }
    }

    /**
     * Generate realistic traffic values that follow some patterns
     */
    generateRealisticTrafficValue() {
        const hour = new Date().getHours();
        let baseValue;
        
        // Simulate daily traffic patterns
        if (hour >= 9 && hour <= 17) {
            baseValue = 80; // Business hours - higher traffic
        } else if (hour >= 6 && hour <= 9) {
            baseValue = 60; // Morning - moderate traffic
        } else if (hour >= 18 && hour <= 22) {
            baseValue = 70; // Evening - moderate-high traffic
        } else {
            baseValue = 30; // Night - lower traffic
        }
        
        // Add randomness
        const randomVariation = (Math.random() - 0.5) * 40;
        return Math.max(10, Math.floor(baseValue + randomVariation));
    }

    /**
     * Update the UI elements with current data
     */
    updateUI() {
        // Update metric displays
        this.updateElement('totalUsers', this.data.users.toLocaleString());
        this.updateElement('revenue', '$' + this.data.revenue.toLocaleString());
        this.updateElement('orders', this.data.orders.toLocaleString());
        this.updateElement('performance', this.data.performance.toFixed(1) + '%');

        // Add visual feedback for updates
        this.addPulseEffect(['totalUsers', 'revenue', 'orders', 'performance']);
    }

    /**
     * Update a specific element with animation
     */
    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element && element.textContent !== value) {
            element.textContent = value;
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    /**
     * Add pulse effect to elements
     */
    addPulseEffect(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('pulse');
                setTimeout(() => element.classList.add('pulse'), 10);
                setTimeout(() => element.classList.remove('pulse'), 2000);
            }
        });
    }

    /**
     * Update both charts with current data
     */
    updateCharts() {
        this.updateTrafficChart();
        this.updateRevenueChart();
    }

    /**
     * Update the traffic monitoring chart
     */
    updateTrafficChart() {
        if (!this.trafficChart) return;

        this.trafficChart.data.labels = this.data.trafficData.map(point => point.time);
        this.trafficChart.data.datasets[0].data = this.data.trafficData.map(point => point.value);
        this.trafficChart.update('none'); // No animation for smooth real-time updates
    }

    /**
     * Update the revenue analytics chart with slight variations
     */
    updateRevenueChart() {
        if (!this.revenueChart) return;

        // Add slight variations to make it feel dynamic
        const variation = () => (Math.random() - 0.5) * 8; // ±4%
        
        this.revenueChart.data.datasets[0].data = [
            Math.max(35, 45 + variation()),
            Math.max(20, 30 + variation()),
            Math.max(15, 20 + variation()),
            Math.max(2, 5 + variation())
        ];
        
        this.revenueChart.update('none');
    }

    /**
     * Maybe add a random activity (30% chance per update)
     */
    maybeAddRandomActivity() {
        if (Math.random() > 0.7) {
            const activity = this.activities[Math.floor(Math.random() * this.activities.length)];
            const description = this.generateActivityDescription(activity.type);
            this.addActivity(activity.icon, activity.title, description);
        }
    }

    /**
     * Generate realistic descriptions for different activity types
     */
    generateActivityDescription(type) {
        const descriptions = {
            user: ['from New York', 'from California', 'from London', 'from Tokyo', 'from Berlin', 'from Sydney'],
            payment: ['$299.99 transaction', '$149.50 transaction', '$89.99 transaction', '$599.00 transaction', '$1,234.56 transaction'],
            order: ['Order #' + Math.floor(Math.random() * 90000 + 10000)],
            system: ['Database optimization', 'Cache clearing', 'Security update', 'Performance tuning', 'SSL renewal'],
            login: ['iOS user login', 'Android user login', 'Web app access', 'Desktop application'],
            cart: ['Items worth $' + (Math.random() * 500 + 50).toFixed(2)],
            warning: ['High CPU usage detected', 'Memory threshold reached', 'Network latency spike', 'Disk space low'],
            success: ['Daily backup completed', 'Security scan passed', 'Data sync successful', 'Health check OK'],
            notification: ['Email campaign sent', 'Push notification delivered', 'SMS alert sent'],
            global: ['Access from Europe', 'Access from Asia', 'Access from Americas', 'Access from Oceania']
        };
        
        const typeDescriptions = descriptions[type] || ['System event occurred'];
        return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
    }

    /**
     * Add a new activity to the feed
     */
    addActivity(icon, title, description) {
        const activityList = document.getElementById('activityList');
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        const timestamp = new Date().toLocaleTimeString();
        
        activityItem.innerHTML = `
            <div class="activity-icon">${icon}</div>
            <div class="activity-content">
                <div class="activity-title">${title}</div>
                <div class="activity-time">${description} • ${timestamp}</div>
            </div>
        `;
        
        // Add to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Keep only last 12 activities for performance
        while (activityList.children.length > 12) {
            activityList.removeChild(activityList.lastChild);
        }

        // Scroll to top to show new activity
        activityList.scrollTop = 0;
    }

    /**
     * Format time for display
     */
    formatTime(date) {
        return date.toLocaleTimeString([], { 
            