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

  serachBook =(book)=>{
      
}
  render() {
    return (
      <div className="app">        
          <Route exact path="/" render={() =>(        
            <ListBooks   
              books={this.state.books}           
            />
          )}/>     
          <Route path="/search" render={({history}) =>(        
            <SearchBooks    
               onSerachBook={(book) =>{
                this.serachBook(book)
                history.push('/')
            }}        
            />
          )}/>   
      </div>
    )
  }
}

export default BooksApp
