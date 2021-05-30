import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

import BooksList from "./components/books-list";
import StatusFilter from "./components/status-filter";
import TagFilters from "./components/tag-filters";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      inProgress: [],
      done: [],
      statusFilter: "",
      tagFilters: [],
    };

    // Выглядит как дичь
    window.addEventListener("popstate", () => {
      this.updateFilters();
    });
  }

  updateFilters() {
    const params = new URLSearchParams(document.location.search.substring(1));
    const currentTab = params.get("tab");
    const currentTagsString = params.get("tags");

    if (currentTab) {
      this.setState({
        statusFilter: currentTab,
      });
    } else {
      this.setState({
        statusFilter: "",
      });
    }

    if (currentTagsString) {
      this.setState({
        tagFilters: currentTagsString.split(","),
      });
    } else {
      this.setState({
        tagFilters: [],
      });
    }

    if (localStorage.getItem("inprogress")) {
      this.setState({
        inProgress: JSON.parse(localStorage.getItem("inprogress")),
      });
    } else {
      localStorage.setItem("inprogress", JSON.stringify([]));
    }

    if (localStorage.getItem("done")) {
      this.setState({
        done: JSON.parse(localStorage.getItem("done")),
      });
    } else {
      localStorage.setItem("done", JSON.stringify([]));
    }
  }

  componentDidMount() {
    this.updateFilters();

    fetch(
      "https://raw.githubusercontent.com/lastw/test-task/master/data/10-items.json"
      // "https://raw.githubusercontent.com/lastw/test-task/master/data/30000-items.json" // todo: не хватает опыта для оптимизации
    )
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const {
      error,
      isLoaded,
      items,
      inProgress,
      done,
      statusFilter,
      tagFilters,
    } = this.state;
    if (error) {
      return (
        <div className={"container"}>
          <div className={"centered"}>
            Error: {error.status} {error.message}
          </div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className={"container"}>
          <div className={"centered"}>Loading...</div>
        </div>
      );
    } else {
      let filtered = items.filter(
        (book) =>
          !inProgress.some((bookInProgress) => book.id === bookInProgress) &&
          !done.some((doneBook) => book.id === doneBook)
      );
      switch (statusFilter) {
        case "inprogress":
          filtered = items.filter((book) =>
            inProgress.some((bookInProgress) => book.id === bookInProgress)
          );
          break;
        case "done":
          filtered = items.filter((book) =>
            done.some((doneBook) => book.id === doneBook)
          );
          break;
      }

      if (tagFilters.length) {
        // todo: оптимизировать
        tagFilters.forEach((tag) => {
          filtered = filtered.filter((book) =>
            book.tags.some((bookTags) => bookTags === tag)
          );
        });
      }

      return (
        <div className={"container"}>
          <StatusFilter
            toReadLength={items.length - inProgress.length - done.length}
            inProgressLength={inProgress.length}
            doneLength={done.length}
            currentTab={statusFilter}
          />
          {tagFilters.length > 0 && <TagFilters current={tagFilters} />}
          <BooksList list={filtered} currentTab={statusFilter} />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
