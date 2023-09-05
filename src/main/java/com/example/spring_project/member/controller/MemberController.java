package com.example.spring_project.member.controller;

import com.example.spring_project.member.service.MemberService;
import com.example.spring_project.member.controller.dto.joinRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    @GetMapping("/hello")
    public String getHello(){

        return "Hello Around Hub Studio!";
    }

    @PostMapping("/join")
    public String join(@RequestBody joinRequest JoinRequest){
        String result = memberService.join(JoinRequest);

        if("success".equalsIgnoreCase(result)){
            return "success";
        }
        else{
            return "fail";
        }
    }
}
