module.exports = {
  secret: process.env.AUTH_SECRET,
  // jwtExpiration: process.env.JWT_EXPIRATION,
  // jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION

  /* for test */
  jwtExpiration: 60, // 1 minute
  jwtRefreshExpiration: 120 // 2 minutes
};
