class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

   

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }
    
        // Create a user message object
        let userMsg = { name: "User", message: text1 };
        
        // Push the user message into the messages array
        this.messages.push(userMsg);
    
        // Update the chat display
        this.updateChatText(chatbox);
    
        // Clear the input field
        textField.value = "";
    
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text1 }),
        })
            .then((response) => response.json())
            .then((data) => {
                let botMsg = { name: "bot", message: data.answer };
                this.messages.push(botMsg);
                this.updateChatText(chatbox);
            })
            .catch((error) => {
                console.error("Error:", error);
                this.updateChatText(chatbox);
            });
    }
    




updateChatText(chatbox) {
    var html = '';
    this.messages.slice().reverse().forEach(function(item, index) {
        if (item.name === "bot") {
            html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
        } else if (item.name === "User") {  // Include user messages
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
        }
    });

    const chatmessage = chatbox.querySelector('.chatbox__messages');
    chatmessage.innerHTML = html;
}

}


const chatbox = new Chatbox();
chatbox.display();