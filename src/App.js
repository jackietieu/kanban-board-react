import React, { Component } from 'react';
import logo from './logo.svg';
import Column from './Column.jsx';
import Card from './Card.jsx';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cache: JSON.parse(window.localStorage.getItem('cards')) || [
        [
          {idx: 0, col: 0, content: 'Study for TripleByte Interview'},
          {idx: 1, col: 0, content: 'Fix CSS'}
        ],
        [
          {idx: 0, col: 1, content: 'Migrate to React'},
          {idx: 1, col: 1, content: 'Fix Redux store'}
        ],
        [
          {idx: 0, col: 2, content: 'Read up on Scala'},
          {idx: 1, col: 2, content: 'Search YouTube for cute panda videos'}
        ],
        [
          {idx: 0, col: 3, content: 'API improvements'},
          {idx: 1, col: 3, content: 'Finish up ActiveRecord Queries'}
        ]
      ]
    }

    this.state.cards = this.createCards();
  }

  createCards() {
    return this.state.cache.map((column, col) => {
      return column.map((cardProps, i) => (
        <Card idx={i} col={col} content={cardProps.content} key={`${col}${i}`} moveCard={this.moveCard.bind(this)} />
      ))
    })
  }

  setCache() {
    window.localStorage.setItem('cards', JSON.stringify(this.state.cards));
  }

  updateCards(col) {
    let newCards = this.state.cards,
        newCache = this.state.cache;
    newCards[col] = React.Children.map(newCards[col], (child, i) => {
      return React.cloneElement(child, {
        key: i,
        idx: i,
        col: col
      })
    })
    newCache[col] = newCache[col].map((cardProps, i) => (
      Object.assign({}, cardProps, {idx: i, col: col})
    ))
    window.localStorage.setItem('cards', JSON.stringify(newCache))
    this.setState({
      cards: newCards,
      cache: newCache
    });
  }

  addCard(col) {
    let content = window.prompt(),
        newCards = this.state.cards.slice(),
        newCache = this.state.cache.slice();
    newCards[col].push(<Card idx={newCards[col].length} moveCard={this.moveCard.bind(this)} col={col} key={Date.now()} content={content}/>);
    newCache[col].push({idx: newCache[col].length, col: col, content: content})
    window.localStorage.setItem('cards', JSON.stringify(newCache))
    this.setState({
      cards: newCards,
      cache: newCache
    });
  }

  moveCard(fromCol, toCol, idx) {
    let cardToMove = this.state.cards[fromCol][idx],
        newCards = this.state.cards.slice(),
        newCache = this.state.cache.slice();

    newCards[toCol].push(cardToMove);
    newCards[fromCol] = newCards[fromCol].slice(0, idx).concat(newCards[fromCol].slice(idx + 1));
    newCache[toCol].push(newCache[fromCol].splice(idx, 1)[0]);
    this.setState({
      cards: newCards,
      cache: newCache
    }, () => {
      this.updateCards(fromCol);
      this.updateCards(toCol);
    });
  }

  render() {
    return (
      <div className="App">
        <Column cards={this.state.cards[0]} addCard={this.addCard.bind(this)} key={'col0'} title={'Winnie'} col={0} />
        <Column cards={this.state.cards[1]} addCard={this.addCard.bind(this)} key={'col1'} title={'Bob'} col={1} />
        <Column cards={this.state.cards[2]} addCard={this.addCard.bind(this)} key={'col2'} title={'Thomas'} col={2} />
        <Column cards={this.state.cards[3]} addCard={this.addCard.bind(this)} key={'col3'} title={'George'} col={3} />
      </div>
    );
  }
}

export default App;
