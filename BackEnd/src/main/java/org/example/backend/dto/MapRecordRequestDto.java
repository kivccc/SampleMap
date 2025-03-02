package org.example.backend.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MapRecordRequestDto {
    private String placeName;
    private String placeText;
    private Double latitude;
    private Double longitude;
    private LocalDateTime visitedAt;
}
