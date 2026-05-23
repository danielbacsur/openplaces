import {
  FIELD_OF_VIEW,
  PAGE_SIZE,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "./config";
import { type Node } from "./protobuf/schema";
import { serialize } from "./protobuf/serialize";

export interface Options {
  query: string;
  viewport?: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  offset?: number;
}

export function pb({ query, viewport, offset }: Options): string {
  const nodes: Node[] = [{ tag: 1, type: "s", value: query }];

  if (viewport) {
    nodes.push({
      tag: 4,
      type: "m",
      children: [
        {
          tag: 1,
          type: "m",
          children: [
            { tag: 1, type: "d", value: viewport.altitude },
            { tag: 2, type: "d", value: viewport.longitude },
            { tag: 3, type: "d", value: viewport.latitude },
          ],
        },
        {
          tag: 3,
          type: "m",
          children: [
            { tag: 1, type: "i", value: VIEWPORT_WIDTH },
            { tag: 2, type: "i", value: VIEWPORT_HEIGHT },
          ],
        },
        { tag: 4, type: "f", value: FIELD_OF_VIEW },
      ],
    });
  }

  nodes.push({ tag: 7, type: "i", value: PAGE_SIZE });

  if (offset) nodes.push({ tag: 8, type: "i", value: offset });

  nodes.push(
    { tag: 10, type: "b", value: 1 },
    {
      tag: 12,
      type: "m",
      children: [
        {
          tag: 1,
          type: "m",
          children: [
            { tag: 18, type: "b", value: 1 },
            { tag: 30, type: "b", value: 1 },
            { tag: 31, type: "m", children: [{ tag: 1, type: "b", value: 1 }] },
            { tag: 34, type: "e", value: 1 },
          ],
        },
        {
          tag: 2,
          type: "m",
          children: [
            { tag: 5, type: "m", children: [{ tag: 6, type: "e", value: 2 }] },
            { tag: 20, type: "e", value: 3 },
            { tag: 39, type: "b", value: 1 },
          ],
        },
        {
          tag: 6,
          type: "m",
          children: [
            { tag: 32, type: "i", value: 1 },
            { tag: 49, type: "b", value: 1 },
            { tag: 63, type: "m", children: [] },
            { tag: 66, type: "b", value: 1 },
            { tag: 85, type: "b", value: 1 },
            { tag: 114, type: "b", value: 1 },
            { tag: 149, type: "b", value: 1 },
            { tag: 206, type: "b", value: 1 },
            { tag: 209, type: "b", value: 1 },
            { tag: 212, type: "b", value: 1 },
            { tag: 216, type: "b", value: 1 },
            { tag: 222, type: "b", value: 1 },
            { tag: 223, type: "b", value: 1 },
            { tag: 232, type: "b", value: 1 },
            { tag: 234, type: "b", value: 1 },
            { tag: 235, type: "b", value: 1 },
            { tag: 244, type: "b", value: 1 },
            { tag: 246, type: "b", value: 1 },
            { tag: 250, type: "b", value: 1 },
            { tag: 253, type: "b", value: 1 },
            { tag: 260, type: "b", value: 1 },
            { tag: 266, type: "b", value: 1 },
            { tag: 270, type: "b", value: 1 },
            { tag: 273, type: "b", value: 1 },
            { tag: 279, type: "b", value: 1 },
            { tag: 291, type: "m", children: [] },
          ],
        },
        { tag: 10, type: "b", value: 1 },
        { tag: 12, type: "b", value: 1 },
        { tag: 13, type: "b", value: 1 },
        { tag: 14, type: "b", value: 1 },
        { tag: 16, type: "b", value: 1 },
        { tag: 17, type: "m", children: [{ tag: 3, type: "e", value: 1 }] },
        {
          tag: 20,
          type: "m",
          children: [
            { tag: 5, type: "e", value: 2 },
            { tag: 6, type: "b", value: 1 },
            { tag: 14, type: "b", value: 1 },
          ],
        },
        { tag: 46, type: "m", children: [{ tag: 1, type: "b", value: 0 }] },
        { tag: 96, type: "b", value: 1 },
        { tag: 99, type: "b", value: 1 },
      ],
    },
    {
      tag: 19,
      type: "m",
      children: [
        {
          tag: 2,
          type: "m",
          children: [
            { tag: 1, type: "i", value: 360 },
            { tag: 2, type: "i", value: 120 },
            { tag: 4, type: "i", value: 8 },
          ],
        },
      ],
    },
    {
      tag: 20,
      type: "m",
      children: [
        {
          tag: 2,
          type: "m",
          children: [
            { tag: 1, type: "i", value: 203 },
            { tag: 2, type: "i", value: 100 },
          ],
        },
        {
          tag: 3,
          type: "m",
          children: [
            { tag: 2, type: "i", value: 4 },
            { tag: 5, type: "b", value: 1 },
          ],
        },
        {
          tag: 6,
          type: "m",
          children: [
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "i", value: 86 },
                { tag: 2, type: "i", value: 86 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "i", value: 408 },
                { tag: 2, type: "i", value: 240 },
              ],
            },
          ],
        },
        {
          tag: 7,
          type: "m",
          children: [
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 1 },
                { tag: 2, type: "b", value: 0 },
                { tag: 3, type: "e", value: 3 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 2 },
                { tag: 2, type: "b", value: 1 },
                { tag: 3, type: "e", value: 2 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 2 },
                { tag: 2, type: "b", value: 0 },
                { tag: 3, type: "e", value: 3 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 8 },
                { tag: 2, type: "b", value: 0 },
                { tag: 3, type: "e", value: 3 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 10 },
                { tag: 2, type: "b", value: 0 },
                { tag: 3, type: "e", value: 3 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 10 },
                { tag: 2, type: "b", value: 1 },
                { tag: 3, type: "e", value: 2 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 10 },
                { tag: 2, type: "b", value: 0 },
                { tag: 3, type: "e", value: 4 },
              ],
            },
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 1, type: "e", value: 9 },
                { tag: 2, type: "b", value: 1 },
                { tag: 3, type: "e", value: 2 },
              ],
            },
            { tag: 2, type: "b", value: 1 },
          ],
        },
        { tag: 9, type: "b", value: 0 },
        {
          tag: 15,
          type: "m",
          children: [
            {
              tag: 1,
              type: "m",
              children: [
                {
                  tag: 1,
                  type: "m",
                  children: [
                    {
                      tag: 1,
                      type: "m",
                      children: [{ tag: 1, type: "e", value: 2 }],
                    },
                  ],
                },
                {
                  tag: 2,
                  type: "m",
                  children: [
                    { tag: 1, type: "i", value: 195 },
                    { tag: 2, type: "i", value: 195 },
                  ],
                },
                { tag: 3, type: "i", value: 20 },
              ],
            },
          ],
        },
      ],
    },
    {
      tag: 24,
      type: "m",
      children: [
        {
          tag: 1,
          type: "m",
          children: [
            {
              tag: 13,
              type: "m",
              children: [
                { tag: 2, type: "b", value: 1 },
                { tag: 3, type: "b", value: 1 },
                { tag: 4, type: "b", value: 1 },
                { tag: 6, type: "i", value: 1 },
                { tag: 8, type: "b", value: 1 },
                { tag: 9, type: "b", value: 1 },
                { tag: 14, type: "b", value: 1 },
                { tag: 20, type: "b", value: 1 },
                { tag: 25, type: "b", value: 1 },
              ],
            },
            {
              tag: 18,
              type: "m",
              children: [
                { tag: 3, type: "b", value: 1 },
                { tag: 4, type: "b", value: 1 },
                { tag: 5, type: "b", value: 1 },
                { tag: 6, type: "b", value: 1 },
                { tag: 13, type: "b", value: 1 },
                { tag: 14, type: "b", value: 1 },
                { tag: 17, type: "b", value: 1 },
                { tag: 21, type: "b", value: 1 },
                { tag: 22, type: "b", value: 1 },
                { tag: 32, type: "b", value: 1 },
                {
                  tag: 33,
                  type: "m",
                  children: [{ tag: 1, type: "b", value: 1 }],
                },
                { tag: 34, type: "b", value: 1 },
                { tag: 36, type: "e", value: 2 },
              ],
            },
          ],
        },
        { tag: 10, type: "m", children: [{ tag: 8, type: "e", value: 3 }] },
        { tag: 11, type: "m", children: [{ tag: 3, type: "e", value: 1 }] },
        { tag: 17, type: "b", value: 1 },
        {
          tag: 20,
          type: "m",
          children: [
            { tag: 1, type: "e", value: 3 },
            { tag: 1, type: "e", value: 6 },
          ],
        },
        { tag: 24, type: "b", value: 1 },
        { tag: 25, type: "b", value: 1 },
        { tag: 26, type: "b", value: 1 },
        { tag: 27, type: "b", value: 1 },
        { tag: 29, type: "b", value: 1 },
        { tag: 30, type: "m", children: [{ tag: 2, type: "b", value: 1 }] },
        { tag: 36, type: "b", value: 1 },
        { tag: 37, type: "b", value: 1 },
        {
          tag: 39,
          type: "m",
          children: [
            {
              tag: 2,
              type: "m",
              children: [
                { tag: 2, type: "i", value: 1 },
                { tag: 3, type: "i", value: 1 },
              ],
            },
          ],
        },
        { tag: 43, type: "b", value: 1 },
        { tag: 52, type: "b", value: 1 },
        { tag: 54, type: "m", children: [{ tag: 1, type: "b", value: 1 }] },
        { tag: 55, type: "b", value: 1 },
        { tag: 56, type: "m", children: [{ tag: 1, type: "b", value: 1 }] },
        {
          tag: 61,
          type: "m",
          children: [
            { tag: 1, type: "m", children: [{ tag: 1, type: "e", value: 1 }] },
          ],
        },
        {
          tag: 65,
          type: "m",
          children: [
            {
              tag: 3,
              type: "m",
              children: [
                {
                  tag: 1,
                  type: "m",
                  children: [
                    {
                      tag: 1,
                      type: "m",
                      children: [
                        { tag: 1, type: "i", value: 224 },
                        { tag: 2, type: "i", value: 298 },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          tag: 72,
          type: "m",
          children: [
            {
              tag: 1,
              type: "m",
              children: [
                { tag: 2, type: "b", value: 1 },
                { tag: 5, type: "b", value: 1 },
                { tag: 7, type: "b", value: 1 },
                {
                  tag: 12,
                  type: "m",
                  children: [
                    { tag: 1, type: "b", value: 1 },
                    { tag: 2, type: "b", value: 1 },
                    {
                      tag: 4,
                      type: "m",
                      children: [{ tag: 1, type: "e", value: 1 }],
                    },
                  ],
                },
              ],
            },
            { tag: 4, type: "b", value: 1 },
            {
              tag: 8,
              type: "m",
              children: [
                {
                  tag: 1,
                  type: "m",
                  children: [
                    {
                      tag: 4,
                      type: "m",
                      children: [{ tag: 1, type: "e", value: 1 }],
                    },
                    {
                      tag: 4,
                      type: "m",
                      children: [{ tag: 1, type: "e", value: 3 }],
                    },
                    {
                      tag: 4,
                      type: "m",
                      children: [{ tag: 1, type: "e", value: 4 }],
                    },
                  ],
                },
                {
                  tag: 3,
                  type: "s",
                  value:
                    "other_user_google_review_posts__and__hotel_and_vr_partner_review_posts",
                },
                {
                  tag: 6,
                  type: "m",
                  children: [{ tag: 1, type: "e", value: 1 }],
                },
              ],
            },
            { tag: 9, type: "b", value: 1 },
          ],
        },
        { tag: 89, type: "b", value: 1 },
        {
          tag: 90,
          type: "m",
          children: [
            { tag: 1, type: "m", children: [{ tag: 1, type: "e", value: 2 }] },
          ],
        },
        {
          tag: 98,
          type: "m",
          children: [
            { tag: 1, type: "b", value: 1 },
            { tag: 2, type: "b", value: 1 },
            { tag: 3, type: "b", value: 1 },
          ],
        },
        { tag: 103, type: "b", value: 1 },
        { tag: 113, type: "b", value: 1 },
        {
          tag: 114,
          type: "m",
          children: [
            { tag: 1, type: "b", value: 1 },
            { tag: 2, type: "m", children: [{ tag: 1, type: "b", value: 1 }] },
          ],
        },
        { tag: 117, type: "b", value: 1 },
        { tag: 122, type: "m", children: [{ tag: 1, type: "b", value: 1 }] },
        { tag: 126, type: "b", value: 1 },
        { tag: 127, type: "b", value: 1 },
        { tag: 128, type: "m", children: [{ tag: 1, type: "b", value: 0 }] },
      ],
    },
    {
      tag: 26,
      type: "m",
      children: [
        {
          tag: 2,
          type: "m",
          children: [
            { tag: 1, type: "i", value: 80 },
            { tag: 2, type: "i", value: 92 },
            { tag: 4, type: "i", value: 8 },
          ],
        },
      ],
    },
    { tag: 37, type: "m", children: [{ tag: 1, type: "e", value: 81 }] },
    { tag: 42, type: "b", value: 1 },
    {
      tag: 49,
      type: "m",
      children: [
        { tag: 3, type: "b", value: 1 },
        {
          tag: 6,
          type: "m",
          children: [
            { tag: 1, type: "b", value: 1 },
            { tag: 2, type: "b", value: 1 },
          ],
        },
        {
          tag: 7,
          type: "m",
          children: [
            { tag: 1, type: "e", value: 3 },
            { tag: 2, type: "b", value: 1 },
          ],
        },
        { tag: 8, type: "b", value: 1 },
        { tag: 9, type: "b", value: 1 },
        { tag: 10, type: "e", value: 2 },
      ],
    },
    {
      tag: 50,
      type: "m",
      children: [
        { tag: 2, type: "e", value: 2 },
        { tag: 3, type: "m", children: [{ tag: 3, type: "b", value: 1 }] },
      ],
    },
    { tag: 61, type: "b", value: 1 },
    {
      tag: 67,
      type: "m",
      children: [
        { tag: 7, type: "b", value: 1 },
        { tag: 10, type: "b", value: 1 },
        { tag: 14, type: "b", value: 1 },
        { tag: 15, type: "m", children: [{ tag: 1, type: "b", value: 0 }] },
      ],
    },
    { tag: 69, type: "i", value: 785 },
    { tag: 77, type: "b", value: 1 },
  );

  return serialize(nodes);
}
