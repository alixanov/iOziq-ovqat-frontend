import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Admin, Seller } from "../"


const Main = () => {
  const token = localStorage.getItem("token")
  const [role, setRole] = useState("")
  useEffect(() => {
    axios.get("https://i-oziq-ovqat-backend.vercel.app/api/getRole", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setRole(res.data.role)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      {
        role === "admin" ? (<Admin />) : <Seller/>
      }
    </>
  )
}

export default Main
