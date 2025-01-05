package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.KakaoLoginResponseDto;
import org.example.backend.dto.KakaoUserInfoResponseDto;
import org.example.backend.service.AuthService;
import org.example.backend.service.KakaoTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final KakaoTokenService kakaoTokenService;
    private final AuthService authService;
    @GetMapping("/login/oauth2/callback/kakao/{code}")
    public ResponseEntity<?> callBack(@PathVariable String code){
        String accessToken = kakaoTokenService.getKakaoAccessToken(code);
        KakaoUserInfoResponseDto kakaoUserInfoResponseDto=kakaoTokenService.getUserInfo(accessToken);
        KakaoLoginResponseDto kakaoLoginResponseDto=authService.authenticate(kakaoUserInfoResponseDto);
        kakaoLoginResponseDto.setName(kakaoUserInfoResponseDto.getKakaoAccount().getProfile().getNickName());
        return ResponseEntity.ok().body(kakaoLoginResponseDto);
    }
}
