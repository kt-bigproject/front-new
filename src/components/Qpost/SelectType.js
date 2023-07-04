
import { Option, Select, OptionGroup, Size} from '@leafygreen-ui/select';
import styled from '@emotion/styled';
import { useState } from 'react';

export default function SelectType({typeState}) {

  // const [type, setType] = useState("normal")
  const [type, setType] = typeState

  const CustomSelect= styled(Select)`
  width: 100px;

  button {
    height: 40px;
  }
`

  return (
    <>
      <CustomSelect  aria-label={'select-type'} placeholder={"일반"} defaultValue={"normal"} value={type} onChange={(value)=>{setType(value)}} allowDeselect={false} >
        <Option value="normal">일반</Option>
        <Option value="inquiry">요청</Option>
        <Option value="announcement">공지</Option>
      </CustomSelect>
    </>
  )
}