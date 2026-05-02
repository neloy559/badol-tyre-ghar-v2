// API Route: POST /api/partner
import { connectDB } from '@/lib/mongodb'
import { PartnerLead } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const { businessName, ownerName, phone, district } = body

    if (!businessName || !ownerName || !phone || !district) {
      return NextResponse.json({ success: false, message: 'Required fields missing' }, { status: 400 })
    }

    const lead = await PartnerLead.create(body)
    return NextResponse.json({ success: true, data: lead }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const leads = await PartnerLead.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, data: leads })
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
