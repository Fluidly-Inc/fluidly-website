import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The headline of your post.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The web address for this post. Click "Generate" to make it from the title.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Who wrote this post.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      description: 'When the post should show as published.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'A short summary shown on the blog list and in search results. Keep it under 200 characters.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      description: 'The large image at the top of the post.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO.',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Write your post here. Use the toolbar for headings, bold, lists, links, quotes, and images.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
            {title: 'Subheading', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  {name: 'href', title: 'URL', type: 'url'},
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt text', type: 'string'}),
            defineField({name: 'caption', title: 'Caption', type: 'string'}),
          ],
        }),
        defineArrayMember({
          type: 'code',
          title: 'Code block',
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (optional)',
      type: 'string',
      description: 'Overrides the browser tab and search-result title. Leave blank to use the post title.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (optional)',
      type: 'text',
      rows: 2,
      description: 'Overrides the search-result description. Leave blank to use the summary.',
    }),
  ],
  preview: {
    select: {title: 'title', media: 'coverImage', date: 'publishedAt'},
    prepare({title, media, date}) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
