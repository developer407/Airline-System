package com.zosh.modal;

import com.zosh.domain.CabinClassType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cabin_classes")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class CabinClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, unique = true)
    private CabinClassType name; // e.g., Economy, Business, First

    @NotBlank
    @Size(max = 5)
    @Column(nullable = false, unique = true, length = 5)
    private String code; // IATA standard codes: Y, J, F, etc.

    @Size(max = 255)
    private String description;


    @OneToOne(mappedBy = "cabinClass", cascade = CascadeType.ALL, orphanRemoval = true)
    private SeatMap seatMap;

    /**
     * Baggage policy associated with this cabin class.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "baggage_policy_id")
    private BaggagePolicy baggagePolicy;

    /**
     * Ancillaries (meals, upgrades, etc.) available for this cabin class.
     */
    @ManyToMany
    @JoinTable(
            name = "cabinclass_ancillaries",
            joinColumns = @JoinColumn(name = "cabinclass_id"),
            inverseJoinColumns = @JoinColumn(name = "ancillary_id")
    )
    private List<Ancillary> availableAncillaries = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "aircraft_id")
    private Aircraft aircraft;

    /** Auditing fields **/
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @LastModifiedBy
    private String updatedBy;
}
