// Chatbot component
let isChatbotOpen = false;
let chatbotMessages = [
    { text: "👋 Hello! I'm Info Croft Assistant. How can I help you today? I can tell you about our company, internship domains, or contact information.", isBot: true }
];

function initChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    if (!chatbotContainer) return;
    
    chatbotContainer.innerHTML = renderChatbot();
    attachChatbotEvents();
}

function renderChatbot() {
    return `
        <div class="chatbot-container">
            ${!isChatbotOpen ? renderChatbotToggle() : renderChatbotWindow()}
        </div>
    `;
}

function renderChatbotToggle() {
    return `
        <button class="chatbot-toggle" id="chatbot-toggle">
            <div class="relative">
                <i class="fas fa-comment-dots text-xl"></i>
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full animate-pulse"></span>
            </div>
        </button>
    `;
}

function renderChatbotWindow() {
    return `
        <div class="chatbot animate-slide-up">
            <div class="chatbot-header bg-gradient-to-r from-brand-red to-brand-red/80">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-white text-sm">Info Croft Assistant</h3>
                        <p class="text-xs text-white/80">Online • Instant replies</p>
                    </div>
                </div>
                <button class="btn btn-ghost btn-sm text-white hover:bg-white/20" id="chatbot-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chatbot-messages" id="chatbot-messages">
                ${chatbotMessages.map(msg => `
                    <div class="chatbot-message ${msg.isBot ? 'chatbot-message-bot' : 'chatbot-message-user'}">
                        ${msg.text}
                    </div>
                `).join('')}
                
                <!-- Quick Action Buttons -->
                <div class="chatbot-quick-actions" id="chatbot-quick-actions">
                    <button class="chatbot-quick-btn" data-action="about">
                        <i class="fas fa-info-circle mr-1"></i> About Company
                    </button>
                    <button class="chatbot-quick-btn" data-action="domains">
                        <i class="fas fa-code mr-1"></i> Domains
                    </button>
                    <button class="chatbot-quick-btn" data-action="contact">
                        <i class="fas fa-phone mr-1"></i> Contact
                    </button>
                    <button class="chatbot-quick-btn" data-action="apply">
                        <i class="fas fa-rocket mr-1"></i> How to Apply
                    </button>
                </div>
            </div>
            
            <form class="chatbot-input-form" id="chatbot-form">
                <input type="text" class="chatbot-input flex-1" placeholder="Type your message here..." id="chatbot-input" autocomplete="off">
                <button type="submit" class="btn btn-brand-red btn-sm">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;
}

function attachChatbotEvents() {
    // Toggle button
    const toggleBtn = document.getElementById('chatbot-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isChatbotOpen = true;
            initChatbot();
            
            // Scroll to bottom of messages
            setTimeout(() => {
                const messagesContainer = document.getElementById('chatbot-messages');
                if (messagesContainer) {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
                // Reattach event listeners for quick action buttons
                attachQuickActionEvents();
            }, 100);
        });
    }
    
    // Close button
    const closeBtn = document.getElementById('chatbot-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isChatbotOpen = false;
            initChatbot();
        });
    }
    
    // Form submission
    const chatbotForm = document.getElementById('chatbot-form');
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('chatbot-input');
            const message = input.value.trim();
            
            if (message) {
                processUserMessage(message);
                input.value = '';
            }
        });
    }
    
    // Attach quick action events
    attachQuickActionEvents();
}

function attachQuickActionEvents() {
    // Quick action buttons - attach event listeners dynamically
    document.querySelectorAll('.chatbot-quick-btn').forEach(btn => {
        // Remove existing listeners first
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Re-attach event listeners
    document.querySelectorAll('.chatbot-quick-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.dataset.action;
            handleQuickAction(action);
        });
    });
}

function processUserMessage(message) {
    // Add user message
    chatbotMessages.push({ text: message, isBot: false });
    updateChatbotUI();
    
    // Generate bot response after delay
    setTimeout(() => {
        const response = generateBotResponse(message);
        chatbotMessages.push({ text: response, isBot: true });
        updateChatbotUI();
    }, 800);
}

function generateBotResponse(message) {
    const msg = message.toLowerCase().trim();
    
    // Greetings
    if (msg.match(/^(hi|hello|hey|hi there|hello there)/)) {
        return `👋 Hello! Welcome to Info Croft. I'm here to help you with information about our company, internship domains, and contact details. What would you like to know?`;
    }
    
    // About the company
    if (msg.includes('about') || msg.includes('company') || msg.includes('info croft') || 
        msg.includes('what is info croft') || msg.includes('tell me about') || 
        msg.includes('who are you') || msg.includes('your company')) {
        return `🏢 **About Info Croft**\n\nInfo Croft is a premium internship platform dedicated to providing students with real-world experience through hands-on projects and personalized mentorship. We bridge the gap between academic learning and industry requirements.\n\n**Key Highlights:**\n• Founded in 2020\n• Mission: Empower students with practical skills\n• Success Rate: 95%\n• 500+ Students placed\n• 50+ Industry partners\n• 100+ Expert mentors\n\nWe focus on quality mentorship and project-based learning to ensure every student is job-ready.`;
    }
    
    // Internship domains
    if (msg.includes('domain') || msg.includes('internship') || msg.includes('program') || 
        msg.includes('offer') || msg.includes('available') || msg.includes('course') ||
        msg.includes('web') || msg.includes('python') || msg.includes('data') || 
        msg.includes('ai') || msg.includes('ml') || msg.includes('machine learning') ||
        msg.includes('cyber') || msg.includes('security') || msg.includes('analytics')) {
        return `💻 **Internship Domains Available**\n\nWe offer premium internships in these 6 domains:\n\n1. **Web Development**\n   • React, Node.js, Full Stack Development\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n2. **Python Development**\n   • Django, Flask, Automation\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n3. **Data Science**\n   • Pandas, SQL, Visualization\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n4. **AI & Machine Learning**\n   • TensorFlow, Neural Networks\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n5. **Data Analytics**\n   • Python, PowerBI, SQL\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n6. **Cyber Security**\n   • Ethical Hacking, Network Security\n   • Apply: https://forms.gle/T8dfVhC5V673oH8U6\n\n💡 All internships include:\n• 100% Remote work\n• 1-on-1 Mentorship\n• Real-world projects\n• Completion certificate`;
    }
    
    // Contact information
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || 
        msg.includes('call') || msg.includes('location') || msg.includes('address') || 
        msg.includes('support') || msg.includes('help') || msg.includes('reach') ||
        msg.includes('connect') || msg.includes('get in touch')) {
        return `📞 **Contact Information**\n\n**Primary Contact:**\n📧 Email: infocroft.tech@gmail.com\n📱 Phone: +91 93440 74098\n\n**Response Time:**\n• Email: Within 24 hours\n• Phone: 9 AM - 6 PM IST (Mon-Sat)\n\n**Location:**\nWe are a remote-first company with mentors and students from across India and globally.\n\n**For Applications:**\nPlease use the Apply Now buttons on our website or the Google Form: https://forms.gle/T8dfVhC5V673oH8U6\n\n**Quick Support:**\n• Technical issues: infocroft.tech@gmail.com\n• Application queries: Use the contact form on website\n• Emergency: Call during working hours`;
    }
    
    // How to apply
    if (msg.includes('apply') || msg.includes('application') || msg.includes('join') || 
        msg.includes('register') || msg.includes('sign up') || msg.includes('enroll') ||
        msg.includes('admission') || msg.includes('process') || msg.includes('how to')) {
        return `📝 **How to Apply for Internship**\n\n**Simple 3-Step Process:**\n\n1. **Click Apply Now**\n   • On any domain card on our website\n   • OR use this link: https://forms.gle/T8dfVhC5V673oH8U6\n\n2. **Fill the Google Form**\n   • Provide your basic details\n   • Select preferred domain\n   • Share your career goals\n\n3. **Get Started**\n   • We contact you within 24 hours\n   • Schedule a consultation call\n   • Begin your internship journey!\n\n**Benefits of Our Program:**\n✓ 100% remote internship\n✓ 1-on-1 mentorship sessions\n✓ Real client projects\n✓ Completion certificate\n✓ Job placement assistance\n✓ Flexible schedule\n\nApply now to secure your spot! Limited seats available.`;
    }
    
    // Pricing and fees
    if (msg.includes('price') || msg.includes('fee') || msg.includes('cost') || 
        msg.includes('payment') || msg.includes('free') || msg.includes('paid') ||
        msg.includes('how much') || msg.includes('charge')) {
        return `💰 **Program Investment**\n\nWe offer premium internships with comprehensive support:\n\n**What's Included:**\n• Personalized mentorship sessions\n• Project guidance and review\n• Certificate of completion\n• Career counseling\n• Job placement support\n• Learning resources\n• Community access\n\n**Pricing:**\n• Contact us for customized pricing based on domain\n• Scholarship opportunities available\n• Flexible payment plans\n• EMI options\n\n📧 For detailed pricing, please email us at infocroft.tech@gmail.com with your preferred domain.`;
    }
    
    // Duration and timing
    if (msg.includes('duration') || msg.includes('time') || msg.includes('length') || 
        msg.includes('month') || msg.includes('week') || msg.includes('hour') ||
        msg.includes('long') || msg.includes('when') || msg.includes('schedule')) {
        return `⏰ **Program Duration & Schedule**\n\n**Standard Program:**\n• Duration: 8-12 weeks\n• Weekly commitment: 15-20 hours\n• Flexible schedule: Choose your working hours\n• Start dates: Monthly batches\n• Extension: Available based on performance\n\n**Program Structure:**\n1. **Weeks 1-2:** Foundation & Setup\n2. **Weeks 3-8:** Project Development\n3. **Weeks 9-12:** Advanced Features & Deployment\n4. **Final Week:** Presentation & Certification\n\nWe accommodate academic schedules and provide flexibility for students.`;
    }
    
    // Certificate information
    if (msg.includes('certificate') || msg.includes('certification') || 
        msg.includes('certify') || msg.includes('completion') || 
        msg.includes('cert') || msg.includes('document')) {
        return `🏆 **Certification Details**\n\nUpon successful completion, you receive:\n\n**Digital Certificate** (Verifiable online)\n**LinkedIn Badge** (Shareable on profile)\n**Project Portfolio** (GitHub repository)\n**Letter of Recommendation** (Based on performance)\n**Performance Report** (Detailed skill assessment)\n\n**Requirements for Certification:**\n• Complete all assigned projects\n• Participate in weekly mentorship sessions\n• Submit final project documentation\n• Present your work to mentors\n\nCertificates are issued within 7 days of completion and are recognized by our industry partners.`;
    }
    
    // Thank you responses
    if (msg.includes('thank') || msg.includes('thanks')) {
        return `You're welcome! 😊 If you have more questions about Info Croft internships, feel free to ask. Remember to apply at https://forms.gle/T8dfVhC5V673oH8U6 to start your career journey!`;
    }
    
    // Goodbye
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
        return `👋 Goodbye! Wishing you the best in your career journey. Don't forget to check out our internship domains and apply if you're interested. Have a great day!`;
    }
    
    // Default response for unknown queries
    return `🤔 I'm not sure I understand. Here's what I can help you with:\n\n**Try asking:**\n• "Tell me about Info Croft company"\n• "What internship domains do you offer?"\n• "How can I contact you?"\n• "What is the application process?"\n• "What are the fees?"\n• "How long is the internship?"\n\nOr use the quick buttons above for instant information!`;
}

