// Navigation component
function initNavigation() {
    console.log('Initializing navigation...');
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) {
        console.error('Nav container not found');
        return;
    }
    
    navContainer.innerHTML = renderNavigation();
    attachNavigationEvents();
}

function renderNavigation() {
    const isAuthenticated = window.checkAuth ? window.checkAuth() : false;
    const isAdmin = window.checkIsAdmin ? window.checkIsAdmin() : false;
    
    console.log('Rendering navigation - Auth:', isAuthenticated, 'Admin:', isAdmin);
    
    return `
        <nav class="nav">
            <div class="nav-container">
                <!-- Logo -->
                <div class="nav-logo" id="nav-logo">
                    <div class="logo">
                            <img src="INFO_CROFT_LOGOtransparent.png" 
                             alt="InfoCroft Logo" 
                             class="logo-image"
                             style="width: 32px; height: 32px; object-fit: contain; background: transparent;">
  </div>
                    <div class="logo-text">
                        <span>Info</span> <span>Croft</span>
                    </div>
                </div>
                
                <!-- Desktop Navigation -->
                <div class="nav-items md:flex hidden">
                    <a href="#home" class="nav-link" data-href="home">Home</a>
                    <a href="#domains" class="nav-link" data-href="domains">Domains</a>
                    <a href="#about" class="nav-link" data-href="about">About</a>
                    <a href="#contact" class="nav-link" data-href="contact">Contact</a>
                    
                    <!-- Auth Buttons -->
                    ${isAuthenticated ? `
                        <button class="btn btn-outline btn-sm" id="dashboard-btn">
                            <i class="fas fa-user mr-2"></i>
                            ${isAdmin ? 'Admin' : 'Dashboard'}
                        </button>
                        <button class="btn btn-ghost btn-sm" id="logout-btn">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    ` : `
                        <button class="btn btn-default btn-sm" id="login-btn">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            Login
                        </button>
                    `}
                </div>
                
                <!-- Mobile Menu Toggle -->
                <button class="nav-mobile-toggle md:hidden" id="mobile-menu-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
            
            <!-- Mobile Navigation Menu -->
            <div class="nav-mobile-menu" id="mobile-menu">
                <a href="#home" class="nav-link" data-href="home">Home</a>
                <a href="#domains" class="nav-link" data-href="domains">Domains</a>
                <a href="#about" class="nav-link" data-href="about">About</a>
                <a href="#contact" class="nav-link" data-href="contact">Contact</a>
                
                <div class="pt-4 border-t border-surface-elevated mt-2 space-y-2">
                    ${isAuthenticated ? `
                        <button class="btn btn-outline w-full justify-start" id="mobile-dashboard-btn">
                            <i class="fas fa-user mr-2"></i>
                            ${isAdmin ? 'Admin Panel' : 'Dashboard'}
                        </button>
                        <button class="btn btn-ghost w-full justify-start" id="mobile-logout-btn">
                            <i class="fas fa-sign-out-alt mr-2"></i>
                            Logout
                        </button>
                    ` : `
                        <button class="btn btn-default w-full justify-start" id="mobile-login-btn">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            Login
                        </button>
                    `}
                </div>
            </div>
        </nav>
    `;
}

function attachNavigationEvents() {
    console.log('Attaching navigation events');
    
    // Logo click
    const logo = document.getElementById('nav-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            console.log('Logo clicked, navigating to landing');
            if (typeof window.navigateTo === 'function') {
                window.navigateTo('landing');
            }
        });
    }
    
    // Navigation links (anchor links)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('data-href');
            console.log('Nav link clicked:', href);
            
            if (href === 'home') {
                if (typeof window.navigateTo === 'function') {
                    window.navigateTo('landing');
                }
            } else {
                // Handle anchor links
                if (typeof window.scrollToElement === 'function') {
                    window.scrollToElement(href);
                }
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const toggleIcon = document.querySelector('#mobile-menu-toggle i');
                    if (toggleIcon) toggleIcon.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            console.log('Login button clicked');
            if (typeof window.showModal === 'function') {
                window.showModal('auth-modal');
            }
        });
    }
    
    // Mobile login button
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function() {
            console.log('Mobile login button clicked');
            if (typeof window.showModal === 'function') {
                window.showModal('auth-modal');
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const toggleIcon = document.querySelector('#mobile-menu-toggle i');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars';
            }
        });
    }
    
    // Dashboard button
    const dashboardBtn = document.getElementById('dashboard-btn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', function() {
            console.log('Dashboard button clicked');
            const isAdmin = window.checkIsAdmin ? window.checkIsAdmin() : false;
            
            if (typeof window.navigateTo === 'function') {
                window.navigateTo(isAdmin ? 'admin' : 'dashboard');
            }
        });
    }
    
    // Mobile dashboard button
    const mobileDashboardBtn = document.getElementById('mobile-dashboard-btn');
    if (mobileDashboardBtn) {
        mobileDashboardBtn.addEventListener('click', function() {
            console.log('Mobile dashboard button clicked');
            const isAdmin = window.checkIsAdmin ? window.checkIsAdmin() : false;
            
            if (typeof window.navigateTo === 'function') {
                window.navigateTo(isAdmin ? 'admin' : 'dashboard');
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const toggleIcon = document.querySelector('#mobile-menu-toggle i');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars';
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            console.log('Logout button clicked');
            if (typeof window.handleLogout === 'function') {
                window.handleLogout();
            }
        });
    }
    
    // Mobile logout button
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', function() {
            console.log('Mobile logout button clicked');
            if (typeof window.handleLogout === 'function') {
                window.handleLogout();
            }
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                const toggleIcon = document.querySelector('#mobile-menu-toggle i');
                if (toggleIcon) toggleIcon.className = 'fas fa-bars';
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            const icon = this.querySelector('i');
            
            if (mobileMenu) {
                const isActive = mobileMenu.classList.toggle('active');
                if (isActive) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobile-menu');
        const toggleBtn = document.getElementById('mobile-menu-toggle');
        
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            toggleBtn && !toggleBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
}

// Export functions
window.initNavigation = initNavigation;
window.renderNavigation = renderNavigation;