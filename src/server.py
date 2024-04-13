import webbrowser
import http.server
import socketserver
import threading
import socket

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('',0)) # binds to an available port
        return s.getsockname()[1]

PORT = find_free_port()

def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(("", PORT), Handler)
    print(f"Servindo na porta {PORT}")
    httpd.serve_forever()

def open_browser():
    webbrowser.open(f"http://localhost:{PORT}/src")

# Start the server in a new thread
server_thread = threading.Thread(target=start_server)
server_thread.start()

# Open the web page
open_browser()