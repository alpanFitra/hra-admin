export interface BlogData {
  id: number
  title: string
  category: Category
  description: string
}

export interface Category {
  text: string
  value: number
}
