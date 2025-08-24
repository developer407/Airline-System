package com.zosh.modal;

import com.zosh.domain.BookingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unique PNR (Passenger Name Record) or Booking Reference
    @Column(unique = true, nullable = false)
    private String bookingReference;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User bookedBy; // The customer who made the booking

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight; // Flight booked

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Passenger> passengers; // All passengers in this booking

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<SeatInstance> seats; // Seat allocations per passenger

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    private List<Ancillary> ancillaries; // Meals, baggage, lounge, etc.

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime bookingDate;

    private LocalDateTime lastModified;
}
