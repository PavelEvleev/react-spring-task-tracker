package com.tracker.controller;

import com.tracker.model.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
public class HomeController {

    @RequestMapping(value = "/app")
    public String index(HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
        String res = details.getUuid();
        System.out.println(res);

        Cookie userUuid = new Cookie("uuid", res);
        userUuid.setMaxAge(60 * 60 * 24);
        userUuid.setPath("/");
        response.addCookie(userUuid);
        return "index";
    }

    @RequestMapping(value = "/")
    public String registration(){
        return "registration";
    }
}
