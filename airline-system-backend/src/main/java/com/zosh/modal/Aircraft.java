package com.zosh.modal;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "aircrafts")
public class Aircraft {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    // Aircraft unique code (like registration or tail number)
    @Column(nullable = false, unique = true)
    private String code;

    // Aircraft model (e.g., Boeing 737, Airbus A320)
    @Column(nullable = false)
    private String model;

    // Manufacturer (e.g., Boeing, Airbus, Embraer)
    @Column(nullable = false)
    private String manufacturer;

    // Seating capacity of the aircraft
    @Column(nullable = false)
    private Integer seatingCapacity;

    // Flight range in kilometers (how far aircraft can fly without refueling)
    private Integer rangeKm;

    // Airline that owns/operates the aircraft
    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;
}
