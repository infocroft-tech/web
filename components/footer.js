// Footer component
function initFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;
    
    footerContainer.innerHTML = renderFooter();
    attachFooterEvents();
}

function renderFooter() {
    const currentYear = new Date().getFullYear();
    
    return `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-grid">
                    <!-- Company Info -->
                    <div class="lg:col-span-2">
                        <div class="flex items-center space-x-2 mb-4">
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
                        <p class="text-muted-foreground mb-6 max-w-sm">
                            Empowering the next generation of tech professionals through free, industry-standard internship programs.
                        </p>
                        <div class="space-y-2 text-sm text-muted-foreground">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-envelope text-brand-red"></i>
                                <span>infocroft.tech@gmail.com</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-phone text-brand-red"></i>
                                <span>+ 91 93440 74098</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-map-marker-alt text-brand-red"></i>
                                <span>Tiruppur, Tamil Nadu, India</span>
                            </div>
                        </div>
                    </div>

                    <!-- Programs -->
                    <div>
                        <h3 class="footer-links-title">Programs</h3>
                        <ul>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Python Development</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Web Development</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Data Science</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">AI & Machine Learning</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Cyber Security</a></p>
                        </ul>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h3 class="footer-links-title">Quick Links</h3>
                        <ul>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Home</a>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">About Us</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Success Stories</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Apply Now</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Privacy Policy</a></p>
                            <p><a href="#" style = "text-decoration: none; color: white;" id="scroll-top-btn">Terms of Service</a></p>
                        </ul>
                    </div>
                </div>

                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <p class="text-sm text-muted-foreground">
                        © ${currentYear} Info Croft. All rights reserved.
                    </p>
                    <div class="flex items-center gap-4">
                        <button class="btn btn-ghost btn-icon" id="linkedin-btn">
                            <a href="https://www.linkedin.com/company/info-croft/" target="_blank" class="btn btn-ghost btn-icon" id="instagram-btn"><i class="fab fa-linkedin"></i></a>
                        </button>
                        <button class="btn btn-ghost btn-icon" id="twitter-btn">
                            <a href="https://x.com/InfoCroft" target="_blank" class="btn btn-ghost btn-icon" id="twitter-btn"><i class="fab fa-twitter"></i></a>
                        </button>
                        <button class="btn btn-ghost btn-icon" id="instagram-btn">
                            <a href="https://www.instagram.com/infocroft?igsh=enNqa3J4eXB1bHQx" target="_blank" class="btn btn-ghost btn-icon" id="instagram-btn"><i class="fab fa-instagram"></i></a>
                        </button>

                        <button class="btn btn-outline btn-sm" id="scroll-top-btn">
                            <i class="fas fa-arrow-up mr-2"></i>
                            Top
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

function attachFooterEvents() {
    // Social buttons
    const socialButtons = ['linkedin', 'twitter', 'github'];
    socialButtons.forEach(platform => {
        const button = document.getElementById(`${platform}-btn`);
        if (button) {
            button.addEventListener('click', function() {
                alert(`Opening ${platform.charAt(0).toUpperCase() + platform.slice(1)}...`);
            });
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links li');
    footerLinks.forEach(link => {
        link.addEventListener('click', function() {
            const text = this.textContent;
            alert(`Navigating to ${text}...`);
        });
    });
}

// Export functions
window.initFooter = initFooter;