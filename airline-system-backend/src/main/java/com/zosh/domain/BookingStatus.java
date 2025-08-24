package com.zosh.domain;

public enum BookingStatus {
    PENDING,   // Reserved but not paid
    CONFIRMED, // Paid & confirmed
    CANCELLED, // User or airline cancelled
    COMPLETED  // Flight has departed
}

