package com.zosh.modal;

import com.zosh.domain.AirlineStatus;
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
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    @NotBlank
    @Size(min = 2, max = 2, message = "IATA code must be exactly 2 characters")
    @Column(name = "iata_code", length = 2, nullable = false)
    private String iataCode;

    @NotBlank
    @Size(min = 3, max = 3, message = "ICAO code must be exactly 3 characters")
    @Column(name = "icao_code", length = 3, nullable = false)
    private String icaoCode;

    @NotBlank
    @Column(nullable = false)
    private String name;

    private String alias;

    @NotBlank
    private String country;

    private String logoUrl;

    private String website;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AirlineStatus status = AirlineStatus.ACTIVE;

    private String alliance;

    @OneToOne(cascade = CascadeType.ALL)
    private BaggagePolicy baggagePolicy; // Reference to baggage policy (can be @ManyToOne later)

    @Embedded
    private Support support;

    private String headquarters;

    /** --- Audit Fields --- **/
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant updatedAt;


    @JoinColumn(updatable = false, nullable = false)
    @OneToOne
    private User user;

    @LastModifiedBy
    @OneToOne
    private User updatedBy;
}
