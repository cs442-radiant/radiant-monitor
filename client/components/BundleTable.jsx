import { browserHistory } from 'react-router';

BundleTable = React.createClass({
  getInitialState() {
    return {
      isSamplesLoaded: false,
      isRestaurantNameLoaded: false
    };
  },

  computeStatistics(payload) {
    let rows = payload ? payload : this.state.rows;
    let aps = {};

    rows.forEach((row) => {
      row.sample.forEach((sample) => {
        const BSSID = sample.BSSID;

        if (!aps[BSSID]) {
          aps[BSSID] = {};
          aps[BSSID].SSID = sample.SSID;
          aps[BSSID].sum = 0;
          aps[BSSID].count = 0;
        }

        aps[BSSID].count++;
        aps[BSSID].sum += sample.level;
      });
    });

    let result = [];

    Object.keys(aps).map((BSSID) => {
      const ap = aps[BSSID];

      ap.BSSID = BSSID;
      ap.averageLevel = (ap.sum / ap.count);
      delete ap.sum;

      result.push(ap);
    });

    result.sort((ap1, ap2) => {
      return ap2.averageLevel - ap1.averageLevel;
    });

    this.setState({
      aps: result
    });
  },

  componentWillMount() {
    var self = this;

    Meteor.call('getSamples', this.props.params.id, 0, 100, true, (err, result) => {
      result.payload = result.payload.map((row) => {
        let result = row;
        result.sample = JSON.parse(row.sample);

        return result;
      });

      this.computeStatistics(result.payload);

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
      const apList = row.sample;

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
          <Section
            name='STATISTICS'
          >
            {this.state.aps ?
              <BundleTable.Statistics
                rows={this.state.aps}
                numTotalSamples={this.state.numItems}
              /> : <Loader />}
          </Section>
          <Section
            name='SAMPLES'
          >
            <div
              className='sample-table'
            >
              {this.renderSamples()}
            </div>
          </Section>
        </div>
      ) :
      <Loader />;
  }
});

BundleTable.Statistics = React.createClass({
  propTypes: {
    rows: React.PropTypes.array.isRequired,
    numTotalSamples: React.PropTypes.number.isRequired
  },

  renderRows() {
    var self = this;

    return this.props.rows.map((row, idx) => {
      return (
        <div
          key={idx}
          className='content row'
        >
          <div
            className={`ssid ${row.SSID ? '' : 'no-ssid'}`}
          >
            {row.SSID ? row.SSID : '(NO SSID)'}
          </div>
          <div
            className='bssid-text'
          >
            {row.BSSID}
          </div>
          <div>
            {row.averageLevel.toFixed(2)}
          </div>
          <div
            className='count-of-appearance'
          >
            <span
              className='appearance-count'
            >
              {row.count}
            </span>
            <span
              className='appearance-ratio'
            >
              {`(${(row.count / self.props.numTotalSamples * 100).toFixed(1)}%)`}
            </span>
          </div>
        </div>
      );
    });
  },

  render() {
    return (
      <div
        className='statistics'
      >
        <div
          className='table'
        >
          <div
            className='header row'
          >
            <div>
              SSID
            </div>
            <div>
              BSSID
            </div>
            <div>
              AVERAGE LEVEL
            </div>
            <div>
              COUNT OF APPEARANCE
            </div>
          </div>
          {this.renderRows()}
        </div>
      </div>
    );
  }
});
