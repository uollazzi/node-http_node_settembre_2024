import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";

const port = 3000;
const host = "localhost";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());

    const u = url.parse(req.url!, true);

    switch (u.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<html><head><title>Mio Server</title></head><body><h1>Ciao Mondo!</h1></body></html>");
            res.end();
            break;
        default:
            res.writeHead(404);
            res.end("Pagina non trovata.");
            break;
    }
};

const server = createServer(requestListener);
server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}`));