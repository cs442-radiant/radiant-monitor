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
            {idx + 1}
          </div>
          <div
            className='entry'
          >
            {row.displayName || row.name}
          </div>
        </div>
      );
    });
  },

  render() {
    return this.state.isLoaded ?
      (
        <div>
          <Map
            restaurants={this.state.rows}
          />
          <InfoPanel>
            <NumOfItems
              name='RESTAURANTS'
              numItems={this.state.numItems}
            />
          </InfoPanel>
          <div
            className='restaurant-table'
          >
            {this.renderRestaurants()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
