Loader = React.createClass({
  propTypes: {
    size: React.PropTypes.number,
    margin: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      size: 80,
      margin: 100
    };
  },

  render() {
    const style = {
      width: `${this.props.size}px`,
      height: `${this.props.size}px`,
      marginTop: `${this.props.margin}px`,
      marginBottom: `${this.props.margin}`
    };

    return (
      <div
        style={style}
        className='sk-fading-circle'
      >
        <div className='sk-circle1 sk-circle' />
        <div className='sk-circle2 sk-circle' />
        <div className='sk-circle3 sk-circle' />
        <div className='sk-circle4 sk-circle' />
        <div className='sk-circle5 sk-circle' />
        <div className='sk-circle6 sk-circle' />
        <div className='sk-circle7 sk-circle' />
        <div className='sk-circle8 sk-circle' />
        <div className='sk-circle9 sk-circle' />
        <div className='sk-circle10 sk-circle' />
        <div className='sk-circle11 sk-circle' />
        <div className='sk-circle12 sk-circle' />
      </div>
    );
  }
});
