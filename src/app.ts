import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import fs from "node:fs";
import path from "node:path";

const port = 3000;
const host = "localhost";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());

    const u = url.parse(req.url!, true);
    const nome = u.query["nome"] as string;
    const colore = u.query["colore"] as string;

    switch (u.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<html><head><title>Mio Server</title></head><body><h1>Ciao [[nome]]!</h1></body></html>".replace("[[nome]]", nome ?? "a tutti"));
            res.end();
            break;
        case "/api/v2/pippo":
            res.writeHead(200, { "Content-Type": "application/json" }); // MIME Type
            const pippo = {
                nome: "Pippo",
                anni: 87
            }
            res.end(JSON.stringify(pippo));
            break;
        case "/benvenuto":
            let html = fs.readFileSync(path.join("./templates", "welcome.html"), "utf8");
            res.writeHead(200, { "Content-Type": "text/html" });
            html = html.replace("{{nome}}", nome ?? "a tutti");
            html = html.replace("{{colore}}", colore ?? "DFFA8D");
            res.end(html);
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(`
                <html>
                    <head>
                        <title>Mio Server</title>
                    </head>
                    <body>
                        <h1>Pagina non trovata</h1>
                        <a href="/">Torna alla home</a>
                    </body>
                </html>`);
            break;
    }
};

const server = createServer(requestListener);
server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}`));