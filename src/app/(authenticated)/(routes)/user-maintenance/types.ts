export interface Filters {
  search: string
}

export interface User {
  id: number,
  name: string,
  email: string,
  dob: string,
  address: string,
  password?: string,
}