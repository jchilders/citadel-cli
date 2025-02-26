// import { playwrightLauncher } from '@web/test-runner-playwright';

// Needed for wtr to work with TypeScript
import { esbuildPlugin } from "@web/dev-server-esbuild";

const filteredLogs = ['Running in dev mode', 'Lit is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  files: 'dist/**/*.test.{js,ts}',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  rules: {
    "import/no-extraneous-dependencies": "off"
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  plugins: [esbuildPlugin({ ts: true })], // Enable TypeScript support

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  // concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  // concurrency: 1,

  /** Browsers to run tests on */
  // browsers: [
  //   playwrightLauncher({ product: 'chromium' }),
  //   playwrightLauncher({ product: 'firefox' }),
  //   playwrightLauncher({ product: 'webkit' }),
  // ],

  // See documentation for all available options
});
