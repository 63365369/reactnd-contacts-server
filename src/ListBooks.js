import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

class ListBooks extends Component{
    state = {
        shelves :[
            {name:'currentlyReading',title:'Currently Reading'},
            {name:'wantToRead',title:'Want to Read'},
            {name:'read',title:'Read'}
        ]
      }
    updateShelf = (book,shelf) =>{
        BooksAPI.update(book,shelf) 
        this.setState(
            {shelves:this.state.shelves} //应如何更新shelves？  
          )   
    }
    
    render(){
        const {books} = this.props
        const {shelves} = this.state
        

        return (
            <div className="list-books">
            <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
            {shelves.map((shelf) => (
                <div className="bookshelf" key={shelf.name}>
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {(books.filter( book => book.shelf===(shelf.name) ) ).map((book) => (
                            <li key={book.id} className='book-list-item'>
                            <div className="book">
                            <div className="book-top">
                                <div className="book-cover" 
                                    style={{ width: 128, 
                                        height: 193, 
                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                    }}>
                                </div>
                                <div className="book-shelf-changer">
                                
                                <select value={book.shelf} onChange={(event) => this.updateShelf(book,event.target.value)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                            </div>   
                            </li>    
                        )
                    )}
                    </ol>
                </div>
                </div>))}  
            </div>
            </div>
            <div className="open-search">
            <Link
                        to='/search'
                        className='search-book'
            >Add a book
            </Link>
            </div>
            </div>  
        )
    }
}


export default ListBooks