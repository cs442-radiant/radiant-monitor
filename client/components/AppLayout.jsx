AppLayout = React.createClass({
  render() {
    return (
      <div
        className='layout'
      >
        {this.props.children}
      </div>
    );
  }
});