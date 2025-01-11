import styled from 'styled-components';



export const MapContainer = styled.div`
  width : 100%;
  height : 100vh;
`

export const ButtonDiv = styled.div`

`

export const RecordImg = styled.img`
  width : 72.5px;
  margin : 3px 0px 7px;
`

export const RecordImgSide = styled(RecordImg)`
  left : 10px;
  top : 42.5px;
  cursor : pointer;
  position : absolute;
`

export const All = styled.img`
  width : 21.25px;
  cursor : pointer;
  margin : 0px 0px 3px;
`

export const Personal = styled.img`
  width : 88.75px;
  cursor : pointer;
  margin : 3px 17.5px 0px;
`

export const Group = styled.img`
  width : 61.25px;
  cursor : pointer;
  margin : 3px 3px 0px;
`

export const ContentContainer = styled.div`
  width : 100%;
  bottom : 0px;
  z-index : 10;
  height : 37.5%;
  display : flex;
  position : fixed;
  align-items : center;
  flex-direction : column;
  background: linear-gradient(to right, #30E291, #00709B);
`

export const LogoImg = styled.img`
  margin : 12.5px 0px 5px;
`

export const SaveImg = styled.img`
  width : 90px;
  cursor : pointer;
  margin : 7.5px 0px;
`

export const CancelImg = styled(SaveImg)`
  margin-right : 25px;
`

export const Contents = styled.div`
  width : 99.5%;
  height : 77.5%;
  overflow : scroll;
  border-radius : 2.5px;
  background-color : #FFFFFF;

  &::-webkit-scrollbar {
    display : none;
  }
`

export const Content = styled.div`
  width : 100%;
  display : flex;
  align-items : center;
  flex-direction : column;

  input {
    width : 100%;
    border : none;
    padding : 10px 0px;
    text-align : center;
  }

  textarea {
    width : 100%;
    border : none;
    resize : none;
    padding : 10px 0px;
    text-align : center;
  }

  p {
    margin : 7.5px;
    color : #AAAAAA;
  }
`