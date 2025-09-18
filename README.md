## ⚠️ Missing Files
For security and privacy, some core logic files are excluded.

Instead, we provide `*.example.ts` / `*.example.py` files as **stubs**.  
These allow the project to run, but you’ll need to implement your own logic for:
- Real WebSocket chat
- Neural network decoding/registration
- Backend chat consumer

This ensures the repo is open-source while keeping sensitive logic private.

## Clone Project Environment

Clone project via HTTPS
```bash
git clone https://github.com/jpdevdotcom/university-linkup.git
```

### Setup Client Environment

Go to `university-linkup` folder
```bash
cd university-linkup
```
Go to `client` folder
```bash
cd client
```
Install node dependencies
```bash
npm install
```
Run the client
```bash
npm run dev
```

### Setup Server Environment
*Note: Make sure you are in `university-linkup` directory.*

Go to `server` folder
```bash
cd server
```
Create a virtual environment
```bash
# for mac
python3 -m venv .venv

# for windows
python -m venv .venv
```
Activate virtual environment

*Note: the usage of forward slash (/) depends on what terminal you use*
```bash
# for mac
source .venv/bin/activate

# for windows
.venv/scripts/activate
```
Install dependencies
```bash
pip install -r requirements.txt
```
Run the server using daphne
```bash
daphne -b 0.0.0.0 -p 8000 core.asgi:application
```

Access the web app here: http://localhost:5174/

# Important Notice
Provide your own API keys through your account to enable the chat application to operate at its full capacity.
