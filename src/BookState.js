import React, {Component } from 'react';
import PropTypes from 'prop-types';

class BookState extends Component{

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);

       
    }
  

handleChange(e)
{
    const {books, onChangeShelf} = this.props

    //alert(e.target.value + "-" + e.target.id);

    let updateBook = books.find(b => b.id === e.target.id);

    if(onChangeShelf){
        onChangeShelf(updateBook, e.target.value);
    }
   
}

render(){

    const {books} = this.props

    return(
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
                        </div>
                </li>
            ))}
         
        </ol>
    )
            }
}

export default BookState