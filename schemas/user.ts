import mongoose, { Schema, Document } from 'mongoose'
import { Role } from './role'
import Company, { ICompany } from './company'

export interface IUser extends Document {
  id: string
  company: mongoose.Types.ObjectId | ICompany
  email: string
  password: string
  fullName: string
  role: Role
  active: boolean
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
)

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema) 