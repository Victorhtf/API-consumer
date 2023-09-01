import { useEffect } from "react"


import axios from "axios"

function usersContent () {

  async function fetchUsers() {
    try {
      const response = await axios.get('https://localhost:8000')
      console.log(response)
      
    } catch (error) {
      console.error(error)
      
    }



  }

  useEffect( () => { 
    fetchUsers() 

  })





  return (
    <div>UsersContent</div>
  )
}

export default usersContent