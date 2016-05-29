import Future from 'fibers/future';

Meteor.methods({
  getRestaurants: (offset, limit, needCount) => {
    Logger.info(`Get restaurants`);

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

    DB.query(`SELECT * FROM Restaurant LIMIT ${offset}, ${limit}`, (err, rows, fields) => {
      if (err) {
        throw new Meteor.Error(500, 'Error occured executing SQL query: ' + err);
      }

      mainFuture['return'](rows);
    });

    if (needCount) {
      DB.query(`SELECT COUNT(*) FROM Restaurant`, (err, rows, fields) => {
        countFuture['return'](rows[0]['COUNT(*)']);
      });

      response.numItems = countFuture.wait();
    }

    response.payload = mainFuture.wait();

    return response;
  }
});
