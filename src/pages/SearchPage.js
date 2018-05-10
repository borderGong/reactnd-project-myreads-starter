import React from 'react'
import Book from '../Book';
import { getAll, search} from '../BooksAPI';
import { Link } from 'react-router-dom';
import { books as store } from '../stores/myRead.store';
import * as _ from 'lodash';

class BooksApp extends React.Component {
  constructor(){
    super();
    this.handleChangeType = this._handleChangeType.bind(this);
    this.handleChange = this._handleChange.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // 关键字
    keyword: '',
    // 搜索列表
    searchList: []
  }
  combineStateFromStore(books){
    return books.map(book => store.find(item => item.id === book.id) ? Object.assign(book, store.find(item => item.id === book.id)) : book);
  }
  _handleChange(e){
    const keyword = this.refs['input'].value;
    search(keyword)
        .then(response => {
            if(response){
                console.log(response);
                if(Array.isArray(response)){
                  const searchBooks = this.combineStateFromStore(response);
                  this.setState({searchList: searchBooks});
                }else{
                  this.setState({searchList: []});
                }
            }
        })
  }
  _handleChangeType(e, bookInfo, type){
    const bookIndex = store.findIndex(item => item.id === bookInfo.id);
    const shelfText = e.target.value;
    // 如果不存在该本书数据就添加数据否者更新数据
    if(!(~bookIndex)){
      store.push(Object.assign(bookInfo, {shelf: e.target.value}));
    }else{
      Object.assign(store[bookIndex], {shelf: e.target.value});
    }
    localStorage.setItem('books', JSON.stringify(store.peek()));
    this.setState(perState => {
      return {
        searchList: perState.searchList.map(item => item.id === bookInfo.id ? 
          Object.assign({}, item, {shelf: shelfText}) : item)
      } 
    })
  }
  componentDidMount(){
  
  }
  render() {
    return (
      <div className="app">
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" ref="input" onChange={_.debounce(this.handleChange, 400)} placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              { this.state.searchList.length > 0 ? (this.state.searchList.map(item => <Book handleChange={this.handleChangeType} bookInfo={item} key={item.id} {...item} />)) : <div>没有数据</div> }
              </ol>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
