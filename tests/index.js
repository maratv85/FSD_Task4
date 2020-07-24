const tests = require.context('./../src', true, /\.spec.ts$/);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(tests);

// const components = require.context('../plugin', true, /index\.ts$/);

// components.keys().forEach(components);