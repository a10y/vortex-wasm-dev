import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
  base: '',
  server: {
    fs: {
      allow: [
          searchForWorkspaceRoot(process.cwd()),
          // TODO: remove after we stop needing to npm link.
          '/Volumes/Code/vortex-wasm/'
      ]
    }
  }
})
