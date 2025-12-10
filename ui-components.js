// UI Components library
class UIComponents {
    // Create a button
    static createButton(text, options = {}) {
        const {
            variant = 'default',
            size = 'default',
            className = '',
            onClick,
            icon,
            disabled = false
        } = options;
        
        const button = document.createElement('button');
        button.className = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''} ${className}`;
        button.textContent = text;
        button.disabled = disabled;
        
        if (icon) {
            const iconEl = document.createElement('i');
            iconEl.className = icon;
            button.prepend(iconEl);
        }
        
        if (onClick) {
            button.addEventListener('click', onClick);
        }
        
        return button;
    }
    
    // Create an input field
    static createInput(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            value = '',
            className = '',
            id,
            name,
            onChange
        } = options;
        
        const input = document.createElement('input');
        input.type = type;
        input.className = `input ${className}`;
        input.placeholder = placeholder;
        input.value = value;
        
        if (id) input.id = id;
        if (name) input.name = name;
        
        if (onChange) {
            input.addEventListener('input', (e) => onChange(e.target.value));
        }
        
        return input;
    }
    
    // Create a select dropdown
    static createSelect(options = {}) {
        const {
            value = '',
            options: selectOptions = [],
            className = '',
            id,
            name,
            onChange
        } = options;
        
        const select = document.createElement('select');
        select.className = `select ${className}`;
        
        if (id) select.id = id;
        if (name) select.name = name;
        
        selectOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            if (opt.value === value) option.selected = true;
            select.appendChild(option);
        });
        
        if (onChange) {
            select.addEventListener('change', (e) => onChange(e.target.value));
        }
        
        return select;
    }
    
    // Create a card
    static createCard(content, options = {}) {
        const {
            className = '',
            header,
            footer
        } = options;
        
        const card = document.createElement('div');
        card.className = `card ${className}`;
        
        if (header) {
            const headerEl = document.createElement('div');
            headerEl.className = 'card-header';
            if (typeof header === 'string') {
                headerEl.textContent = header;
            } else {
                headerEl.appendChild(header);
            }
            card.appendChild(headerEl);
        }
        
        const contentEl = document.createElement('div');
        contentEl.className = 'card-content';
        if (typeof content === 'string') {
            contentEl.innerHTML = content;
        } else {
            contentEl.appendChild(content);
        }
        card.appendChild(contentEl);
        
        if (footer) {
            const footerEl = document.createElement('div');
            footerEl.className = 'card-footer';
            if (typeof footer === 'string') {
                footerEl.textContent = footer;
            } else {
                footerEl.appendChild(footer);
            }
            card.appendChild(footerEl);
        }
        
        return card;
    }
    
    // Create a badge
    static createBadge(text, options = {}) {
        const {
            variant = 'default',
            className = ''
        } = options;
        
        const badge = document.createElement('span');
        badge.className = `badge badge-${variant} ${className}`;
        badge.textContent = text;
        
        return badge;
    }
    
    // Create a modal/dialog
    static createModal(content, options = {}) {
        const {
            id,
            title,
            onClose,
            className = ''
        } = options;
        
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.id = id;
        modalOverlay.style.display = 'none';
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                if (onClose) onClose();
                this.style.display = 'none';
            }
        });
        
        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.addEventListener('click', (e) => e.stopPropagation());
        
        if (title) {
            const header = document.createElement('div');
            header.className = 'modal-header';
            header.innerHTML = `
                <h2>${title}</h2>
                <button class="btn btn-ghost btn-icon modal-close-btn">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            const closeBtn = header.querySelector('.modal-close-btn');
            closeBtn.addEventListener('click', function() {
                if (onClose) onClose();
                modalOverlay.style.display = 'none';
            });
            
            modal.appendChild(header);
        }
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        if (typeof content === 'string') {
            modalContent.innerHTML = content;
        } else {
            modalContent.appendChild(content);
        }
        modal.appendChild(modalContent);
        
        modalOverlay.appendChild(modal);
        
        return modalOverlay;
    }
    
    // Create tabs
    static createTabs(tabs, options = {}) {
        const {
            defaultTab,
            className = ''
        } = options;
        
        const container = document.createElement('div');
        container.className = `tabs-container ${className}`;
        
        // Create tab headers
        const tabList = document.createElement('div');
        tabList.className = 'tabs-list';
        
        const tabContentContainer = document.createElement('div');
        tabContentContainer.className = 'tabs-content';
        
        tabs.forEach((tab, index) => {
            const tabId = tab.id || `tab-${index}`;
            const isActive = defaultTab ? tabId === defaultTab : index === 0;
            
            // Create tab trigger
            const tabTrigger = document.createElement('button');
            tabTrigger.className = `tab-trigger ${isActive ? 'active' : ''}`;
            tabTrigger.textContent = tab.label;
            tabTrigger.setAttribute('data-tab', tabId);
            
            tabTrigger.addEventListener('click', function() {
                // Update active tab
                tabList.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding content
                tabContentContainer.querySelectorAll('.tab-content').forEach(c => {
                    c.style.display = 'none';
                });
                document.getElementById(tabId).style.display = 'block';
            });
            
            tabList.appendChild(tabTrigger);
            
            // Create tab content
            const tabContent = document.createElement('div');
            tabContent.id = tabId;
            tabContent.className = 'tab-content';
            tabContent.style.display = isActive ? 'block' : 'none';
            
            if (typeof tab.content === 'string') {
                tabContent.innerHTML = tab.content;
            } else {
                tabContent.appendChild(tab.content);
            }
            
            tabContentContainer.appendChild(tabContent);
        });
        
        container.appendChild(tabList);
        container.appendChild(tabContentContainer);
        
        return container;
    }
}

// Export UIComponents
window.UIComponents = UIComponents;