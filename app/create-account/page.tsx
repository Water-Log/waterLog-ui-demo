"use client"

import { Button } from "@/components/ui/button"
// Card components no longer used
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { useState } from "react"
import { countries } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

// Icons
import { Check } from "lucide-react"
import { useLanguage, Language } from "../_providers/language"
import { useAuth } from "../_providers/auth"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [companyName, setCompanyName] = useState("")
  const [companyEmail, setCompanyEmail] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [billingAddress, setBillingAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // NEW: language context
  const { language, setLanguage, t } = useLanguage()
  const languages: { code: Language; src: string; alt: string }[] = [
    { code: "en", src: "/en-flag.png", alt: "English" },
    { code: "tr", src: "/tr-flag.png", alt: "Turkish" },
  ]
  
  const totalSteps = 3
  
  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setError("") // Clear any previous errors
    } else {
      // Create account
      setIsLoading(true)
      setError("")
      
      try {
        console.log("📝 Starting registration with manager role...");
        await register({
          companyName,
          companyEmail,
          billingAddress,
          taxNumber,
          email,
          password,
          fullName,
          phoneNumber,
          role: "MANAGER"
        })

        // Account created successfully and user is logged in, redirect to manager page
        
        router.push('/login')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Left sidebar with background image */}
      <div className="hidden md:block relative min-h-screen w-96 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 z-0 h-full" 
          style={{
            backgroundImage: 'url("/cargo-ship.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-blue-900/80 to-blue-900/70 z-10" />
        
        {/* Content */}
        <div className="relative z-20 p-10 h-full flex flex-col justify-between h-screen">
          <div className="flex-1">
            <Image
              className="w-full"
              src="/register-logo.png" 
              alt="WaterLog" 
              width={300} 
              height={100} 
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex-1 py-8">
            <div className="relative">
              {/* Background connecting line */}
              <div className="absolute left-5 top-12 bottom-12 w-0.5 bg-white/20"></div>
              
              {/* Progress connecting line */}
              <div 
                className="absolute left-5 top-12 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-500"
                style={{ 
                  height: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                  maxHeight: 'calc(100% - 96px)'
                }}
              ></div>
              
              <div className="space-y-6">
                <StepIndicator 
                  number={1} 
                  title={t('steps.1.title')}
                  subtitle={t('steps.1.subtitle')}
                  isActive={currentStep === 1}
                  isCompleted={currentStep > 1}
                  isFirst={true}
                />
                <StepIndicator 
                  number={2} 
                  title={t('steps.2.title')}
                  subtitle={t('steps.2.subtitle')}
                  isActive={currentStep === 2}
                  isCompleted={currentStep > 2}
                />
                <StepIndicator 
                  number={3} 
                  title={t('steps.3.title')}
                  subtitle={t('steps.3.subtitle')}
                  isActive={currentStep === 3}
                  isCompleted={currentStep > 3}
                  isLast={true}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start justify-end">
            <div className="flex flex-col items-start justify-center">
              <p className="text-white">Fleet Water Management System</p>
              <p className="text-white text-sm">WaterLog © {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{t('register.title')}</h1>
            <div className="flex space-x-2">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => setLanguage(lng.code)}
                  className={`flex items-center transition-all rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
                    language === lng.code ? "ring-2 ring-blue-900 overflow-hidden" : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={lng.alt}
                >
                  <Image src={lng.src} alt={lng.alt} width={24} height={16} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Error display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('companyGeneral.heading')}</h2>
              <p className="text-gray-600 mb-8">{t('companyGeneral.description')}</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Your Company LLC" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">Company Email Address</Label>
                  <Input 
                    id="companyEmail" 
                    type="email"
                    placeholder="info@yourcompany.com" 
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('companyDetailed.heading')}</h2>
              <p className="text-gray-600 mb-8">{t('companyDetailed.description')}</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea 
                    id="billingAddress" 
                    placeholder="123 Main St, City, Country"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="taxNumber">Tax Number</Label>
                  <Input 
                    id="taxNumber" 
                    placeholder="1234567890" 
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          

          
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('loginInfo.heading')}</h2>
              <p className="text-gray-600 mb-8">{t('loginInfo.description')}</p>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="john.doe@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    type="tel"
                    placeholder="+1 (555) 123-4567" 
                    value={phoneNumber}
                    onChange={(e) => {
                      // Remove all non-digit characters except + and -
                      const cleaned = e.target.value.replace(/[^\d+\-\(\)\s]/g, '');
                      setPhoneNumber(cleaned);
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: +1 (555) 123-4567 or +905551234567
                  </p>
                  {phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber) && (
                    <p className="text-red-500 text-sm mt-1">Please enter a valid phone number</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-12 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="text-gray-600"
            >
              {t('button.previous')}
            </Button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full ${currentStep > i ? "bg-yellow-400" : i === currentStep - 1 ? "bg-yellow-400" : "bg-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-gray-500">{currentStep}/{totalSteps}</span>
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={
                isLoading ||
                (currentStep === 1 && (!companyName || !companyEmail)) ||
                (currentStep === 2 && (!billingAddress || !taxNumber)) ||
                (currentStep === 3 && (
                  !email || 
                  !password || 
                  !fullName || 
                  !phoneNumber || 
                  password !== confirmPassword ||
                  !/^\+?[\d\s\-\(\)]+$/.test(phoneNumber)
                ))
              }
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                currentStep === totalSteps ? t('button.complete') : t('button.continue')
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step indicator component
function StepIndicator({ 
  number, 
  title, 
  subtitle, 
  isActive, 
  isCompleted,
  isFirst = false,
  isLast = false
}: { 
  number: number; 
  title: string; 
  subtitle: string; 
  isActive: boolean; 
  isCompleted: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { t } = useLanguage()
  return (
    <div className="relative flex items-start">
      {/* Progress line segment */}
      {!isFirst && (
        <div 
          className={`absolute left-5 -top-6 h-6 w-0.5 ${
            isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-blue-300/50'
          }`}
        />
      )}
      {!isLast && (
        <div 
          className={`absolute left-5 top-12 h-6 w-0.5 ${
            isCompleted ? 'bg-green-500' : 'bg-blue-300/50'
          }`}
        />
      )}
      
      <div 
        className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full mr-4 border-2 transition-all duration-300 shadow-lg
          ${isActive ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/50" : 
            isCompleted ? "bg-green-500 border-green-500 text-white shadow-green-500/50" : "bg-white/20 text-white border-white/30 backdrop-blur-sm"}`}
      >
        {isCompleted ? (
          <Check className="h-5 w-5 animate-pulse" />
        ) : (
          <span className="font-semibold text-sm">{number}</span>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className={`font-semibold text-base mb-1 transition-colors duration-200 ${
          isActive ? "text-white" : isCompleted ? "text-green-100" : "text-white/90"
        }`}>
          {title}
        </h3>
        <p className={`text-sm transition-colors duration-200 ${
          isActive ? "text-blue-200" : isCompleted ? "text-green-200" : "text-white/70"
        }`}>
          {subtitle}
        </p>
        
        {/* Progress indicator */}
        <div className="mt-2 flex items-center">
          <div className={`h-1 w-8 rounded-full transition-all duration-300 ${
            isCompleted ? 'bg-green-400' : isActive ? 'bg-blue-400' : 'bg-white/20'
          }`} />
          {isActive && (
            <div className="ml-2 text-xs text-blue-200 font-medium">
              {t('status.inProgress')}
            </div>
          )}
          {isCompleted && (
            <div className="ml-2 text-xs text-green-200 font-medium">
              {t('status.completed')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}