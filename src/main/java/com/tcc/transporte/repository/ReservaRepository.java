package com.tcc.transporte.repository;

import com.tcc.transporte.model.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}