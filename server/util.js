import mysql from 'mysql';

/**
 * Callback that returns final result.
 * @callback resultCallback
 * @param {string} error - Error message. Undefined or null if there's no error.
 */

/**
 * Response for get methods.
 * @class Response
 * @type {Object}
 * @property {number} numItems - The number of total items
 * @property {array} payload - Requested data
 */

Util = {
  /**
   * Checks if DB is still connected, and if it's not tries to reconnect.
   * @param {resultCallback} callback - A callback that returns result.
   * */
  checkAndReconnect: (callback) => {
    if (DB === null) {
      callback('Database is not initialized.');
    }

    DB.ping((err) => {
      if (err) {
        Logger.warn('DB ping has some error.');
        Logger.info('Connection to MySQL server is lost. Trying to reconnect...');

        DB.destroy();
        Logger.info('DB released.');

        DB = mysql.createConnection(Meteor.settings.mysql);
        Logger.info('createConnection');

        DB.connect((err) => {
          if (err) {
            Logger.error('Error occured on reconnection.');
            callback(err);
          } else {
            Logger.info('Successfully reconnected to MySQL server.');
            callback();
          }
        });
      } else {
        Logger.info('DB ping: OK');
        callback();
      }
    });
  }
};
