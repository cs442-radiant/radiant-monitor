import { browserHistory } from 'react-router';

Database = React.createClass({
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
    browserHistory.push(`/database/restaurant/${id}`);
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

  renderChildren() {
    return React.cloneElement(
      this.props.children,
      {
        rows: this.state.rows,
        numItems: this.state.numItems,
        isLoaded: this.state.isLoaded
      }
    );
  },

  render() {
    return this.state.isLoaded ?
      (
        <div>
          <Map
            restaurants={this.state.rows}
          />
          {this.renderChildren()}
        </div>
      ) :
      <Loader />;
  }
});
