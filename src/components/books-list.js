import React from "react";

import Book from "./book";

class BooksList extends React.Component {


  render() {
    const { list, currentTab } = this.props;
    if (!list.length) {
      return <div className={"centered"}>List is empty</div>;
    } else {
      let linkContent = "start reading";
      switch (currentTab) {
        case "inprogress":
          linkContent = "finish reading";
          break;
        case "done":
          linkContent = "return in «to read»";
          break;
      }

      return (
        <ul className={"book-list"}>
          {list.map((item) => (
            <Book key={item.id} book={item} currentTab={currentTab} linkContent={linkContent}/>
          ))}
        </ul>
      );
    }
  }
}

export default BooksList;
