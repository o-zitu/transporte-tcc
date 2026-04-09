package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Usuario;
import com.tcc.transporte.model.enums.Role;
import com.tcc.transporte.repository.UsuarioRepository;
import com.tcc.transporte.repository.ReservaRepository;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final ReservaRepository reservaRepository;

    public UsuarioController(UsuarioRepository usuarioRepository,
                             ReservaRepository reservaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.reservaRepository = reservaRepository;
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

    @PostMapping("/motorista")
    public Usuario criarMotorista(@RequestBody Usuario usuario) {
        usuario.setRole(Role.MOTORISTA);
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}/role")
    public Usuario atualizarRole(@PathVariable Long id, @RequestBody Usuario request) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setRole(request.getRole());

        return usuarioRepository.save(usuario);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        reservaRepository.deleteByUsuario_Id(id); // 🔥 importante esse _Id
        usuarioRepository.deleteById(id);
    }
}