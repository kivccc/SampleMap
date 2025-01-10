import styled from 'styled-components';



export const MapContainer = styled.div`
  width : 100%;
  height : 100vh;
`

export const ButtonDiv = styled.div`
  margin : 10px 25px;
`

const Button = styled.button`
  width : 50px;
  height: 50px;
  border : none;
  padding: 10px;
  margin: 0px 5px;
  font-size: 15px;
  cursor : pointer;
  color : #FFFFFF;
  font-weight : bold;
  border-radius : 25px;
`

export const Save = styled(Button)`
  background-color : #AAAAAA;
`

export const Personal = styled(Button)`
  background-color : #30e291;
`

export const Group = styled(Button)`
  background-color : #00709b;
`

export const All = styled(Button)`
  background-color : #2f4858;
`