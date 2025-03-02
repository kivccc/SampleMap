package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.domain.User;
import org.example.backend.dto.MapRecordRequestDto;
import org.example.backend.dto.MapRecordResponseDto;
import org.example.backend.service.MapService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/map")
@RequiredArgsConstructor
public class MapController {

    private final MapService mapService;

    @PostMapping("/saveplace/personal")
    public ResponseEntity<Long> savePersonalPlace(@RequestBody MapRecordRequestDto mapRecordRequestDto, @AuthenticationPrincipal User principal){
        log.info("Principal 정보: {}", principal.getId());
        Long recordId= mapService.savePersonalPlace(mapRecordRequestDto,principal.getId());
        return ResponseEntity.ok().body(recordId);
    }

    @GetMapping("/viewplace/personal")
    public ResponseEntity<List<MapRecordResponseDto>> getPersonalPlaces(@AuthenticationPrincipal User principal){
        List<MapRecordResponseDto> personalPlaces=mapService.getPersonalPlaces(principal.getId());
        return ResponseEntity.ok().body(personalPlaces);
    }

}
