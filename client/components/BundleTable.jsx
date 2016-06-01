import { Link } from 'react-router';

BundleTable = React.createClass({
  getInitialState() {
    return {
      isLoaded: false
    };
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getSamples', this.props.params.id, 0, 100, true, (err, result) => {
      self.setState({
        rows: result.payload,
        numItems: result.numItems,
        bundle: result.bundle,
        isLoaded: true
      });

      console.log(result.bundle);

      Meteor.call('getRestaurant', result.bundle.restaurantId, (err, result) => {
        self.setState({
          restaurantName: result.name
        });
      });
    });
  },

  renderAPs(sample) {
    sample.sort((ap1, ap2) => {
      return ap2.level - ap1.level;
    });

    return sample.map((ap, idx) => {
      return (
        <div
          key={idx}
          className='ap'
        >
          <span
            className='ssid'
          >
            {ap.SSID}
          </span>
          <span
            className='bssid'
          >
            {ap.BSSID}
          </span>
          <span
            className='level'
          >
            {ap.level}
          </span>
        </div>
      );
    });
  },

  renderSamples() {
    return this.state.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='column'
        >
          {this.renderAPs(JSON.parse(row.sample))}
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
            {`Bundle ID: ${this.props.params.id}`}
          </div>
          <div>
            {`Bundle description: ${this.state.bundle.description}`}
          </div>
          <div>
            {`Number of samples: ${this.state.numItems}`}
          </div>
          <div
            className='sample-table'
          >
            {this.renderSamples()}
          </div>
        </div>
      ) :
      <Loader />;
  }
});
