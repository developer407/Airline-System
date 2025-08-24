package com.zosh.modal;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "airports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 3, unique = true)
    private String iataCode; // e.g. MUC, JFK

    @Column(nullable = false)
    private String name; // Airport name

    private String detailedName; // MUNICH/DE
    private String timeZoneOffset;

    @Embedded
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    @Embedded
    private GeoCode geoCode;

    @Embedded
    private Analytics analytics;
}


