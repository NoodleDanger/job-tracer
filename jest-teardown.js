/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * ************************************
 *
 * @module jest-teardown.js
 * @author
 * @date 2021-07-14
 * @description global config to shutdown server after entire test suite.
 *
 * ************************************
 */
module.exports = async (globalConfig) => {
  testServer.close();
};
