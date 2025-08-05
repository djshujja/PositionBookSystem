package com.shujja.position.book.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TradeEventController {

    @GetMapping("/")
    public String hello() {
        return "<h1> Hello World </h1>";
    }

}
