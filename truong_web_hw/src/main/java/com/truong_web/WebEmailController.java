package com.truong_web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dbUtils.*;
import model.WebEmail.*;
import view.WebEmailView;

@RestController
public class WebEmailController {

    @RequestMapping(value = "/webEmail/getAll", produces = "application/json")
    public String allRoles() {
        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = WebEmailView.getAllWebEmail(dbc);
        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).
        return Json.toJson(list);
    }
}