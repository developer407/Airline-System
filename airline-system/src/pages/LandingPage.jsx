import * as React from "react"
import { useNavigate } from "react-router-dom"
import { 
  Plane, 
  Users, 
  BarChart3, 
  Shield, 
  Globe, 
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  PlayCircle,
  Zap,
  TrendingUp,
  Award,
  BookOpen,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import FloatingElements from "@/components/FloatingElements"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Animation variants for smooth entrance effects
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "For Travelers",
      description: "Search, compare and book flights from 500+ airlines worldwide",
      color: "from-blue-500 to-cyan-400",
      benefits: ["Best Price Guarantee", "24/7 Customer Support", "Instant Booking Confirmation", "Mobile App Access"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "For Airlines",
      description: "Manage your airline operations with our comprehensive dashboard",
      color: "from-purple-500 to-pink-400",
      benefits: ["Flight Management", "Revenue Analytics", "Customer Insights", "Booking Management"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime guarantee",
      color: "from-emerald-500 to-teal-400",
      benefits: ["SSL Encryption", "PCI Compliance", "Data Protection", "Fraud Prevention"]
    }
  ]

  const stats = [
    { number: "10M+", label: "Happy Travelers", icon: <Users className="h-6 w-6" /> },
    { number: "500+", label: "Partner Airlines", icon: <Plane className="h-6 w-6" /> },
    { number: "1000+", label: "Destinations", icon: <Globe className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Clock className="h-6 w-6" /> }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      company: "Travel Blogger",
      content: "This platform has revolutionized how I book flights. The interface is intuitive and the prices are unbeatable!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Pacific Airways",
      content: "The airline management tools are incredibly powerful. We've increased our efficiency by 40% since joining.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Emma Rodriguez",
      role: "Operations Manager",
      company: "Sky Connect Airlines",
      content: "The analytics dashboard gives us insights we never had before. Game-changing for our business.",
      rating: 5,
      avatar: "👩‍✈️"
    }
  ]

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AirlinePro
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Reviews</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors hover:scale-105 transform">Pricing</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="px-4 py-4 space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors py-2">Features</a>
                <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors py-2">About</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-blue-600 transition-colors py-2">Reviews</a>
                <a href="#pricing" className="block text-gray-600 hover:text-blue-600 transition-colors py-2">Pricing</a>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/login')}>
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => navigate('/signup')}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Header Spacer */}
      <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'h-60' : 'h-0'}`}></div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 bg-pattern">
        {/* Floating Elements */}
        <FloatingElements />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse animate-gradient"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse animate-gradient" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 text-sm text-gray-600 hover-glow cursor-pointer animate-slide-up">
              <Zap className="h-4 w-4 mr-2 text-yellow-500 animate-pulse" />
              <span>Trusted by 10M+ travelers worldwide</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-up animate-delay-200">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent animate-gradient">
                  The Future of
                </span>
                <br />
                <span className="text-gray-900 animate-slide-up animate-delay-300">
                  Flight Booking
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-500">
                Whether you're a traveler seeking the perfect flight or an airline wanting to reach more customers, 
                our platform connects you to endless possibilities in the skies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-slide-up animate-delay-700">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 hover-lift animate-pulse-glow"
                onClick={() => navigate('/traveler')}
              >
                <Users className="h-5 w-5 mr-2" />
                I'm a Traveler
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 hover:border-purple-500 px-8 py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-110 hover-lift glass"
                onClick={() => navigate('/airline/register')}
              >
                <Plane className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                I'm an Airline
              </Button>
            </div>

            {/* Demo Button */}
            <div className="pt-4">
              <button className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors group">
                <PlayCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                <span className="underline underline-offset-4">Watch Demo Video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-20 left-20 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 animate-float hover-lift cursor-pointer" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live flight tracking</span>
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-20 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50 animate-float hover-lift cursor-pointer" style={{animationDelay: '1.5s'}}>
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="text-sm text-gray-600">Award winning platform</span>
            </div>
          </div>
        </div>

        {/* Mobile Floating Elements */}
        <div className="absolute bottom-32 right-4 lg:hidden">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200/50 animate-float" style={{animationDelay: '0.8s'}}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Trusted Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-blue-600 group-hover:text-purple-600 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Built for{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Everyone
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individual travelers to major airlines, our platform scales to meet your needs with enterprise-grade features and consumer-friendly design.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Learn More Button */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="inline-flex items-center text-blue-600 hover:text-purple-600 font-medium group-hover:translate-x-2 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Choose your path and let us guide you through the process.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Travelers */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Travelers</h3>
                <p className="text-gray-600">Find and book your perfect flight in minutes</p>
              </div>

              <div className="space-y-6">
                {[
                  { step: 1, title: "Search Flights", desc: "Enter your travel details and search from 500+ airlines" },
                  { step: 2, title: "Compare & Choose", desc: "Compare prices, times, and amenities to find the best option" },
                  { step: 3, title: "Book Securely", desc: "Complete your booking with our secure payment system" },
                  { step: 4, title: "Travel Easy", desc: "Get your e-ticket and enjoy 24/7 support during your journey" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Airlines */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl mb-4">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">For Airlines</h3>
                <p className="text-gray-600">Join our platform and reach millions of travelers</p>
              </div>

              <div className="space-y-6">
                {[
                  { step: 1, title: "Register & Verify", desc: "Submit your airline details and complete our verification process" },
                  { step: 2, title: "Setup Dashboard", desc: "Configure your flights, pricing, and inventory management" },
                  { step: 3, title: "Go Live", desc: "Start selling tickets to millions of potential customers" },
                  { step: 4, title: "Grow Revenue", desc: "Use our analytics to optimize pricing and increase bookings" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Loved by{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what our customers have to say about their experience with our platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-100 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-300 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for your airline. No hidden fees, no surprises.
            </p>
          </div>

          {/* Traveler Pricing - Free */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">For Travelers</h3>
              <p className="text-gray-600">Always free to search and book flights</p>
            </div>
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-2xl text-sm font-medium">
                  FREE
                </div>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
                  <div className="text-gray-500">Forever free</div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Search flights from 500+ airlines</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Best price guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Mobile app access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Instant booking confirmation</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/traveler')}
                >
                  Start Booking Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Airline Pricing Plans */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">For Airlines</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Flexible pricing plans designed to grow with your airline business. Choose between our commission-based model or fixed monthly plans.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Starter</h4>
                  <p className="text-gray-500 mb-4">Perfect for regional airlines</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-blue-600">2.5%</span>
                    <span className="text-gray-500 ml-2">commission</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">+ $99/month base fee</div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Up to 50 flights management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Standard booking management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Mobile app integration</span>
                  </li>
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/airline/register?plan=starter')}
                >
                  Start Free Trial
                </Button>
              </div>

              {/* Professional Plan - Most Popular */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-500 relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </div>
                </div>

                <div className="text-center mb-8 pt-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Professional</h4>
                  <p className="text-gray-500 mb-4">Best for growing airlines</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-purple-600">2.0%</span>
                    <span className="text-gray-500 ml-2">commission</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">+ $299/month base fee</div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Unlimited flights management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Advanced analytics & reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Priority phone support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Revenue optimization tools</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Custom branding options</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                    <span>API access</span>
                  </li>
                </ul>

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => navigate('/airline/register?plan=professional')}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h4>
                  <p className="text-gray-500 mb-4">For major airlines</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">1.5%</span>
                    <span className="text-gray-500 ml-2">commission</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">+ Custom base fee</div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>White-label solutions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>99.9% SLA guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-gray-700 mr-3 flex-shrink-0" />
                    <span>Custom reporting</span>
                  </li>
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 text-gray-700 hover:bg-gray-50"
                  onClick={() => navigate('/airline/contact-sales')}
                >
                  Contact Sales
                </Button>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 text-center">
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">How Our Pricing Works</h4>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                      Commission Structure
                    </h5>
                    <p className="text-gray-600 text-sm">
                      Pay only when you make sales. Our commission is calculated on the net fare amount, helping you maintain healthy profit margins while growing your reach.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Shield className="h-5 w-5 text-blue-600 mr-2" />
                      Monthly Base Fee
                    </h5>
                    <p className="text-gray-600 text-sm">
                      The base fee covers platform maintenance, customer support, and core features. It's a small investment that ensures reliable service and continuous platform improvements.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="text-sm text-gray-500">
                    <strong>Example:</strong> If you sell $100,000 in tickets per month on the Professional plan, you'd pay $299 (base) + $2,000 (2% commission) = $2,299 total.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white relative overflow-hidden">
        {/* Background Pattern */}
   <div
  className="absolute top-0 left-0 w-full h-full opacity-10"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  }}
></div>

       

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
              Ready to Take Off?
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who have transformed their travel and business experience with our platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/traveler')}
              >
                <Users className="h-5 w-5 mr-2" />
                Start Booking Flights
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-105"
                onClick={() => navigate('/airline/register')}
              >
                <Plane className="h-5 w-5 mr-2" />
                Register Your Airline
              </Button>
            </div>

            <div className="pt-8 text-white/80">
              <p className="text-sm">
                🚀 Special Launch Offer: Get 20% off your first booking or free setup for airlines!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">For Travelers</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/flights" className="hover:text-white transition-colors">Search Flights</a></li>
                <li><a href="/bookings" className="hover:text-white transition-colors">My Bookings</a></li>
                <li><a href="/travel-guides" className="hover:text-white transition-colors">Travel Guides</a></li>
                <li><a href="/mobile-app" className="hover:text-white transition-colors">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Airlines</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/airline/register" className="hover:text-white transition-colors">Join Platform</a></li>
                <li><a href="/airline/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/airline/analytics" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="/airline/support" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/press" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 lg:mb-0">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AirlinePro
                </span>
              </div>
              <div className="text-sm text-center lg:text-right">
                <p>&copy; 2024 AirlinePro. All rights reserved.</p>
                <p className="text-gray-500 mt-1">Making travel accessible for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
