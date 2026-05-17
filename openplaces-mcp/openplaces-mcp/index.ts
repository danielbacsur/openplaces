#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OpenPlaces, Place } from "openplaces";
import { z } from "zod";

import { version, description } from "../package.json";
import { prompt } from "./prompt";

const client = new OpenPlaces();

const server = new McpServer({ name: "openplaces", version, description });

server.registerTool(
  "search",
  {
    title: "Search",

    description: prompt`
      Look up real places by name, category, or address. Use this whenever
      the user asks about a business, landmark, restaurant, or any location
      in the physical world.

      The query understands AND, OR, and IN, so you can express compound
      lookups naturally: "coffee shops and bookstores in berlin or vienna"
      fans out into four searches and merges the results. Quotes group
      multi-word terms; parentheses control precedence.

      Prefer specific queries over vague ones — "Italian restaurants in
      Lisbon" will give better results than "food in Europe".
    `,

    inputSchema: {
      query: z
        .string()
        .min(1)
        .describe(
          "The search expression. Supports AND, OR, IN, quoted phrases, and parentheses.",
        ),
      limit: z
        .int()
        .positive()
        .optional()
        .describe(
          "How many places to return across all expanded searches. Defaults to 100.",
        ),
    },

    outputSchema: { places: z.array(Place) },
  },
  async ({ query, ...options }) => {
    const places = await client.places.search(query, options);

    return {
      content: [{ type: "text", text: JSON.stringify(places, null, 2) }],
      structuredContent: { places },
    };
  },
);

await server.connect(new StdioServerTransport());
