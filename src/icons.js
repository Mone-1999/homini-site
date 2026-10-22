// A small consistent set of line icons; decoration stays out of accessible names.
const paths = {
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  previous: '<path d="M19 12H5m5-5-5 5 5 5"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  leaf: '<path d="M20 3C4 1 1 16 7 20s17-3 13-17Z"/><path d="m5 21 11-12"/>',
  joint: '<path d="M3 8h7V2h5v6h7v6h-7v8h-5v-8H3Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  home: '<path d="m3 10 9-7 9 7v11H3Z"/><path d="M9 21v-8h6v8"/>',
};

export function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}

export const arrow = icon("arrow");
export const diagonal = icon("diagonal");
