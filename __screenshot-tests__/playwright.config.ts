import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    port: 3000,
    command: 'yarn start',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
  fullyParallel: true,
  workers: undefined,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  timeout: 180 * 1000,
  reporter: [['html', { open: 'never' }]],
};

export default config;
