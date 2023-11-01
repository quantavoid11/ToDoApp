const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"

function FormInput(props) {
  return (
    <div className="my-5">
      <label htmlFor={props.labelFor} className="sr-only">{props.labelText}</label>
      <input 
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        required={props.isRequired}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        className={fixedInputClass}      />
    </div>
    
  )
}

export default FormInput