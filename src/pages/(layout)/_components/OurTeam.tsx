import AvatarUser from '@/assets/images/avatar-user.png'
import AvatarUser2 from '@/assets/images/avatar-user2.png'
import AvatarUser3 from '@/assets/images/avatar-user3.png'
import AvatarUser4 from '@/assets/images/avatar-user4.png'
import AvatarUser5 from '@/assets/images/avatar-user5.png'
const users = [
  {
    id: 1,
    name: 'Davis Carder',
    image: AvatarUser,
    desc: 'Super duper position'
  },
  {
    id: 2,
    name: 'Maren Press',
    image: AvatarUser2,
    desc: 'Super duper position'
  },
  {
    id: 3,
    name: 'Randy Rosser',
    image: AvatarUser3,
    desc: 'Super duper position'
  },
  {
    id: 4,
    name: 'Haylie Donin',
    image: AvatarUser4,
    desc: 'Super duper position'
  },
  {
    id: 5,
    name: 'Miracle Bator',
    image: AvatarUser5,
    desc: 'Super duper position'
  }
]

export default function OurTeam() {
  return (
    <div id="our-team" className="max-w-5xl mx-auto py-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-10 md:mx-0 sm:gap-8 md:gap-6 gap-y-10">
        <div className="md:flex-wrap sm:mx-11 md:mx-0">
          <h1 className="text-4xl font-bold leading-loose md:text-5xl sm:mb-6 md:mb-0 sm:text-4xl">
            Our Team
          </h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
            rutrum donec ultricies cras id ac.
          </p>
        </div>
        {users.map(user => (
          <div
            key={user.id}
            className="w-full flex justify-center border-lightgray border-[1px] rounded-sm shadow-xl"
          >
            <div className="py-5 font-medium text-center">
              <img src={user.image} alt="user" className="" />
              <h2 className="mt-6 text-xl">{user.name}</h2>
              <p className="mt-1 sm:text-lg text-primary">{user.desc}</p>
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
