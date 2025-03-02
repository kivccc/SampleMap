package org.example.backend.repository;

import org.example.backend.domain.PersonalPlace;
import org.example.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapRepository extends JpaRepository<PersonalPlace,Long> {
    List<PersonalPlace> findByUser(User user);
}
