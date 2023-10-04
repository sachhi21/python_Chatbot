from flask import Flask, request, jsonify, render_template
from chatbot.chat import get_bot_response

app = Flask(__name__)



@app.route("/")
def index():
    return render_template('base.html')

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"answer": "Invalid input"})

    bot_response = get_bot_response(user_message) 
    response_data = {"answer": bot_response}  
    return jsonify(response_data)  




if __name__ == '__main__':
    app.run(debug=True)
