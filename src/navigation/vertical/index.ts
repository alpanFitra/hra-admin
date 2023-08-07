import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: 'Course',
    icon: { icon: 'tabler-certificate-2' },
    children: [
      {
        title: 'New',
        to: 'course-add',
      },
      {
        title: 'List',
        to: 'course-list',
      },
    ]
  },
  {
    title: 'Blog',
    icon: { icon: 'tabler-article' },
    children: [
      {
        title: 'New',
        to: 'blog-add',
      },
      {
        title: 'List',
        to: 'blog-list',
      },
    ]
  },
  {
    title: 'Category',
    icon: { icon: 'tabler-list' },
    to: 'category-list'
  },
] as VerticalNavItems
