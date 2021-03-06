import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

class SearchBooks extends Component{
    state ={
        booksInDep : []
    }
    serachBook =(query)=>{
        BooksAPI.search(query,10).then(
            (booksInDep) =>{this.setState({booksInDep:booksInDep})}//,
          /*this.setState(state => ({
            booksInDep: this.state.booksInDep.filter(b => b.id === this.props.books.id).map(shelf=>this.props.books.shelf)
          }))*/
        )         
    }
    render(){
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className='close-search' to='/'>Close</Link>
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
                        value={this.state.query}
                        onChange={(event) => this.serachBook(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.booksInDep.map((bookInDep) => (
                            <li key={bookInDep.id} className='book-list-item'>
                            <div className="book">
                            <div className="book-top">
                                <div className="book-cover" 
                                    style={{ width: 128, 
                                        height: 193, 
                                        backgroundImage: `url(${bookInDep.imageLinks.smallThumbnail})`
                                    }}>
                                </div>
                                <div className="book-shelf-changer">
                                <select  value="none" onChange={(event) => this.props.updateShelf(bookInDep,event.target.value)}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                                </div>
                            </div>
                            <div className="book-title">{bookInDep.title}</div>
                            <div className="book-authors">{bookInDep.authors}</div>
                            </div>   
                            </li>    
                        )
                    )}
              </ol>
            </div>
          </div>
        )
    }
}


export default SearchBooks