import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-goatcounter',
      transformIndexHtml(html) {
        // Add the GoatCounter script tag before the closing </body> tag
        return html.replace(
          '</body>',
          `
            <script data-goatcounter="https://bsumser.goatcounter.com/count"
              async src="//gc.zgo.at/count.js"></script>
            </script>
          </body>`
        );
      }
    }
  ],
})
