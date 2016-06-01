import Future from 'fibers/future';

Meteor.methods({
  getSamples: (bundleId, offset, limit, needCount) => {
    Logger.info(`Get samples (bundleId: ${bundleId})`);

    let response = {};

    response.payload = Meteor.call('dbQuery',
      'SELECT * FROM Sample WHERE bundleId = ? LIMIT ?, ?',
      [bundleId, offset, limit]
    );

    if (needCount) {
      response.numItems = Meteor.call('dbQuery',
        'SELECT COUNT(*) FROM Sample WHERE bundleId = ?',
        [bundleId]
      )[0]['COUNT(*)'];
    }

    response.bundle = Meteor.call('dbQuery',
      'SELECT * FROM Bundle WHERE id = ?',
      [bundleId]
    )[0];

    return response;
  }
});
