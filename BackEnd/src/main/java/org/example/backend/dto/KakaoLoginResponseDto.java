package org.example.backend.dto;

import lombok.Data;

@Data
public class KakaoLoginResponseDto {
    String accessToken;
    String name;
}
