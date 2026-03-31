package com.tcc.transporte.controller;

import com.tcc.transporte.model.entity.Reserva;
import com.tcc.transporte.service.ReservaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @PostMapping
    public Reserva criarReserva(@RequestBody Reserva reserva) {
        return reservaService.salvarReserva(reserva);
    }

    @GetMapping
    public List<Reserva> listarReservas() {
        return reservaService.listarReservas();
    }

    @DeleteMapping("/{id}")
    public void cancelarReserva(@PathVariable Long id) {
        reservaService.cancelarReserva(id);
    }
    @DeleteMapping
    public void deletarTodas() {
        reservaService.deletarTodas();
    }

    @GetMapping("/onibus/{id}")
    public List<Reserva> listarPorOnibus(@PathVariable Long id) {
        return reservaService.listarPorOnibus(id);
    }

}