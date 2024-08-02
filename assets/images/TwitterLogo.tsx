import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";

function TwitterLogo(props: any) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0_0_331)" d="M0 0H22V20H0z" />
      <Defs>
        <Pattern
          id="pattern0_0_331"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_0_331"
            transform="matrix(.02392 0 0 .02632 -.002 0)"
          />
        </Pattern>
        <Image
          id="image0_0_331"
          width={42}
          height={38}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAmCAYAAACyAQkgAAAAAXNSR0IArs4c6QAAAo9JREFUWEfVmLtOAkEUhmcfwkKBxN5So0E7Wi+JRkOlndBg4q2hUitsUKM0QCcV0WjipaUwQaLRp1D0MTCHZMju7Jk5Z2ancStgh5lvz/zzzz8bjE1ODcQ/uILOS3eQSU9YofbePsRFrS6++r9W/9M1zqTGRbvVRG/f3j+Ks6u6CCrVy8FuqWg9IIBCB0kvgOx2ntFuoCD5rcLwXgBTv79TFC6w+c1t0Xv/TMTavm6I7NxMrI/v/o+Yzy2Nfh+CwrfXzpNIp+wkAJ0BrKsEuJCjisIHqZMwrAqCtYHpOSwfWcPqIIEFm6lRRaEBJgFVi5w2lBZMUtPJKQKaBJar1421FVGtHKPPYuojBqrT60JuMTK9mKbVNipNdnZaa0OUi6Cgrno1LS6TDd3cPYiDMl5l+bAoqJTA+upyxAlc9cr1SpO2taBJ9ArVgSrJy8aGdLBGUB969QEZ8VFqH7b1V9AreCyscuziugSp0XDnsFqrpycRvcLUhoOJzTZsC8mqqATmGD0H1gXSChQaY3pTBzZlBsornVc99kcVhJMHoB+OV3oF5WwGHJlQeUC9T9oT1iEHhNPGBtYJlLsZuOQBZ8M3PTUFwpEJt6rOFYUBOCC+JJAIVBfbXMOL11UvOzNlS2ijwlIyoSTgVFFTbAsPGA7SHJl4rSgXEgZVNwMIKHulgjHjelv1pth2XmuQIK6Ly2rqOdmSA+KiVzYonBy52RJ7oKR6ZYHansM5CwfLuKZ0RYKabEg9G4UXAgbLCds6WCNoknM4Nw9QMiGPIj6OuDAIpu1w2ObIRJvwfUHKariEbVUC6NRzbIja8ii9qpsBZWsxUN+Q1OEw8qKi1Yy9o5W2FgG18UqbippgqX5k5f8AC9mesOTRQnAAAAAASUVORK5CYII="
        />
      </Defs>
    </Svg>
  );
}

export default TwitterLogo;
