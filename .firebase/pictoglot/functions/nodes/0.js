

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.377ef872.js","_app/immutable/chunks/scheduler.cc9b4bb6.js","_app/immutable/chunks/index.9a84f8a4.js"];
export const stylesheets = [];
export const fonts = [];
