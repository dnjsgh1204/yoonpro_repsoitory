package com.example.spring_project.member.repository;

import com.example.spring_project.member.repository.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void crudTest(){
        Member member = Member.builder()
                .id("flature")
                .name("플래쳐")
                .PhoneNumber("010-0000-0000")
                .build();

        memberRepository.save(member);

        Member foundMember = memberRepository.findById(1L).get();
    } //JpaRepository 때문에 메소드를 이미 다 사용할 수 있다. query 확인 가능.
}
