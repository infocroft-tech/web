// Main application script
let currentPage = 'landing';
let isInitialized = false;

// Router function
function navigateTo(page) {
    console.log('Navigating to:', page);
    
    // Don't navigate if already on the page and initialized
    if (currentPage === page && isInitialized) {
        console.log('Already on page:', page);
        return;
    }
    
    currentPage = page;
    
    // Update URL hash for browser navigation
    const hash = page === 'landing' ? '' : `#${page}`;
    window.location.hash = hash;
    console.log('Updated hash to:', hash);
    
    // Show loading spinner
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
    }
    
    // Load the appropriate page after a short delay
    setTimeout(() => {
        loadPage(page);
    }, 100);
}

// Load page based on route
function loadPage(page) {
    console.log('Loading page:', page);
    const mainContent = document.getElementById('main-content');
    
    if (!mainContent) {
        console.error('Main content element not found');
        return;
    }
    
    switch(page) {
        case 'landing':
            console.log('Rendering landing page');
            if (typeof renderLandingPageContent === 'function') {
                mainContent.innerHTML = renderLandingPageContent();
                attachLandingPageEvents();
            }
            break;
            
        case 'dashboard':
            console.log('Checking auth for dashboard');
            if (checkAuth() && getAuthUser().role === 'user') {
                console.log('Rendering user dashboard');
                if (typeof renderUserDashboardContent === 'function') {
                    mainContent.innerHTML = renderUserDashboardContent();
                    attachUserDashboardEvents();
                }
            } else {
                console.log('Not authorized for dashboard, redirecting to landing');
                navigateTo('landing');
            }
            break;
            
        case 'admin':
            console.log('Checking auth for admin');
            if (checkAuth() && getAuthUser().role === 'admin') {
                console.log('Rendering admin dashboard');
                if (typeof renderAdminDashboardContent === 'function') {
                    mainContent.innerHTML = renderAdminDashboardContent();
                    attachAdminDashboardEvents();
                }
            } else {
                console.log('Not authorized for admin, redirecting to landing');
                navigateTo('landing');
            }
            break;
            
        default:
            console.log('Default route, rendering landing page');
            if (typeof renderLandingPageContent === 'function') {
                mainContent.innerHTML = renderLandingPageContent();
                attachLandingPageEvents();
            }
    }
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize the application
function initApp() {
    console.log('Initializing app...');
    
    // Subscribe to auth changes
    if (typeof subscribeToAuth === 'function') {
        subscribeToAuth((user) => {
            console.log('Auth state changed, user:', user);
            // Refresh navigation when auth state changes
            if (typeof initNavigation === 'function') {
                setTimeout(() => initNavigation(), 100);
            }
        });
    }
    
    // Check for hash in URL
    const hash = window.location.hash.replace('#', '');
    console.log('Initial hash:', hash);
    
    // Check authentication status and navigate accordingly
    if (hash === 'dashboard') {
        if (checkAuth() && getAuthUser().role === 'user') {
            navigateTo('dashboard');
        } else {
            navigateTo('landing');
        }
    } else if (hash === 'admin') {
        if (checkAuth() && getAuthUser().role === 'admin') {
            navigateTo('admin');
        } else {
            navigateTo('landing');
        }
    } else {
        navigateTo('landing');
    }
    
    isInitialized = true;
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.replace('#', '');
        console.log('Hash changed to:', hash);
        
        if (hash === 'dashboard') {
            navigateTo('dashboard');
        } else if (hash === 'admin') {
            navigateTo('admin');
        } else {
            navigateTo('landing');
        }
    });
}

// Check if user is authenticated
function isAuthenticated() {
    return checkAuth();
}

// Get current user
function getUser() {
    return getAuthUser();
}

// Handle login - now just calls the login function
function handleLogin(userData) {
    console.log('handleLogin called with:', userData);
    // The actual login is handled by the login function in auth-context.js
    // This is just for backward compatibility
}

// Handle logout
function handleLogout() {
    console.log('handleLogout called');
    logout();
    navigateTo('landing');
}

// Check if user is admin
function isAdmin() {
    return checkIsAdmin();
}

// Show modal
function showModal(modalId) {
    console.log('Showing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const input = modal.querySelector('input');
            if (input) input.focus();
        }, 100);
    }
}

// Hide modal
function hideModal(modalId) {
    console.log('Hiding modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Attach landing page events
function attachLandingPageEvents() {
    console.log('Attaching landing page events');
    
    // Hero buttons
    const exploreBtn = document.getElementById('explore-domains-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            scrollToElement('domains');
        });
    }
    
    // Domain apply buttons
    const applyButtons = document.querySelectorAll('.domain-apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show auth modal for non-logged in users
            if (!checkAuth()) {
                showModal('auth-modal');
            } else {
                alert('Application submitted! We will contact you soon.');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your application! We will contact you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                scrollToElement(href.substring(1));
            }
        });
    });
}

// Attach user dashboard events
function attachUserDashboardEvents() {
    console.log('Attaching user dashboard events');
    
    // Tab switching
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            console.log('Switching to tab:', tabId);
            
            // Update active tab
            tabTriggers.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                if (content.id === tabId) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
    
    // Project submission buttons
    const submitButtons = document.querySelectorAll('.project-submit-btn');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            alert(`Submit project ${projectId} - In a real app, this would open a file upload dialog.`);
        });
    });
    
    // Download certificate button
    const downloadCertBtn = document.getElementById('download-certificate-btn');
    if (downloadCertBtn) {
        downloadCertBtn.addEventListener('click', function() {
            alert('Certificate downloaded!');
        });
    }
}

// Attach admin dashboard events
function attachAdminDashboardEvents() {
    console.log('Attaching admin dashboard events');
    
    // View student buttons
    const viewButtons = document.querySelectorAll('.view-student-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-student-id');
            alert(`View student ${studentId} - In a real app, this would show student details.`);
        });
    });
}

// Export functions for use in other files
window.initApp = initApp;
window.navigateTo = navigateTo;
window.isAuthenticated = isAuthenticated;
window.getUser = getUser;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.isAdmin = isAdmin;
window.showModal = showModal;
window.hideModal = hideModal;
window.scrollToElement = scrollToElement;