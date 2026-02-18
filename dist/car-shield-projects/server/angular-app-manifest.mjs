
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-B52CYZ25.js",
      "chunk-4GASFIS4.js",
      "chunk-RBNHI7TP.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-FP35BIW7.js",
      "chunk-4GASFIS4.js",
      "chunk-RBNHI7TP.js"
    ],
    "route": "/projects"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-DT3TXEGZ.js",
      "chunk-4GASFIS4.js",
      "chunk-RBNHI7TP.js"
    ],
    "route": "/projectDetail/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZYQ7TBJB.js",
      "chunk-RBNHI7TP.js"
    ],
    "route": "/task/*/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Y3IXGWSO.js",
      "chunk-RBNHI7TP.js",
      "chunk-FLNHMJ6J.js"
    ],
    "route": "/addTask/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ITB5WGOC.js",
      "chunk-4GASFIS4.js",
      "chunk-RBNHI7TP.js",
      "chunk-FLNHMJ6J.js"
    ],
    "route": "/addProject"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ITB5WGOC.js",
      "chunk-4GASFIS4.js",
      "chunk-RBNHI7TP.js",
      "chunk-FLNHMJ6J.js"
    ],
    "route": "/project-form/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-Y3IXGWSO.js",
      "chunk-RBNHI7TP.js",
      "chunk-FLNHMJ6J.js"
    ],
    "route": "/editTask/*/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-27ZJR2AR.js",
      "chunk-FLNHMJ6J.js"
    ],
    "route": "/login"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1175, hash: 'c8440ab474c27ad0694c1ce595155b88f62bddb4ca522a8d31911b70015087b9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1492, hash: '19fe96fbb3b89d572abecb997d05e2eaf390cfbc4ef2a907e4c6e7bfffd42d00', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-6RWSCF4G.css': {size: 180, hash: 'q8PJGL+W8Gs', text: () => import('./assets-chunks/styles-6RWSCF4G_css.mjs').then(m => m.default)}
  },
};
