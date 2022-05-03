const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');

module.exports = {
  /**
   * @param config {import('arco-scripts').JestConfig}
   */
  client: (config) => {
    const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');
    if (fs.existsSync(rootConfigPath)) {
      const { jest } = require(rootConfigPath);
      if (jest && jest.client) {
        config = jest.client(config) || config;
      }
    }

    config.testPathIgnorePatterns = ['/node_modules/', '/scripts/'];
    config.moduleNameMapper = {
      '^use-storage/(.+)$': '<rootDir>/$1',
      '^use-storage$': '<rootDir>',
    };
  },
};
