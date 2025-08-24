package com.zosh.modal;

import com.zosh.domain.TicketStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unique ticket number issued by airline/GDS
    @Column(nullable = false, unique = true, length = 20)
    private String ticketNumber;

    // Ticket status (BOOKED, CANCELLED, USED, REFUNDED etc.)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TicketStatus status;

    // Date when the ticket was issued
    @Column(nullable = false)
    private LocalDateTime issuedAt;

    // Fare class (Economy, Business, First, Premium, etc.)
    @Column(length = 20)
    private String fareClass;

    // ---------------- RELATIONSHIPS ----------------

    // Each ticket belongs to a booking (PNR)
    @ManyToOne()
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    // Ticket is issued for one passenger
    @ManyToOne()
    @JoinColumn(name = "passenger_id", nullable = false)
    private Passenger passenger;

    // Each ticket is linked to a specific flight segment
    @ManyToOne()
    @JoinColumn(name = "flight_segment_id", nullable = false)
    private FlightSegment flightSegment;

    // Optional link to payment/transaction
    @ManyToOne()
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne()
    @JoinColumn(name = "flight_schedule_id")
    private FlightSchedule flightSchedule; // ✅ New relation
}
