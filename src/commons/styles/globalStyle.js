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

  @font-face {
    font-family: "six";
    src: url("/fonts/지코.ttf");
  }

  @font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
  }
`;