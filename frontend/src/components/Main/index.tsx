import axios from "axios";
import * as M1 from "./index.styled";
import { useState, useEffect } from "react";
import useKakaoLoader from "../useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

import markerAll from '../../img/markerAll.png';
import markerGroup from '../../img/markerGroup.png';
import markerPersonal from '../../img/markerPersonal.png';



const Main = () => {
  // 브라우저 높이 변화 감지 및 지정 관련 코드
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const getWindowHeight = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowHeight);

    return () => {
      window.removeEventListener("resize", getWindowHeight);
    };
  }, []);



  const [userData, setUserData] = useState(null);
  // 예시 JWT 설정
  // localStorage.setItem("JWT", "exampleJWT");

  // 예시 JWT 정보 저장
  const jwt = localStorage.getItem("JWT");
  console.log(jwt);

  // 예시 JWT로 사용자 데이터 호출 함수
  const getUserData = async() => {
    try{
      // const res = await axios.get("exampleAPI/${jwt}");
      // console.log(res.data);
      // setUserData(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userData]);


  // 예시 데이터
  const positions = [
    { title: "충무로역 1번 출구", latlng: { lat: 37.5614380, lng: 126.9955462 }, type: 'personal', content: "내용1" },
    { title: "충무로역 2번 출구", latlng: { lat: 37.5613119, lng: 126.9949464 }, type: 'group', content: "내용2" },
    { title: "충무로역 3번 출구", latlng: { lat: 37.5610235, lng: 126.9936137 }, type: 'personal', content: "내용3" },
    { title: "충무로역 4번 출구", latlng: { lat: 37.5609649, lng: 126.9927393 }, type: 'group', content: "내용4" },
    { title: "충무로역 5번 출구", latlng: { lat: 37.5612037, lng: 126.9929148 }, type: 'personal', content: "내용5" },
    { title: "충무로역 6번 출구", latlng: { lat: 37.5614492, lng: 126.9931071 }, type: 'group', content: "내용6" },
    { title: "충무로역 7번 출구", latlng: { lat: 37.5614334, lng: 126.9933278 }, type: 'personal', content: "내용7" },
    { title: "충무로역 8번 출구", latlng: { lat: 37.5616723, lng: 126.9954217 }, type: 'group', content: "내용8" },
  ]
  
  const [filter, setFilter] = useState<'all' | 'personal' | 'group'>('all');
  const personalOnClick = () => setFilter('personal');
  const groupOnClick = () => setFilter('group');
  const allOnClick = () => setFilter('all');

  const filteredPositions = positions.filter((position) => {
    if (filter === 'all') return true;
    return position.type === filter;
  });



  const saveUserPlace = async() => {
    try{
      // const res = await axios.get("exampleAPI/${jwt}");
      // console.log(res.data);
      // setUserData(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  interface Marker {
    position: {
      lat: number;
      lng: number;
    }
  }

  const [markers, setMarkers] = useState<Marker[]>([]);

  return (
    <M1.MapContainer>
      <Map
        center={{ lat: 37.561533, lng: 126.994029 }}
        style={{ width: "100%", height: "62.5%" }}
        level={3}
        onClick={(_target, mouseEvent) => {
          setMarkers([
            {
              position: {
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              },
            },
          ])
        }}
      >
        {filteredPositions.map((position) => (
          <MapMarker
            key={`${position.title}-${position.latlng.lat}-${position.latlng.lng}`}
            position={position.latlng}
            image={{
              src: position.type === 'personal' ? markerPersonal : markerGroup,
              size: { width: 25, height: 35 },
            }}
            title={position.title}
          />
        ))}
        {markers.map((marker, index) =>
          marker.position.lat !== null && marker.position.lng !== null ? (
          <MapMarker
            key={`${marker.position.lat}-${marker.position.lng}`}
            position={marker.position}
            image={{
            src: markerAll,
            size: { width: 25, height: 35 },
            }}
          />
          ) : (
          <></>
          )
        )}
      </Map>
      <ContentContainer>
        <M1.ButtonDiv>
          <M1.Save> 기록 </M1.Save>
          <M1.Personal onClick={personalOnClick}> 개인 </M1.Personal>
          <M1.Group onClick={groupOnClick}> 그룹 </M1.Group>
          <M1.All onClick={allOnClick}> 전체 </M1.All>
        </M1.ButtonDiv>
        <Contents>
          <Content>
            <div>
            {markers.map((marker, index) => (
              <p key={index}>
                {marker.position.lat}, {marker.position.lng}
              </p>
            ))}
            </div>
            <p> 기록할 위치를 지정해주세요... </p>
            <input placeholder="제목"></input>

            <textarea placeholder="추억을 기록하세요..."></textarea>
          </Content>
        </Contents>
      </ContentContainer>
    </M1.MapContainer>
  );
}

export default Main;

/*
        {filteredPositions.map((position) => (
          <Content
            key={`${position.title}-${position.latlng.lat}-${position.latlng.lng}`}
          >
            <p> {position.title} </p>
            <p> {position.content} </p>
          </Content>
        ))}
*/


const ContentContainer = styled.div`
  height : 37.5%;
  width : 100%;
  bottom : 0px;
  z-index : 10;
  display : flex;
  position : fixed;
  align-items : center;
  flex-direction : column;
`

const Contents = styled.div`
  width : 100%;
  overflow : scroll;

  &::-webkit-scrollbar {
    display : none;
  }
`

const Content = styled.div`
  width : 100%;
  margin : 25px 0px;
  border-top : 1px solid #000000;
  border-bottom : 1px solid #000000;

  input {
    width : 100%;
    border : none;
    padding : 10px 0px;
    text-align : center;
  }

  textarea {
    width : 100%;
    border : none;
    padding : 10px 0px;
    text-align : center;
  }

  p {
    padding : 10px;
    text-align : center;
  }
`

/*
*/