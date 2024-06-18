import { useParams } from "react-router-dom"

const User =({users})=>{
    const id = useParams()
    console.log(id)
    return <div>User</div>
}

export default User