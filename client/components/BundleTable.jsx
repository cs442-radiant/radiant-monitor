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
        isLoaded: true
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
            {`Restaurant name: `}
          </div>
          <div>
            {`Bundle ID: ${this.props.params.id}`}
          </div>
          <div>
            {`Bundle description: `}
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
