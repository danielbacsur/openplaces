import { defineConfig } from 'bumpp'

export default defineConfig({
  commit: 'chore: publish openplaces v%s to npm registry',
  install: true,
  push: true,
  tag: 'v%s',

  files: [
    'openplaces/package.json',
    'openplaces-mcp/package.json',
  ],
})
