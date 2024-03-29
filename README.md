# real-time-chat-application

## Overview

This repository contains a simple chat application implemented using WebSocket for real-time communication. The application comprises a server and a client. The server is written in Python using the `websockets` library, and the client is implemented in React.

## Server

### Requirements

- Python 3.x
- `websockets` library (`pip install websockets`)

### How to Run

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate to the server directory:**

    ```bash
    cd server
    ```

3. **Run the server script:**

    ```bash
    python server.py
    ```

   By default, the server runs on `localhost` at port `1234`.

## Client

### Requirements

- Node.js
- npm (Node Package Manager)

### How to Run

1. **Navigate to the client directory:**

    ```bash
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the React application:**

    ```bash
    npm start
    ```

   This will start the development server and open the application in your default web browser.

## Usage

- Upon running the client application, you will be prompted to enter a username. The application will connect to the WebSocket server.
- The sidebar displays a list of connected clients. Clicking on a client's name will show the chat history between you and that client.
- Type a message in the chat input box and press Enter to send a message to the selected recipient.
- The chat history is displayed in the main chat area.

## WebSocket Server Implementation (`server.py`)

The server is implemented in Python using the `websockets` library. It supports the following functionalities:

- New client connection handling.
- Sending and receiving chat messages.
- Retrieving and sending chat history.
- Handling client logout.

## WebSocket Client Implementation (`Home.js`)

The client is implemented in React and utilizes the `useWebSocket` hook for WebSocket communication. It includes the following features:

- Displaying a list of connected clients.
- Retrieving and displaying chat history.
- Sending and receiving real-time messages.
- Logging out from the chat application.

## WebSocket Communication Protocol

The communication between the server and the client follows a simple JSON-based protocol. The `type` field in the JSON messages determines the purpose of the message.

- `connectedClients`: Request and response for getting the list of connected clients.
- `historyChat`: Request and response for getting the chat history.
- `sendMessage`: Sending and receiving chat messages.
- `logout`: Request for logging out from the chat application.

## Contributing

Feel free to contribute to the development of this chat application by submitting issues or pull requests. Your feedback and suggestions are highly appreciated.

## License

This project is licensed under the [MIT License](LICENSE).

