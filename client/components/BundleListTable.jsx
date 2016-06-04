import { browserHistory } from 'react-router';

BundleListTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false
    };
  },

  componentWillMount() {
    this.loadBundles(this.props.params.id);
  },

  componentWillReceiveProps(nextProps) {
    this.loadBundles(nextProps.params.id);
  },

  loadBundles(restaurantId) {
    var self = this;

    self.setState({
      isLoaded: false
    });

    Meteor.call('getBundles', restaurantId, 0, 100, true, (err, result) => {
      self.setState({
        rows: result.payload,
        numItems: result.numItems,
        isLoaded: true,
        restaurantName: result.restaurantName
      });
    });
  },

  handleClickBundle(id) {
    browserHistory.push(`/database/bundle/${id}`);
  },

  renderBundles() {
    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='row'
          onClick={this.handleClickBundle.bind(null, row.id)}
        >
          <div
            className='entry id'
          >
            {row.id}
          </div>
          <div
            className='entry'
          >
            {row.description}
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
            <div
              className='restaurant-name'
            >
              {this.state.restaurantName}
            </div>
            <NumOfItems
              name='BUNDLES'
              numItems={this.state.numItems}
            />
          </InfoPanel>
          <div
            className='bundle-table'
          >
            {this.renderBundles()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
