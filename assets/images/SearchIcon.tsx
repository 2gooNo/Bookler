import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SearchIcon(props: any) {
  return (
    <Svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="r-4qtqp9 r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e"
      fill="#FFFFFF"
      {...props}
    >
      <Path d="M10.25 3.75a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm-8.5 6.5a8.5 8.5 0 1115.176 5.262l4.781 4.781-1.414 1.414-4.781-4.781A8.5 8.5 0 011.75 10.25z" />
    </Svg>
  );
}

export default SearchIcon;
