package com.tcc.transporte.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Entity
@Getter
@Setter
public class Onibus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origem;

    private String destino;

    private LocalTime horarioSaida;

    private Integer quantidadeAssentos;

    private Double precoTicket;
}