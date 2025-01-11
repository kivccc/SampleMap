import axios from "axios";
import * as M1 from "./index.styled";
import { useState, useEffect } from "react";
import useKakaoLoader from "../useKakaoLoader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Textarea from 'react-textarea-autosize';

import mainLogo from '../../img/main_logo.png';
import markerAll from '../../img/markerAll.png';
import markerGroup from '../../img/markerGroup.png';
import markerPersonal from '../../img/markerPersonal.png';

import allText from '../../img/all.png';
import saveText from '../../img/save.png';
import groupText from '../../img/group.png';
import cancelText from '../../img/cancel.png';
import recordText from '../../img/record.png';
import personalText from '../../img/personal.png';


const Main = () => {

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



  const [type, setType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const saveUserPlace = async() => {
    try{
      // const res = await axios.post(
      //   "/savePlace/personal", 
      //   {
      //      type: type, marker: markers, title: title, text: text,
      //   }
      // );
      // console.log(res.data);
      // setUserData(res.data);
      setType('');
      setTitle('');
      setText('');
      setIsRecordON(false);
      setMarkers([]);
    }
    catch(err){
      console.error(err);
    }
  };

  console.log(type, title, text);
  interface Marker {
    position: {
      lat: number;
      lng: number;
    }
  }

  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isRecordOn, setIsRecordON] = useState<boolean>(true);

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
        {isRecordOn && markers.map((marker) =>
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
      <M1.ContentContainer>
        <M1.LogoImg src={mainLogo} />
        {isRecordOn?
        <>
        <M1.RecordImg src={recordText} />
        <M1.Contents>
          <M1.Content>
            <p> 추억할 위치를 지정하고 기록해주세요... </p>
            <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <Textarea placeholder="추억을 기록하세요..." value={text} onChange={(e) => setText(e.target.value)}></Textarea>
            <M1.ButtonDiv>
            <M1.CancelImg src={cancelText} onClick={saveUserPlace}/>
            <M1.SaveImg src={saveText} onClick={saveUserPlace}/>
            </M1.ButtonDiv>
          </M1.Content>
        </M1.Contents>
        </>
        :
        <>
        <M1.RecordImgSide src={recordText} onClick={() => setIsRecordON(true)}/>
        <M1.ButtonDiv>
          <M1.All src={allText} onClick={allOnClick} />
          <M1.Personal src={personalText} onClick={personalOnClick} />
          <M1.Group src={groupText} onClick={groupOnClick} />
        </M1.ButtonDiv>
        <M1.Contents>
        {filteredPositions.map((position) => (
          <M1.Content key={`${position.title}-${position.latlng.lat}-${position.latlng.lng}`}>
            <p> {position.title} </p>
            <p> {position.content} </p>
          </M1.Content>
        ))}
        </M1.Contents>
        </>}
      </M1.ContentContainer>
    </M1.MapContainer>
  );
}

export default Main;