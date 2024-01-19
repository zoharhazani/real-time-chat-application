import websockets
import asyncio
import json
import logging
from datetime import datetime

HOST = 'localhost'
PORT = 1234

class ChatServer:

    def __init__(self):
        
        self.clients = {}
        self.chat_history = {}

        # Set up logging
        logging.basicConfig(filename='server_log.txt', level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
        self.logger = logging.getLogger(__name__)
        
    async def start_server(self):

        try:
            self.logger.info(f"Server started on {HOST}:{PORT}")
            print(f"Server started on {HOST}:{PORT}")
            await websockets.serve(self.new_client_connected,HOST,PORT)
        except Exception as e:
            self.logger.error(f"Error starting server: {e}")
            print(f"Error starting server: {e}")
            
    async def new_client_connected(self,client_socket,path):
        try:    
            name = await client_socket.recv()
            self.logger.info(f"New client connected: {name}")
            print(f"New client connected: {name}")

            # Insert the client to the list.
            self.clients[name] = client_socket
            self.chat_history[name] = {}
            await self.notify_all(name)

            connected = True
            try:
                while connected:
                    await self.handle_client_requests(client_socket) 
            except websockets.exceptions.ConnectionClosed:
                connected = False
                self.logger.info(f"Connection closed for client: {name}")
                print(f"Connection closed for client: {name}")
        except Exception as e:
            self.logger.error(f"Error handling new client connection: {e}")
            print(f"Error handling new client connection: {e}")

    async def notify_all(self,name):
        for client_name,client_socket in self.clients.items():
            if client_name != name:
                try:
                    await self.getConnectedClients(client_socket)
                except Exception as e:
                    self.logger.error(f"Error notifying client {client_name}: {e}")

    async def getConnectedClients(self,client_socket):
        try:
            connected_client_list = list(self.clients.keys())
            json_message = {"type":"connectedClients","clients":connected_client_list}
            json_message = json.dumps(json_message)
            await client_socket.send(json_message) 
            self.logger.info("Sent connected clients list to a client.")
            print("Sent connected clients list to a client.")   
        except Exception as e:
            self.logger.error(f"Error sending connected clients list to client: {e}")
            print(f"Error sending connected clients list to client: {e}")

    async def getHistoryChat(self,client_socket,json_message):
        try:    
            print(json_message)
            user_name = json_message.get("userName")
            name = json_message.get("name")
            history_chat = []
            
            if user_name in self.chat_history and name in self.chat_history[user_name]:
                history_chat = self.chat_history[user_name][name]

            print(f'history chat with {user_name} and {name} is - {history_chat}')
            res = {"type":"historyChat","historyChat":history_chat}
            res = json.dumps(res)
            await client_socket.send(res)
            self.logger.info(f"Sent chat history to {user_name} for {name}.")
            print(f"Sent chat history to {user_name} for {name}.")
        except Exception as e:
            self.logger.error(f"Error sending chat history to {user_name} for {name}: {e}")
            print(f"Error sending chat history to {user_name} for {name}: {e}")

    async def sendMessage(self,client_socket,json_message):
        try:    
            sender = json_message.get("sender")
            recipient = json_message.get("recipient")
            text = json_message.get("text")
            time = json_message.get("time")

            message = {"sender":sender,"text":text,"time":time}

            # Save the message in the sender history
            if sender not in self.chat_history:
                self.chat_history[sender] ={}

            if recipient not in self.chat_history[sender]:
                self.chat_history[sender][recipient]=[]

            self.chat_history[sender][recipient].append(message)   

            # Save the message in the recipient history
            if recipient not in self.chat_history:
                self.chat_history[recipient] ={}

            if sender not in self.chat_history[recipient]:
                self.chat_history[recipient][sender]=[]

            self.chat_history[recipient][sender].append(message)  

            client_socket_sender = self.clients[sender]
            client_socket_recipient = self.clients[recipient]

            res = {"type":"sendMessage","message":{"sender":sender,"text":text,"time":time}}
            res = json.dumps(res)
            await client_socket_sender.send(res)
            await client_socket_recipient.send(res)
            self.logger.info(f"Sent message from {sender} to {recipient}.")
            print(f"Sent message from {sender} to {recipient}.")
        except Exception as e:
            self.logger.error(f"Error sending message from {sender} to {recipient}: {e}")
            print(f"Error sending message from {sender} to {recipient}: {e}")

    async def handle_logout(self, client_socket, json_message):
        try:
            name = json_message.get("userName")

            # Remove the client from the list
            del self.clients[name]
            del self.chat_history[name]

            # Notify other clients about the update in connected clients list
            await self.notify_all(name)
            self.logger.info(f"Client {name} logged out.")
            print(f"Client {name} logged out.")
        except Exception as e:
            self.logger.error(f"Error handling logout for client {name}: {e}")
            print(f"Error handling logout for client {name}: {e}")

    async def handle_client_requests(self,client_socket):
            new_message = await client_socket.recv()
            json_message = json.loads(new_message)
            self.logger.info(f"Received message from client: {json_message}")
            print(f"Received message from client: {json_message}")

            match json_message["type"]:
                case "connectedClients":
                    await self.getConnectedClients(client_socket)

                case "historyChat":
                    await self.getHistoryChat(client_socket, json_message)    

                case "sendMessage":
                    await self.sendMessage(client_socket,json_message)

                case "logout":
                    await self.handle_logout(client_socket, json_message)
            

if __name__ == "__main__":
    server = ChatServer()
    event_loop = asyncio.get_event_loop()
    event_loop.run_until_complete(server.start_server())
    event_loop.run_forever()

