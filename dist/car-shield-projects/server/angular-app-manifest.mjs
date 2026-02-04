
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "preload": [
      "chunk-JLUI5I6Y.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-TSHHCODJ.js"
    ],
    "route": "/projects"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1174, hash: '520cb9b81920e9c3483ec231799a62f44ef251d8bd2265723a41e24a873d5ff5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1491, hash: '21c006ae695560e3b7cd272e21007c32c3e70c6f22252d3007ad3049959dd37e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-6RWSCF4G.css': {size: 180, hash: 'q8PJGL+W8Gs', text: () => import('./assets-chunks/styles-6RWSCF4G_css.mjs').then(m => m.default)}
  },
};
