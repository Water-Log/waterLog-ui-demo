import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import Company from '@/schemas/company'
import User from '@/schemas/user'
import { Role } from '@/schemas/role'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const body = await request.json()
    const {
      companyName,
      companyEmail,
      selectedCountry,
      taxNumber,
      billingAddress,
      email,
      password,
      fullName
    } = body

    // Validate required fields
    if (!companyName || !companyEmail || !email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ email: companyEmail.toLowerCase() })
    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company with this email already exists' },
        { status: 409 }
      )
    }

    // Create company first
    const company = new Company({
      name: companyName,
      email: companyEmail.toLowerCase(),
      billingAddress: billingAddress,
      taxNumber: taxNumber,
    })

    const savedCompany = await company.save()

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user with manager role
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      company: savedCompany._id,
      role: Role.Manager,
      active: true,
    })

    const savedUser = await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
        companyId: savedCompany._id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return success response without password
    const userResponse = {
      id: savedUser.id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      role: savedUser.role,
      company: {
        id: savedCompany.id,
        name: savedCompany.name,
        email: savedCompany.email,
      },
      active: savedUser.active,
      createdAt: savedUser.createdAt,
    }

    return NextResponse.json(
      { 
        message: 'Account created successfully',
        token,
        user: userResponse 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 