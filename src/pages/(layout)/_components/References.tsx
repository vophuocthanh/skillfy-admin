import Reference from '@/assets/svgs/ref.svg'

const descriptionReferences = [
  {
    id: 1,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem. Diam nunc scelerisque mi vestibulum scelerisque mi ac nisi. Dictumst nunc placerat ultricies pretium.',
    name: 'Emerson Aminoff',
    title: '3 bedroom apartmentt in Madrid'
  },
  {
    id: 2,
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique in pellentesque ultrices et massa neque, convallis lorem. Erat proin in posuere dui accumsan lorem. Diam nunc scelerisque mi vestibulum scelerisque mi ac nisi. Dictumst nunc placerat ultricies pretium.',
    name: 'Jocelyn Stanton',
    title: '2 bedroom apartmentt in Barcelona'
  }
]
export default function References() {
  return (
    <div id="references" className="mx-8 md:max-w-5xl md:mx-auto my-44">
      <div className="md:w-1/2 ">
        <h1 className="sm:text-5xl text-4xl font-bold leading-[69px] text-lightgray">
          References
        </h1>
        <p className="md:w-153 text-lightgray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Purus rutrum donec ultricies cras id ac.
        </p>
      </div>
      <div className="flex flex-col gap-8 mt-10 md:flex-row">
        {descriptionReferences.map(ref => (
          <div key={ref.name} className="p-6 bg-secondary">
            <div className="flex items-start gap-3">
              <img src={Reference} alt="references" />
              <p className="pt-2 text-lightgray">{ref.desc}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold text-lightgray">{ref.name}</h2>
              <p className="text-lightgray">{ref.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative md:left-[44%] left-[38%] top-9 h-4 w-28">
        <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-zinc-200" />
        <div className="absolute top-0 w-4 h-4 rounded-full left-8 bg-zinc-200" />
        <div className="absolute top-0 w-4 h-4 bg-blue-900 rounded-full left-16" />
        <div className="absolute top-0 w-4 h-4 rounded-full left-24 bg-zinc-200" />
      </div>
    </div>
  )
}
