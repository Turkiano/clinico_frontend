import api from "@/api"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { NavBar } from "@/components/ui/navbar"
import { Datepicker } from "flowbite-react"

import { useContext } from "react"
import { GlobalContext } from "@/App"

export default function ProductDetail() {
  const params = useParams()
  const context = useContext(GlobalContext) //consume from the Global State

  if (!context) throw Error("Context is missing")
  const { state, handleAddToCart } = context

  const getProduct = async () => {
    try {
      if (params.productId) {
        const res = await api.get(`/products/${params.productId}`) //adjust the end-point
        return res.data
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  // Queries
  const { data, error, isLoading } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: getProduct
  })
  // console.log(data)
  // console.log(error)

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Product not found</p>
  }
  if (!data) {
    return <p>No data</p>
  }

  return (
    <div>
      <NavBar />

      <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12 p-10">
        <div className="rounded-lg shadow-md bg-red-500 overflow-hidden h-[75vh] w-1/3 ">
          <div
            className="h-full w-full bg-no-repeat bg-cover bg-[left_calc(0%)_top_calc(25%)]"
            style={{ backgroundImage: `url(${data.image})` }}
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{data.name}</h1>

          <h2 className="text-xl text-gray-900 dark:text-white font-bold mb-2">
            Digital Transformation
          </h2>

          <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
            <Datepicker inline />

            <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
              <h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
                Wednesday 30 June 2024
              </h3>
              <button
                type="button"
                data-collapse-toggle="timetable"
                className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 text-gray-800 dark:text-white me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                    clipRule="evenodd"
                  />
                </svg>
                Pick a time
              </button>
              <label className="sr-only">Pick a time</label>
              <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
                <li>
                  <input
                    type="radio"
                    id="10-am"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="10-am"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    10:00 AM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="10-30-am"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="10-30-am"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    10:30 AM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="11-am"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="11-am"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    11:00 AM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="11-30-am"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="11-30-am"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    11:30 AM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="12-am"
                    value=""
                    className="hidden peer"
                    name="timetable"
                    checked
                  />
                  <label
                    htmlFor="12-am"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    12:00 AM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="12-30-pm"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="12-30-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    12:30 PM
                  </label>
                </li>
                <li>
                  <input type="radio" id="1-pm" value="" className="hidden peer" name="timetable" />
                  <label
                    htmlFor="1-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    01:00 PM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="1-30-pm"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="1-30-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    01:30 PM
                  </label>
                </li>
                <li>
                  <input type="radio" id="2-pm" value="" className="hidden peer" name="timetable" />
                  <label
                    htmlFor="2-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    02:00 PM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="2-30-pm"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="2-30-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    02:30 PM
                  </label>
                </li>
                <li>
                  <input type="radio" id="3-pm" value="" className="hidden peer" name="timetable" />
                  <label
                    htmlFor="3-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    03:00 PM
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="3-30-pm"
                    value=""
                    className="hidden peer"
                    name="timetable"
                  />
                  <label
                    htmlFor="3-30-pm"
                    className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                  >
                    03:30 PM
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-600">
            This is a description of the product. It should be informative and engaging to the
            customer.
          </p>
          <Button onClick={() => handleAddToCart(data)} className="w-full" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
