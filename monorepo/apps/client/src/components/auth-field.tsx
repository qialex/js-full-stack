import React, { useRef } from "react";

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
  autoFocus: any,
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
  autoFocus: undefined
}

export function AuthField(props: AuthFieldP) {
  const inputElement = useRef(null);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const idx = inputRef.current.length

  return (
    <>
      <div className='field' >
        <label className='label'>{props.label} <span className={`is-size-7 has-text-danger ${!props.error || !props.isTouched ? 'is-hidden' : ''}`}> - {props.error}</span></label>
        <div className={`control has-icons-right ${props.isLoading ? 'is-loading' : ''}`}>
          <input 
            autoFocus={props.autoFocus}
            ref={(el: HTMLInputElement) => el && props.autoFocus && el.focus()}
            name={props.name}
            onChange={props.handleInput}
            onBlur={props.handleBlur}
            value={props.value}
            className={`input ${(props.error && props.isTouched) ? 'is-danger' : ''} ${props.isValid ? 'is-primary' : ''}`} 
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.isLoading} 
            />
          {/* <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>             */}
        </div>
      </div>  

    </>
  )
}
