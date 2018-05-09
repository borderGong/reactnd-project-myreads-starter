import React from 'react'
// import * as BooksAPI from './BooksAPI'
import Book from '../Book';
import {getAll} from '../BooksAPI';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { books as store } from '../stores/myRead.store';

const BooksApp = observer(class BooksApp extends React.Component {
  constructor(){
    super();
    this.handleChange = this._handleChange.bind(this);
  }
  _handleChange(e, bookInfo){
    Object.assign(bookInfo, {shelf: e.target.value});
  }
  componentDidMount(){

  }
  render() {
    console.log(store);
    const currentlyReading = store.filter(item => item.shelf === 'currentlyReading');
    const wantToRead = store.filter(item => item.shelf === 'wantToRead');
    const read = store.filter(item => item.shelf === 'read');
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
                      { currentlyReading.length > 0 ? (currentlyReading.map(item => <Book handleChange={this.handleChange} key={item.id} bookInfo={item} {...item} />)) : <div>没有数据</div> }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { wantToRead.length > 0 ? (wantToRead.map(item => <Book handleChange={this.handleChange} key={item.id} bookInfo={item} {...item} />)) : <div>没有数据</div> }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { read.length > 0 ? (read.map(item => <Book handleChange={this.handleChange} key={item.id} bookInfo={item} {...item} />)) : <div>没有数据</div> }
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
});

export default BooksApp
