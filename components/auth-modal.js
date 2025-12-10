// Auth modal component
function initAuthModal() {
    console.log('Initializing auth modal...');
    const authModalContainer = document.getElementById('auth-modal-container');
    if (!authModalContainer) {
        console.error('Auth modal container not found');
        return;
    }
    
    authModalContainer.innerHTML = renderAuthModal();
    attachAuthModalEvents();
}

function renderAuthModal() {
    return `
        <div class="modal-overlay" id="auth-modal" style="display: none;">
            <div class="modal animate-scale-in">
                <div class="modal-content">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold">Welcome Back</h2>
                        <button class="btn btn-ghost btn-icon" id="auth-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="auth-form" class="space-y-4">
                        <div>
                            <label class="label" for="role">Login As</label>
                            <select id="role" class="select mt-1">
                                <option value="user">Student</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="label" for="id" id="id-label">Student ID</label>
                            <input 
                                type="text" 
                                id="id" 
                                class="input mt-1" 
                                placeholder="Enter ID (demo)"
                                value="demo"
                            >
                        </div>
                        
                        <div>
                            <label class="label" for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                class="input mt-1" 
                                placeholder="Enter password (demo)"
                                value="demo"
                            >
                        </div>
                        
                        <div id="auth-error" class="text-red-500 text-sm hidden"></div>
                        
                        <button type="submit" class="btn btn-hero w-full mt-4">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function attachAuthModalEvents() {
    console.log('Attaching auth modal events');
    
    // Close button
    const closeBtn = document.getElementById('auth-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            console.log('Auth modal close button clicked');
            if (typeof window.hideModal === 'function') {
                window.hideModal('auth-modal');
            }
        });
    }
    
    // Role selection change
    const roleSelect = document.getElementById('role');
    const idLabel = document.getElementById('id-label');
    const idInput = document.getElementById('id');
    
    if (roleSelect && idLabel && idInput) {
        roleSelect.addEventListener('change', function() {
            console.log('Role changed to:', this.value);
            if (this.value === 'admin') {
                idLabel.textContent = 'Email';
                idInput.placeholder = 'admin@infocroft.com';
                idInput.value = 'admin@infocroft.com';
                document.getElementById('password').value = 'admin123';
            } else {
                idLabel.textContent = 'Student ID';
                idInput.placeholder = 'Enter ID (demo)';
                idInput.value = 'demo';
                document.getElementById('password').value = 'demo';
            }
        });
    }
    
    // Form submission
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Auth form submitted');
            
            const role = document.getElementById('role').value;
            const id = document.getElementById('id').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorDiv = document.getElementById('auth-error');
            
            // Clear previous error
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.classList.add('hidden');
            }
            
            // Validate inputs
            if (!id || !password) {
                showError('Please fill in all fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = authForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Signing In...';
            submitBtn.disabled = true;
            
            // Attempt login
            if (typeof window.login === 'function') {
                try {
                    const result = window.login(id, password, role);
                    
                    if (result.success) {
                        console.log('Login successful, user:', result.user);
                        
                        // Close modal
                        if (typeof window.hideModal === 'function') {
                            window.hideModal('auth-modal');
                        }
                        
                        // Navigate based on role
                        setTimeout(() => {
                            if (result.user.role === 'admin') {
                                if (typeof window.navigateTo === 'function') {
                                    window.navigateTo('admin');
                                }
                            } else {
                                if (typeof window.navigateTo === 'function') {
                                    window.navigateTo('dashboard');
                                }
                            }
                        }, 300);
                    } else {
                        showError(result.error || 'Invalid credentials. Try id: "demo", pass: "demo" for student.');
                    }
                } catch (error) {
                    console.error('Login error:', error);
                    showError('An error occurred. Please try again.');
                }
            } else {
                showError('Authentication service not available.');
            }
            
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // Close modal when clicking outside
    const modalOverlay = document.getElementById('auth-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('Clicked outside modal, closing');
                if (typeof window.hideModal === 'function') {
                    window.hideModal('auth-modal');
                }
            }
        });
    }
}

function showError(message) {
    const errorDiv = document.getElementById('auth-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            errorDiv.textContent = '';
            errorDiv.classList.add('hidden');
        }, 5000);
    }
}

// Export functions
window.initAuthModal = initAuthModal;