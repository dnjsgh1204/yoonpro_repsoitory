package com.example.spring_project.member.service;


import com.example.spring_project.member.repository.MemberRepository;
import com.example.spring_project.member.controller.dto.joinRequest;
import com.example.spring_project.member.repository.entity.Member;
import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    @Override
    public String join(joinRequest JoinRequest){
        Member member = Member.builder()
                .id(JoinRequest.getId())
                .name(JoinRequest.getName())
                .PhoneNumber(JoinRequest.getPhoneNumber())
                .build();
        memberRepository.save(member);

        return "success";
    }

}
