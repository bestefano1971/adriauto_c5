import webview
import os
import sys
import json
import base64
from tkinter import filedialog, Tk

def get_resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

class Api:
    _server_started = False
    _server_instance = None
    def save_json(self, data, filename="live_tracking_backup.json"):
        format_dir = os.path.join(os.path.abspath("."), "Format")
        if not os.path.exists(format_dir):
            os.makedirs(format_dir, exist_ok=True)

        root = Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        file_path = filedialog.asksaveasfilename(
            defaultextension=".json",
            filetypes=[("JSON files", "*.json")],
            title="Salva Partita",
            initialfile=filename,
            initialdir=format_dir
        )
        root.destroy()
        
        if file_path:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, ensure_ascii=False, indent=4)
                return True
            except Exception as e:
                print(f"Errore nel salvataggio: {e}")
                return str(e)
        return False

    def load_json(self):
        format_dir = os.path.join(os.path.abspath("."), "Format")
        root = Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        file_path = filedialog.askopenfilename(
            filetypes=[("JSON files", "*.json")],
            title="Carica Partita",
            initialdir=format_dir
        )
        root.destroy()
        
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Errore nel caricamento: {e}")
                return None
        return None

    def save_excel(self, base64_data, filename):
        format_dir = os.path.join(os.path.abspath("."), "Format")
        if not os.path.exists(format_dir):
            os.makedirs(format_dir, exist_ok=True)

        root = Tk()
        root.withdraw()
        root.attributes('-topmost', True)
        file_path = filedialog.asksaveasfilename(
            defaultextension=".xlsx",
            filetypes=[("Excel files", "*.xlsx")],
            title="Esporta Report Excel",
            initialfile=filename,
            initialdir=format_dir
        )
        root.destroy()
        
        if file_path:
            try:
                # remove data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64, if present
                if "," in base64_data:
                    base64_data = base64_data.split(",")[1]
                
                data = base64.b64decode(base64_data)
                with open(file_path, 'wb') as f:
                    f.write(data)
                return True
            except Exception as e:
                print(f"Errore nel salvataggio Excel: {e}")
                return str(e)
        return False

    def close_app(self):
        os._exit(0)

    def get_server_info(self):
        import socket
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(0)
            s.connect(('10.254.254.254', 1))
            local_ip = s.getsockname()[0]
            s.close()
        except Exception:
            local_ip = '127.0.0.1'
        return {"ip": local_ip, "port": 8080}

    def toggle_fullscreen(self):
        import webview
        win = webview.active_window()
        if win:
            win.toggle_fullscreen()

    def start_server(self):
        import threading
        import functools
        from http.server import SimpleHTTPRequestHandler, HTTPServer
        if Api._server_started:
            return True
        bundle_dir = os.path.dirname(get_resource_path("index.html"))
        def run_server():
            try:
                handler = functools.partial(SimpleHTTPRequestHandler, directory=bundle_dir)
                Api._server_instance = HTTPServer(('', 8080), handler)
                Api._server_started = True
                Api._server_instance.serve_forever()
            except Exception as e:
                Api._server_started = False
        thread = threading.Thread(target=run_server, daemon=True)
        thread.start()
        return True

def main():
    import argparse
    import socket
    import threading
    from http.server import SimpleHTTPRequestHandler, HTTPServer

    parser = argparse.ArgumentParser(description='Futsal Match Analyst')
    parser.add_argument('--server', action='store_true', help='Avvia come server per accesso da tablet')
    parser.add_argument('--port', type=int, default=8080, help='Porta del server (default: 8080)')
    args = parser.parse_args()

    if args.server:
        # Trova l'indirizzo IP locale
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            s.connect(('8.8.8.8', 80))
            local_ip = s.getsockname()[0]
        except Exception:
            local_ip = 'localhost'
        finally:
            s.close()

        print(f"\n{'='*50}")
        print(f"MODALITÀ SERVER ATTIVA")
        print(f"Per usare l'app su TABLET:")
        print(f"1. Collega il tablet alla stessa rete Wi-Fi")
        print(f"2. Apri il browser sul tablet")
        print(f"3. Vai all'indirizzo: http://{local_ip}:{args.port}/index.html")
        print(f"{'='*50}\n")

        server_address = ('', args.port)
        httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
        httpd.serve_forever()
        return

    # Path to the index.html file
    index_path = get_resource_path("index.html")
    
    api = Api()
    
    # Create a GUI window
    window = webview.create_window(
        'Futsal Match Analyst', 
        f"file://{index_path}",
        js_api=api,
        width=1280,
        height=800,
        min_size=(1024, 768),
        frameless=True,
        confirm_close=True
    )
    
    # Start the webview
    webview.start(debug=False)

if __name__ == '__main__':
    main()
