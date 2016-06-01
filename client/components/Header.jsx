import { Link } from 'react-router';

Header = React.createClass({
  render() {
    return (
      <div
        className='header'
      >
        <div>
          Radiant Monitor
        </div>
        <Header.Item
          to='/restaurant'
          name='SHOW RESTAURANTS'
        />
      </div>
    );
  }
});

Header.Item = React.createClass({
  render() {
    return (
      <span>
        <Link
          to={this.props.to}
        >
          {this.props.name}
        </Link>
      </span>
    );
  }
});
