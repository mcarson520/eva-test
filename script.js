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
           Clear any existing response chips
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
            }(promptType);
        
        // Add the prompt as a user message
        this.addMessage(promptText, 'user');
        
        // Generate appropriate response
        setTimeout(() => {
            const response = this.generatePromptResponse(promptType);
            this.addMessage(response, 'eva');
        }, Clear response chips
        this.hideResponseChips();
        
        // 1500);
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
        const messa{
                message: "I see you're dealing with error code E-204. This typically indicates a ground fault circuit interrupter (GFCI) trip. Let's troubleshoot this step by step:<br><br>1. First, check the breaker panel - is the GFCI breaker tripped?<br>2. Look at the charger's LED halo - it should be red, confirming the error<br>3. Try resetting the GFCI breaker by switching it off and back on<br><br>Would you like me to walk you through checking the breaker panel?",
                chips: [
                    { text: "Yes, walk me through it", value: "yes_guide_breaker" },
                    { text: "No, they already checked", value: "no_already_checked", secondary: true }
                ]
            };
        }
        
        if (message.includes('yes') && message.includes('guide') || message.includes('walk') || message === 'yes') {
            return {
                message: "Perfect! Let's check the breaker panel step by step:<br><br>1. Have the customer locate their electrical panel<br>2. Look for the GFCI breaker labeled for the EV charger<br>3. Check if the breaker is in the 'tripped' position (middle position)<br>4. If tripped, switch it fully OFF, then back ON<br><br>Can you see the breaker panel reference image on the left? The customer's breaker should look similar. Is the customer able to locate the GFCI breaker?",
                chips: [
                    { text: "Yes, found it", value: "found_breaker" },
                    { text: "No, can't find it", value: "cant_find_breaker", secondary: true },
                    { text: "Need more help", value: "need_more_help", secondary: true }
                ]
            };
        }
        
        if (message.includes('breaker') || message.includes('panel')) {
            return {
                message: "Great! Let's check the breaker panel. Please have the customer locate their electrical panel and look for the GFCI breaker labeled for the EV charger. It's usually a breaker with a 'test' and 'reset' button. Can you see the breaker panel reference image on the left? The breaker should look similar to that.",
                chips: [
                    { text: "Found the breaker", value: "found_breaker" },
                    { text: "Can't locate it", value: "cant_find_breaker", secondary: true }
                ]
            };
        }
        
        if (message.includes('billing') || message.includes('bill')) {
            return {
                message: "I can help with billing questions. For EV charger billing, the charges appear on the customer's regular FPL bill under 'Electric Vehicle Charging.' The rate depends on their time-of-use plan. Would you like me to explain the different billing rates or help troubleshoot a specific billing issue?",
                chips: [
                    { text: "Explain billing rates", value: "explain_rates" },
                    { text: "Troubleshoot billing issue", value: "troubleshoot_billing" },
                    { text: "Both", value: "both_billing" }
                ]
            };{
                message: "Let's troubleshoot the non-working charger. First, I need to know:<br><br>1. Are there any LED indicators showing on the charger?<br>2. Is the customer getting any error messages?<br>3. When did it last work properly?<br><br>I see we have an E-204 error code displayed. This suggests a GFCI trip - let's start with checking the electrical panel.",
                chips: [
                    { text: "Check electrical panel", value: "check_panel" },
                    { text: "LED shows different color", value: "different_led", secondary: true }
                ]
            },
            
            'firmware-update': {
                message: "For firmware updates, here's the process:<br><br>1. The charger should automatically update when connected to WiFi<br>2. Manual updates can be initiated through the FPL app<br>3. Updates typically take 10-15 minutes<br><br>Is the customer having trouble with an automatic update, or do they need to manually initiate one?",
                chips: [
                    { text: "Automatic update issue", value: "auto_update" },
                    { text: "Manual update needed", value: "manual_update" },
                    { text: "Update stuck/failed", value: "update_failed", secondary: true }
                ]
            },
            
            'billing-questions': {
                message: "I can help explain EV charging billing. The charges appear under 'Electric Vehicle Charging' on their FPL bill. Key points:<br><br>• Time-of-use rates apply (cheaper during off-peak hours)<br>• Peak hours: 12-9 PM weekdays<br>• Off-peak hours: All other times<br><br>What specific billing question do they have?",
                chips: [
                    { text: "Explain rates", value: "explain_rates" },
                    { text: "Bill seems high", value: "high_bill" },
                    { text: "Time-of-use questions", value: "tou_questions" }
                ]
            },
            
            'wifi-connectivity': {
                message: "For WiFi connectivity, let's troubleshoot:<br><br>1. Check if their home WiFi is working properly<br>2. Verify the charger is within WiFi range<br>3. The charger may need network reconfiguration<br><br>Is the customer seeing any specific error messages about connectivity?",
                chips: [
                    { text: "No error messages", value: "no_error" },
    window.evaPrototype =                 { text: "Shows WiFi error", value: "wifi_error" },
                    { text: "Can't connect to network", value: "cant_connect", secondary: true }
                ]
            },
            
            'error-codes': {
                message: "Error code E-204 indicates a Ground Fault Circuit Interrupter (GFCI) trip. This is a safety feature that protects against electrical faults.<br><br>Resolution steps:<br>1. Check the electrical panel for a tripped GFCI breaker<br>2. Reset the GFCI breaker<br>3. Test the charger again<br><br>Should I walk you through finding the GFCI breaker?",
                chips: [
                    { text: "Yes, guide me", value: "guide_gfci" },
                    { text: "Already found it", value: "found_gfci", secondary: true }
                ]
            },
            
            'past-interactions': {
                message: "Here are Michael Rodriguez's previous interactions:<br><br>• <strong>Jan 15, 2026:</strong> WiFi connectivity resolved - charger reconnected to network<br>• <strong>Dec 28, 2025:</strong> Billing inquiry about time-of-use rates<br><br>Both previous issues were resolved successfully. This E-204 error appears to be a new issue. Would you like details from either previous case?",
                chips: [
                    { text: "Jan 15 WiFi details", value: "jan15_details" },
                    { text: "Dec 28 billing details", value: "dec28_details" },
                    { text: "Focus on current issue", value: "current_focus", secondary: true }
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
            'no_already_checked': {
                message: "I understand they've already checked the breaker. Let's try these additional steps:<br><br>1. Unplug the charger for 30 seconds, then plug it back in<br>2. Check if the outlet itself has power by testing with another device<br>3. Look for any physical damage to the charging cable<br><br>Are you seeing any changes in the LED indicator during these steps?",
                chips: [
                    { text: "LED changed color", value: "led_changed" },
                    { text: "No change", value: "no_led_change", secondary: true },
                    { text: "No power to outlet", value: "no_outlet_power", secondary: true }
                ]
            },
            'found_breaker': {
                message: "Excellent! Now let's reset the GFCI breaker:<br><br>1. Switch the breaker fully to the OFF position<br>2. Wait 5 seconds<br>3. Switch it back to the ON position<br>4. Check the charger - the LED should change from red to green<br><br>What's happening with the charger now?",
                chips: [
                    { text: "LED is now green", value: "led_green_success" },
                    { text: "Still red", value: "still_red" },
                    { text: "Different color", value: "different_color", secondary: true }
                ]
            },
            'led_green_success': {
                message: "Perfect! ✅ The E-204 error has been resolved. The green LED indicates the charger is ready to use. The customer can now plug in their vehicle and charging should begin normally.<br><br>Is there anything else I can help you with regarding this customer's EV charger?"
            }
        };
        
        return responses[chipValue] || {
            message: "Thank you for that information. Let me help you with the next steps based on your response."
        }
            return {
                message: "I can see the customer's previous interactions. Michael Rodriguez has called twice in the past month:<br><br>• Jan 15: WiFi connectivity issue (resolved)<br>• Dec 28: Questions about time-of-use billing<br><br>This appears to be a new issue with the E-204 error code. Should I pull up more details from his previous cases?",
                chips: [
                    { text: "Yes, show details", value: "show_details" },
                    { text: "No, focus on current issue", value: "current_issue", secondary: true }
                ]
            };
        }
        
        // Default response
        return {
            message: "I understand you need help with this EV charger issue. Can you provide more details about what the customer is experiencing? I'm here to help troubleshoot any charging, billing, or connectivity problems."
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