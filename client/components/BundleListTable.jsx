import { Link } from 'react-router';

BundleListTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false
    };
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getBundles', this.props.params.id, 0, 100, true, (err, result) => {
      self.setState({
        rows: result.payload,
        numItems: result.numItems,
        isLoaded: true,
        restaurantName: result.restaurantName
      });
    });
  },

  renderBundles() {
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
              to={`/bundle/${row.id}`}
            >
              {row.description}
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
            {`Restaurant name: ${this.state.restaurantName}`}
          </div>
          <div>
            {`Restaurant ID: ${this.props.params.id}`}
          </div>
          <div>
            {`Number of bundles: ${this.state.numItems}`}
          </div>
          <div
            className='table'
          >
            {this.renderBundles()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
