import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Photo',
      type: 'image',
      description: 'A square headshot works best.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'bio',
      title: 'Short bio',
      type: 'text',
      rows: 3,
      description: 'One or two sentences about the author.',
    }),
  ],
  preview: {
    select: {title: 'name', media: 'avatar'},
  },
})
