import { type ServerResponse } from "node:http";
import { createServer } from "node:https";

import { type OpenPlaces, type Place } from "openplaces";

import { mkcert } from "./mkcert";
import { open } from "./open";

type Event = { type: "query"; query: string } | { type: "place"; place: Place };

export const atlas: OpenPlaces.Plugin = (client) => {
  const clients = new Set<ServerResponse>();

  let buffer: Event[] = [];

  const server = createServer(mkcert(), (request, response) => {
    response.writeHead(200, {
      "Access-Control-Allow-Origin": request.headers.origin ?? "*",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-store",
    });

    response.socket?.unref();
    clients.add(response);

    for (const event of buffer) {
      response.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    request.on("close", () => clients.delete(response));
  });

  server.on("error", (error: NodeJS.ErrnoException) =>
    console.error(
      `[atlas] bridge error: ${
        error.code === "EADDRINUSE"
          ? `port ${28527} is already in use — is another inspector running?`
          : error.message
      }`,
    ),
  );

  server.listen(28527, "127.0.0.1");
  server.unref();

  const push = (event: Event) => {
    if (event.type === "query") buffer = [];

    buffer.push(event);

    for (const response of clients) {
      response.write(`data: ${JSON.stringify(event)}\n\n`);
    }
  };

  client.on("query", (query) => push({ type: "query", query }));
  client.on("place", (place) => push({ type: "place", place }));

  open(
    process.env.OPENPLACES_ATLAS_URL ??
      "https://atlas.openplaces.danielbacsur.dev",
  );
};

declare module "openplaces" {
  namespace OpenPlaces {
    interface Options {
      atlas?: OpenPlaces.Plugin;
    }
  }
}
