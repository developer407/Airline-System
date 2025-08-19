import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Helvetica'
  },
  header: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8
  },
  airlineName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  flightNumber: {
    fontSize: 14,
    opacity: 0.9
  },
  status: {
    backgroundColor: '#10b981',
    color: 'white',
    padding: '5 10',
    fontSize: 10,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 10
  },
  routeSection: {
    backgroundColor: '#f8fafc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cityInfo: {
    flex: 1,
    alignItems: 'center'
  },
  time: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5
  },
  airport: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 3
  },
  cityName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3
  },
  terminal: {
    fontSize: 10,
    color: '#2563eb',
    fontWeight: 'bold'
  },
  flightInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  duration: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 3
  },
  aircraft: {
    fontSize: 10,
    color: '#9ca3af'
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 5
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 20
  },
  detailItem: {
    flex: 1,
    paddingRight: 15
  },
  detailLabel: {
    fontSize: 10,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 5
  },
  passengerCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  passengerInfo: {
    flex: 1
  },
  passengerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 3
  },
  passengerType: {
    fontSize: 10,
    color: '#6b7280'
  },
  seatInfo: {
    alignItems: 'flex-end'
  },
  seatNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb'
  },
  classType: {
    fontSize: 10,
    color: '#6b7280'
  },
  twoColumn: {
    flexDirection: 'row',
    marginBottom: 20
  },
  column: {
    flex: 1,
    paddingRight: 20
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: '#10b981',
    borderRadius: 5,
    marginRight: 8
  },
  serviceText: {
    fontSize: 11,
    color: '#374151'
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  fareLabel: {
    fontSize: 11,
    color: '#6b7280'
  },
  fareValue: {
    fontSize: 11,
    color: '#1f2937'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTop: '1 solid #e5e7eb',
    marginTop: 5
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669'
  },
  importantInfo: {
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 6,
    marginTop: 20
  },
  importantTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 10
  },
  importantText: {
    fontSize: 10,
    color: '#92400e',
    lineHeight: 1.4,
    marginBottom: 3
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.4
  }
})

