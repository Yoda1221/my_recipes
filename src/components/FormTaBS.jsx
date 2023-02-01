import React from 'react'
import { Form } from 'react-bootstrap'

const FormTaBS = ({
    size,
    name,
    style,
    value,
    labelName,
    placeholder,
    handleChange
  }) => {
  return (
    <Form.Group className={ style } controlId={ name }>
      <Form.Label>{ labelName }</Form.Label>
      <Form.Control 
        size={ size } 
        as="textarea" rows={3} 
        name={ name }
        defaultValue={ value }
        placeholder={ placeholder } 
        onChange={ handleChange }
        required
      />
    </Form.Group>
  )
}

export default FormTaBS
