export interface CourseData {
  id: number
  title: string
  subtitle: string
  category: Category
  competency_unit: string
  price: number
  discount: number
  description: string
  hero_img: null | string
  thumbnail: null | string
  learning_material: LearningMaterial[]
  benefit: Benefit[]
  feature: Feature[]
  question: Question[]
}

export interface Category {
  text: string
  value: number
}

export interface LearningMaterial {
  title: string
  description: string
  kkni: string
}

export interface Benefit {
  benefit: string
}

export interface Feature {
  feature: string
}

export interface Question {
  question: string
}


