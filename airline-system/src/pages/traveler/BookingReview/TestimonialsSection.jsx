import * as React from "react"
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Users, 
  Award,
  Heart,
  Quote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Seamless booking experience! The price transparency and instant confirmation made my business trip planning effortless. Highly recommend for frequent travelers.",
      tripType: "Business Travel",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Bangalore",
      rating: 5,
      text: "Saved ₹3,000 on my family vacation booking. The insurance coverage and seat selection made the whole journey comfortable. Excellent customer service!",
      tripType: "Family Vacation",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anjali Patel",
      location: "Delhi",
      rating: 5,
      text: "Quick and reliable booking process. The mobile app is user-friendly, and the 24/7 support helped me with last-minute changes. Will book again!",
      tripType: "Solo Travel",
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Chennai",
      rating: 4,
      text: "Great deals and transparent pricing. The fare comparison feature helped me choose the best option. Only wish there were more payment options available.",
      tripType: "Weekend Getaway",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Meera Reddy",
      location: "Hyderabad",
      rating: 5,
      text: "Outstanding service! From booking to boarding, everything was smooth. The travel insurance came in handy when my flight got delayed. Totally satisfied!",
      tripType: "International Travel",
      date: "1 week ago"
    }
  ]

  const trustIndicators = [
    {
      icon: Users,
      value: "50L+",
      label: "Happy Travelers",
      color: "text-blue-600"
    },
    {
      icon: Star,
      value: "4.8/5",
      label: "Average Rating",
      color: "text-yellow-600"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Booking Success",
      color: "text-green-600"
    },
    {
      icon: Award,
      value: "#1",
      label: "Travel Platform",
      color: "text-purple-600"
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  // Auto-advance testimonials
  React.useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          <span>Trusted by Millions</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          See what our customers say about their booking experience
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <indicator.icon className={`h-6 w-6 ${indicator.color}`} />
              </div>
              <div className="text-xl font-bold text-gray-900">{indicator.value}</div>
              <div className="text-xs text-gray-600">{indicator.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="text-blue-400 opacity-50">
                <Quote className="h-8 w-8" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].tripType}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {testimonials[currentIndex].date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-700">₹2,500+</div>
              <div className="text-sm text-green-600">Average Savings per Booking</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">15 mins</div>
              <div className="text-sm text-green-600">Average Booking Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">24/7</div>
              <div className="text-sm text-green-600">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-6 opacity-75">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-xs text-gray-600">SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="text-xs text-gray-600">IATA Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="text-xs text-gray-600">50L+ Users</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialsSection
