"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Icons
import { User, Building2, ChevronLeft, ChevronRight } from "lucide-react"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [accountType, setAccountType] = useState<"personal" | "business" | null>(null)
  
  const totalSteps = 4
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
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
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url("/cargo-ship.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-blue-900/50 to-blue-900/70 z-10" />
        
        {/* Content */}
        <div className="relative z-20 p-10 h-full flex flex-col">
          <Image 
            src="/logo.png" 
            alt="WaterLog" 
            width={150} 
            height={40} 
            className="mb-16"
          />
          
          {/* Step indicators */}
          <div className="space-y-8">
            <StepIndicator 
              number={1} 
              title="General Information"
              subtitle="Basic information about you"
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
            />
            <StepIndicator 
              number={2} 
              title="Detailed Information"
              subtitle="Additional information"
              isActive={currentStep === 2}
              isCompleted={currentStep > 2}
            />
            <StepIndicator 
              number={3} 
              title="Account Information"
              subtitle="Your login credentials"
              isActive={currentStep === 3}
              isCompleted={currentStep > 3}
            />
            <StepIndicator 
              number={4} 
              title="Login Information"
              subtitle="Information to access your account"
              isActive={currentStep === 4}
              isCompleted={currentStep > 4}
            />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Register</h1>
            <div className="flex space-x-2">
              <Link href="#" className="flex items-center">
                <Image src="/en-flag.png" alt="English" width={24} height={16} />
              </Link>
              <Link href="#" className="flex items-center">
                <Image src="/tr-flag.png" alt="Turkish" width={24} height={16} />
              </Link>
              <div className="ml-2 bg-gray-200 rounded-full p-1 flex">
                <div className="h-6 w-6 rounded-full bg-yellow-400"></div>
              </div>
            </div>
          </div>
          
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Account Type</h2>
              <p className="text-gray-600 mb-8">Please select your account type</p>
              
              <div className="space-y-4">
                <Card 
                  className={`cursor-pointer border-2 ${accountType === "business" ? "border-blue-500" : "border-gray-200"}`}
                  onClick={() => setAccountType("business")}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className={`p-3 rounded-full ${accountType === "business" ? "bg-blue-100" : "bg-gray-100"} mr-4`}>
                      <Building2 className={`h-6 w-6 ${accountType === "business" ? "text-blue-500" : "text-gray-500"}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">Business Account</h3>
                      <p className="text-sm text-gray-500">Corporate user account</p>
                    </div>
                    {accountType === "business" && (
                      <div className="ml-auto">
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
              Previous
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
              disabled={!accountType || currentStep === totalSteps}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Continue
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
  isCompleted 
}: { 
  number: number; 
  title: string; 
  subtitle: string; 
  isActive: boolean; 
  isCompleted: boolean;
}) {
  return (
    <div className="flex items-start">
      <div 
        className={`flex items-center justify-center w-10 h-10 rounded-md mr-4
          ${isActive ? "bg-blue-600 text-white" : 
            isCompleted ? "bg-green-500 text-white" : "bg-blue-800/70 text-white"}`}
      >
        {number}
      </div>
      <div>
        <h3 className={`font-medium ${isActive ? "text-white" : "text-white opacity-90"}`}>{title}</h3>
        <p className={`text-sm ${isActive ? "text-blue-200" : "text-blue-200 opacity-80"}`}>{subtitle}</p>
      </div>
    </div>
  )
} 