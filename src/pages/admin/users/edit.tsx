import DatePicker from '@/components/DatePicker'
import { MultiSelect } from '@/components/MultiSelect'
import { useState } from 'react'

export default function Edit() {
  const [date, setDate] = useState<Date>(new Date())
  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className="p-2 bg-gray-200 flex">
      <DatePicker
        selected={date}
        onSelect={date => date && setDate(date)}
        mode="single"
        disabled={[
          {
            after: new Date()
          }
        ]}
      />
      <MultiSelect
        selected={selected}
        onChange={setSelected}
        options={[
          {
            value: 'next.js',
            label: 'Next.js'
          },
          {
            value: 'sveltekit',
            label: 'SvelteKit'
          },
          {
            value: 'nuxt.js',
            label: 'Nuxt.js'
          },
          {
            value: 'remix',
            label: 'Remix'
          },
          {
            value: 'astro',
            label: 'Astro'
          },
          {
            value: 'wordpress',
            label: 'WordPress'
          },
          {
            value: 'express.js',
            label: 'Express.js'
          }
        ]}
      />
    </div>
  )
}
