"use client";

import { useEffect, useRef, type Ref } from "react";

const VERTEX = `
  attribute vec2 a_pos;
  uniform vec2 u_translate, u_resolution, u_size;
  varying vec2 v_uv;

  void main() {
    vec2 clip = ((u_translate + a_pos * u_size) / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    gl_PointSize = u_size.x;
    v_uv = a_pos;
  }
`;

const FRAGMENT = `
  precision mediump float;
  uniform sampler2D u_tex;
  uniform bool u_marker;
  varying vec2 v_uv;

  void main() {
    if (u_marker) {
      if (length(gl_PointCoord - 0.5) > 0.5) discard;
      gl_FragColor = vec4(0.918, 0.263, 0.208, 1.0);
    } else {
      gl_FragColor = texture2D(u_tex, v_uv);
    }
  }
`;

type Coordinate = { latitude: number; longitude: number };
type Drag = { clientX: number; clientY: number };
type Position = { x: number; y: number };
type Tile = { texture: WebGLTexture; ready: boolean };

export interface CanvasHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  locate: () => void;
  setMarkers: (markers: Coordinate[]) => void;
}

export function Canvas({ ref }: { ref?: Ref<CanvasHandle> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const vertex = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertex, VERTEX);
    gl.compileShader(vertex);

    const fragment = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragment, FRAGMENT);
    gl.compileShader(fragment);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);

    const a_pos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(a_pos);
    gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_translate = gl.getUniformLocation(program, "u_translate");
    const u_size = gl.getUniformLocation(program, "u_size");
    const u_marker = gl.getUniformLocation(program, "u_marker");

    let zoom = 12;
    let width = 0;
    let height = 0;
    let minZoom = 0;

    let center: Coordinate = {
      latitude: 47.4979,
      longitude: 19.0402,
    };

    let markers: Coordinate[] = [];

    const toWorldPosition = ({ latitude, longitude }: Coordinate): Position => {
      const world = 256 * 2 ** zoom;
      const sin = Math.sin((latitude * Math.PI) / 180);

      return {
        x: ((longitude + 180) / 360) * world,
        y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * world,
      };
    };

    const toGeoCoordinate = ({ x, y }: Position): Coordinate => {
      const world = 256 * 2 ** zoom;
      const n = Math.PI * (1 - (2 * y) / world);

      return {
        latitude: (Math.atan(Math.sinh(n)) * 180) / Math.PI,
        longitude: (x / world) * 360 - 180,
      };
    };

    const tiles = new Map<string, Tile>();
    const getTile = (z: number, x: number, y: number) => {
      const cached = tiles.get(`${z}/${x}/${y}`);
      if (cached) return cached;

      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

      const tile: Tile = { texture, ready: false };
      tiles.set(`${z}/${x}/${y}`, tile);

      const image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // prettier-ignore
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        tile.ready = true;
        schedule();
      };

      const params = `z=${z}&x=${x}&y=${y}${dpr > 1 ? "&scale=2" : ""}`;
      image.src = `https://mt${(x + y) % 4}.google.com/vt/lyrs=m&${params}`;

      return tile;
    };

    const frame = () => {
      const world = 256 * 2 ** zoom;
      const vector = toWorldPosition(center);

      const x = vector.x;
      const y = Math.max(height / 2, Math.min(world - height / 2, vector.y));

      center = toGeoCoordinate({ x, y });

      const z = Math.min(Math.round(zoom), 22);
      const count = 2 ** z;
      const size = world / count;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(u_resolution, width, height);
      gl.uniform2f(u_size, size, size);
      gl.uniform1i(u_marker, 0);

      const x0 = Math.floor(((x - width / 2) / world) * count);
      const x1 = Math.floor(((x + width / 2) / world) * count);
      const y0 = Math.floor(((y - height / 2) / world) * count);
      const y1 = Math.floor(((y + height / 2) / world) * count);

      for (let ty = Math.max(0, y0); ty <= Math.min(count - 1, y1); ty++) {
        for (let tx = x0; tx <= x1; tx++) {
          const tile = getTile(z, ((tx % count) + count) % count, ty);

          if (!tile.ready) continue;

          const dx = tx * size - x + width / 2;
          const dy = ty * size - y + height / 2;

          gl.bindTexture(gl.TEXTURE_2D, tile.texture);
          gl.uniform2f(u_translate, dx, dy);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }

      gl.uniform1i(u_marker, 1);
      gl.uniform2f(u_size, 8 * dpr, 0);

      for (const marker of markers) {
        const point = toWorldPosition(marker);
        const dx = point.x - x + width / 2;
        const dy = point.y - y + height / 2;

        gl.uniform2f(u_translate, dx, dy);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    };

    let raf = 0;
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(() => ((raf = 0), frame()));
    };

    let drag: Drag | null = null;
    const onPointerDown = (event: PointerEvent) => {
      canvas.setPointerCapture(event.pointerId);
      drag = { clientX: event.clientX, clientY: event.clientY };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag) return;

      const point = toWorldPosition(center);
      const x = point.x - (event.clientX - drag.clientX);
      const y = point.y - (event.clientY - drag.clientY);

      center = toGeoCoordinate({ x, y });
      drag = { clientX: event.clientX, clientY: event.clientY };

      schedule();
    };

    const onPointerUp = () => {
      drag = null;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      const vector = toWorldPosition(center);
      const px = event.offsetX - width / 2;
      const py = event.offsetY - height / 2;
      const cursor = toGeoCoordinate({ x: vector.x + px, y: vector.y + py });

      zoom = Math.max(minZoom, Math.min(22, zoom - event.deltaY * 0.002));
      const point = toWorldPosition(cursor);
      center = toGeoCoordinate({ x: point.x - px, y: point.y - py });

      schedule();
    };

    const zoomIn = () => {
      zoom = Math.min(22, zoom + 1);
      schedule();
    };

    const zoomOut = () => {
      zoom = Math.max(minZoom, zoom - 1);
      schedule();
    };

    const locate = () => {
      navigator.geolocation?.getCurrentPosition((position) => {
        center = position.coords;
        zoom = Math.max(zoom, 15);
        schedule();
      });
    };

    const setMarkers = (coordinates: Coordinate[]) => {
      markers = coordinates;
      schedule();
    };

    const resizeObserver = new ResizeObserver(() => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      minZoom = Math.log2(height / 256);
      zoom = Math.max(zoom, minZoom);
      schedule();
    });

    resizeObserver.observe(canvas);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    if (typeof ref === "function") ref({ zoomIn, zoomOut, locate, setMarkers });
    else if (ref) ref.current = { zoomIn, zoomOut, locate, setMarkers };

    return () => {
      cancelAnimationFrame(raf);

      resizeObserver.disconnect();

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("wheel", onWheel);

      if (typeof ref === "function") ref(null);
      else if (ref) ref.current = null;
    };
  }, [ref]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full cursor-grab touch-none bg-[#e8eaed] select-none active:cursor-grabbing"
    />
  );
}
