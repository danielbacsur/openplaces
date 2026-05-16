<h1 align="center">openplaces</h1>

<p align="center">
  Look up places, businesses, addresses, and location metadata without a proprietary places API.
</p>

<img src="https://raw.githubusercontent.com/danielbacsur/openplaces/main/readme.webp" alt="openplaces" />

<br/>

<h2>Installation</h2>

```bash
npm install openplaces
```

<div align="justify">
  <p>
    <b>OpenPlaces works with or without a Google Maps API key.</b> With a key, it calls the official Google Places API on your behalf &mdash; fully compliant with <a href="https://cloud.google.com/maps-platform/terms">Google Maps Platform Terms</a> and billed to your Google Cloud project.
  </p>

  <p>
    Without one, it falls back to scraping. <b>No key, no bill, no setup</b> &mdash; but you are responsible for ensuring your usage complies with the terms of the upstream services and your local laws. This mode is intended for prototyping, research, and personal projects; if you are shipping to production or operating at scale, use a key.
  </p>
</div>

<br/>

<h2>Querying</h2>

<div align="justify">
  <p>
    Search queries can express more than a single lookup. Use <code>AND</code> or <code>OR</code> to search for multiple things at once, and <code>IN</code> to pin a query to a location. When combined, they expand into every combination automatically &mdash; searching for <code>coffee and tea in paris or london</code> runs four queries, not one. Wrap multi-word phrases in quotes to treat them as a single term, and use parentheses when you need finer control over which queries belong to which location.
  </p>

  <p align="center">
    <code>COFFEE OR TEA IN PARIS AND "BED AND BREAKFAST" IN AMSTERDAM</code>
  </p>

  <p>
    The parser is a recursive descent implementation that tokenizes the input, respects operator precedence, expands everything into a flat list of <code>{ query, location }</code> pairs, and hands those off to the search backends. Each pair is executed independently and the results are merged into a single unified stream.
  </p>
</div>

<br/>

<h2>Usage</h2>

```typescript
import { OpenPlaces } from "openplaces";

const client = new OpenPlaces();
```

<p>
  All examples below assume you've already imported and instantiated client &mdash; do that once and keep it in scope. If you want to route requests through the official Google Places API, pass an <code>apiKey</code> to the constructor. Otherwise, you can skip configuration entirely and use the scraping backend with no setup needed.
</p>

<br/>

<h3><code>places.search</code></h3>

```typescript
await client.places.search("eiffel tower");

await client.places.search("restaurants in tokyo", { limit: 10 });

await client.places.search("coffee and tea in paris or london", { limit: 40 });
```

<div align="justify">
  <p>
    A convenience wrapper around <code>places.stream</code> that drives the async iterator to completion, aggregates every emitted place, and resolves with a flat array. Use <code>places.search</code> when you need the complete result set before doing anything with it and the volume is manageable.
  </p>
</div>

<br/>

<h3><code>places.stream</code></h3>

```typescript
const stream = client.places.stream("restaurants in tokyo", { limit: 200 });

for await (const place of stream) {
  console.log(place.name);
}
```

<div align="justify">
  <p>
    Under the hood, <code>places.stream</code> is the engine the library is built on. It returns an async iterator that yields places one at a time as they are discovered, so your loop can start processing results long before collection is complete. You can break out of the loop early and no further network work is done.
  </p>

  <p>
    When you use the query language to constrain a search to a specific area, the stream can gather an effectively unbounded number of results by recursively subdividing the search space. The target area is treated as a root cell. When a cell's results suggest more places exist than a single query can surface, the algorithm divides that cell into four equal sub-cells and searches each one independently &mdash; repeating until every branch has been fully exhausted. This lets the stream fan out across dense areas automatically, without any manual tiling or pagination on your part.
  </p>
</div>
