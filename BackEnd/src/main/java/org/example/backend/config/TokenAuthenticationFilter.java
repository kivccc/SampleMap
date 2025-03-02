package org.example.backend.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.config.jwt.TokenProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final static String HEADER_AUTHORIZATION="Authorization";
    private final static String TOKEN_PREFIX="Bearer ";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException{
        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/login/")) {
            filterChain.doFilter(request, response);
            return;
        }
        String authHeader=request.getHeader(HEADER_AUTHORIZATION);
        String token=getAccessToken(authHeader);

        try {
            tokenProvider.validateToken(token); // 예외가 발생하면 catch 블록으로 이동
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("토큰에서 추출된 유저 정보 "+authentication.getPrincipal());
            log.info("토큰에서 추출된 유저 ID "+tokenProvider.getUserId(token));
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            handleException(response, "Token has expired", HttpServletResponse.SC_UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            handleException(response, "Token is null or empty", HttpServletResponse.SC_BAD_REQUEST);
        }
    }

    private void handleException(HttpServletResponse response, String message, int status) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }

    private String getAccessToken(String authorizationHeader){
        if(authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)){
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }
        return null;
    }


}
