import { browserHistory } from 'react-router';

AppLayout = React.createClass({
  getInitialState() {
    var self = this;

    browserHistory.listen((ev) => {
      self.setState({
        currentPath: ev.pathname
      });
    });

    return {
      currentPath: window.location.pathname
    };
  },

  render() {
    const isFullscreen = this.state.currentPath === '/';

    return (
      <div
        className={`layout ${isFullscreen ? 'fullscreen' : ''}`}
      >
        <Header
          currentPath={this.state.currentPath}
        />
        <div
          className='content'
        >
          <div
            className='design-by'
          >
            WEB DESIGN BY DEL
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});
