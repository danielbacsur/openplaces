"use client";

import { useEffect, useState } from "react";

import { type Place } from "openplaces";

type Event = { type: "query"; query: string } | { type: "place"; place: Place };
type State = { query: string | null; places: Place[] };

export function useAtlas(): State {
  const [state, setState] = useState<State>({ query: null, places: [] });

  useEffect(() => {
    const source = new EventSource("https://localhost:28527");
    const ids = new Map<string, Place>();

    source.onmessage = (message) => {
      const event: Event = JSON.parse(message.data);

      if (event.type === "query") {
        ids.clear();
        setState({ query: event.query, places: [] });
      } else {
        ids.set(event.place.id, event.place);
        setState((s) => ({ ...s, places: [...ids.values()] }));
      }
    };

    return () => source.close();
  }, []);

  return state;
}
