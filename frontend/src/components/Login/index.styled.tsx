import styled, { keyframes } from 'styled-components';



const Container = styled.div`
  display: flex;
  align-items : center;
  flex-direction : column;
  justify-content : center;
`

export const LoginContainer = styled(Container)`
  height : 100vh;
  opacity : 0.875;
  background-image: linear-gradient(to left bottom, #30e291, #08d79a, #00cca0, #00c1a3, 
 #00b5a4, #00aaa2, #00a09f, #00959b, #008995, #007d8d, #097185, #13657b);
`

export const ImgContainer = styled(Container)`
  border-radius : 50px;
  background-origin : border-box;
  border : 5px solid transparent;
  background-clip : content-box, border-box;
  background-image : linear-gradient(#FFFFFF, #FFFFFF), 
                     linear-gradient(to right top, #30E291 0%, #00709B 100%);
`

export const LogoImg = styled.img`
  width : 300px;
  padding : 50px;
  margin : 25px 0px 50px;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

export const MarkerImg = styled.img`
  opacity: 0;
  width: 100px;
  animation: ${fadeIn} 2s ease-in-out forwards;
`;

export const Comment = styled.p`
  font-weight: bold;
  background: linear-gradient(to right top, #30E291, #00709B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const LoginImg = styled(LogoImg)`
  padding : 0px;
  cursor : pointer;
  margin : 50px 50px 75px;
`