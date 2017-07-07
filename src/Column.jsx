import React, { Component } from 'react';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.cards
    })
  }

  addCard() {
    this.props.addCard(this.props.col);
  }

  render() {
    return (
      <ul className='column'>
        <li className={this.props.title+' column-title'}>{this.props.title}</li>
        {this.state.cards}
        <button className='add-card' onClick={this.addCard.bind(this)}>+ Add a Card</button>
      </ul>
    )
  }
}

export default Column;
