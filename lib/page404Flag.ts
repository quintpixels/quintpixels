type Listener = () => void;

let _active = false;
const _subs = new Set<Listener>();

export function setPage404(v: boolean): void {
  _active = v;
  _subs.forEach((fn) => fn());
}

export function subscribePage404(fn: Listener): () => void {
  _subs.add(fn);
  return () => _subs.delete(fn);
}

export function getPage404(): boolean {
  return _active;
}
