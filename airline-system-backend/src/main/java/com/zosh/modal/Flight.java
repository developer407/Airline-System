package com.zosh.modal;

import com.zosh.domain.FlightStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Flight Information
    @Column(nullable = false)
    private String flightNumber; // e.g., AI-302

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline; // Which airline operates this flight

    @ManyToOne
    @JoinColumn(name = "aircraft_id", nullable = false)
    private Aircraft aircraft; // Aircraft used for this flight

    // Route
    @ManyToOne
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;

    // Schedule
    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    private String terminal; // optional, e.g. Terminal 3
    private String gate;     // optional, e.g. Gate 12

//    // Seat & Cabin
//    @OneToMany()
//    private List<CabinClass> cabinClasses; // Economy, Business, First with pricing

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<SeatInstance> seats; // Actual seat availability for this flight

    // Status
    private FlightStatus status; // SCHEDULED, DELAYED, CANCELLED, COMPLETED
}
