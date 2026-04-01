package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Usuario;
import com.tcc.transporte.model.enums.Role;
import com.tcc.transporte.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }


    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario) {
        usuario.setRole(Role.PASSAGEIRO);
        return usuarioRepository.save(usuario);
    }


    @PostMapping("/admin")
    public Usuario criarAdmin(@RequestBody Usuario usuario) {
        usuario.setRole(Role.ADMIN);
        return usuarioRepository.save(usuario);
    }
}