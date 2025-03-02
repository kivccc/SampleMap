package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.PersonalPlace;
import org.example.backend.domain.User;
import org.example.backend.dto.MapRecordRequestDto;
import org.example.backend.dto.MapRecordResponseDto;
import org.example.backend.repository.MapRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapService {
    private final MapRepository mapRepository;
    private final UserRepository userRepository;

    public Long savePersonalPlace(MapRecordRequestDto dto,Long userId){
        User user=userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("유저 찾을 수 없음 " +userId));
        PersonalPlace personalPlace=PersonalPlace.createPersonalPlace(user,dto.getPlaceName(),dto.getPlaceText(),dto.getLatitude(),dto.getLongitude(),dto.getVisitedAt());
        mapRepository.save(personalPlace);
        return personalPlace.getPlaceId();
    }

    public List<MapRecordResponseDto> getPersonalPlaces(Long userId){
        User user=userRepository.findById(userId).orElseThrow(()-> new IllegalArgumentException("유저 찾을 수 없음 " +userId));
        List<PersonalPlace> places=mapRepository.findByUser(user);

        List<MapRecordResponseDto> mapList= new ArrayList<>();
        for(PersonalPlace place:places){
            MapRecordResponseDto responseDto=new MapRecordResponseDto();
            responseDto.setPlaceId(place.getPlaceId());
            responseDto.setPlaceName(place.getPlaceName());
            responseDto.setPlaceText(place.getPlaceText());
            responseDto.setLatitude(place.getLatitude());
            responseDto.setLongitude(place.getLongitude());
            responseDto.setVisitedAt(place.getVisitedAt());
            mapList.add(responseDto);
        }
        return mapList;
    }

}
