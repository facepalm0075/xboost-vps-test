import React from "react";
import Page1 from "./pages/Page1";
type props = {
  number: number;
};

function Tabs({ number }: props) {
  return (
    <div>
      {number == 1 ? <Page1 number={number} /> : null}
      {number == 2 ? <Page1 number={number} /> : null}
      {number == 3 ? <Page1 number={number} /> : null}
    </div>
  );
}

export default Tabs;
