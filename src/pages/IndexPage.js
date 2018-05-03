import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../App.css'
import Book from '../Book';
import {getAll} from '../BooksAPI';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    // 正在阅读
    currentlyReading: [],
    // 想要读
    wantToRead: [],
    // 已经读
    read: [],
  }
  handleChange(e, bookInfo){
    console.log(e.target.value, bookInfo);
  }
  componentDidMount(){
    getAll()
    .then(response => {
      console.log(response);
      this.setState({currentlyReading: response});
    })
  }
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { this.state.currentlyReading.length > 0 ? (this.state.currentlyReading.map(item => <Book handleChange={this.handleChange} bookInfo={item} key={item.id} {...item} />)) : <div>没有数据</div> }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { this.state.wantToRead.length > 0 ? (this.state.wantToRead.map(item => <Book handleChange={this.handleChange} key={item.id} bookInfo={item} {...item} />)) : <div>没有数据</div> }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { this.state.read.length > 0 ? (this.state.read.map(item => <Book handleChange={this.handleChange} key={item.id} bookInfo={item} {...item} />)) : <div>没有数据</div> }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
