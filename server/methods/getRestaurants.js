import Future from 'fibers/future';

Meteor.methods({
  getRestaurants: (offset, limit, needCount) => {
    Logger.info(`Get restaurants`);

    let response = {};

    response.payload = Meteor.call('dbQuery',
      'SELECT * FROM Restaurant WHERE hidden=0 LIMIT ?, ?',
      [offset, limit]
    );

    if (needCount) {
      response.numItems = Meteor.call('dbQuery',
        'SELECT COUNT(*) FROM Restaurant WHERE hidden=0',
        []
      )[0]['COUNT(*)'];
    }

    return response;
  }
});
