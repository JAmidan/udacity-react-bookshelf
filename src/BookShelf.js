import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookState from './BookState';



class BookShelf extends Component{

  

static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
}



    render() {

        const { books, moveBook } = this.props;
        let readBooks = [...books].filter(b => b.shelf === 'read');
        let readingBooks = [...books].filter(b => b.shelf === 'currentlyReading');
        let wantedBooks = [...books].filter(b => b.shelf === 'wantToRead');
        

        return(
        
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads - Jason Amidan Udacity</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                        
                        <BookState
                         books={readBooks}
                         onChangeShelf={moveBook}/>

                        </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
               <BookState 
                books={readingBooks}
                onChangeShelf={moveBook}/>
                </div>
                </div>
              
               <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
               <BookState 
                books={wantedBooks}
                onChangeShelf={moveBook}/>
                </div>
                </div>
                </div>
                </div>
                <div className="open-search">
                    <Link to='/search'><div className="open-search-link">Add a book </div></Link>
                </div>
           
        </div>
        )
    }
}

export default BookShelf