import mongoose, { Schema, Document } from 'mongoose'

export type BillingCycle = 'Monthly' | 'Annual'

export interface IPlan extends Document {
  id: string
  name: string
  price: number
  billingCycle: BillingCycle
  createdAt: Date
}

const PlanSchema = new Schema<IPlan>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ['Monthly', 'Annual'],
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
)

export default mongoose.models.Plan ||
  mongoose.model<IPlan>('Plan', PlanSchema) 