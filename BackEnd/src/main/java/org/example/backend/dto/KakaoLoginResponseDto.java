package org.example.backend.dto;

import lombok.Data;

@Data
public class KakaoLoginResponseDto {
    String refreshToken;
    String accessToken;
}
