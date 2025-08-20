package com.zosh.controller;

import com.zosh.exception.UserException;
import com.zosh.payload.dto.UserDTO;
import com.zosh.payload.request.LoginDto;

import com.zosh.payload.response.AuthResponse;

import com.zosh.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;



    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signupHandler(
            @RequestBody @Valid UserDTO req) throws UserException {


        AuthResponse response=authService.signup(req);


        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(
            @RequestBody LoginDto req) throws UserException {

        AuthResponse response=authService.login(req.getEmail(), req.getPassword());

        return ResponseEntity.ok(
                response
        );
    }


}
