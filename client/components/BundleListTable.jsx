import { browserHistory } from 'react-router';

BundleListTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false,
      isSamplesLoaded: false,
      selectedBundle: null
    };
  },

  componentWillMount() {
    this.loadBundles(this.props.params.id);
  },

  componentWillUpdate(nextProps) {
    if (nextProps.params.id != this.props.params.id) {
      this.loadBundles(nextProps.params.id);
    }
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
    browserHistory.push(`/database/restaurant/${this.props.params.id}/bundle/${id}`);
    this.setState({
      selectedBundle: id,
      isSamplesLoaded: false
    });
  },

  renderLoader(bundleId) {
    if (this.state.selectedBundle == bundleId && !this.state.isSamplesLoaded) {
      return (
        <span
          className='loader'
        >
          <Loader
            size={20}
          />
        </span>
      );
    }

    return null;
  },

  renderBundles() {
    var self = this;

    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className={`row ${self.state.selectedBundle === row.id ? 'selected' : ''}`}
          onClick={self.handleClickBundle.bind(null, row.id)}
        >
          <div
            className='row-content'
          >
            <div
              className='entry id'
            >
              {row.id}
            </div>
            <div
              className='entry name'
            >
              {row.description}
            </div>
          </div>
          {this.renderLoader(row.id)}
        </div>
      );
    });
  },

  handleOnLoadSamples() {
    console.log('onLoadSamples');

    this.setState({
      isSamplesLoaded: true
    });
  },

  renderChildren() {
    if (this.props.children) {
      return (
        React.cloneElement(this.props.children,
          {
            onLoad: this.handleOnLoadSamples
          }
        )
      );
    }

    return null;
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
          {this.renderChildren()}
        </div>
      ) :
      <Loader />;
  }
});
