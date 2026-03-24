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

        boolean assentoOcupado =
                reservaRepository.existsByNumeroAssentoAndOnibusId(
                        reserva.getNumeroAssento(),
                        reserva.getOnibus().getId()
                );

        if (assentoOcupado) {
            throw new RuntimeException("Assento já reservado!");
        }

        boolean usuarioJaReservou =
                reservaRepository.existsByUsuarioIdAndOnibusIdAndStatus(
                        reserva.getUsuario().getId(),
                        reserva.getOnibus().getId(),
                        StatusReserva.ATIVA
                );

        //if (usuarioJaReservou) {
        //    throw new RuntimeException("Usuário já possui reserva ativa nesse ônibus!");
        //}

        reserva.setDataReserva(LocalDateTime.now());

        reserva.setStatus(StatusReserva.ATIVA);

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


}