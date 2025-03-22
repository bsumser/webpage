import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-goatcounter',
      transformIndexHtml(html) {
        const goatCounterId = import.meta.env.VITE_GOATCOUNTER_ID;  // Get the GoatCounter ID from environment variables
        
        // Inject the GoatCounter script before the closing </body> tag
        return html.replace(
          '</body>',
          `
            <script async src="https://gc.zgo.at/count.js"></script>
            <script>
              window.goatcounter = window.goatcounter || {};
              window.goatcounter.count = window.goatcounter.count || function() {};
              window.goatcounter.id = '${goatCounterId}';  // Use environment variable for GoatCounter ID
            </script>
          </body>`
        );
      }
    }
  ]
})
