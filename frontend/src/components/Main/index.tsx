import axios from "axios";
import * as M1 from "./index.styled";
import { useState, useEffect } from "react";
import useKakaoLoader from "../useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import markerGroup from '../../img/markerGroup.png';
import markerPrivate from '../../img/markerPrivate.png';



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
    { title: "충무로역 1번 출구", latlng: { lat: 37.5614380, lng: 126.9955462 }, type: 'private' },
    { title: "충무로역 2번 출구", latlng: { lat: 37.5613119, lng: 126.9949464 }, type: 'group' },
    { title: "충무로역 3번 출구", latlng: { lat: 37.5610235, lng: 126.9936137 }, type: 'private' },
    { title: "충무로역 4번 출구", latlng: { lat: 37.5609649, lng: 126.9927393 }, type: 'group' },
    { title: "충무로역 5번 출구", latlng: { lat: 37.5612037, lng: 126.9929148 }, type: 'private' },
    { title: "충무로역 6번 출구", latlng: { lat: 37.5614492, lng: 126.9931071 }, type: 'group' },
    { title: "충무로역 7번 출구", latlng: { lat: 37.5614334, lng: 126.9933278 }, type: 'private' },
    { title: "충무로역 8번 출구", latlng: { lat: 37.5616723, lng: 126.9954217 }, type: 'group' },
  ]
  
  const [filter, setFilter] = useState<'all' | 'private' | 'group'>('all');
  const privateOnClick = () => setFilter('private');
  const groupOnClick = () => setFilter('group');
  const allOnClick = () => setFilter('all');

  const filteredPositions = positions.filter((position) => {
    if (filter === 'all') return true;
    return position.type === filter;
  });

  return (
    <M1.MapContainer>
      <Map
        center={{ lat: 37.561533, lng: 126.994029 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        {filteredPositions.map((position) => (
          <MapMarker
            key={`${position.title}-${position.latlng.lat}-${position.latlng.lng}`}
            position={position.latlng}
            image={{
              src: position.type === 'private' ? markerPrivate : markerGroup,
              size: { width: 25, height: 35 },
            }}
            title={position.title}
          />
        ))}
      </Map>
      <M1.ButtonDiv>
        <M1.Private onClick={privateOnClick}> 개인 </M1.Private>
        <M1.Group onClick={groupOnClick}> 그룹 </M1.Group>
        <M1.All onClick={allOnClick}> 전체 </M1.All>
      </M1.ButtonDiv>
    </M1.MapContainer>
  );
}

export default Main;