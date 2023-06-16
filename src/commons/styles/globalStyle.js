import { css } from '@emotion/react'

export const globalStyles = css`
    *{
        margin: 0;
        /* box-sizing: border-box; */
        font-family: "myfont";
    }

    @font-face {
        font-family: "myfont";
        src: url("/fonts/초보.ttf");
    }

    @font-face {
    font-family: "one";
    src: url("/fonts/초보.ttf");
  }

  @font-face {
    font-family: "two";
    src: url("/fonts/표준.ttf");
  }

  @font-face {
    font-family: "three";
    src: url("/fonts/숙련.ttf");
  }

  @font-face {
    font-family: "four";
    src: url("/fonts/전문.ttf");
  }

  @font-face {
    font-family: "five";
    src: url("/fonts/예술.ttf");
  }
`;