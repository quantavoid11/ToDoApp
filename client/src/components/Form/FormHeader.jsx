import { KeyRound } from "lucide-react"
import { Link } from "react-router-dom"


function FormHeader(props) {
  return (
    <div className="mb-10 ">
      <div className="flex justify-center">
        <KeyRound className="h-10 w-10" />
      </div>
      <h2 className="text-3xl font-semibold text-center mt-2 text-gray-900">{props.heading}</h2>
      <p className="text-center mt-2 text-gray-600 text-sm">{props.paragraph} {' '}<Link to={props.linkToUrl} className="font-medium  text-purple-600 hover:text-purple-500">
        {props.linkName}
      </Link></p>


    </div>
  )
}

export default FormHeader