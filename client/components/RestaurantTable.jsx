import { Link } from 'react-router';

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

  renderRestaurants() {
    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='row'
        >
          <div
            className='entry'
          >
            {row.id}
          </div>
          <div
            className='entry'
          >
            <Link
              to={`/restaurant/${row.id}`}
            >
              {row.name}
            </Link>
          </div>
        </div>
      );
    });
  },

  render() {
    return this.state.isLoaded ?
      (
        <div>
          <div>
            {`Number of restaurants: ${this.state.numItems}`}
          </div>
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
