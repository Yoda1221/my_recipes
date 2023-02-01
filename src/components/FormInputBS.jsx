import React from 'react'
import { Form } from 'react-bootstrap'

const FormInputBS = ({
    size,
    type,
    name,
    style,
    value,
    labelName,
    placeholder,
    handleChange
  }) => {
  return (
    <Form.Group className={ style } controlId={ name } >
      <Form.Label>{ labelName }</Form.Label>
      <Form.Control 
        size={ size } 
        type={ type } 
        name={ name }
        value={ value }
        placeholder={ placeholder } 
        onChange={ handleChange }
        required
      />
    </Form.Group>
  )
}

export default FormInputBS
