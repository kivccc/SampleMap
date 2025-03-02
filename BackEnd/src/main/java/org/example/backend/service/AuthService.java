package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.config.jwt.TokenProvider;
import org.example.backend.domain.User;
import org.example.backend.dto.KakaoLoginResponseDto;
import org.example.backend.dto.KakaoUserInfoResponseDto;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final UserDetailService userDetailService;

    //테스트용으로 300시간설정
    public static final Duration ACCESS_TOKEN_DURATION=Duration.ofHours(300);

    public KakaoLoginResponseDto authenticate(KakaoUserInfoResponseDto userInfo){
        Optional<User> userOptional=userRepository.findById(userInfo.getId());

        User user=userOptional.orElseGet(()->{
            User newUser= User.createUser(userInfo);
            return userRepository.save(newUser);
        });
        String acceessToken=tokenProvider.generateToken(user,ACCESS_TOKEN_DURATION);
        KakaoLoginResponseDto kakaoLoginResponseDto=new KakaoLoginResponseDto();
        kakaoLoginResponseDto.setAccessToken(acceessToken);
        return kakaoLoginResponseDto;
    }
}
