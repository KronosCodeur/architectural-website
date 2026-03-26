declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    role: 'super_admin' | 'admin_client'
  }
}

export {}
