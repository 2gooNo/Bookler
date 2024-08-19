import * as React from "react";
import Svg, { Path } from "react-native-svg";

function UploadImgIcon(props: any) {
  return (
    <Svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="r-4qtqp9 r-dnmrzs r-lrvibr r-m6rgpd"
      fill="#ffffff"
      {...props}
    >
      <Path d="M9.697 3H11v2h-.697l-3 2H5a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h14a.5.5 0 00.5-.5V10h2v8.5A2.5 2.5 0 0119 21H5a2.5 2.5 0 01-2.5-2.5v-11A2.5 2.5 0 015 5h1.697l3-2zM12 10.5a2 2 0 10-.001 3.999A2 2 0 0012 10.5zm-4 2a4 4 0 118 0 4 4 0 01-8 0zM17 2a3 3 0 01-3 3v1a3 3 0 013 3h1a3 3 0 013-3V5a3 3 0 01-3-3h-1z" />
    </Svg>
  );
}

export default UploadImgIcon;
