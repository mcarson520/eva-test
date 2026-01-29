// EVA Prototype JavaScript

class EVAPrototype {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.promptBtns = document.querySelectorAll('.prompt-btn');
        
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

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Simulate EVA response after a short delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'eva');
        }, 1500);
    }

    handlePromptClick(btn) {
        const promptType = btn.dataset.prompt;
        const promptText = this.getPromptText(promptType);
        
        // Add the prompt as a user message
        this.addMessage(promptText, 'user');
        
        // Generate appropriate response
        setTimeout(() => {
            const response = this.generatePromptResponse(promptType);
            this.addMessage(response, 'eva');
        }, 1500);
    }

    handleNewChat() {
        // Clear chat messages except the initial welcome
        const messages = this.chatContainer.querySelectorAll('.message');
        messages.forEach(message => message.remove());
        
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
            return "I see you're dealing with error code E-204. This typically indicates a ground fault circuit interrupter (GFCI) trip. Let's troubleshoot this step by step:<br><br>1. First, check the breaker panel - is the GFCI breaker tripped?<br>2. Look at the charger's LED halo - it should be red, confirming the error<br>3. Try resetting the GFCI breaker by switching it off and back on<br><br>Would you like me to walk you through checking the breaker panel?";
        }
        
        if (message.includes('breaker') || message.includes('panel')) {
            return "Great! Let's check the breaker panel. Please have the customer locate their electrical panel and look for the GFCI breaker labeled for the EV charger. It's usually a breaker with a 'test' and 'reset' button. Can you see the breaker panel reference image on the left? The breaker should look similar to that.";
        }
        
        if (message.includes('billing') || message.includes('bill')) {
            return "I can help with billing questions. For EV charger billing, the charges appear on the customer's regular FPL bill under 'Electric Vehicle Charging.' The rate depends on their time-of-use plan. Would you like me to explain the different billing rates or help troubleshoot a specific billing issue?";
        }
        
        if (message.includes('wifi') || message.includes('connectivity')) {
            return "For WiFi connectivity issues, let's check these steps:<br><br>1. Verify the customer's WiFi network is active<br>2. Check if the charger is within range of their router<br>3. The charger may need to be reconnected to the network<br><br>I can provide the steps for reconnecting the charger to their home WiFi. Would that be helpful?";
        }

        if (message.includes('past') || message.includes('history')) {
            return "I can see the customer's previous interactions. Michael Rodriguez has called twice in the past month:<br><br>• Jan 15: WiFi connectivity issue (resolved)<br>• Dec 28: Questions about time-of-use billing<br><br>This appears to be a new issue with the E-204 error code. Should I pull up more details from his previous cases?";
        }
        
        // Default response
        return "I understand you need help with this EV charger issue. Can you provide more details about what the customer is experiencing? I'm here to help troubleshoot any charging, billing, or connectivity problems.";
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
            'charger-not-working': "Let's troubleshoot the non-working charger. First, I need to know:<br><br>1. Are there any LED indicators showing on the charger?<br>2. Is the customer getting any error messages?<br>3. When did it last work properly?<br><br>I see we have an E-204 error code displayed. This suggests a GFCI trip - let's start with checking the electrical panel.",
            
            'firmware-update': "For firmware updates, here's the process:<br><br>1. The charger should automatically update when connected to WiFi<br>2. Manual updates can be initiated through the FPL app<br>3. Updates typically take 10-15 minutes<br><br>Is the customer having trouble with an automatic update, or do they need to manually initiate one?",
            
            'billing-questions': "I can help explain EV charging billing. The charges appear under 'Electric Vehicle Charging' on their FPL bill. Key points:<br><br>• Time-of-use rates apply (cheaper during off-peak hours)<br>• Peak hours: 12-9 PM weekdays<br>• Off-peak hours: All other times<br><br>What specific billing question do they have?",
            
            'wifi-connectivity': "For WiFi connectivity, let's troubleshoot:<br><br>1. Check if their home WiFi is working properly<br>2. Verify the charger is within WiFi range<br>3. The charger may need network reconfiguration<br><br>Is the customer seeing any specific error messages about connectivity?",
            
            'error-codes': "Error code E-204 indicates a Ground Fault Circuit Interrupter (GFCI) trip. This is a safety feature that protects against electrical faults.<br><br>Resolution steps:<br>1. Check the electrical panel for a tripped GFCI breaker<br>2. Reset the GFCI breaker<br>3. Test the charger again<br><br>Should I walk you through finding the GFCI breaker?",
            
            'past-interactions': "Here are Michael Rodriguez's previous interactions:<br><br>• <strong>Jan 15, 2026:</strong> WiFi connectivity resolved - charger reconnected to network<br>• <strong>Dec 28, 2025:</strong> Billing inquiry about time-of-use rates<br><br>Both previous issues were resolved successfully. This E-204 error appears to be a new issue. Would you like details from either previous case?"
        };
        
        return responses[promptType] || "I'll help you with that. Can you provide more specific details about the issue?";
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
    new EVAPrototype();
});

// Add some visual feedback for interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation when sending messages
    const originalSend = EVAPrototype.prototype.handleSendMessage;
    EVAPrototype.prototype.handleSendMessage = function() {
        const sendBtn = this.sendBtn;
        const originalText = sendBtn.innerHTML;
        
        sendBtn.innerHTML = '<span>Sending...</span>';
        sendBtn.disabled = true;
        
        originalSend.call(this);
        
        setTimeout(() => {
            sendBtn.innerHTML = originalText;
            sendBtn.disabled = false;
        }, 1500);
    };
});