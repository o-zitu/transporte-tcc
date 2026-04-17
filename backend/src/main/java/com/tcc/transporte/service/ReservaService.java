package com.tcc.transporte.service;

import com.tcc.transporte.model.entity.Reserva;
import com.tcc.transporte.model.enums.StatusReserva;
import com.tcc.transporte.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    public Reserva salvarReserva(Reserva reserva) {
        if (reserva.getId() == null) {

            boolean assentoOcupado = reservaRepository.existsByNumeroAssentoAndOnibusId(
                    reserva.getNumeroAssento(),
                    reserva.getOnibus().getId()
            );

            if (assentoOcupado) {
                throw new RuntimeException("Assento já reservado!");
            }

            List<Reserva> reservasDoOnibus = reservaRepository.findByOnibusId(reserva.getOnibus().getId());
            boolean usuarioJaPossuiLugar = reservasDoOnibus.stream()
                    .anyMatch(r -> r.getUsuario().getId().equals(reserva.getUsuario().getId()));

            if (usuarioJaPossuiLugar) {
                throw new RuntimeException("Você já possui uma reserva para este ônibus!");
            }

            reserva.setDataReserva(LocalDateTime.now());
            reserva.setStatus(StatusReserva.ATIVA);

        } else {
            Reserva reservaExistente = reservaRepository.findById(reserva.getId())
                    .orElseThrow(() -> new RuntimeException("Reserva não encontrada"));

            if (reserva.getDataReserva() == null) {
                reserva.setDataReserva(reservaExistente.getDataReserva());
            }
        }

        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    public void cancelarReserva(Long id) {
        if (!reservaRepository.existsById(id)) {
            throw new RuntimeException("Reserva não encontrada");
        }
        reservaRepository.deleteById(id);
    }

    public void deletarTodas() {
        reservaRepository.deleteAll();
    }

    public List<Reserva> listarPorOnibus(Long id) {
        return reservaRepository.findByOnibusId(id);
    }
}