import React from "react";

function Tag(props) {
  const { callBack, tag } = props;

  return <li onClick={callBack(tag)}>#{tag}</li>;
}

export default Tag;
