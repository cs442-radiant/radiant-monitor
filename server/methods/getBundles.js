import Future from 'fibers/future';

Meteor.methods({
  getBundles: (restaurantId, offset, limit, needCount) => {
    Logger.info(`Get bundles (restaurantId: ${restaurantId})`);

    let dbCheckFuture = new Future();

    Util.checkAndReconnect((err) => {
      dbCheckFuture['return'](err);
    });

    let dbErr = dbCheckFuture.wait();

    if (dbErr) {
      Logger.error('Failed on reconnecting to DB.');
      throw new Meteor.Error(500, dbErr);
    }

    let mainFuture = new Future();
    let countFuture = new Future();
    let response = {};

    DB.query(`SELECT * FROM Bundle WHERE restaurantId=${restaurantId} LIMIT ${offset}, ${limit}`, (err, rows, fields) => {
      if (err) {
        throw new Meteor.Error(500, 'Error occured executing SQL query: ' + err);
      }

      mainFuture['return'](rows);
    });

    if (needCount) {
      DB.query(`SELECT COUNT(*) FROM Bundle WHERE restaurantId=${restaurantId}`, (err, rows, fields) => {
        countFuture['return'](rows[0]['COUNT(*)']);
      });

      response.numItems = countFuture.wait();
    }

    response.payload = mainFuture.wait();
    response.restaurantName = Meteor.call('getRestaurant', restaurantId).name;

    return response;
  }
});
