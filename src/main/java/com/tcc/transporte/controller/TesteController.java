package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Usuario;
import com.tcc.transporte.model.enums.Role;
import com.tcc.transporte.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    private final UsuarioRepository usuarioRepository;

    public TesteController(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/teste")
    public String teste() {

        Usuario usuario = new Usuario();
        usuario.setNome("Teste");
        usuario.setEmail("teste@email.com");
        usuario.setSenha("123");
        usuario.setRole(Role.PASSAGEIRO);

        usuarioRepository.save(usuario);

        return "Usuário salvo!";
    }
}