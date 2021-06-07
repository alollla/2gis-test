import React from "react";

import Tag from "./tag";

function TagFilters(props) {
  function removeTagFilter(tag, clear) {
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

  function clearTagFilter () {
    removeTagFilter(null, true);
  }

  return (
    <ul className={"tags tags_filter"}>
      <li className={"tags__no-bg tags__no-bg_text"}>Filtered by tags:</li>
      {props.current.map((tag) => (
        <Tag key={tag} tag={tag} callBack={removeTagFilter} />
      ))}
      <li className={"tags__no-bg"} onClick={clearTagFilter}>
        (<span>clear</span>)
      </li>
    </ul>
  );
}

export default TagFilters;
