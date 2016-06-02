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
        className='layout'
      >
        <Header
          currentPath={this.state.currentPath}
        />
        {
          isFullscreen ?
            null :
            <div
              className='content'
            >
              {this.props.children}
            </div>
        }
      </div>
    );
  }
});
