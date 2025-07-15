import mongoose, { Schema, Document } from 'mongoose'
import { IPlan } from './plan'

export interface ICompany extends Document {
  id: string
  plan?: mongoose.Types.ObjectId | IPlan
  name: string
  billingAddress?: string
  taxNumber?: string
  email?: string
  createdAt: Date
}

const CompanySchema = new Schema<ICompany>(
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
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan',
    },
    billingAddress: {
      type: String,
      trim: true,
    },
    taxNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
)

export default mongoose.models.Company ||
  mongoose.model<ICompany>('Company', CompanySchema) 