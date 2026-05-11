import { type Places } from ".";
import { type OpenPlaces } from "..";

declare module "." {
  interface Places {
    stream(
      query: string,
      options?: OpenPlaces.Places.Stream.Options,
    ): AsyncGenerator<OpenPlaces.Places.Stream.Result>;
  }
}

export async function* stream(
  this: Places,
  query: string,
  options: OpenPlaces.Places.Stream.Options = {},
): AsyncGenerator<OpenPlaces.Places.Stream.Result> {}

declare module ".." {
  namespace OpenPlaces.Places.Stream {
    interface Result {
      id: string;
    }

    interface Options {
      limit?: number;
    }
  }
}
