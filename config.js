module.exports = {

  'mongo': {
    'uri': 'mongodb://localhost:27017/edufix',
    'port': 27017,
  },

  'session': {
    'expiration': 1*24*60*60*1000,
    'key': 'iloveapple',
  },

  'password': {
    'algorithm': 'sha1',
    'key': '#guessThis#',
    'digest': 'hex'
  }
};
