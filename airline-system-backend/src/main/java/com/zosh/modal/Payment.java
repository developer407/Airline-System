package com.zosh.modal;

import com.zosh.domain.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    // Relation with booking
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    // Amount paid
    private BigDecimal amount;

    // Currency (e.g., INR, USD)
    private String currency;

    // Payment provider (Stripe, Razorpay, PayPal, etc.)
    private String provider;

    // Transaction ID from provider
    private String transactionId;

    // Payment method (CARD, UPI, NETBANKING, WALLET...)
    private String method;

    // Status (PENDING, SUCCESS, FAILED, REFUNDED)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    // Payment timestamp
    private Instant paidAt;

    // Refund reference (if refunded)
    private String refundId;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = Instant.now();
    }
}
