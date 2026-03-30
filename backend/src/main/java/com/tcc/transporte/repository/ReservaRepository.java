package com.tcc.transporte.repository;

import com.tcc.transporte.model.entity.Reserva;
import com.tcc.transporte.model.enums.StatusReserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    boolean existsByNumeroAssentoAndOnibusId(Integer numeroAssento, Long onibusId);

    boolean existsByUsuarioIdAndOnibusIdAndStatus(Long usuarioId, Long onibusId, StatusReserva status);

    List<Reserva> findByOnibus_IdAndStatus(Long onibusId, StatusReserva status);
}