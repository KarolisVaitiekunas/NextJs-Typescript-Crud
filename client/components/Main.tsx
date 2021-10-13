import React, { ReactElement } from "react";

interface Props {}

export default function Main({}: Props): ReactElement {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5px" }}>
      helo \o/, use the navigation to do navigate
    </div>
  );
}
