import Future from 'fibers/future';

Meteor.methods({
  getRestaurant: (id) => {
    Logger.info(`Get restaurant (id: ${id})`);

    return Meteor.call('dbQuery', 'SELECT * FROM Restaurant WHERE id = ?', [id])[0];
  }
});
