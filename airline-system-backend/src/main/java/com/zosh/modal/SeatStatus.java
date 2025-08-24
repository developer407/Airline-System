package com.zosh.modal;

import com.zosh.domain.SeatAvailabilityStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seat_status")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to specific seat
    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    // Link to specific flight schedule
    @ManyToOne
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    @Enumerated(EnumType.STRING)
    private SeatAvailabilityStatus status; // AVAILABLE, BOOKED, BLOCKED

    // Optional: Price adjustment for this seat
    private Double extraPrice;
}
