import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : []
  }
  componentDidMount(){
    BooksAPI.getAll().then(
      (books) =>{this.setState({books:books})}
    )
  }
  updateShelf = (book,shelf) =>{
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      // Filter out the book and append it to the end of the list
      // so it appears at the end of whatever shelf it was added to.
      this.setState(state => ({
        books: this.state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })  
}

  render() {
    return (
      <div className="app">        
          <Route exact path="/" render={() =>(        
            <ListBooks   
              books={this.state.books}
              updateShelf = {(book,shelf)=> {this.updateShelf(book,shelf)} }          
            />
          )}/>     
          <Route path="/search" render={() =>(        
            <SearchBooks
              books={this.state.books}
              updateShelf = {(book,shelf)=> {this.updateShelf(book,shelf)} }    
            />
          )}/>   
      </div>
    )
  }
}

export default BooksApp
