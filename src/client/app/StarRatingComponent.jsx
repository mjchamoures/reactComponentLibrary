import React from 'react';



// stars child functional component that represent each star

function Star(props) {

  return (
    <i className={props.className} onClick={() => props.onClick()}></i>
  );

}


// component for set of stars
class StarSet extends React.Component {

  render() {

    let stars = [];

    for(let i = 0; i < this.props.stars.length; i++) {
      let className = "glyphicon ";
      if(this.props.stars[i]) {
        className = className + "glyphicon-star";
      } else {
        className = className + "glyphicon-star-empty";
      }
      stars.push(<Star key={i} className={className} onClick={() => this.props.onClick(i)} />);
    }

    return (

      <div>
        {stars}
      </div>

    );
  }

}


// parent component for star grouping / label
class StarRatingComponent extends React.Component {


  constructor(props) {

    super(props);
    
    let stars = Array(props.numStars).fill(false);
    stars.fill(true, 0, props.numFilled);

    this.state = {
      stars : stars,
      numFilled : props.numFilled,
    };

  }

  handleClick(clickedStarIndex) {

    let stars = this.state.stars.slice();

    stars.fill(false, clickedStarIndex+1);
    stars.fill(true, 0, clickedStarIndex+1);

    this.setState({
      stars : stars,
      numFilled : clickedStarIndex+1,
    });

  }

  render() {

    return (

      <div>
        <label>{this.props.name}</label>
        <StarSet stars={this.state.stars} onClick={(i) => this.handleClick(i)} />
        <label>Rating: {this.state.numFilled}</label>
      </div>

    );

  }



}


export default StarRatingComponent;
