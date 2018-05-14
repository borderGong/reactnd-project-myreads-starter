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
    localStorage.setItem('books', JSON.stringify(store.peek()));    
  }
  createShelf(){
    const random = Math.round(Math.random() * 10);
    if(random >= 0 && random <= 3){
      return 'currentlyReading';
    }
    if(random > 3 && random <= 6){
      return 'wantToRead';
    }
    if(random > 6){
      return 'read';
    }
  }
  componentDidMount(){

    const booksStr = localStorage.getItem('books');
    // 如果第一次加载获取api数据 否则读取缓存数据
    if(!booksStr){
      getAll()
        .then(response => {
          if(Array.isArray(response)){
            const searchBooks = response.map(item => Object.assign(item, {shelf: this.createShelf()}));
            searchBooks.forEach(item => store.push(item));
          }
        })
      return;  
    }
    try{
      const books = JSON.parse(booksStr);
      books.forEach(book => {
        const bookIndex = store.findIndex(item => item.id === book.id);
        // 如果不存在该本书数据就添加数据否者更新数据
        if(!(~bookIndex)){
          store.push(book);
        }else{
          Object.assign(store[bookIndex], book);
        }
      })
      
    }catch(e){

    }
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
