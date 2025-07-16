"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { 
  generateMonthlyReport,
  generateAIComment,
} from "@/lib/mock-data"

interface MonthlyReportCardProps {
  selectedShip: string
  selectedMonth: string
  selectedYear: string
  shipName: string
}

export function MonthlyReportCard({ 
  selectedShip, 
  selectedMonth, 
  selectedYear, 
  shipName 
}: MonthlyReportCardProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  
  const reportData = generateMonthlyReport(selectedShip, selectedMonth, selectedYear)
  
  // Auto-select the last day that has data when reportData changes, but only if user hasn't manually selected
  useEffect(() => {
    if (reportData && reportData.data.length > 0 && !hasUserSelected) {
      // Find the last day that has any parameter data
      const lastDayWithData = reportData.data
        .filter(d => d.nitrite || d.chloride || d.pH || d.totalHardness)
        .sort((a, b) => b.day - a.day)[0]
      
      if (lastDayWithData) {
        setSelectedDay(lastDayWithData.day)
      }
    }
  }, [reportData, hasUserSelected])
  
  // Reset user selection flag when ship/month/year changes
  useEffect(() => {
    setHasUserSelected(false)
  }, [selectedShip, selectedMonth, selectedYear])
  
  const getDayColor = (value: number | null, parameter: string) => {
    if (!value) return "bg-gray-50"
    
    switch (parameter) {
      case "nitrite":
        if (value >= 1000 && value <= 2400) return "bg-green-100"
        if (value > 2400) return "bg-red-100"
        return "bg-yellow-100"
      case "chloride":
        if (value <= 50) return "bg-green-100"
        if (value > 50 && value <= 80) return "bg-yellow-100"
        return "bg-red-100"
      case "pH":
        if (value >= 8.3 && value <= 10) return "bg-green-100"
        if (value > 10 && value <= 11) return "bg-yellow-100"
        return "bg-red-100"
      case "totalHardness":
        if (value <= 180) return "bg-green-100"
        if (value > 180 && value <= 200) return "bg-yellow-100"
        return "bg-red-100"
      default:
        return "bg-gray-50"
    }
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    setHasUserSelected(true)
  }

  const getSelectedDayData = () => {
    if (!selectedDay || !reportData) return null
    return reportData.data.find(d => d.day === selectedDay)
  }

  const getSelectedDayAIComments = () => {
    const dayData = getSelectedDayData()
    if (!dayData) return null

    // Determine status based on parameter values
    const getParameterStatus = (parameter: string, value: number) => {
      switch (parameter) {
        case "nitrite":
          if (value >= 1000 && value <= 2400) return "optimal"
          if (value > 2400) return "high"
          return "low"
        case "chloride":
          if (value <= 50) return "normal"
          if (value > 50 && value <= 80) return "high"
          return "critical"
        case "pH":
          if (value >= 8.3 && value <= 10) return "good"
          if (value > 10) return "high"
          return "low"
        case "totalHardness":
          if (value <= 180) return "acceptable"
          if (value > 180 && value <= 200) return "high"
          return "critical"
        default:
          return "normal"
      }
    }

    return {
      nitrite: dayData.nitrite ? generateAIComment("nitrite", dayData.nitrite, getParameterStatus("nitrite", dayData.nitrite)) : null,
      chloride: dayData.chloride ? generateAIComment("chloride", dayData.chloride, getParameterStatus("chloride", dayData.chloride)) : null,
      pH: dayData.pH ? generateAIComment("pH", dayData.pH, getParameterStatus("pH", dayData.pH)) : null,
      totalHardness: dayData.totalHardness ? generateAIComment("totalHardness", dayData.totalHardness, getParameterStatus("totalHardness", dayData.totalHardness)) : null
    }
  }

  if (!reportData) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Monthly Water Analysis Report - {new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </CardTitle>
        <CardDescription>
          Historical water analysis data with AI insights for {shipName}
          <span className="block text-sm text-blue-600 mt-1">
            💡 Click on any day column or cell to view AI analysis for that specific day
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full border-collapse border border-gray-300 text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="border border-gray-300 font-bold text-xs sticky left-0 bg-white z-10 min-w-[140px]">Parameter</TableHead>
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <TableHead 
                    key={day} 
                    className={`border border-gray-300 text-center font-bold text-xs w-[30px] p-1 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDay === day ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Nitrite Row */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Nitrite (ppm)</TableCell>
                {Array.from({length: 31}, (_, i) => {
                  const dayData = reportData.data.find(d => d.day === i + 1)
                  return (
                    <TableCell 
                      key={i + 1} 
                      className={`border border-gray-300 text-center text-xs p-1 cursor-pointer hover:bg-opacity-80 transition-colors ${getDayColor(dayData?.nitrite || null, "nitrite")} ${
                        selectedDay === i + 1 ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onClick={() => handleDayClick(i + 1)}
                    >
                      {dayData?.nitrite || ""}
                    </TableCell>
                  )
                })}
              </TableRow>
              
              {/* AI Comment Row for Nitrite */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-blue-50 z-10 p-2 italic">
                  AI Comment - Nitrite
                </TableCell>
                <TableCell colSpan={31} className="border border-gray-300 text-xs p-2 bg-blue-50">
                  {selectedDay && (() => {
                    const dayData = reportData.data.find(d => d.day === selectedDay)
                    const aiComments = getSelectedDayAIComments()
                    return dayData?.nitrite && aiComments?.nitrite ? (
                      <div className="text-[10px] text-blue-800 leading-tight">
                        <strong>Day {selectedDay}:</strong> {aiComments.nitrite}
                      </div>
                    ) : selectedDay ? (
                      <div className="text-[10px] text-gray-500 italic">
                        No data available for day {selectedDay}
                      </div>
                    ) : ""
                  })()}
                </TableCell>
              </TableRow>
              
              {/* Chemical Addition Row */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Rocor NB Liquid (Lt)</TableCell>
                {Array.from({length: 31}, (_, i) => {
                  const dayData = reportData.data.find(d => d.day === i + 1)
                  return (
                    <TableCell 
                      key={i + 1} 
                      className={`border border-gray-300 text-center text-xs p-1 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedDay === i + 1 ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onClick={() => handleDayClick(i + 1)}
                    >
                      {dayData?.chemicalAddition || ""}
                    </TableCell>
                  )
                })}
              </TableRow>
              
              {/* Spacer Row */}
              <TableRow>
                <TableCell colSpan={32} className="border-0 h-2"></TableCell>
              </TableRow>
              
              {/* Chloride Row */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Chloride (ppm)</TableCell>
                {Array.from({length: 31}, (_, i) => {
                  const dayData = reportData.data.find(d => d.day === i + 1)
                  return (
                    <TableCell 
                      key={i + 1} 
                      className={`border border-gray-300 text-center text-xs p-1 cursor-pointer hover:bg-opacity-80 transition-colors ${getDayColor(dayData?.chloride || null, "chloride")} ${
                        selectedDay === i + 1 ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onClick={() => handleDayClick(i + 1)}
                    >
                      {dayData?.chloride || ""}
                    </TableCell>
                  )
                })}
              </TableRow>
              
              {/* AI Comment Row for Chloride */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-blue-50 z-10 p-2 italic">
                  AI Comment - Chloride
                </TableCell>
                <TableCell colSpan={31} className="border border-gray-300 text-xs p-2 bg-blue-50">
                  {selectedDay && (() => {
                    const dayData = reportData.data.find(d => d.day === selectedDay)
                    const aiComments = getSelectedDayAIComments()
                    return dayData?.chloride && aiComments?.chloride ? (
                      <div className="text-[10px] text-blue-800 leading-tight">
                        <strong>Day {selectedDay}:</strong> {aiComments.chloride}
                      </div>
                    ) : selectedDay ? (
                      <div className="text-[10px] text-gray-500 italic">
                        No data available for day {selectedDay}
                      </div>
                    ) : ""
                  })()}
                </TableCell>
              </TableRow>
              
              {/* Spacer Row */}
              <TableRow>
                <TableCell colSpan={32} className="border-0 h-2"></TableCell>
              </TableRow>
              
              {/* pH Row */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">pH</TableCell>
                {Array.from({length: 31}, (_, i) => {
                  const dayData = reportData.data.find(d => d.day === i + 1)
                  return (
                    <TableCell 
                      key={i + 1} 
                      className={`border border-gray-300 text-center text-xs p-1 cursor-pointer hover:bg-opacity-80 transition-colors ${getDayColor(dayData?.pH || null, "pH")} ${
                        selectedDay === i + 1 ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onClick={() => handleDayClick(i + 1)}
                    >
                      {dayData?.pH || ""}
                    </TableCell>
                  )
                })}
              </TableRow>
              
              {/* AI Comment Row for pH */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-blue-50 z-10 p-2 italic">
                  AI Comment - pH
                </TableCell>
                <TableCell colSpan={31} className="border border-gray-300 text-xs p-2 bg-blue-50">
                  {selectedDay && (() => {
                    const dayData = reportData.data.find(d => d.day === selectedDay)
                    const aiComments = getSelectedDayAIComments()
                    return dayData?.pH && aiComments?.pH ? (
                      <div className="text-[10px] text-blue-800 leading-tight">
                        <strong>Day {selectedDay}:</strong> {aiComments.pH}
                      </div>
                    ) : selectedDay ? (
                      <div className="text-[10px] text-gray-500 italic">
                        No data available for day {selectedDay}
                      </div>
                    ) : ""
                  })()}
                </TableCell>
              </TableRow>
              
              {/* Spacer Row */}
              <TableRow>
                <TableCell colSpan={32} className="border-0 h-2"></TableCell>
              </TableRow>
              
              {/* Total Hardness Row */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-white z-10 p-2">Total Hardness (ppm CaCO₃)</TableCell>
                {Array.from({length: 31}, (_, i) => {
                  const dayData = reportData.data.find(d => d.day === i + 1)
                  return (
                    <TableCell 
                      key={i + 1} 
                      className={`border border-gray-300 text-center text-xs p-1 cursor-pointer hover:bg-opacity-80 transition-colors ${getDayColor(dayData?.totalHardness || null, "totalHardness")} ${
                        selectedDay === i + 1 ? 'ring-2 ring-blue-400' : ''
                      }`}
                      onClick={() => handleDayClick(i + 1)}
                    >
                      {dayData?.totalHardness || ""}
                    </TableCell>
                  )
                })}
              </TableRow>
              
              {/* AI Comment Row for Total Hardness */}
              <TableRow>
                <TableCell className="border border-gray-300 font-medium text-xs sticky left-0 bg-blue-50 z-10 p-2 italic">
                  AI Comment - Total Hardness
                </TableCell>
                <TableCell colSpan={31} className="border border-gray-300 text-xs p-2 bg-blue-50">
                  {selectedDay && (() => {
                    const dayData = reportData.data.find(d => d.day === selectedDay)
                    const aiComments = getSelectedDayAIComments()
                    return dayData?.totalHardness && aiComments?.totalHardness ? (
                      <div className="text-[10px] text-blue-800 leading-tight">
                        <strong>Day {selectedDay}:</strong> {aiComments.totalHardness}
                      </div>
                    ) : selectedDay ? (
                      <div className="text-[10px] text-gray-500 italic">
                        No data available for day {selectedDay}
                      </div>
                    ) : ""
                  })()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
