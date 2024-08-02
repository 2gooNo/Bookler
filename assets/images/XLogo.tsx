import * as React from "react";
import Svg, { Path } from "react-native-svg";

function XLogo(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width="50px"
      height="50px"
      {...props}
    >
      <Path d="M0 256V0h256v256z" strokeMiterlimit={10} />
      <Path
        d="M5.92 6l14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6zm3.797 2h7.164l23.322 34H33.04z"
        transform="scale(5.12)"
        fill="#fff"
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export default XLogo;
