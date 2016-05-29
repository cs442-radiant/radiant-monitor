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
    if (this.state.isLoaded) {
      return this.state.rows.map((row, idx) => {
        return (
          <div>
            <div>
              {idx}
            </div>
            <div>
              {row.id}
            </div>
            <div>
              {row.name}
            </div>
          </div>
        );
      });
    }
  },

  render() {
    return (
      <div>
        {this.renderRestaurants()}
      </div>
    );
  }
});
