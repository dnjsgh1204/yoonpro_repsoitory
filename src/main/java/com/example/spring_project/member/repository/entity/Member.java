package com.example.spring_project.member.repository.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Getter
public class Member { //Table 설계

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long index;

    private String id;
    private String name;

    private String PhoneNumber;
}
