import React, { Component } from 'react';
import logo from './logo.svg';
import Column from './Column.jsx';
import Card from './Card.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        [
          <Card idx={0} moveCard={this.moveCard.bind(this)} col={0} key={'winniecard1'} content={'Study for TripleByte Interview'}/>,
          <Card idx={1} moveCard={this.moveCard.bind(this)} col={0} key={'winniecard2'} content={'Fix CSS'}/>
        ],
        [
          <Card idx={0} moveCard={this.moveCard.bind(this)} col={1} key={'bobcard1'} content={'Migrate to React'}/>,
          <Card idx={1} moveCard={this.moveCard.bind(this)} col={1} key={'bobcard2'} content={'Fix Redux store'}/>
        ],
        [
          <Card idx={0} moveCard={this.moveCard.bind(this)} col={2} key={'thomascard1'} content={'Scala implementation'}/>,
          <Card idx={1} moveCard={this.moveCard.bind(this)} col={2} key={'thomascard2'} content={'Search YouTube for cute panda videos'}/>
        ],
        [
          <Card idx={0} moveCard={this.moveCard.bind(this)} col={3} key={'georgecard1'} content={'API improvements'}/>,
          <Card idx={1} moveCard={this.moveCard.bind(this)} col={3} key={'georgecard2'} content={'Finish up ActiveRecord Queries'}/>
        ]
      ]
    }
    this.updateCards = this.updateCards.bind(this)
  }

  updateCards(col) {
    let newCards = this.state.cards;
    newCards[col] = React.Children.map(newCards[col], (child, i) => {
      return React.cloneElement(child, {
        idx: i,
        col: col
      })
    })
    this.setState({
      cards: newCards
    })
  }

  addCard(col) {
    let content = window.prompt(),
        newCards = this.state.cards.slice();
    newCards[col].push(<Card idx={newCards[col].length} moveCard={this.moveCard.bind(this)} col={col} key={Date.now()} content={content}/>);
    this.setState({
      cards: newCards
    })
  }

  moveCard(fromCol, toCol, idx) {
    let cardToMove = this.state.cards[fromCol][idx],
        newCards = this.state.cards.slice();
    newCards[toCol].push(cardToMove);
    newCards[fromCol] = newCards[fromCol].slice(0, idx).concat(newCards[fromCol].slice(idx + 1));
    this.setState({
      cards: newCards
    }, () => {
      this.updateCards(fromCol);
      this.updateCards(toCol);
    })
  }

  render() {
    return (
      <div className="App">
        <Column cards={this.state.cards[0]} addCard={this.addCard.bind(this)} key={'col0'} title={'Winnie'} col={0} />
        <Column cards={this.state.cards[1]} addCard={this.addCard.bind(this)} key={'col1'} title={'Bob'} col={1}/>
        <Column cards={this.state.cards[2]} addCard={this.addCard.bind(this)} key={'col2'} title={'Thomas'} col={2}/>
        <Column cards={this.state.cards[3]} addCard={this.addCard.bind(this)} key={'col3'} title={'George'} col={3}/>
      </div>
    );
  }
}

export default App;
