import React from "react";

import Tag from "./tag";

function Book(props) {
  function addTagFilter(tag) {
    const params = new URLSearchParams(document.location.search.substring(1));
    let tags = tag;
    if (params.has("tags")) {
      tags = params.get("tags");
      if (!tags.includes(tag)) {
        tags = `${tags},${tag}`;
      }
    }
    params.set("tags", tags);
    window.history.pushState(
      {
        path: `?${params}`,
      },
      "",
      `?${params}`
    );
    window.dispatchEvent(new Event("popstate"));
  }

  function setBookStatus(id) {
    const transferStatus = !this.props.currentTab
      ? "inprogress"
      : this.props.currentTab === "inprogress"
      ? "done"
      : "";

    if (this.props.currentTab) {
      const booksInCurrentStatus = JSON.parse(
        localStorage.getItem(this.props.currentTab)
      );
      localStorage.setItem(
        this.props.currentTab,
        JSON.stringify(booksInCurrentStatus.filter((bookId) => bookId !== id))
      );
    }

    if (transferStatus) {
      const booksInTransferStatus = JSON.parse(
        localStorage.getItem(transferStatus)
      );
      booksInTransferStatus.push(id);
      localStorage.setItem(
        transferStatus,
        JSON.stringify(booksInTransferStatus)
      );
    }
    window.dispatchEvent(new Event("popstate"));
  }

  const { book, currentTab, linkContent } = props;

  return (
    <li>
      <div>{book.author}</div>
      <div className={"book-list__row"}>
        <h3>{book.title}</h3>
        <span
          className={
            currentTab === "done"
              ? "book-list__status-link book-list__status-link_done"
              : "book-list__status-link"
          }
          onClick={setBookStatus.bind(this, book.id)}
        >
          {linkContent}
        </span>
      </div>
      <p>{book.description}</p>
      <ul className={"tags"}>
        {book.tags.map((tag) => (
          <Tag key={tag} tag={tag} callBack={addTagFilter} />
        ))}
      </ul>
    </li>
  );
}

export default Book;
