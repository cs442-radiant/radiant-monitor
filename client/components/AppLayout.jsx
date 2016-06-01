AppLayout = React.createClass({
  render() {
    return (
      <div
        className='layout'
      >
        <Header />
        <div
          className='content'
        >
          {this.props.children}
        </div>
      </div>
    );
  }
});
