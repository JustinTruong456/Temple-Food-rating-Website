package com.truong_web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;




@RestController
public class Controller {

    @RequestMapping("/hello")
    public String helloController() {
        return "<h1>Hello World</h1>";
    }
    
    @RequestMapping("/Server")
    public String ServerController() {
        return "<h1>Food is good</h1>";
    }
    
}

    

