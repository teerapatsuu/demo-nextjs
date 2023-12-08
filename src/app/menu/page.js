'use client'
import { Fragment, useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { reduce, size } from 'lodash'

import { request } from '@/lib/constants'

import { getMenuList, calcMenu } from '@/lib/api/menu'

export default function Card() {
  const [price, setPrice] = useState(0)
  const [menuList, setMenuList] = useState({})
  const [open, setOpen] = useState(false)

  const cancelButtonRef = useRef(null)

  async function fetchData() {
    const res = await request(getMenuList())
    const form = reduce(
      res,
      (a, b) => {
        a.push({ ...b, qty: 0 })
        return a
      },
      []
    )
    setMenuList({ member: false, list: form })
  }

  function clearData() {
    setPrice(0)
    fetchData()
    setOpen(false)
  }

  useEffect(() => {
    if (size(menuList) === 0) {
      fetchData()
    }
  }, [])

  function handleChange(e, id) {
    // console.log(e.target.name, e.target.value, id)
    const form = reduce(
      menuList.list,
      (a, b) => {
        if (b.id === id) {
          a.push({ ...b, [e.target.name]: parseFloat(e.target.value) })
        } else {
          a.push({ ...b })
        }
        return a
      },
      []
    )
    setMenuList({ ...menuList, list: form })
  }

  function handleCheck(e) {
    // console.log(e.target.name, e.target.checked)
    setMenuList({ ...menuList, [e.target.name]: e.target.checked })
  }

  async function onSubmit(event) {
    event.preventDefault()
    const options = {
      body: JSON.stringify(menuList),
    }
    const res = await request(calcMenu(options))
    setPrice(res)
    setOpen(true)
  }

  if (open) {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div> */}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Calculate Menu Price
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Calculate price is {price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={clearData}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-24">
          <form onSubmit={onSubmit}>
            <ul role="list" className="divide-y divide-gray-100">
              {size(menuList.list) > 0 &&
                menuList.list.map((menu) => (
                  <li
                    key={menu.id}
                    className="flex justify-between gap-x-6 py-5"
                  >
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {menu.title}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {menu.price} THB/{menu.unit}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <div className="sm:col-span-3">
                        <input
                          onChange={(e) => handleChange(e, menu.id)}
                          type="text"
                          name="qty"
                          placeholder="Qty"
                          className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="mt-6 flex items-center justify-end gap-x-3">
              <input
                onChange={handleCheck}
                id="member"
                name="member"
                type="checkbox"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor="member"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Member Card
              </label>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link
                href="/"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Back to home
              </Link>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
