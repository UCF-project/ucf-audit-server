# ucf-audit-server

Node.js server to wrap tanaguru and asqatasun CLI tool.

## Installation

```
$ npm install      # Install npm dependencies
$ node server.js   # Start server at port 3000
```

## Usage

### Environment variables

Available environment variables:

Variable   | Default Value | Allowed Values
-----------|---------------|--------------
PORT       | 3000          | any port
AUDITOR    | asqatasun     | 'asqatasun' or 'tanaguru'

Example:

```
# Start server at port 8080 for tanaguru auditor
$ PORT=8080 AUDITOR=tanaguru node server.js
```

### POST `/audit`

Once the server is running you can POST audits.

Example:

```
# Writes a scenario.json file
$ echo '{"type": "script","seleniumVersion": "2","formatVersion": 2,"steps": [{"type": "get","url": "http://alterway.fr/"}],"data":{"configs": {},"source": "none"},"inputs": [],"timeoutSeconds": 60}' > scenario.json

# Execute audit
$ curl -F "file=@scenario.json" http://0.0.0.0:3000/audit
```