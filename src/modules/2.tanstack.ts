import TanStackRouterVite from "@tanstack/router-plugin/vite";
import { addViteConfig, defineWxtModule } from "wxt/modules";

const ENTRYPOINT_POPUP = "src/entrypoints/popup";

export default defineWxtModule({
  setup(wxt, options) {
    addViteConfig(wxt, () => ({
      plugins: [
        // Popup entrypoint
        TanStackRouterVite({
          target: "react",
          autoCodeSplitting: true,
          routesDirectory: `${ENTRYPOINT_POPUP}/routes`,
          generatedRouteTree: `${ENTRYPOINT_POPUP}/routeTree.gen.ts`,
        }) as any,
      ],
    }));
  },
});
