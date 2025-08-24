package com.zosh.modal;

import com.zosh.domain.AncillaryType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ancillaries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ancillary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Type of extra service: baggage, meal, seat_upgrade, lounge_access, etc.
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AncillaryType type;

    // Description of the service (e.g., "Extra 10kg baggage", "Vegetarian Meal")
    @Column(length = 500)
    private String description;

    // Price of the service
    @Column(nullable = false)
    private Double price;

    // Currency for the price (relation instead of raw String)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "currency_id", nullable = false)
    private Currency currency;

    // Relation to airline since these services are airline-specific
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;

    @ManyToOne(fetch = FetchType.LAZY)
    private Booking booking;
}
