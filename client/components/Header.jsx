import { Link, browserHistory } from 'react-router';

Header = React.createClass({
  handleClickTitle() {
    browserHistory.push('/');
  },

  render() {
    const isFullscreen = this.props.currentPath === '/';

    return (
      <div
        className={`header ${isFullscreen ? 'fullscreen' : ''}`}
      >
        <div
          className='hide-overflow'
        >
          <div
            className='black-layer'
          />
        </div>
        <div
          className='height-maximizer'
        >
          <div
            className='title'
            onClick={this.handleClickTitle}
          >
            TEAM RADIANT
          </div>
          <div
            className='no-title'
          >
            <div
              className='text'
            >
              <div>
                We're researching Wi-Fi localization and this is our monitor web page for data analysis.
              </div>
              <div>
                Please feel free to look around!
              </div>
            </div>
            <div
              className='links'
            >
              <Header.Item
                to='/database'
                name='DATABASE'
              />
              <Header.Item
                to='/about'
                name='ABOUT US'
              />
            </div>
          </div>
        </div>
        <div
          className='filler'
        />
      </div>
    );
  }
});

Header.Item = React.createClass({
  render() {
    return (
      <span
        className='item'
      >
        <Link
          to={this.props.to}
        >
          {this.props.name}
        </Link>
      </span>
    );
  }
});
