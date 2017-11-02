import { Request } from "express"
import * as admin from 'firebase-admin'

export interface AuthRequest extends Request {
  user: admin.auth.DecodedIdToken
}