package com.example.spring_project.member.repository;

import com.example.spring_project.member.repository.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member, Long>{
}
