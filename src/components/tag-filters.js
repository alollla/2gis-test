import React from "react";

class TagFilters extends React.Component {
  removeTagFilter(tag, clear) {
    const params = new URLSearchParams(document.location.search.substring(1));

    if (clear) {
      params.delete("tags");
    } else {
      let tagsArr = [];
      if (params.has("tags")) {
        tagsArr = params
          .get("tags")
          .split(",")
          .filter((item) => item !== tag);
      }

      if (tagsArr.length) {
        params.set("tags", tagsArr.join(","));
      } else {
        params.delete("tags");
      }
    }

    window.history.pushState(
      { path: params.toString() !== "" ? `?${params}` : "/" },
      "",
      params.toString() !== "" ? `?${params}` : "/"
    );
    window.dispatchEvent(new Event("popstate"));
  }

  clearTagFilter() {}

  render() {
    return (
      <ul className={"tags tags_filter"}>
        <li className={"tags__no-bg tags__no-bg_text"}>Filtered by tags:</li>
        {this.props.current.map((tag) => (
          <li key={tag} onClick={this.removeTagFilter.bind(this, tag)}>
            #{tag}
          </li>
        ))}
        <li
          className={"tags__no-bg"}
          onClick={this.removeTagFilter.bind(this, "", true)}
        >
          (<span>clear</span>)
        </li>
      </ul>
    );
  }
}

export default TagFilters;
