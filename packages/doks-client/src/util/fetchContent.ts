import * as brotli from "./brotli";

export async function fetchContent(id: number): Promise<string> {
  const url = `http://${window.location.hostname}:8001/content/${id}`;
  const response = await fetch(url);
  const rawBuffer = await response.arrayBuffer();
  const intArray = new Int8Array(rawBuffer);
  const decoded = brotli.brotliDecode(intArray);
  return new TextDecoder().decode(decoded);
}
