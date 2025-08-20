package com.zosh.modal;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "cities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    /**
     * Official name of the city.
     */
    @Column(nullable = false, unique = true)
    private String name;

    /**
     * IATA city code (e.g., NYC for New York).
     */
    @Column(nullable = false, unique = true, length = 3)
    private String iataCode;

    /**
     * Country where the city is located.
     */
    @Column(nullable = false)
    private String country;

    /**
     * State/Province where the city belongs (optional for some countries).
     */
    private String state;

    /**
     * One city can have multiple airports.
     */
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Airport> airports;
}
