package com.zosh.modal;


import com.zosh.domain.RecurrenceType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "flight_schedules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The flight number linked to this schedule
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    // Departure & Arrival info
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    // Recurrence (Daily, Weekly, Custom)
    @Enumerated(EnumType.STRING)
    private RecurrenceType recurrenceType;

    private String operatingDays; // e.g., "MON,TUE,WED" if not daily

    private Boolean isActive = true; // For suspending a schedule

    // Seats & Pricing reference
    private Integer totalSeats;
    private Integer availableSeats;

    // Version for optimistic locking (important for ticket booking concurrency)
    @Version
    private Long version;
}

