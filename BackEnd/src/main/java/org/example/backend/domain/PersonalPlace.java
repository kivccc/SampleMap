package org.example.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name= "private_places")
public class PersonalPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_id")
    private Long placeId;

    @ManyToOne
    @JoinColumn(name = "user_id") // 유저 ID를 외래키로 설정
    private User user;

    private String placeName;
    private Double latitude;
    private Double longitude;
    private LocalDateTime visitedAt;
}
