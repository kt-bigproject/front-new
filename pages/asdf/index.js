import {useRef} from 'react'

export default function TTTT() {
  const ref = useRef()
  ref.current = "hello"
  ref.current = "nice"
  console.log(ref.current)
  return(
    <>
      <div>
        asdfa
      </div>
    </>
  )
}