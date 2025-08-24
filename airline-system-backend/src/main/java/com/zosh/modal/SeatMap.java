package com.zosh.modal;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "seat_maps")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatMap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Example: "Boeing 737-800 Economy + Business Config"
    @Column(nullable = false)
    private String name;

    // Total rows in aircraft
    private int totalRows;

    // Seats per row (max)
    private int seatsPerRow;

    @ManyToOne
    @JoinColumn(name = "airline_id", nullable = false)
    private Airline airline;

    // Each SeatMap contains multiple seats
    @OneToMany(mappedBy = "seatMap", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;


//    private CabinClass cabinClass;
    @OneToOne
    @JoinColumn(name = "cabin_class_id")
    private CabinClass cabinClass;

}
