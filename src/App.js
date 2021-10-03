import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import Search from './Search';
import './App.css';
import BookShelf from './BookShelf';

class App extends Component {

  state = {
    books:[],
    searchResults:[]
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({ books }))
    })
  }



  moveBook=(book, newShelf) => {
    let booksUpdate = [...this.state.books];
    let bookUpdateIndex = booksUpdate.findIndex(b => b.id === book.id);
      if(bookUpdateIndex > -1){
        let bookUpdate = {...booksUpdate[bookUpdateIndex]};
        bookUpdate.shelf = newShelf;
        booksUpdate[bookUpdateIndex] = bookUpdate;
      } else
      {
        let bookUpdate = book;
        bookUpdate.shelf = newShelf;
        booksUpdate.push(bookUpdate);
      }

      this.setState({books:booksUpdate});
      BooksAPI.update(book, newShelf);

  }

  render(){
  return (
    <div className="App">
     <Route exact path='/' render={() => (
        <BookShelf
        books={this.state.books}
        moveBook={this.moveBook}
        />
     )}/>
     <Route path='/search' render={({history}) => (
       <Search
       books={this.state.books}
       onChangeShelf={this.moveBook}
       />

     )}/>
    </div>
  )
  }
}

export default App;
