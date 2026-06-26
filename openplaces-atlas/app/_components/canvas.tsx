"use client";

import { useEffect, useRef } from "react";

const TILE_SIZE = 256;
const MAX_ZOOM = 22;
const MAX_LAT = 85.05112878;

const WHEEL_ZOOM_SPEED = 0.0025;
const PINCH_ZOOM_SPEED = 0.02;

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

    let dragId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const tiles = new Map<string, Tile>();

    const minZoom = () => Math.log2(Math.max(height, TILE_SIZE) / TILE_SIZE);

    function clampCenterY(y: number, size = TILE_SIZE * 2 ** zoom) {
      const half = Math.min(0.5, height / 2 / size);
      return clamp(y, half, 1 - half);
    }

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

      let allLoaded = true;
      const needed = new Set<string>();
      for (let y = top; y <= bottom; y += 1) {
        for (let x = left; x <= right; x += 1) {
          needed.add(`${z}/${x}/${y}`);
          if (!getTile(z, x, y).loaded) allLoaded = false;
        }
      }

      const margin = TILE_SIZE;
      for (const [key, tile] of tiles) {
        if (needed.has(key)) continue;

        const size = TILE_SIZE * 2 ** (anchorZ - tile.z);
        const screenX = width / 2 + scale * (tile.x * size - centerPxX);
        const screenY = height / 2 + scale * (tile.y * size - centerPxY);

        // prettier-ignore
        const offscreen =
          screenX > width + margin || screenX + scale * size < -margin ||
          screenY > height + margin || screenY + scale * size < -margin;

        if (offscreen || allLoaded) {
          tile.image.remove();
          tiles.delete(key);
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
      const scale = window.devicePixelRatio > 1 ? "&scale=2" : "";
      const endpoint = `https://mt${(column + y) % 4}.google.com/vt/lyrs=m`;

      tile.image.src = `${endpoint}&z=${z}&x=${column}&y=${y}${scale}`;
      tiles.set(`${z}/${x}/${y}`, tile);
      pane.appendChild(tile.image);

      return tile;
    }

    function zoomAround(nextZoom: number, pivotX: number, pivotY: number) {
      const clamped = clamp(nextZoom, minZoom(), MAX_ZOOM);
      if (Math.abs(clamped - zoom) < 0.00001) return;

      const before = TILE_SIZE * 2 ** zoom;
      const nx = wrap01(centerX + (pivotX - width / 2) / before);
      const ny = centerY + (pivotY - height / 2) / before;

      zoom = clamped;

      const after = TILE_SIZE * 2 ** zoom;
      centerX = wrap01(nx - (pivotX - width / 2) / after);
      centerY = clampCenterY(ny - (pivotY - height / 2) / after, after);

      if (!raf) raf = window.requestAnimationFrame(frame);
    }

    function onPointerDown(event: PointerEvent) {
      if (dragId !== null || event.button !== 0) return;

      event.preventDefault();

      container!.setPointerCapture(event.pointerId);

      container!.style.cursor = "grabbing";

      dragId = event.pointerId;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId !== dragId) return;

      const size = TILE_SIZE * 2 ** zoom;

      centerX = wrap01(centerX - (event.clientX - lastX) / size);
      centerY = clampCenterY(centerY - (event.clientY - lastY) / size, size);
      lastX = event.clientX;
      lastY = event.clientY;

      if (!raf) raf = window.requestAnimationFrame(frame);
    }

    function onPointerUp(event: PointerEvent) {
      if (event.pointerId !== dragId) return;

      if (container!.hasPointerCapture(event.pointerId)) {
        container!.releasePointerCapture(event.pointerId);
      }

      container!.style.cursor = "";

      dragId = null;
    }

    function onPointerCancel(event: PointerEvent) {
      if (event.pointerId !== dragId) return;

      if (container!.hasPointerCapture(event.pointerId)) {
        container!.releasePointerCapture(event.pointerId);
      }

      container!.style.cursor = "";

      dragId = null;
    }

    function onWheel(event: WheelEvent) {
      event.preventDefault();

      const speed = event.ctrlKey ? PINCH_ZOOM_SPEED : WHEEL_ZOOM_SPEED;
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      const rect = container!.getBoundingClientRect();

      zoomAround(
        zoom - delta * speed,
        event.clientX - rect.left,
        event.clientY - rect.top,
      );
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
      zoom = clamp(zoom, minZoom(), MAX_ZOOM);
      centerY = clampCenterY(centerY);
      if (!raf) raf = window.requestAnimationFrame(frame);
    });

    resizeObserver.observe(container);

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerCancel);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);

      resizeObserver.disconnect();

      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      container.removeEventListener("wheel", onWheel);

      pane.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab touch-none overflow-hidden bg-[#e8eaed]"
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
