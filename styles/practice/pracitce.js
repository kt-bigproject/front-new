import styled from "@emotion/styled";

export const Alldiv = styled.div`
  background-image: url('/Practice/practicepage.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Alldiv2 = styled.div`
  background-image: url('/Practice/gamepage.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const BannerDiv = styled.div`
  width: 1010px; 
  display : flex;
  flex-direction : column;
  align-items: center;
`

export const BannerDiv2 = styled.div`
  display: flex;
  flex-direction: row;
  width: 1010px;
  height: 410px;
  background-image: url("/Practice/qpost.png");
  background-size: 100% 100%;
  margin-top: 100px;
  justify-content: space-around;
`

export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Context = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Function = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-image: url('/main/effect17.png'); */
  /* background-size: 100% 100%; */

`
export const Mydiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 70px;
`

export const Mydiv2 = styled.div`
  background-image: url('/Practice/line1.png');
  background-size: 100% 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1010px;
  /* box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px; */
`

export const Mydiv3 = styled.div`
`

export const Mydiv4 = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
`
export const Mydiv5 = styled.div`
  display: flex;
  width: 280px;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 5em;
`

export const MyButton1 = styled.button`
  align-items: center;
  background-clip: padding-box;
  background-color: #fa6400;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "one";
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 133.08px;
  height: 48.67px;
  &:hover,
  &:focus {
    background-color: #fb8332;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }


&:active {
  background-color: #c85000;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}

`

export const MyButton2 = styled.button`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: "one";
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 133.08px;
  height: 48.67px;

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
` 