// Authentication context simulation
let authUser = null;
let authListeners = [];

// Initialize auth context
function initAuthContext() {
    console.log('Initializing auth context...');
    
    // Load user from localStorage
    const storedUser = localStorage.getItem('infoCroftUser');
    if (storedUser) {
        try {
            authUser = JSON.parse(storedUser);
            console.log('Loaded user from localStorage:', authUser);
        } catch (e) {
            console.error('Error parsing stored user:', e);
            localStorage.removeItem('infoCroftUser');
        }
    }
    
    // Load demo users if not exists
    if (!localStorage.getItem('internshipUsers')) {
        const demoUsers = [
            {
                id: 'demo',
                firstName: 'Demo',
                lastName: 'Student',
                email: 'demo@student.com',
                role: 'user',
                domain: 'Web Development',
                duration: '1 Month',
                password: 'demo',
                projects: [
                    { id: '1', title: 'Portfolio Website', description: 'Build a personal portfolio', submissionDate: '2024-12-31', status: 'pending' },
                    { id: '2', title: 'Task Manager', description: 'Build a Todo App', submissionDate: '2024-12-31', status: 'pending' },
                    { id: '3', title: 'E-commerce UI', description: 'Product listing page', submissionDate: '2024-12-31', status: 'pending' }
                ],
                status: 'active'
            }
        ];
        localStorage.setItem('internshipUsers', JSON.stringify(demoUsers));
        console.log('Created demo users');
    }
    
    // Notify all listeners
    notifyAuthListeners();
}

// Subscribe to auth changes
function subscribeToAuth(callback) {
    authListeners.push(callback);
    return () => {
        const index = authListeners.indexOf(callback);
        if (index > -1) {
            authListeners.splice(index, 1);
        }
    };
}

// Notify all listeners
function notifyAuthListeners() {
    authListeners.forEach(callback => {
        try {
            callback(authUser);
        } catch (e) {
            console.error('Auth listener error:', e);
        }
    });
}

// Get current user
function getAuthUser() {
    return authUser;
}

// Check if user is authenticated
function checkAuth() {
    return !!authUser;
}

// Check if user is admin
function checkIsAdmin() {
    return authUser && authUser.role === 'admin';
}

// Login function
function login(email, password, role) {
    console.log('Attempting login:', { email, password, role });
    
    if (role === 'admin') {
        if (email === 'admin@infocroft.com' && password === 'admin123') {
            authUser = {
                id: 'admin',
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@infocroft.com',
                role: 'admin',
                projects: [],
                status: 'active'
            };
            localStorage.setItem('infoCroftUser', JSON.stringify(authUser));
            console.log('Admin login successful');
            
            // Notify listeners
            notifyAuthListeners();
            
            return { success: true, user: authUser };
        } else {
            return { success: false, error: 'Invalid admin credentials' };
        }
    } else {
        // Check stored users
        const savedUsers = JSON.parse(localStorage.getItem('internshipUsers') || '[]');
        const user = savedUsers.find(u => u.id === email && u.password === password);
        
        if (user) {
            // Remove password before storing in session
            const { password, ...userWithoutPassword } = user;
            authUser = userWithoutPassword;
            localStorage.setItem('infoCroftUser', JSON.stringify(authUser));
            console.log('Student login successful:', userWithoutPassword);
            
            // Notify listeners
            notifyAuthListeners();
            
            return { success: true, user: authUser };
        } else if (email === 'demo' && password === 'demo') {
            // Default demo user
            authUser = {
                id: 'demo',
                firstName: 'Demo',
                lastName: 'Student',
                email: 'demo@student.com',
                role: 'user',
                domain: 'Web Development',
                duration: '1 Month',
                projects: [
                    { id: '1', title: 'Portfolio Website', description: 'Build a personal portfolio', submissionDate: '2024-12-31', status: 'pending' },
                    { id: '2', title: 'Task Manager', description: 'Build a Todo App', submissionDate: '2024-12-31', status: 'pending' },
                    { id: '3', title: 'E-commerce UI', description: 'Product listing page', submissionDate: '2024-12-31', status: 'pending' }
                ],
                status: 'active'
            };
            localStorage.setItem('infoCroftUser', JSON.stringify(authUser));
            console.log('Demo login successful');
            
            // Notify listeners
            notifyAuthListeners();
            
            return { success: true, user: authUser };
        } else {
            return { success: false, error: 'Invalid credentials. Try "demo" / "demo" for student.' };
        }
    }
}

// Logout function
function logout() {
    console.log('Logging out...');
    authUser = null;
    localStorage.removeItem('infoCroftUser');
    
    // Notify listeners
    notifyAuthListeners();
}

// Register new user (for demo purposes)
function register(userData) {
    const savedUsers = JSON.parse(localStorage.getItem('internshipUsers') || '[]');
    savedUsers.push(userData);
    localStorage.setItem('internshipUsers', JSON.stringify(savedUsers));
    
    // Remove password before storing in session
    const { password, ...userWithoutPassword } = userData;
    authUser = userWithoutPassword;
    localStorage.setItem('infoCroftUser', JSON.stringify(authUser));
    
    // Notify listeners
    notifyAuthListeners();
    
    return { success: true, user: authUser };
}

// Export functions
window.initAuthContext = initAuthContext;
window.getAuthUser = getAuthUser;
window.checkAuth = checkAuth;
window.checkIsAdmin = checkIsAdmin;
window.login = login;
window.logout = logout;
window.register = register;
window.subscribeToAuth = subscribeToAuth;