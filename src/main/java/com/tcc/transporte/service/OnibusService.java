package com.tcc.transporte.service;

import com.tcc.transporte.model.entity.Onibus;
import com.tcc.transporte.model.entity.Reserva;
import com.tcc.transporte.repository.OnibusRepository;
import com.tcc.transporte.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OnibusService {

    private final OnibusRepository onibusRepository;
    private final ReservaRepository reservaRepository;

    public OnibusService(OnibusRepository onibusRepository, ReservaRepository reservaRepository) {
        this.onibusRepository = onibusRepository;
        this.reservaRepository = reservaRepository;
    }

    public List<Onibus> listarOnibus() {
        return onibusRepository.findAll();
    }

    public List<Integer> listarAssentosOcupados(Long onibusId) {

        List<Reserva> reservas = reservaRepository.findByOnibusId(onibusId);

        return reservas
                .stream()
                .map(reserva -> reserva.getNumeroAssento())
                .collect(Collectors.toList());
    }

}