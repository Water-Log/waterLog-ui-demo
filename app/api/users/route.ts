import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/mongodb'
import User from '@/schemas/user'

export async function GET() {
  await dbConnect()
  const users = await User.find().populate('company')
  console.log(users.length)
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  await dbConnect()
  const user = await User.create(data)
  return NextResponse.json(user, { status: 201 })
} 