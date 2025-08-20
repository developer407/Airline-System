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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false, unique = true, length = 5)
    private String code; // e.g., BOM, DEL, JFK

    @Column(nullable = false, length = 100)
    private String name; // Airport name

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "city_id", nullable = false)
    private City city; // The city where the airport is located

    @Column(length = 150)
    private String address; // Optional airport address/landmark

    @Column(length = 50)
    private String terminal; // Terminal info if needed

    @Column(length = 20)
    private String timezone; // e.g., Asia/Kolkata, UTC+5:30
}
