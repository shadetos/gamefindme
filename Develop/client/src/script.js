// Redirect to chatroom when "Message" is clicked
const messageButtons = document.querySelectorAll('.message-btn');

messageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const playerName = button.getAttribute('data-player');
        if (playerName) {
            window.location.href = `chatroom.html?player=${encodeURIComponent(playerName)}`;
        }
    });
});

// Display player's name in the chatroom
const chatroomTitle = document.getElementById('chatroom-title');
if (chatroomTitle) {
    const params = new URLSearchParams(window.location.search);
    const playerName = params.get('player');

    if (playerName) {
        chatroomTitle.textContent = `Chat with ${playerName}`;
    } else {
        chatroomTitle.textContent = 'Chat Room';
    }
}

// Chatroom functionality
const chat = document.getElementById('chat');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

if (sendButton && messageInput && chat) {
    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'p-2 mb-2 bg-blue-500 text-white rounded';
            messageElement.textContent = message;
            chat.appendChild(messageElement);
            messageInput.value = '';
            chat.scrollTop = chat.scrollHeight;
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
}
