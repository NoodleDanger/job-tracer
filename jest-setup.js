/* eslint-disable global-require */
/**
 * ************************************
 *
 * @module jest-setup.js
 * @author
 * @date 2021-07-14
 * @description global config to start server before entire test suite.
 *
 * ************************************
 */
module.exports = async () => {
  global.testServer = await require('./server/server');
};
