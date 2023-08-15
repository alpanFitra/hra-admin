export interface BlogData {
  id: number
  title: string
  description: string
  category: Category
}

export interface Category {
  text: string
  value: number
}
