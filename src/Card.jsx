import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      col: this.props.col,
      idx: this.props.idx
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      idx: nextProps.idx,
      col: nextProps.col
    })
  }

  moveBack() {
    this.props.moveCard(this.state.col, this.state.col - 1, this.state.idx);
    this.setState({
      col: this.state.col - 1
    })
  }

  moveForward() {
    this.props.moveCard(this.state.col, this.state.col + 1, this.state.idx);
    this.setState({
      col: this.state.col + 1
    })
  }

  render() {
    let back = this.state.col > 0 ? <button onClick={this.moveBack.bind(this)}>&lt;</button> : <button className='empty-button'>&lt;</button>,
        forward = this.state.col < 3 ? <button onClick={this.moveForward.bind(this)}>&gt;</button> : <button className='empty-button'>&gt;</button>;

    return (
      <li className='card'>
        {back}
        <span>{this.props.content}</span>
        {forward}
      </li>
    )
  }
}

export default Card;
