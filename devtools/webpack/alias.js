const path = require('path');

const aliasConfig = {
  clientPath: path.join(process.cwd(), 'client/src/'),
  serverPath: path.join(process.cwd(), 'server/'),
}

class AliasProvider {
  static get bootstrap() {
    return { // mare sure to sync this with tsconfig.json paths
      '@bootstrap': path.join(aliasConfig.clientPath, 'bootstrap'),
    }
  }

  static get module() {
    return { // mare sure to sync this with tsconfig.json paths
      '@module': path.join(aliasConfig.clientPath, 'module'),
    }
  }

  static get webc() {
    return { // mare sure to sync this with tsconfig.json paths
      '@webc': path.join(aliasConfig.clientPath, 'webc'),
    }
  }

  static get ui() {
    return {
      '@ui': path.join(aliasConfig.clientPath, 'ui'),
    }
  }
}

module.exports = AliasProvider;
