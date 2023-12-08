'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { forEach, reduce } from 'lodash'

import Image from 'next/image'

export default function Card() {
  const data = mockUp
  const tag = mockUpTag

  const [cardList, setCardList] = useState([])

  useEffect(() => {
    const list = reduce(
      data,
      (a, b) => {
        const tags = []
        forEach(b.tags, (i) => {
          forEach(tag, (j) => {
            if (i === j.id) tags.push(j.name)
          })
        })
        a.push({ ...b, tags })
        return a
      },
      []
    )
    setCardList(list)
  }, [])

  return (
    <div>
      <div className="bg-white">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto pt-2">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Back to home
          </Link>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {cardList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col group relative rounded-xl ring-1 ring-gray-200 p-4 shadow-xl"
              >
                <div>
                  <Image
                    width={200}
                    height={200}
                    priority
                    src={item.img_url}
                    alt={`${item.id}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full group-hover:opacity-75"
                  />
                  <h3 className="absolute text-sm bg-gray-700 py-2 text-center rounded w-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 trans">
                    <span aria-hidden="true" className=" inset-0" />
                    {item.name}
                  </h3>
                </div>
                <div className="mt-8">
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    {item.body}
                  </p>
                </div>
                <div className="mt-auto">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className=" inline-flex items-center mt-2 mr-2 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const mockUp = [
  {
    id: 1,
    tags: [1, 2, 3],
    name: 'Saint Mopierre',
    body: 'Saint Mopierre is a large city, known for being the birthplace of a music genre.',
    img_url: 'https://picsum.photos/id/11/1000',
  },
  {
    id: 2,
    tags: [1],
    name: 'Eulake',
    body: 'Eulake is a small town situated besides a lake. It is known for its mining heritage.',
    img_url: 'https://picsum.photos/id/11/1000',
  },
  {
    id: 3,
    tags: [2, 4],
    name: 'Prince Loeilles',
    body: 'Prince Loeilles is a large town, known for the battle of Prince Loeilles.',
    img_url: 'https://picsum.photos/id/11/1000',
  },
  {
    id: 4,
    tags: [2, 3, 4],
    name: 'North Warrines',
    body: 'North Warrines is a large town, known for being the birthplace of a music genre.',
    img_url: 'https://picsum.photos/id/11/1000',
  },
  {
    id: 5,
    tags: [1, 2, 3],
    name: 'Sainttrois',
    body: 'Sainttrois is a large town named after Saint trois. It is known for the Sainttrois music festival.',
    img_url: 'https://picsum.photos/id/11/1000',
  },
  {
    id: 6,
    tags: [4],
    name: 'Grandenellakes',
    body: 'Grandenellakes is a large town situated besides a lake. It is known for its elaborate legends.',
    img_url: 'https://picsum.photos/id/200/800',
  },
]

const mockUpTag = [
  {
    id: 1,
    name: 'Brinebeast',
    type: 'Earth',
  },
  {
    id: 2,
    name: 'Goolu',
    type: 'Air',
  },
  {
    id: 3,
    name: 'Macaronifeet',
    type: 'Fire',
  },
  {
    id: 4,
    name: 'Wispclaw',
    type: 'Water',
  },
]
