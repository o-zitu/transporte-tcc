package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Usuario;
import com.tcc.transporte.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario request) {
        Usuario usuario = authService.login(request.getEmail(), request.getSenha());
        usuario.setSenha(null);
        return usuario;
    }


    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        Usuario novo = authService.register(usuario);
        novo.setSenha(null);
        return novo;
    }
}