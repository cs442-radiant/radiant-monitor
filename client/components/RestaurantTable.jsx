import { browserHistory } from 'react-router';

RestaurantTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false
    };
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getRestaurants', 0, 100, true, (err, result) => {
      self.setState({
        rows: result.payload,
        numItems: result.numItems,
        isLoaded: true
      });
    });
  },

  handleClickRestaurant(id) {
    browserHistory.push(`/restaurant/${id}`);
  },

  renderRestaurants() {
    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='row'
          onClick={this.handleClickRestaurant.bind(null, row.id)}
        >
          <div
            className='entry id'
          >
            {row.id}
          </div>
          <div
            className='entry'
          >
            {row.name}
          </div>
        </div>
      );
    });
  },

  render() {
    return this.state.isLoaded ?
      (
        <div>
          <InfoPanel>
            <NumOfItems
              name='RESTAURANTS'
              numItems={this.state.numItems}
            />
          </InfoPanel>
          <div
            className='table'
          >
            {this.renderRestaurants()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