// PDF Document Component
const TicketPDFDocument = ({ ticketData }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.airlineName}>{ticketData.airline.name}</Text>
          <Text style={styles.flightNumber}>Flight {ticketData.flight.number}</Text>
          <View style={styles.status}>
            <Text>✓ {ticketData.status}</Text>
          </View>
        </View>

        {/* Route Section */}
        <View style={styles.routeSection}>
          <View style={styles.routeContainer}>
            {/* Departure */}
            <View style={styles.cityInfo}>
              <Text style={styles.time}>{formatTime(ticketData.departure.time)}</Text>
              <Text style={styles.airport}>{ticketData.departure.airport}</Text>
              <Text style={styles.cityName}>{ticketData.departure.airportName}</Text>
              <Text style={styles.cityName}>{ticketData.departure.city}</Text>
              <Text style={styles.terminal}>Terminal {ticketData.departure.terminal} • Gate {ticketData.departure.gate}</Text>
            </View>

            {/* Flight Info */}
            <View style={styles.flightInfo}>
              <Text style={styles.duration}>{ticketData.flight.duration}</Text>
              <Text style={styles.aircraft}>{ticketData.flight.aircraft}</Text>
              <Text style={styles.date}>{formatDate(ticketData.departure.date)}</Text>
            </View>

            {/* Arrival */}
            <View style={styles.cityInfo}>
              <Text style={styles.time}>{formatTime(ticketData.arrival.time)}</Text>
              <Text style={styles.airport}>{ticketData.arrival.airport}</Text>
              <Text style={styles.cityName}>{ticketData.arrival.airportName}</Text>
              <Text style={styles.cityName}>{ticketData.arrival.city}</Text>
              <Text style={styles.terminal}>Terminal {ticketData.arrival.terminal} • Gate {ticketData.arrival.gate}</Text>
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>PNR</Text>
            <Text style={styles.detailValue}>{ticketData.pnr}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>E-Ticket Number</Text>
            <Text style={styles.detailValue}>{ticketData.eTicketNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Class</Text>
            <Text style={styles.detailValue}>{ticketData.flight.class}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Booking Date</Text>
            <Text style={styles.detailValue}>
              {new Date(ticketData.bookingDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Passengers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Details</Text>
          {ticketData.passengers.map((passenger, index) => (
            <View key={passenger.id} style={styles.passengerCard}>
              <View style={styles.passengerInfo}>
                <Text style={styles.passengerName}>{passenger.name}</Text>
                <Text style={styles.passengerType}>{passenger.type}</Text>
                {passenger.frequentFlyer && (
                  <Text style={styles.passengerType}>FF: {passenger.frequentFlyer}</Text>
                )}
              </View>
              <View style={styles.seatInfo}>
                <Text style={styles.seatNumber}>Seat {passenger.seatNumber}</Text>
                <Text style={styles.classType}>{ticketData.flight.class}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Services & Baggage */}
        <View style={styles.twoColumn}>
          {/* Services */}
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Special Services</Text>
            {ticketData.services.meal && (
              <View style={styles.serviceItem}>
                <View style={styles.checkMark} />
                <Text style={styles.serviceText}>Meal: {ticketData.services.meal}</Text>
              </View>
            )}
            {ticketData.services.extraLegroom && (
              <View style={styles.serviceItem}>
                <View style={styles.checkMark} />
                <Text style={styles.serviceText}>Extra Legroom</Text>
              </View>
            )}
            {ticketData.services.priorityBoarding && (
              <View style={styles.serviceItem}>
                <View style={styles.checkMark} />
                <Text style={styles.serviceText}>Priority Boarding</Text>
              </View>
            )}
            {ticketData.services.wheelchair && (
              <View style={styles.serviceItem}>
                <View style={styles.checkMark} />
                <Text style={styles.serviceText}>Wheelchair Assistance</Text>
              </View>
            )}
          </View>

          {/* Baggage */}
          <View style={styles.column}>
            <Text style={styles.sectionTitle}>Baggage Allowance</Text>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Check-in Baggage:</Text>
              <Text style={styles.fareValue}>{ticketData.baggage.checkin}</Text>
            </View>
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Cabin Baggage:</Text>
              <Text style={styles.fareValue}>{ticketData.baggage.cabin}</Text>
            </View>
          </View>
        </View>

        {/* Fare Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fare Details</Text>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare:</Text>
            <Text style={styles.fareValue}>₹{ticketData.fare.baseFare.toLocaleString()}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Taxes & Fees:</Text>
            <Text style={styles.fareValue}>₹{ticketData.fare.taxes.toLocaleString()}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Other Charges:</Text>
            <Text style={styles.fareValue}>₹{ticketData.fare.fees.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₹{ticketData.fare.total.toLocaleString()}</Text>
          </View>
          <Text style={[styles.fareLabel, { marginTop: 10 }]}>
            Payment Method: {ticketData.paymentMethod}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Email:</Text>
            <Text style={styles.fareValue}>{ticketData.contact.email}</Text>
          </View>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Phone:</Text>
            <Text style={styles.fareValue}>{ticketData.contact.phone}</Text>
          </View>
        </View>

        {/* Important Information */}
        <View style={styles.importantInfo}>
          <Text style={styles.importantTitle}>Important Information</Text>
          <Text style={styles.importantText}>
            • Please arrive at the airport at least 2 hours before domestic flights and 3 hours before international flights.
          </Text>
          <Text style={styles.importantText}>
            • Carry a valid photo ID (Aadhaar, Passport, Driving License, Voter ID) for security check.
          </Text>
          <Text style={styles.importantText}>
            • Web check-in opens 48 hours before departure and closes 2 hours before departure.
          </Text>
          <Text style={styles.importantText}>
            • Boarding closes 25 minutes before departure for domestic flights.
          </Text>
          <Text style={styles.importantText}>
            • This is an electronic ticket. No need to print, but recommended for airport reference.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated on {new Date().toLocaleDateString()} | SkyBooker Airlines
          </Text>
          <Text style={styles.footerText}>
            For support, contact: support@skybooker.com | +91 1800-123-4567
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// Function to generate and download PDF
export const generateTicketPDF = async (ticketData) => {
  try {
    const doc = <TicketPDFDocument ticketData={ticketData} />
    const asPdf = pdf(doc)
    const blob = await asPdf.toBlob()
    
    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `E-Ticket-${ticketData.pnr}-${ticketData.airline.code}${ticketData.flight.number.replace(' ', '')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

export default TicketPDFDocument
