import Future from 'fibers/future';

Meteor.methods({
  getBundles: (restaurantId, offset, limit, needCount) => {
    Logger.info(`Get bundles (restaurantId: ${restaurantId})`);

    let response = {};

    response.payload = Meteor.call('dbQuery',
      'SELECT * FROM Bundle WHERE restaurantId=? LIMIT ?, ?',
      [restaurantId, offset, limit]
    );

    if (needCount) {
      response.numItems = Meteor.call('dbQuery',
        'SELECT COUNT(*) FROM Bundle WHERE restaurantId=?',
        [restaurantId]
      )[0]['COUNT(*)'];
    }

    response.bundle = Meteor.call('dbQuery',
      'SELECT * FROM Bundle WHERE id = ?',
      [restaurantId]
    )[0];

    response.restaurantName = Meteor.call('getRestaurant', restaurantId).name;

    return response;
  }
});
