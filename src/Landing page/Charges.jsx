import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Zap, Crown, Star } from "lucide-react"



const PricingCard = ({ tier, index }) => {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      setMousePosition({ x, y })

      const rotateX = -(y / rect.height) * 8
      const rotateY = (x / rect.width) * 8

      setRotation({ x: rotateX, y: rotateY })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  const getGradientColors = () => {
    if (tier.highlighted) {
      return {
        from: "from-emerald-900",
        to: "to-green-800",
        glow: "rgba(16, 185, 129, 0.7)"
      }
    }
    return {
      from: "from-gray-900",
      to: "to-gray-800",
      glow: "rgba(34, 197, 94, 0.4)"
    }
  }

  const colors = getGradientColors()

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden h-full"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: index * 0.1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background with gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to}`}
        style={{
          transform: "translateZ(-10px)",
          opacity: isHovered ? "1" : "0.95"
        }}
      />

      {/* Glass overlay with animated border */}
      <div
        className={`absolute inset-0 backdrop-blur-md bg-black/20 rounded-2xl border-2 ${
          tier.highlighted 
            ? 'border-emerald-500/50' 
            : 'border-green-400/30'
        }`}
        style={{
          transform: "translateZ(0)",
          animation: tier.highlighted 
            ? 'border-glow-highlighted 3s ease-in-out infinite' 
            : 'border-glow 4s ease-in-out infinite',
          animationDelay: `${index * 0.5}s`
        }}
      />

      {/* Green glow effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3"
        style={{
          background: `radial-gradient(ellipse at bottom center, ${colors.glow} -20%, transparent 70%)`,
          filter: "blur(40px)"
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.7,
          y: isHovered ? "10%" : "15%"
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: isHovered ? 0.8 : 0.4,
              transition: "opacity 0.5s ease-out",
              boxShadow: "0 0 10px 2px rgba(34, 197, 94, 0.3)"
            }}
          />
        ))}
      </div>

      {/* Badge */}
      {tier.badge && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm text-green-300 text-xs font-medium flex items-center gap-1 border border-green-400/30"
          style={{
            transform: isHovered ? "translateZ(60px)" : "translateZ(30px)",
            transition: "all 0.3s ease-out"
          }}
        >
          <Crown className="w-3 h-3" />
          <span>{tier.badge}</span>
        </div>
      )}

      {/* Content */}
      <div
        className="relative p-8 flex flex-col h-full z-10"
        style={{
          transform: isHovered ? "translateZ(40px)" : "translateZ(20px)",
          transition: "transform 0.3s ease-out"
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                tier.highlighted 
                  ? "bg-green-500/20 border border-green-400/30" 
                  : "bg-gray-700/50 border border-gray-600/30"
              }`}
              style={{
                transform: isHovered ? "translateZ(20px)" : "translateZ(10px)",
                transition: "transform 0.3s ease-out"
              }}
            >
              {tier.highlighted ? (
                <Zap className="w-5 h-5 text-green-400" />
              ) : (
                <Star className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
          </div>
          
          <div className="mb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{tier.price}</span>
              <span className="text-gray-400 text-sm">/{tier.period}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed">{tier.description}</p>
        </div>

        {/* Features */}
        <div className="flex-1 mb-8">
          <ul className="space-y-3">
            {tier.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                className="flex items-start gap-3 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                style={{
                  transform: isHovered ? "translateZ(30px)" : "translateZ(15px)",
                  transition: "transform 0.3s ease-out"
                }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
                <span className="text-gray-300 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.button
          className={`shimmer-button w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            tier.highlighted
              ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/25"
              : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600/50"
          }`}
          style={{
            transform: isHovered ? "translateZ(50px)" : "translateZ(25px)",
            transition: "transform 0.3s ease-out"
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {tier.buttonText}
        </motion.button>
      </div>

      {/* Shine effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x + (cardRef.current?.getBoundingClientRect()?.width || 0) / 2}px ${
                mousePosition.y + (cardRef.current?.getBoundingClientRect()?.height || 0) / 2
              }px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 80%)`
            : "",
          opacity: isHovered ? "1" : "0",
          transition: "opacity 0.3s ease-out"
        }}
      />

      {/* Card shadow */}
      <div
        className="absolute bottom-0 left-1/2 w-[90%] h-[10px] rounded-full bg-green-900/40 blur-md -translate-x-1/2"
        style={{
          transform: isHovered ? "translate(-50%, 20px) scale(0.95)" : "translate(-50%, 12px) scale(0.85)",
          opacity: isHovered ? "0.6" : "0.4",
          transition: "transform 0.5s ease-out, opacity 0.5s ease-out"
        }}
      />
    </motion.div>
  )
}

const PricingSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')

  useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        25% { transform: translateY(-15px) translateX(8px) rotate(90deg); }
        50% { transform: translateY(0) translateX(15px) rotate(180deg); }
        75% { transform: translateY(15px) translateX(8px) rotate(-270deg); }
        100% { transform: translateY(0) translateX(0) rotate(360deg); }
      }
      @keyframes float-reverse {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        25% { transform: translateY(-15px) translateX(-8px) rotate(-90deg); }
        50% { transform: translateY(0) translateX(-15px) rotate(-180deg); }
        75% { transform: translateY(15px) translateX(-8px) rotate(-270deg); }
        100% { transform: translateY(0) translateX(0) rotate(-360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
        50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
      }
      @keyframes border-glow {
        0%, 100% { 
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 20px rgba(34, 197, 94, 0.1);
        }
        50% { 
          border-color: rgba(34, 197, 94, 0.8);
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.5), inset 0 0 30px rgba(34, 197, 94, 0.2);
        }
      }
      @keyframes border-glow-highlighted {
        0%, 100% { 
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 30px rgba(16, 185, 129, 0.15);
        }
        50% { 
          border-color: rgba(16, 185, 129, 1);
          box-shadow: 0 0 60px rgba(16, 185, 129, 0.7), inset 0 0 40px rgba(16, 185, 129, 0.3);
        }
      }
    `
    document.head.appendChild(styleEl)

    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  const pricingTiers = [
    {
      name: "Free",
      price: selectedPeriod === 'monthly' ? "$0" : "$0",
      period: selectedPeriod === 'monthly' ? "month" : "year",
      description: "Perfect for individuals and small projects getting started with AI website building.",
      features: [
        "5 AI-generated websites/day",
        "Basic templates library",
        "Email support",
        "Mobile responsive design"
      ],
      buttonText: "Start Building"
    },
    {
      name: "Pro",
      price: selectedPeriod === 'monthly' ? "$29" : "$300",
      period: selectedPeriod === 'monthly' ? "month" : "year",
      description: "Advanced features for growing businesses and professional developers.",
      features: [
        "10 AI-generated websites/day",
"Access to Community templates",
        "Advanced AI customization",
        "Priority support",
       
        "Git hub integration",
       "Video call support",
        "Responsive design for all devices",
       
      ],
      highlighted: true,
      badge: "Most Popular",
      buttonText: "Go Professional"
    },
    {
      name: "Premium",
      price: selectedPeriod === 'monthly' ? "$99" : "$1100",
      period: selectedPeriod === 'monthly' ? "month" : "year",
      description: "Complete solution for large organizations with advanced AI requirements.",
      features: [
        "Everything in Professional",
        "Unlimited AI-generated websites",
        "Access to all templates",
        "White-label solution",
        "API access",
        "Dedicated support team",
        "Custom integrations",
        "Team collaboration",
        "24/7 phone support"
      ],
      buttonText: "Contact Sales"
    }
  ]

  return (
    <div className="min-h-screen bg-black bg-[url('/stars.png')] py-20 px-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-500/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 20px 4px rgba(34, 197, 94, 0.1)",
              animation: `${i % 2 === 0 ? 'float' : 'float-reverse'} ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-4">
             Pixora <span className="text-white">Plus</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your website building journey. Scale as you grow with our intelligent solutions.
            </p>
          </motion.div>

          {/* Period Toggle */}
          <motion.div
            className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              onClick={() => setSelectedPeriod('monthly')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedPeriod === 'monthly'
                  ? 'bg-green-600 text-white shadow'
                  : 'bg-transparent text-gray-400 hover:text-white'}
              `}
              style={{
                minWidth: 100,
                cursor: 'pointer'
              }}
            >
              Monthly
            </div>
            <div
              onClick={() => setSelectedPeriod('yearly')}
              className={` mouseover:cursor-pointer
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedPeriod === 'yearly'
                  ? 'bg-green-600 text-white shadow'
                  : 'bg-transparent text-gray-400 hover:text-white'}
              `}
              style={{
                minWidth: 100,
                 cursor: 'pointer'
              }}
            >
              Yearly
              {selectedPeriod !== 'monthly' && (
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={tier.name} className="h-full">
              <PricingCard tier={tier} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-400 mb-4">
            Need a custom solution? We are here to help.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-600/25">
            Contact Our Team
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default PricingSection
