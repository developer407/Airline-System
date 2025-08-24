package com.zosh.modal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "baggage_policies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BaggagePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Maximum cabin baggage weight allowed (in KG)
    @Column(nullable = false)
    private Double cabinBaggageWeight;

    // Maximum cabin baggage dimension (Length + Width + Height in cm)
    @Column(nullable = false)
    private Double cabinBaggageDimension;

    // Maximum check-in baggage weight allowed (in KG)
    @Column(nullable = false)
    private Double checkInBaggageWeight;

    // Extra baggage charge per KG (in airline's currency)
    @Column(nullable = false)
    private Double extraBaggageChargePerKg;

    // Currency for charges
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "currency_id", nullable = false)
    private Currency currency;

    // Relation to Airline (each airline can define its baggage policy)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airline_id", nullable = false, unique = true)
    private Airline airline;
}
