export type UserRole = 'super_admin' | 'admin_client'

export interface AuthUser {
  id: number
  email: string
  role: UserRole
}

export type BlockType =
  | 'hero'
  | 'text'
  | 'image_text'
  | 'gallery'
  | 'cards'
  | 'testimonials'
  | 'cta'
  | 'video'
  | 'spacer'
  | 'contact_form'
  | 'quote_form'
  | 'map'
  | 'html'

export type ContactStatus = 'unread' | 'read' | 'archived'

export interface ApiPage {
  id: number
  title: string
  slug: string
  template: string | null
  originalTemplate: string | null
  metaTitle: string | null
  metaDescription: string | null
  isActive: boolean
  order: number
}

export interface ApiBlock {
  id: number
  pageId: number
  type: BlockType
  content: Record<string, unknown>
  order: number
  isActive: boolean
}

export interface ApiNavItem {
  id: number
  label: string
  url: string
  order: number
  isActive: boolean
  parentId: number | null
}

export interface ApiContact {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: ContactStatus
  createdAt: string
}
