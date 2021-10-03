import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class Search extends Component{

    static propTypes = { 
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
    }

    state={
        query: '',
        myBooks: [],
        books: []
    }

    componentDidMount(){
        this.setState(() => ({
            myBooks: this.props.books
        }))
    }
   
    updateQuery = (query) => {
        const myBooks = this.state.myBooks;

        this.setState(() => ({
            query: query
        }))

        BooksAPI.search(query)
        .then((books) => {
            
        if(typeof books !== 'undefined'){
            books.forEach(element => {
              let bookIndex =  myBooks.find(b => b.id === element.id)

              if(typeof bookIndex !== 'undefined')
              {
                  element.shelf = bookIndex.shelf;
              }else
              {
                  element.shelf = "none";
              }
                

                
            });
        

            this.setState(() => ({ books }))

        }else
        {
            this.setState(() => ({
                books: []
            }))
        }
          }).catch(err => 
            this.setState(() => ({
            books: []
        })));



    }

    handleChange(e)
{
    //alert(e.target.value + "-" + e.target.id);

    let updateBook = this.state.books.find(b => b.id === e.target.id);

    if(this.props.onChangeShelf){
        this.props.onChangeShelf(updateBook, e.target.value);
    }
   
}

    render() {

        const { query, books } = this.state;
       
        console.log(books);

        return(
<div className="search-books">
            <div className="search-books-bar">
            <Link className='return-home' to='/'>
                <div className="close-search">Close</div>
            </Link>
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                 placeholder="Search by title or author"
                 value={query}
                 onChange={(event) => this.updateQuery(event.target.value)}
                 />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {books.map((book) =>(
                <li key={book.id} className='book-list-item'>
                     <div className="book">
                          <div className="book-top">
                             
                            <div className="book-cover" style={{ width: 128, height: 192 }}>
                                {typeof book.imageLinks !== 'undefined' &&  <img style={{ width: 128, height: 192 }} src={book.imageLinks.smallThumbnail} alt={book.title}/> }                               
                            </div>
                            <div className="book-shelf-changer">
                              <select id={book.id} onChange={this.handleChange} defaultValue={book.shelf} >
                                <option  value="move" disabled>Move to...</option>
                                <option  value="currentlyReading">Currently Reading</option>
                                <option  value="wantToRead">Want to Read</option>
                                <option  value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                          {book.shelf !== "none" && <div className="book-authors">[Shelf: {book.shelf}]</div>}
                        </div>
                </li>
            ))}


              </ol>
            </div>
          </div>

           
        )
    }
}

export default Search