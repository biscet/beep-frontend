const config = {
  stories: ['../../src/**/*.mdx','../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-vite'
  },
  staticDirs: ['../../public', '../../build']
};

export default config;