function handleQuickAction(action) {
    let message = "";
    
    switch(action) {
        case 'about':
            message = "Tell me about Info Croft company";
            break;
        case 'domains':
            message = "What internship domains do you offer?";
            break;
        case 'contact':
            message = "What are your contact details?";
            break;
        case 'apply':
            message = "How to apply for internship?";
            break;
        default:
            message = "Hello";
    }
    
    processUserMessage(message);
}

function updateChatbotUI() {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (messagesContainer) {
        messagesContainer.innerHTML = chatbotMessages.map(msg => `
            <div class="chatbot-message ${msg.isBot ? 'chatbot-message-bot' : 'chatbot-message-user'}">
                ${msg.text.replace(/\n/g, '<br>')}
            </div>
        `).join('') + `
            <div class="chatbot-quick-actions" id="chatbot-quick-actions">
                <button class="chatbot-quick-btn" data-action="about">
                    <i class="fas fa-info-circle mr-1"></i> About
                </button>
                <button class="chatbot-quick-btn" data-action="domains">
                    <i class="fas fa-code mr-1"></i> Domains
                </button>
                <button class="chatbot-quick-btn" data-action="contact">
                    <i class="fas fa-phone mr-1"></i> Contact
                </button>
                <button class="chatbot-quick-btn" data-action="apply">
                    <i class="fas fa-rocket mr-1"></i> Apply
                </button>
            </div>
        `;
        
        // Reattach event listeners for quick action buttons
        attachQuickActionEvents();
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Add CSS for chatbot
function addChatbotStyles() {
    if (document.getElementById('chatbot-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'chatbot-styles';
    style.textContent = `
        .chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .chatbot-toggle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .chatbot-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(239, 68, 68, 0.6);
        }
        
        .chatbot {
            width: 360px;
            max-width: 90vw;
            height: 520px;
            background: #1a1a1a;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(239, 68, 68, 0.3);
        }
        
        .chatbot-header {
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chatbot-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #222;
        }
        
        .chatbot-message {
            margin-bottom: 12px;
            padding: 10px 14px;
            border-radius: 12px;
            max-width: 85%;
            line-height: 1.5;
            font-size: 14px;
            word-wrap: break-word;
        }
        
        .chatbot-message-bot {
            background: #2a2a2a;
            border: 1px solid rgba(239, 68, 68, 0.2);
            margin-right: auto;
            color: #e5e5e5;
        }
        
        .chatbot-message-user {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            margin-left: auto;
        }
        
        .chatbot-quick-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;
            margin-bottom: 8px;
        }
        
        .chatbot-quick-btn {
            padding: 6px 10px;
            background: #2a2a2a;
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 8px;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.2s;
            color: #e5e5e5;
            display: flex;
            align-items: center;
        }
        
        .chatbot-quick-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            transform: translateY(-1px);
        }
        
        .chatbot-input-form {
            padding: 12px;
            border-top: 1px solid #333;
            display: flex;
            gap: 8px;
            background: #1a1a1a;
        }
        
        .chatbot-input {
            background: #2a2a2a;
            border: 1px solid #333;
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .chatbot-input:focus {
            outline: none;
            border-color: #ef4444;
        }
        
        .btn-brand-red {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .btn-brand-red:hover {
            background: linear-gradient(135deg, #dc2626, #ef4444);
        }
        
        @media (max-width: 640px) {
            .chatbot-container {
                bottom: 16px;
                right: 16px;
            }
            
            .chatbot {
                width: calc(100vw - 32px);
                height: 65vh;
            }
            
            .chatbot-toggle {
                width: 50px;
                height: 50px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addChatbotStyles();
    setTimeout(() => {
        initChatbot();
    }, 1000);
});

// Export functions
window.initChatbot = initChatbot;
window.processUserMessage = processUserMessage;
window.handleQuickAction = handleQuickAction;