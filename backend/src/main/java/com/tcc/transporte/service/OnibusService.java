package com.tcc.transporte.service;

import com.tcc.transporte.model.entity.Onibus;
import com.tcc.transporte.model.entity.Reserva;
import com.tcc.transporte.model.enums.StatusReserva;
import com.tcc.transporte.repository.OnibusRepository;
import com.tcc.transporte.repository.ReservaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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

        List<Reserva> reservas = reservaRepository
                .findByOnibus_IdAndStatus(onibusId, StatusReserva.ATIVA);

        return reservas
                .stream()
                .map(Reserva::getNumeroAssento)
                .toList();
    }

    public Onibus salvar(Onibus onibus) {
        return onibusRepository.save(onibus);
    }

    @Transactional
    public void deletar(Long id) {
        reservaRepository.deleteByOnibusId(id);
        onibusRepository.deleteById(id);
    }





}