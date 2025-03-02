package org.example.backend.config.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.domain.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenProvider {
    private final JwtProperties jwtProperties;

    public String generateToken(User user, Duration expiredAt){
        Date now=new Date();
        return makeToken(new Date(now.getTime()+expiredAt.toMillis()),user);
    }

    private String makeToken(Date expiry,User user){
        Date now=new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE,Header.JWT_TYPE)
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .setSubject(user.getUsername())
                .claim("id",user.getId())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();
    }

    public void validateToken(String token) {
        Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token);
    }


    public Authentication getAuthentication(String token){
        Claims claims=getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
        User user=new User(getUserId(token),claims.getSubject());
        return new UsernamePasswordAuthenticationToken(user, "", authorities);
        //UserDetails userDetails = new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities);
        //return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
    }

    private Claims getClaims(String token){
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getUserId(String token){
        Claims claims=getClaims(token);
        return claims.get("id", Long.class);
    }
}
