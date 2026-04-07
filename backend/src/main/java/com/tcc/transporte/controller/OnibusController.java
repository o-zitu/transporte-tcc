package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Onibus;
import com.tcc.transporte.service.OnibusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/onibus")
@CrossOrigin(origins = "*")
public class OnibusController {

    private final OnibusService onibusService;

    public OnibusController(OnibusService onibusService) {
        this.onibusService = onibusService;
    }

    @GetMapping
    public List<Onibus> listarOnibus() {
        return onibusService.listarOnibus();
    }

    @GetMapping("/{id}/assentos-ocupados")
    public List<Integer> listarAssentosOcupados(@PathVariable Long id) {
        return onibusService.listarAssentosOcupados(id);
    }

    @PostMapping
    public Onibus criarOnibus(@RequestBody Onibus onibus) {
        return onibusService.salvar(onibus);
    }

    @DeleteMapping("/{id}")
    public void deletarOnibus(@PathVariable Long id) {
        onibusService.deletar(id);
    }
}