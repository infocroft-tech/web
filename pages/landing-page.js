// Landing page component - Updated About & Contact sections
function renderLandingPageContent() {
  return `
        <div class="flex flex-col gap-20 pb-20">
            <!-- Hero Section -->
            <section id="home" class="hero">
                <div class="hero-bg hero-bg-1 animate-float"></div>
                <div class="hero-bg hero-bg-2 animate-float"></div>
                
                <div class="hero-content animate-fade-in">
                    <div class="hero-badge">
                        <i class="fas fa-star mr-2"></i>
                         <span>Premium Internships • 100% Remote</span>
                    </div>
                    
                    <h1 class="hero-title">
                        Kickstart Your <span class="text-glow text-brand-red">Career</span> with<br />
                        Real-World Experience
                    </h1>
                    
                    <p class="hero-subtitle">
                        Join thousands of students gaining hands-on experience through our premium internship platform. 
                        Build projects, get mentored, and earn certificates.
                    </p>
                    
                    <div class="hero-actions">
                        <button class="btn btn-hero" id="explore-domains-btn">
                            Explore Domains <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                        <button class="btn btn-outline border-brand-red text-brand-red hover:bg-brand-red/10">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <!-- Domains Section -->
            <section id="domains" class="page-container w-full">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">Our <span class="text-brand-red">Domains</span></h2>
                    <p class="text-muted-foreground">Choose your path and start your journey</p>
                </div><br/>
                
                <div class="grid-3">
                    ${renderDomainCards()}
                </div>
            </section>

            <!-- Enhanced About Section -->
            <section id="about" class="relative py-24 overflow-hidden">
                <!-- Background Pattern -->
                <div class="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-brand-red/3"></div>
                <div class="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                
                <div class="page-container relative">
                    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
                        <!-- Left Column - Image/Visual -->
                        <div class="lg:w-1/2 animate-slide-up">
                            <div class="relative">
                                <!-- Main Stats Card -->
                                <div class="bg-surface border border-brand-red/20 rounded-3xl p-8 shadow-2xl">
                                    <div class="flex flex-wrap gap-6 justify-center mb-8">
                                        ${renderStatsCards()}
                                    </div>
                                    
                                    <!-- Animated elements -->
                                    <div class="absolute top-4 left-4 w-6 h-6 bg-brand-red/30 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                    <div class="absolute bottom-6 right-6 w-8 h-8 bg-blue-500/30 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                                    <div class="absolute top-1/2 left-1/4 w-4 h-4 bg-green-500/30 rounded-full animate-bounce" style="animation-delay: 0.6s"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Column - Content -->
                        <div class="lg:w-1/2 animate-slide-up" style="animation-delay: 0.2s">
                            <div class="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 rounded-full mb-6">
                                <h1 class="text-center font-semibold text-brand-white text-3xl flex items-center justify-center gap-3 my-4">
                                    <i class="fas fa-rocket text-brand-red"></i>
                                    About Our Platform
                                </h1>
                            </div>
                            
                            <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight flex items-center justify-center">
                                Why <span class="text-brand-red relative">
                                    Students Choose Us
                                    <span class="absolute -bottom-2 left-0 w-24 h-1 bg-brand-red rounded-full"></span>
                                </span>
                            </h2>
                            
                            <p class="text-xl text-muted-foreground mb-10 leading-relaxed flex items-center justify-center">
                                We don't just offer internships - we provide <span class="font-semibold text-white">career-transforming experiences</span> 
                                with personalized guidance and real-world impact.
                            </p><br/>
                            
                            <div class="space-y-6 flex items-center justify-center">
                                ${[
                                    {
                                        icon: "fas fa-user-graduate",
                                        title: "Learning Path",
                                        desc: "Custom curriculum based on your goals and skill level",
                                        color: "text-brand-red",
                                    },
                                    {
                                        icon: "fas fa-hands-helping",
                                        title: "1-on-1 Mentorship",
                                        desc: "Weekly sessions with industry experts and career coaches",
                                        color: "text-brand-red",
                                    },
                                    {
                                        icon: "fas fa-project-diagram",
                                        title: "Live Projects",
                                        desc: "Work on actual client projects with real business impact",
                                        color: "text-brand-red",
                                    },
                                    {
                                        icon: "fas fa-network-wired",
                                        title: "Global Network",
                                        desc: "Connect with peers and professionals worldwide",
                                        color: "text-brand-red",
                                    },
                                ]
                                .map(
                                    (item, index) => `
                                    <div class="flex gap-4 items-start p-4 rounded-xl hover:bg-white/5 transition-all duration-300 animate-fade-in" style="animation-delay: ${
                                        0.3 + index * 0.1
                                    }s">
                                        <div class="flex-shrink-0 w-12 h-12 bg-surface rounded-xl flex items-center justify-center ${
                                            item.color
                                        }">
                                            <i class="${item.icon} text-xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-lg font-bold mb-1">${
                                                item.title
                                            }</h3>
                                            <p class="text-muted-foreground">${
                                                item.desc
                                            }</p>
                                        </div>
                                    </div>
                                `
                                )
                                .join("")}
                            </div><br/>
                            
                            <div class="mt-10 flex flex-wrap gap-4">
                                <button class="btn btn-hero group" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                                    <span>Start Your Journey</span><br/>
                                    <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                                </button>
                                <button class="btn btn-outline border-brand-red text-brand-red hover:bg-brand-red/10">
                                    <i class="fas fa-play-circle mr-2"></i>Watch Testimonials
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Enhanced Contact Section -->
            <section id="contact" class="relative py-24 overflow-hidden">
                <!-- Background Elements -->
                <div class="absolute inset-0 bg-gradient-to-b from-surface/50 to-surface"></div>
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent"></div>
                
                <!-- Floating Elements -->
                <div class="absolute top-20 left-10 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl animate-pulse"></div>
                <div class="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
                
                <div class="page-container relative max-w-6xl">
                    <div class="text-center mb-16 animate-fade-in-up">
                        <div class="inline-flex items-center gap-2 px-6 py-3 bg-brand-red/10 rounded-full mb-6">
                            <h1><i class="fas fa-bolt text-brand-red animate-pulse"></i>
                            <span class="font-bold text-lg">Limited Spots Available</span></h1>
                        </div>
                        
                        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span class="text-gradient bg-gradient-to-r from-brand-red via-orange-500 to-brand-red animate-gradient">
                                Apply Now & Transform
                            </span>
                            <br class="hidden sm:block" />
                            <span class="text-white">Your Career Today</span>
                        </h2>
                        
                        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Submit your application and our team will reach out within <span class="font-bold text-brand-red">24 hours</span> 
                            for a personalized consultation.
                        </p>
                    </div><br/><br/>
                    
                    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center animate-fade-in-up" style="animation-delay: 0.2s">
                        <!-- Left: Contact Info -->
                        <div class="space-y-8">
                            <div class="card bg-surface-elevated/50 backdrop-blur-sm border-brand-red/20 p-8">
                                <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <h1 class="flex items-center justify-center"><i class="fas fa-headset text-brand-red"></i> <span>Quick Support</span></h1>
                                </h3><br/>
                                
                                <div class="space-y-6 flex items-center justify-center">
                                    <div class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                        <div class="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center">
                                            <i class="fas fa-envelope text-brand-red text-xl"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-muted-foreground">Email Us</p>
                                            <p class="font-bold text-lg">infocroft.tech@gmail.com</p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                        <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                            <i class="fas fa-phone text-brand-red"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-muted-foreground">Call Us</p>
                                            <p class="font-bold text-lg">+ 91 93440 74098</p>
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                                        <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                                            <i class="fas fa-clock text-brand-red text-green-500 text-xl"></i>
                                        </div>
                                        <div>
                                            <p class="text-sm text-muted-foreground">Response Time</p>
                                            <p class="font-bold text-lg">Within 24 Hours</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="mt-8 pt-8 border-t border-white/10">
                                    <h4 class="font-bold mb-4 flex items-center justify-center">Why Apply Now?</h4>
                                    <ul class="space-y-3">
                                        <li class="flex items-center gap-2 flex items-center justify-center">
                                            <i class="fas fa-check-circle text-brand-red"></i>
                                            <span>Early applicants get priority mentorship</span>
                                        </li>
                                        <li class="flex items-center gap-2 flex items-center justify-center">
                                            <i class="fas fa-check-circle text-brand-red"></i>
                                            <span>Limited batch size for personal attention</span>
                                        </li>
                                        <li class="flex items-center gap-2 flex items-center justify-center">
                                            <i class="fas fa-check-circle text-brand-red"></i>
                                            <span>Scholarship opportunities available</span>
                                        </li>
                                    </ul>
                                </div>
                            </div><br/><br/>
                            
                            <!-- Live Stats -->
                            <div class="card bg-surface-elevated/50 backdrop-blur-sm border-brand-red/20 p-6">
                                <div class="flex items-center justify-between mb-4 flex items-center justify-center gap-3">
                                    <h1 class="font-bold flex items-center justify-center">Live Applications</h1>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-brand-red"><span id="today-applications"><h1>42+</h1></span></div>
                                        <div class="text-sm text-muted-foreground">Today</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-brand-red"><span id="monthly-applications"><h1>100+</h1></span></div>
                                        <div class="text-sm text-muted-foreground">This Month</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-3xl font-bold text-brand-red"><span id="total-applications"><h1>500+</h1></span></div>
                                        <div class="text-sm text-muted-foreground">Total</div>
                                    </div>
                                </div>
                                <div class="mt-4 text-xs text-center text-muted-foreground">
                                    <i class="fas fa-exclamation-triangle mr-1 text-yellow-500"></i>
                                    Spots fill quickly - Apply now to secure your position
                                </div>
                            </div>
                        </div><br/><br/>
                        
                        <!-- Right: Contact Form -->
                        <div class="card bg-surface-elevated border-brand-red/30 shadow-2xl hover:shadow-brand-red/20 transition-all duration-500">
                            <div class="p-8 md:p-10">
                                <div class="flex items-center gap-3 mb-8 flex items-center justify-center">
                                <div class="card bg-surface-elevated border-brand-red/30 shadow-2xl hover:shadow-brand-red/20 transition-all duration-500">
    <div class="p-8 md:p-10 text-center">
        <div class="flex items-center justify-center gap-3 mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-brand-red to-brand-red/80 rounded-xl flex items-center justify-center">
                <h1><i class="fas fa-file-alt text-white text-xl"></i></h1>
            </div>
            <div>
                <h3 class="text-2xl font-bold">Application Form</h3>
                <p class="text-muted-foreground">Complete in 2 minutes</p>
            </div>
        </div>
        
        <p class="mb-6 text-lg text-muted-foreground">
            Click the link below to fill out the application form:
        </p>
        
        <a href="https://forms.gle/T8dfVhC5V673oH8U6" 
   target="_blank" 
   rel="noopener noreferrer"
   class="btn btn-hero w-full py-4 text-lg group relative overflow-hidden inline-flex items-center justify-center"
   style="text-decoration: none !important;">
    Go to Application Form
    <i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
</a>

        <div class="text-center text-sm text-muted-foreground mt-4">
            <i class="fas fa-lock mr-1"></i>
            Your information is secure and encrypted
        </div>
    </div>
</div>

                                <!-- Success/Error Messages -->
                                <div id="form-messages" class="mt-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Updated renderDomainCards function
function renderDomainCards() {
  const domains = [
    {
      title: "Web Development",
      icon: "fas fa-globe",
      desc: "React, Node.js, Full Stack",
    },
    {
      title: "Python Dev",
      icon: "fas fa-code",
      desc: "Django, Flask, Automation",
    },
    {
      title: "Data Science",
      icon: "fas fa-database",
      desc: "Pandas, SQL, Visualization",
    },
    {
      title: "AI & ML",
      icon: "fas fa-brain",
      desc: "TensorFlow, Neural Networks",
    },
    {
      title: "Data Analytics",
      icon: "fas fa-chart-bar",
      desc: "Python, PowerBI, SQL",
    },
    {
      title: "Cyber Security",
      icon: "fas fa-shield-alt",
      desc: "Ethical Hacking, Network Security",
    },
  ];

  const googleFormLink = "https://forms.gle/T8dfVhC5V673oH8U6";

  return domains
    .map(
      (domain) => `
        <div class="card hover:-translate-y-2 transition-transform duration-300">
            <div class="text-center p-8">
                <div class="w-16 h-16 bg-surface-elevated rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-red">
                    <h1><i class="${domain.icon} text-2xl"></i></h1>
                </div>
                <h3 class="text-xl font-bold mb-2">${domain.title}</h3>
                <p class="text-muted-foreground mb-6">${domain.desc}</p>
                <a href="${googleFormLink}" target="_blank" rel="noopener noreferrer" 
                   class="btn btn-outline w-full border-brand-red/50 hover:bg-brand-red hover:text-white inline-flex items-center justify-center transition-all duration-300"
                   style="text-decoration: none;">
                    Apply Now 
                </a>
            </div>
        </div>
    `
    )
    .join("");
}

// Keep existing renderStatsCards function
function renderStatsCards() {
  const stats = [
    {
      value: "500+",
      label: "Students",
      icon: "fas fa-users",
      color: "text-brand-red",
    },
    {
      value: "95%",
      label: "Success Rate",
      icon: "fas fa-award",
      color: "text-brand-red",
    },
    {
      value: "100+",
      label: "Mentors",
      icon: "fas fa-chalkboard-teacher",
      color: "text-brand-red",
    },
    {
      value: "4.9★",
      label: "Rating",
      icon: "fas fa-star",
      color: "text-brand-red",
    },
  ];

  return stats
    .map(
      (stat, index) => `
        <div class="bg-surface p-4 rounded-xl text-center animate-scale-in" style="animation-delay: ${
          index * 0.1
        }s">
            <div class="${stat.color} text-2xl mb-2">
                <i class="${stat.icon}"></i>
            </div>
            <div class="text-2xl font-bold mb-1"><h1>${stat.value}</h1></div>
            <div class="text-xs text-muted-foreground">${stat.label}</div>
        </div>
    `
    )
    .join("");
}

// Export functions
window.renderLandingPageContent = renderLandingPageContent;
window.initContactForm = initContactForm;
window.renderDomainCards = renderDomainCards;
window.renderStatsCards = renderStatsCards;
window.loadApplicationStats = loadApplicationStats;