"use client";

import { useEffect, useRef } from "react";

const TILE_SIZE = 256;
const MAX_LAT = 85.05112878;

const DEFAULT_LAT = 47.4979;
const DEFAULT_LON = 19.0402;

type Tile = {
  image: HTMLImageElement;
  z: number;
  x: number;
  y: number;
  loaded: boolean;
};

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;

    let width = 0;
    let height = 0;
    let zoom = 12;

    let centerX = lonToX(DEFAULT_LON);
    let centerY = latToY(DEFAULT_LAT);

    let anchorZ = -1;
    let anchorX = 0;
    let anchorY = 0;

    const tiles = new Map<string, Tile>();

    function frame() {
      raf = 0;

      if (width === 0 || height === 0) return;

      const z = Math.round(zoom);
      const worldPx = TILE_SIZE * 2 ** z;
      const centerPxX = centerX * worldPx;
      const centerPxY = centerY * worldPx;

      if (z !== anchorZ) {
        anchorZ = z;
        anchorX = centerPxX;
        anchorY = centerPxY;
        for (const tile of tiles.values()) {
          const size = TILE_SIZE * 2 ** (anchorZ - tile.z);

          tile.image.style.width = `${size}px`;
          tile.image.style.height = `${size}px`;
          tile.image.style.left = `${tile.x * size - anchorX}px`;
          tile.image.style.top = `${tile.y * size - anchorY}px`;
          tile.image.style.zIndex = String(tile.z);
        }
      }

      const scale = 2 ** (zoom - z);
      const translateX = width / 2 + scale * (anchorX - centerPxX);
      const translateY = height / 2 + scale * (anchorY - centerPxY);

      pane.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;

      const centerCol = centerPxX / TILE_SIZE;
      const centerRow = centerPxY / TILE_SIZE;
      const halfCols = width / (2 * scale * TILE_SIZE);
      const halfRows = height / (2 * scale * TILE_SIZE);
      const left = Math.floor(centerCol - halfCols) - 1;
      const right = Math.floor(centerCol + halfCols) + 1;
      const top = Math.max(0, Math.floor(centerRow - halfRows) - 1);
      const bottom = Math.min(2 ** z - 1, Math.floor(centerRow + halfRows) + 1);

      for (let y = top; y <= bottom; y += 1) {
        for (let x = left; x <= right; x += 1) {
          getTile(z, x, y);
        }
      }
    }

    function getTile(z: number, x: number, y: number) {
      const cached = tiles.get(`${z}/${x}/${y}`);
      if (cached) return cached;

      const tile: Tile = { image: new Image(), z, x, y, loaded: false };

      tile.image.alt = "";
      tile.image.draggable = false;
      tile.image.decoding = "async";
      tile.image.style.position = "absolute";
      tile.image.style.maxWidth = "none";

      const size = TILE_SIZE * 2 ** (anchorZ - tile.z);

      tile.image.style.width = `${size}px`;
      tile.image.style.height = `${size}px`;
      tile.image.style.left = `${tile.x * size - anchorX}px`;
      tile.image.style.top = `${tile.y * size - anchorY}px`;
      tile.image.style.zIndex = String(tile.z);

      tile.image.onload = () => {
        tile.loaded = true;
        if (!raf) raf = window.requestAnimationFrame(frame);
      };

      const column = ((x % 2 ** z) + 2 ** z) % 2 ** z;
      const endpoint = `https://mt${(column + y) % 4}.google.com/vt/lyrs=m`;

      tile.image.src = `${endpoint}&z=${z}&x=${column}&y=${y}`;
      tiles.set(`${z}/${x}/${y}`, tile);
      pane.appendChild(tile.image);

      return tile;
    }

    const pane = document.createElement("div");

    pane.style.position = "absolute";
    pane.style.top = "0";
    pane.style.left = "0";
    pane.style.transformOrigin = "0 0";
    pane.style.willChange = "transform";
    pane.style.pointerEvents = "none";

    container.appendChild(pane);

    const resizeObserver = new ResizeObserver(() => {
      const rect = container.getBoundingClientRect();
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (!raf) raf = window.requestAnimationFrame(frame);
    });

    resizeObserver.observe(container);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);

      resizeObserver.disconnect();

      pane.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#e8eaed]"
    />
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function wrap01(value: number) {
  const wrapped = value % 1;
  return wrapped < 0 ? wrapped + 1 : wrapped;
}

function lonToX(lon: number) {
  return wrap01((lon + 180) / 360);
}

function latToY(lat: number) {
  const safeLat = clamp(lat, -MAX_LAT, MAX_LAT);
  const sin = Math.sin((safeLat * Math.PI) / 180);
  return 0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI);
}
