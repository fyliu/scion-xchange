module.exports = {
  secret: process.env.AUTH_SECRET,
  // jwtExpiration: process.env.JWT_EXPIRATION,
  // jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION

  /* for test */
  jwtExpiration: 3600, // 1 minute
  jwtRefreshExpiration: 604800 // 2 minutes
};
