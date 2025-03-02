package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.User;
import org.example.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    public User findById(Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("Id 오류"));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByName(username)
                .orElseThrow(()->new UsernameNotFoundException("해당하는 username 찾을 수 없음"));
    }
}
