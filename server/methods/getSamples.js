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

    return response;
  }
});
