

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.bd40bd4e.js","_app/immutable/chunks/scheduler.cc9b4bb6.js","_app/immutable/chunks/index.9a84f8a4.js","_app/immutable/chunks/singletons.4a62cbf5.js"];
export const stylesheets = [];
export const fonts = [];
