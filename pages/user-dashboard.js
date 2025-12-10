// User dashboard component
function renderUserDashboardContent() {
    const user = window.getUser ? window.getUser() : null;
    
    if (!user) {
        return '<div class="page-container"><p>Please log in to view your dashboard.</p></div>';
    }
    
    const projects = user.projects || [];
    const completedCount = projects.filter(p => p.status === 'approved').length;
    const progress = projects.length > 0 ? (completedCount / projects.length) * 100 : 0;
    
    return `
        <div class="page-container">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 class="text-3xl font-bold">Welcome back, ${user.firstName}</h1>
                    <p class="text-muted-foreground mt-2">
                        Track your progress and submit projects here.
                    </p>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold text-brand-red">${completedCount}/${projects.length}</div>
                    <div class="text-sm text-muted-foreground">Projects Completed</div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-surface-elevated rounded-full h-3 mb-10 overflow-hidden">
                <div class="bg-brand-red h-full transition-all duration-500" style="width: ${progress}%"></div>
            </div>

            <!-- Tabs -->
            <div class="tabs-container">
                <div class="tabs-list mb-6">
                    <button class="tab-trigger active" data-tab="projects">Projects</button>
                    <button class="tab-trigger" data-tab="certificate">Certificate</button>
                    <button class="tab-trigger" data-tab="resources">Resources</button>
                </div>
                
                <div class="tabs-content">
                    <!-- Projects Tab -->
                    <div id="projects" class="tab-content">
                        <div class="space-y-6">
                            ${renderProjectCards(projects)}
                        </div>
                    </div>
                    
                    <!-- Certificate Tab -->
                    <div id="certificate" class="tab-content" style="display: none;">
                        <div class="card bg-surface">
                            <div class="p-6">
                                <h3 class="text-xl font-bold mb-2">Internship Certificate</h3>
                                <p class="text-muted-foreground mb-6">
                                    Complete all projects to unlock your verified certificate.
                                </p>
                                
                                <div class="flex flex-col items-center py-8">
                                    ${progress === 100 ? renderCertificateUnlocked() : renderCertificateLocked(projects.length, completedCount)}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Resources Tab -->
                    <div id="resources" class="tab-content" style="display: none;">
                        <div class="grid-2 gap-6">
                            ${renderResourceCards()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderProjectCards(projects) {
    if (projects.length === 0) {
        return '<p class="text-center text-muted-foreground">No projects assigned yet.</p>';
    }
    
    return projects.map(project => {
        const badgeClass = project.status === 'approved' ? 'badge-default' : 
                          project.status === 'pending' ? 'badge-secondary' : 'badge-outline';
        
        return `
            <div class="card hover:border-brand-red/50 transition-colors">
                <div class="p-6">
                    <div class="flex flex-col md:flex-row justify-between gap-4">
                        <div class="flex-1">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="text-xl font-semibold">${project.title}</h3>
                                <span class="badge ${badgeClass}">${project.status}</span>
                            </div>
                            <p class="text-muted-foreground mb-4">${project.description}</p>
                            <div class="flex items-center gap-4 text-sm text-muted-foreground">
                                <span class="flex items-center gap-1">
                                    <i class="fas fa-clock"></i> Due: ${project.submissionDate}
                                </span>
                                ${project.status === 'approved' ? `
                                    <span class="flex items-center gap-1 text-green-500">
                                        <i class="fas fa-check-circle"></i> Approved
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                        <div class="flex items-center">
                            ${project.status === 'pending' ? `
                                <button class="btn project-submit-btn" data-project-id="${project.id}">
                                    <i class="fas fa-upload mr-2"></i> Submit
                                </button>
                            ` : project.status === 'submitted' ? `
                                <button class="btn btn-outline" disabled>
                                    Under Review
                                </button>
                            ` : project.status === 'approved' ? `
                                <button class="btn btn-ghost text-green-500">
                                    Completed
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderCertificateUnlocked() {
    return `
        <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <i class="fas fa-check-circle text-green-500 text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Congratulations!</h3>
        <p class="text-muted-foreground mb-6">You have successfully completed the internship.</p>
        <button class="btn btn-hero" id="download-certificate-btn">
            <i class="fas fa-download mr-2"></i> Download Certificate
        </button>
    `;
}

function renderCertificateLocked(total, completed) {
    const remaining = total - completed;
    
    return `
        <div class="w-20 h-20 bg-surface-elevated rounded-full flex items-center justify-center mb-6">
            <i class="fas fa-file-alt text-muted-foreground text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Certificate Locked</h3>
        <p class="text-muted-foreground">
            ${remaining > 0 ? `Please complete ${remaining} more project${remaining > 1 ? 's' : ''}.` : 'No projects assigned.'}
        </p>
    `;
}

function renderResourceCards() {
    return `
        <div class="card bg-surface">
            <div class="p-6">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-video text-brand-red"></i> Learning Videos
                </h3>
                <ul class="space-y-3">
                    <li class="text-sm hover:text-brand-red cursor-pointer">Introduction to React</li>
                    <li class="text-sm hover:text-brand-red cursor-pointer">Advanced Python Concepts</li>
                    <li class="text-sm hover:text-brand-red cursor-pointer">Git & GitHub Workflow</li>
                </ul>
            </div>
        </div>
        
        <div class="card bg-surface">
            <div class="p-6">
                <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                    <i class="fas fa-file-alt text-brand-red"></i> Documentation
                </h3>
                <ul class="space-y-3">
                    <li class="text-sm hover:text-brand-red cursor-pointer">Project Guidelines PDF</li>
                    <li class="text-sm hover:text-brand-red cursor-pointer">API References</li>
                    <li class="text-sm hover:text-brand-red cursor-pointer">Submission Format Guide</li>
                </ul>
            </div>
        </div>
    `;
}

// Export functions
window.renderUserDashboardContent = renderUserDashboardContent;