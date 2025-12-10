// Admin dashboard component
function renderAdminDashboardContent() {
    const users = JSON.parse(localStorage.getItem('internshipUsers') || '[]');
    const activeUsers = users.filter(u => u.status === 'active').length;
    
    return `
        <div class="page-container">
            <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div class="grid-3 gap-6 mb-8">
                <!-- Total Students Card -->
                <div class="card bg-surface">
                    <div class="p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <i class="fas fa-users text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Total Students</p>
                            <h3 class="text-2xl font-bold">${users.length}</h3>
                        </div>
                    </div>
                </div>
                
                <!-- Active Internships Card -->
                <div class="card bg-surface">
                    <div class="p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                            <i class="fas fa-check-circle text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Active Internships</p>
                            <h3 class="text-2xl font-bold">${activeUsers}</h3>
                        </div>
                    </div>
                </div>
                
                <!-- Pending Reviews Card -->
                <div class="card bg-surface">
                    <div class="p-6 flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                            <i class="fas fa-clock text-xl"></i>
                        </div>
                        <div>
                            <p class="text-sm text-muted-foreground">Pending Reviews</p>
                            <h3 class="text-2xl font-bold">${users.filter(u => u.projects && u.projects.some(p => p.status === 'submitted')).length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Students Table -->
            <div class="card bg-surface">
                <div class="p-6">
                    <h2 class="text-xl font-bold mb-4">Recent Students</h2>
                    
                    <div class="overflow-x-auto">
                        ${users.length > 0 ? renderUsersTable(users) : renderEmptyTable()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderUsersTable(users) {
    return `
        <table class="w-full text-sm text-left">
            <thead class="text-muted-foreground bg-surface-elevated/50">
                <tr>
                    <th class="p-4">Name</th>
                    <th class="p-4">Email</th>
                    <th class="p-4">Domain</th>
                    <th class="p-4">Status</th>
                    <th class="p-4">Action</th>
                </tr>
            </thead>
            <tbody>
                ${users.map((user, idx) => `
                    <tr class="border-b border-surface-elevated hover:bg-surface-elevated/20">
                        <td class="p-4 font-medium">${user.firstName} ${user.lastName}</td>
                        <td class="p-4 text-muted-foreground">${user.email || 'N/A'}</td>
                        <td class="p-4">${user.domain || 'N/A'}</td>
                        <td class="p-4">
                            <span class="badge ${user.status === 'active' ? 'badge-default' : 'badge-secondary'}">
                                ${user.status || 'N/A'}
                            </span>
                        </td>
                        <td class="p-4">
                            <button class="btn btn-outline btn-sm view-student-btn" data-student-id="${user.id}">
                                View
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderEmptyTable() {
    return `
        <div class="p-8 text-center text-muted-foreground">
            No students found. Add one via the "login" demo flow.
        </div>
    `;
}

// Export functions
window.renderAdminDashboardContent = renderAdminDashboardContent;