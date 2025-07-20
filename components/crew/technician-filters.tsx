"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

interface TechnicianFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  departmentFilter: string
  onDepartmentFilterChange: (value: string) => void
  statuses: string[]
  departments: string[]
}

export function TechnicianFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  departmentFilter,
  onDepartmentFilterChange,
  statuses,
  departments
}: TechnicianFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Technicians</CardTitle>
        <CardDescription>
          Filter and search for technicians by name, status, or department
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Search className="h-4 w-4 text-muted-foreground mt-3" />
            <Input
              placeholder="Search by name, email or location..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select
                value={statusFilter}
                onValueChange={onStatusFilterChange}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span>{statusFilter === "all" ? "All Statuses" : statusFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[180px]">
              <Select
                value={departmentFilter}
                onValueChange={onDepartmentFilterChange}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span>{departmentFilter === "all" ? "All Departments" : departmentFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
