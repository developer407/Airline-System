package com.zosh.modal;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "flight_segments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Airline operating this segment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;

    // Departure Airport
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;

    // Arrival Airport
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    @Column(nullable = false, length = 10)
    private String flightNumber; // e.g. AI-302

    private String aircraftType; // e.g. Boeing 777

    private boolean codeshare = false; // If it's a codeshare segment

    // Duration can be stored explicitly or calculated
    private Integer durationMinutes;
}

