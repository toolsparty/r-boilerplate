import React, {Component} from 'react'
import { Grid, Button, Checkbox, Form } from 'semantic-ui-react'

export default class Auth extends Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Ваш логин (E-mail):</label>
              <input placeholder="Email"/>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}