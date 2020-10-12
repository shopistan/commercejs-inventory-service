if (process.env.NODE_ENV === 'production') require('dotenv').config();

module.exports = {
  mongodb: process.env.mongodb || '',
  mongodbTest: process.env.mongodbTest || 'mongodb://localhost:27017/test',
  secret: process.env.secret || 'c6aSsUzQBACrdWoWy6g7BkuxwKfkPbmB',
  isOffline: process.env.IS_OFFLINE || false,
};
