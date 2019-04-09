import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import * as renders from './renderedComponents';
import {Container, Header, Title, Text, Content, Button, Icon, List, ListItem, Picker,
Left,
Right,
Body
} from 'native-base';


const WizardFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="FirstName" placeholder="John" type="text" label="first name" component={renders.renderText} />
      <Field name="LastName" placeholder="Doe" type="text" label="last name" component={renders.renderText} />
      <Field name="Bio"  type="text" label="Bio" component={renders.renderTextArea} />
      <C>
        <button type="submit" className="next">
          <Text>Next</Text>
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
