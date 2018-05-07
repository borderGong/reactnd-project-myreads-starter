import React from 'react';

export default (props) => (<li>
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
            <select value={props.type || 'none'} onChange={e => props.handleChange(e, props.bookInfo, props.type)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
            </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors.join(' ')}</div>
    </div>
</li>);