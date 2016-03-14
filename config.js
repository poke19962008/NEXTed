module.exports = {

  'mongo': {
    'uri': 'mongodb://localhost:27017/edufix',
    'port': 27017,
  },

  'session': {
    'expiration': 360000*60*60,
    'key': 'iloveapple',
  },

  'password': {
    'algorithm': 'sha1',
    'key': '#guessThis#',
    'digest': 'hex'
  }
};
