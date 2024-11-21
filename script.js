document.addEventListener('DOMContentLoaded', () => {
    // Existing code with touch and mobile optimizations
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
        });
    });

    // Keyboard accessibility
    userInput.addEventListener('keyboardAccessibility', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Responsive chat scroll
    function adjustChatScroll() {
        const isMobile = window.innerWidth < 640;
        chatContainer.style.maxHeight = isMobile ? '300px' : '400px';
    }

    window.addEventListener('resize', adjustChatScroll);
    adjustChatScroll();
});
