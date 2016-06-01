import { Link, browserHistory } from 'react-router';

Header = React.createClass({
  handleClickTitle() {
    browserHistory.push('/');
  },

  render() {
    return (
      <div
        className='header'
      >
        <div
          className='title'
          onClick={this.handleClickTitle}
        >
          RADIANT MONITOR
        </div>
        <div
          className='links'
        >
          <Header.Item
            to='/restaurant'
            name='SHOW RESTAURANTS'
          />
          <Header.Item
            to='/about'
            name='ABOUT US'
          />
        </div>
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
