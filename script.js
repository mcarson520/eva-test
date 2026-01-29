// EVA Prototype JavaScript

class EVAPrototype {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.promptBtns = document.querySelectorAll('.prompt-btn');
        this.responseChips = document.getElementById('responseChips');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeChat();
    }

    bindEvents() {
        // Send button click
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        
        // Enter key in input
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        // New chat button
        this.newChatBtn.addEventListener('click', () => this.handleNewChat());

        // Common prompt buttons
        this.promptBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handlePromptClick(btn));
        });
    }

    initializeChat() {
        // Chat is already initialized with the welcome message in HTML
        this.focusInput();
    }

    handleSendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Clear any existing response chips
        this.hideResponseChips();

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Simulate EVA response after a short delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response.message, 'eva');
            
            // Show response chips if suggested
            if (response.chips) {
                this.showResponseChips(response.chips);
            }
        }, 1500);
    }

    handlePromptClick(btn) {
        const promptType = btn.dataset.prompt;
        const promptText = this.getPromptText(promptType);
        
        // Clear any existing response chips
        this.hideResponseChips();
        
        // Add the prompt as a user message
        this.addMessage(promptText, 'user');
        
        // Generate appropriate response
        setTimeout(() => {
            const response = this.generatePromptResponse(promptType);
            this.addMessage(response.message, 'eva');
            
            // Show response chips if suggested
            if (response.chips) {
                this.showResponseChips(response.chips);
            }
        }, 1500);
    }

    handleNewChat() {
        // Clear chat messages except the initial welcome
        const messages = this.chatContainer.querySelectorAll('.message');
        messages.forEach(message => message.remove());
        
        // Clear response chips
        this.hideResponseChips();
        
        // Reset to initial state
        this.addMessage("Hello! I'm EVA, your Electric Vehicle Assistant. I can help you troubleshoot EV charger issues. I see we're working with customer Michael Rodriguez who has an error code E-204. How can I assist you today?", 'eva', true);
        
        this.focusInput();
    }

    addMessage(text, sender, isInitial = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isInitial ? 'initial-message' : `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = sender === 'eva' ? 'eva-avatar' : 'user-avatar';
        avatar.textContent = sender === 'eva' ? 'EVA' : 'AG';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        this.chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('error') || message.includes('e-204')) {
            return {
                message: "I see you're dealing with error code E-204. This typically indicates a ground fault circuit interrupter (GFCI) trip. Let's troubleshoot this step by step:<br><br>1. First, check the breaker panel - is the GFCI breaker tripped?<br>2. Look at the charger's LED halo - it should be red, confirming the error<br>3. Try resetting the GFCI breaker by switching it off and back on<br><br>Would you like me to walk you through checking the breaker panel?",
                chips: [
                    { text: "Yes, walk me through it", value: "yes_guide_breaker" },
                    { text: "No, they already checked", value: "no_already_checked", secondary: true }
                ]
            };
        }
        
        return {
            message: "I understand you need help with this EV charger issue. Can you provide more details about what the customer is experiencing? I'm here to help troubleshoot any charging, billing, or connectivity problems."
        };
    }

    getPromptText(promptType) {
        const prompts = {
            'charger-not-working': 'The customer says their charger is not working',
            'firmware-update': 'Customer needs help with firmware updates',
            'billing-questions': 'Customer has questions about their EV charging bill',
            'wifi-connectivity': 'Customer is having WiFi connectivity issues',
            'error-codes': 'Help me understand this error code E-204',
            'past-interactions': 'Show me past interactions with this customer'
        };
        
        return prompts[promptType] || 'I need assistance with this customer issue';
    }

    generatePromptResponse(promptType) {
        const responses = {
            'error-codes': {
                message: "Error code E-204 indicates a Ground Fault Circuit Interrupter (GFCI) trip. This is a safety feature that protects against electrical faults.<br><br>Resolution steps:<br>1. Check the electrical panel for a tripped GFCI breaker<br>2. Reset the GFCI breaker<br>3. Test the charger again<br><br>Should I walk you through finding the GFCI breaker?",
                chips: [
                    { text: "Yes, guide me", value: "guide_gfci" },
                    { text: "Already found it", value: "found_gfci", secondary: true }
                ]
            }
        };
        
        return responses[promptType] || { 
            message: "I'll help you with that. Can you provide more specific details about the issue?"
        };
    }

    showResponseChips(chips) {
        if (!chips || chips.length === 0) return;
        
        this.responseChips.innerHTML = `
            <h5>Quick Responses:</h5>
            <div class="chips-container">
                ${chips.map(chip => `
                    <button class="response-chip ${chip.secondary ? 'secondary' : ''}" 
                            data-value="${chip.value}"
                            onclick="evaPrototype.handleChipClick('${chip.value}', '${chip.text}')">
                        ${chip.text}
                    </button>
                `).join('')}
            </div>
        `;
        
        this.responseChips.classList.add('show');
    }

    hideResponseChips() {
        this.responseChips.classList.remove('show');
        setTimeout(() => {
            this.responseChips.innerHTML = '';
        }, 300);
    }

    handleChipClick(value, text) {
        // Hide chips first
        this.hideResponseChips();
        
        // Add the chip response as a user message
        this.addMessage(text, 'user');
        
        // Generate appropriate response based on the chip value
        setTimeout(() => {
            const response = this.generateChipResponse(value);
            this.addMessage(response.message, 'eva');
            
            if (response.chips) {
                this.showResponseChips(response.chips);
            }
        }, 1500);
    }

    generateChipResponse(chipValue) {
        const responses = {
            'yes_guide_breaker': {
                message: "Perfect! Let's check the breaker panel step by step:<br><br>1. Have the customer locate their electrical panel<br>2. Look for the GFCI breaker labeled for the EV charger<br>3. Check if the breaker is in the 'tripped' position (middle position)<br>4. If tripped, switch it fully OFF, then back ON<br><br>Is the customer able to locate the GFCI breaker?",
                chips: [
                    { text: "Yes, found it", value: "found_breaker" },
                    { text: "No, can't find it", value: "cant_find_breaker", secondary: true }
                ]
            },
            'found_breaker': {
                message: "Excellent! Now let's reset the GFCI breaker:<br><br>1. Switch the breaker fully to the OFF position<br>2. Wait 5 seconds<br>3. Switch it back to the ON position<br>4. Check the charger - the LED should change from red to green<br><br>What's happening with the charger now?",
                chips: [
                    { text: "LED is now green", value: "led_green_success" },
                    { text: "Still red", value: "still_red", secondary: true }
                ]
            },
            'led_green_success': {
                message: "Perfect! ✅ The E-204 error has been resolved. The green LED indicates the charger is ready to use. The customer can now plug in their vehicle and charging should begin normally.<br><br>Is there anything else I can help you with regarding this customer's EV charger?"
            }
        };
        
        return responses[chipValue] || {
            message: "Thank you for that information. Let me help you with the next steps based on your response."
        };
    }

    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    focusInput() {
        this.chatInput.focus();
    }
}

// Initialize the prototype when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.evaPrototype = new EVAPrototype();
});