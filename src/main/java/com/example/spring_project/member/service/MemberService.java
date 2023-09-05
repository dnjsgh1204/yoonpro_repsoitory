package com.example.spring_project.member.service;
import com.example.spring_project.member.controller.dto.joinRequest;

public interface MemberService {
    String join(joinRequest JoinRequest);
}