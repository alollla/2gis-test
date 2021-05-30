import React from "react";

class StatusFilter extends React.Component {
  setStatusFilter(filter) {
    const params = new URLSearchParams(document.location.search.substring(1));
    if (filter !== "") {
      params.set("tab", filter);
    } else {
      params.delete("tab");
    }
    window.history.pushState(
      { path: params.toString() !== "" ? `?${params}` : "/" },
      "",
      params.toString() !== "" ? `?${params}` : "/"
    );
    window.dispatchEvent(new Event("popstate"));
  }

  render() {
    return (
      <ul className={"tab"}>
        <li
          className={this.props.currentTab === "" ? "active" : ""}
          onClick={this.setStatusFilter.bind(this, "")}
        >
          To Read ({this.props.toReadLength})
        </li>
        <li
          className={this.props.currentTab === "inprogress" ? "active" : ""}
          onClick={this.setStatusFilter.bind(this, "inprogress")}
        >
          In progress ({this.props.inProgressLength})
        </li>
        <li
          className={this.props.currentTab === "done" ? "active" : ""}
          onClick={this.setStatusFilter.bind(this, "done")}
        >
          Done ({this.props.doneLength})
        </li>
      </ul>
    );
  }
}

export default StatusFilter;
