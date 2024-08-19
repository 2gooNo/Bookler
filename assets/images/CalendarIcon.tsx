import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CalendarIcon(props: any) {
  return (
    <Svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="r-4qtqp9 r-1xvli5t r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1bwzh9t"
      fill="rgb(113, 118, 123)"
      {...props}
    >
      <Path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13A2.5 2.5 0 013 18.5v-12A2.5 2.5 0 015.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z" />
    </Svg>
  );
}

export default CalendarIcon;
