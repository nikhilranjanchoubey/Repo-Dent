// Footer Interactive Functions

function showSocialMessage(platform) {
    const messages = {
        'Facebook': '🌐 Facebook integration coming soon! Stay tuned for social features.',
        'LinkedIn': '💼 LinkedIn integration coming soon! Professional networking features.',
        'X': '🐦 X (formerly Twitter) integration coming soon! Real-time updates and notifications.',
        'GitHub': '💻 Visit our GitHub repository for source code and contributions.'
    };
    showGlobalMessage(messages[platform] || `🌐 ${platform} integration coming soon!`, 'info');
}

function showFeatureInfo(feature) {
    const featureMessages = {
        attendance: '📊 Smart Attendance: Real-time tracking with automated reports and parent notifications.',
        grades: '📈 Grade Management: Comprehensive academic performance tracking with analytics.',
        timetable: '📅 Timetable System: Dynamic scheduling with room allocation and conflict detection.',
        analytics: '📊 Analytics Dashboard: Advanced insights with performance metrics and trends.',
        reports: '📄 Report Generation: Automated academic and attendance reports for all stakeholders.'
    };
    
    showGlobalMessage(featureMessages[feature] || 'Feature information coming soon!', 'primary');
}

function showSupportInfo(type) {
    const supportMessages = {
        help: '❓ Help Center: Comprehensive guides and FAQs for all user roles.',
        contact: '📞 Contact: Email us at support@repodent.edu or call +91-XXXX-XXXX',
        docs: '📚 Documentation: Complete API docs and integration guides available.',
        demo: '🎮 Demo Guide: Interactive tutorials for teachers, students, and parents.',
        feedback: '💬 Feedback: Your suggestions help us improve. Share your thoughts!'
    };
    
    showGlobalMessage(supportMessages[type] || 'Support information coming soon!', 'success');
}

// Enhanced global message function
function showGlobalMessage(message, type) {
    // Remove existing message
    const existingMessage = document.getElementById('globalMessage');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.id = 'globalMessage';
    messageContainer.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        width: 90%;
        max-width: 500px;
        animation: slideDown 0.3s ease-out;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    messageContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show shadow-lg" role="alert" style="border-radius: 12px; border: none;">
            <div class="d-flex align-items-center">
                <div class="me-3">
                    ${getAlertIcon(type)}
                </div>
                <div class="flex-grow-1">
                    ${message}
                </div>
            </div>
            <button type="button" class="btn-close" onclick="closeGlobalMessage()"></button>
        </div>
    `;
    
    document.body.appendChild(messageContainer);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeGlobalMessage();
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        primary: '<i class="bi bi-info-circle-fill text-primary"></i>',
        success: '<i class="bi bi-check-circle-fill text-success"></i>',
        info: '<i class="bi bi-lightbulb-fill text-info"></i>',
        warning: '<i class="bi bi-exclamation-triangle-fill text-warning"></i>',
        danger: '<i class="bi bi-x-circle-fill text-danger"></i>'
    };
    return icons[type] || icons.info;
}

function closeGlobalMessage() {
    const messageContainer = document.getElementById('globalMessage');
    if (messageContainer) {
        messageContainer.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            messageContainer.remove();
        }, 300);
    }
}

// Add hover effects to footer links
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 153, 0, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});