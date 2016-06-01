import Future from 'fibers/future';

Meteor.methods({
  dbQuery: (query, params) => {
    Logger.info(`dbQuery: ${query} (${params})`);

    let dbCheckFuture = new Future();

    Util.checkAndReconnect((err) => {
      dbCheckFuture['return'](err);
    });

    let dbErr = dbCheckFuture.wait();

    if (dbErr) {
      Logger.error('Failed on reconnecting to DB.');
      throw new Meteor.Error(500, dbErr);
    }

    let queryFuture = new Future();

    DB.query(query, params, (err, rows, fields) => {
      if (err) {
        throw new Meteor.Error(500, 'Error occured executing SQL query: ' + err);
      }

      queryFuture['return'](rows);
    });

    return queryFuture.wait();
  }
});
