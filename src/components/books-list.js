import React from "react";

class BooksList extends React.Component {
  addTagFilter(tag) {
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

  setBookStatus(id) {
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
            <li key={item.id}>
              <div>{item.author}</div>
              <div className={"book-list__row"}>
                <h3>{item.title}</h3>
                <span
                  className={
                    currentTab === "done"
                      ? "book-list__status-link book-list__status-link_done"
                      : "book-list__status-link"
                  }
                  onClick={this.setBookStatus.bind(this, item.id)}
                >
                  {linkContent}
                </span>
              </div>
              <p>{item.description}</p>
              <ul className={"tags"}>
                {item.tags.map((tag) => (
                  <li key={tag} onClick={this.addTagFilter.bind(this, tag)}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default BooksList;
