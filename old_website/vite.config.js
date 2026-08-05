import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-goatcounter',
      transformIndexHtml(html) {
        const goatCounterId = 'bsumser';  // Get the GoatCounter ID from environment variables
        
        // Inject the GoatCounter script before the closing </body> tag
        return html.replace(
          '</body>',
          `<script data-goatcounter="https://${goatCounterId}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
          </body>`
        );
      }
    }
  ]
})
