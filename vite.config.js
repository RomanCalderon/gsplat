import { defineConfig } from 'vite';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
});
