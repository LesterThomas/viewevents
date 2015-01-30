var config = {
  development: {
    server: {
      port: 80
    }
  },
  testing: {
    server: {
      port: 81
    }
  },
  production: {
    server: {
      port: 82
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
