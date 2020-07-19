const tests = require.context('./', true, /\.spec.ts$/);

tests.keys().forEach(tests);

const components = require.context('../plugin', true, /index\.ts$/);

components.keys().forEach(components);