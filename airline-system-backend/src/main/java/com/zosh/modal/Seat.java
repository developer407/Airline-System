package com.zosh.modal;

import com.zosh.domain.SeatType;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "seats")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Example: 12A, 15C
    @Column(nullable = false)
    private String seatNumber;

    @Column(name = "seat_row_number", nullable = false)
    private int rowNumber;

    private char columnLetter; // A, B, C, D...

    @Column(nullable = false)
    private SeatType seatType; // WINDOW, AISLE, MIDDLE, EXIT_ROW, EXTRA_LEGROOM

    // Status
    private boolean isAvailable = true;
    private boolean isBlocked = false;
    private boolean isReserved = false;

    // Pricing
    private Double seatPrice; // null or 0 = free

    // Attributes
    private boolean isExtraLegroom;
    private boolean isExitRow;
    private boolean isBassinetAvailable;
    private boolean isNearLavatory;

    // Assigned passenger (optional)
    private Long assignedPassengerId;

    // Cabin class relationship
//    @ManyToOne
//    @JoinColumn(name = "cabin_class_id", nullable = false)
//    private CabinClass cabinClass;

    // Seat map relationship
    @ManyToOne
    @JoinColumn(name = "seat_map_id", nullable = false)
    private SeatMap seatMap;



    // Audit
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
