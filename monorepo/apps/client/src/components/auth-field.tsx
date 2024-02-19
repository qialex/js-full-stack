export interface AuthFieldP {
  key: string,
  label: string,
  placeholder: string,  
  name: string,
  value: string,
  type: string,
  error: string
  isLoading: boolean,
  isValid: boolean,
  isTouched: boolean,
  handleInput: any,
  handleBlur: any,  
}
  
export const authFieldInitial: AuthFieldP = {
  key: '',
  label: '',
  placeholder: '',  
  name: '',
  value: '',
  type: 'text',
  error: '',
  isLoading: false,
  isValid: false,
  isTouched: false,
  handleInput: undefined,
  handleBlur: undefined,  
}

export function AuthField(props: AuthFieldP) {
  return (
    <>
      <div className='field' >

        <label className='label'>{props.label} <span className={`is-size-7 has-text-danger ${!props.error ? 'is-hidden' : ''}`}> - {props.error}</span></label>

        <div className={`control is-flex ${props.isLoading ? 'is-loading' : ''}`}>
          <input 
            name={props.name}
            onChange={props.handleInput}
            onBlur={props.handleBlur}
            value={props.value}
            className={`input ${props.error ? 'is-danger' : ''}`} 
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.isLoading} 
            />
        </div>
      </div>  

    </>
  )
}
