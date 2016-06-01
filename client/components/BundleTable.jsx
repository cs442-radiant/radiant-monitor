import { browserHistory } from 'react-router';

BundleTable = React.createClass({
  getInitialState() {
    return {
      isSamplesLoaded: false,
      isRestaurantNameLoaded: false
    };
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getSamples', this.props.params.id, 0, 100, true, (err, result) => {
      self.setState({
        rows: result.payload,
        numItems: result.numItems,
        bundle: result.bundle,
        isSamplesLoaded: true
      });

      Meteor.call('getRestaurant', result.bundle.restaurantId, (err, result) => {
        self.setState({
          restaurantName: result.name,
          isRestaurantNameLoaded: true
        });
      });
    });
  },

  handleClickRestaurantName() {
    if (this.state.bundle) {
      browserHistory.push(`/restaurant/${this.state.bundle.restaurantId}`);
    }
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
            className={`ssid ${ap.SSID ? '' : 'no-ssid'}`}
          >
            {ap.SSID ? ap.SSID : '(NO SSID)'}
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
      const apList = JSON.parse(row.sample);

      return (
        <div
          className='column'
          key={idx}
        >
          <div
            className='header'
          >
            <span>
              {Util.dateFormat(row.clientTimestamp)}
            </span>
            <div
              className='num-of-aps'
            >
              {`${apList.length} AP${apList.length > 1 ? 's' : ''}`}
            </div>
          </div>
          <div
            className='ap-list'
          >
            {this.renderAPs(apList)}
          </div>
        </div>
      );
    });
  },

  render() {
    return this.state.isSamplesLoaded ?
      (
        <div>
          <InfoPanel>
            <div
              className='restaurant-name inline clickable'
              onClick={this.handleClickRestaurantName}
            >
              {this.state.isRestaurantNameLoaded ? this.state.restaurantName : ''}
            </div>
            <div
              className='bundle'
            >
              <span>
                BUNDLE
              </span>
              <i
                className='material-icons'
              >
                keyboard_arrow_right
              </i>
              <span
                className='bundle-description'
              >
                {this.state.bundle.description}
              </span>
              <span
                className='bundle-id'
              >
                {`(Bundle ID: ${this.props.params.id})`}
              </span>
            </div>
            <NumOfItems
              name='SAMPLES'
              numItems={this.state.numItems}
            />
          </InfoPanel>
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
