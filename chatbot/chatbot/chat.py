# chat_logic.py

import nltk
from nltk.chat.util import Chat, reflections

pairs = [
    [
        r"hi|hello|hey",
        ["Hello! How can I assist you today?", "Hi there! How can I help you?",]
    ],
    [
        r"my name is (.*)",
        ["Hello %1, how can I help you today?",]
    ],
    [
        r"what is your name?",
        ["I am a chatbot.",]
    ],
    [
        r"how are you?",
        ["I'm doing good, thank you!",]
    ],
    [
        r"(.*) (good|well)",
        ["That's great to hear!",]
    ],
    [
        r"bye|goodbye",
        ["Goodbye! Have a great day!", "Goodbye, take care!",]
    ],
    [
        r"thank you|thanks",
        ["You're welcome!", "No problem, happy to help!",]
    ],
]

# Create a chatbot
chatbot = Chat(pairs, reflections)

def get_bot_response(user_input):
    response = chatbot.respond(user_input)
    print(response)
    if response is None:
        return "I'm sorry, I don't understand that. Can you please rephrase?"
    return response
