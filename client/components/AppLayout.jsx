AppLayout = React.createClass({
  render() {
    return (
      <div
        className='layout'
      >
        <Header />
        {this.props.children}
      </div>
    );
  }
});
