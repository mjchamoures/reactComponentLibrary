// simple input type=text component with a label, using styles from Bootstrap
// 
// author : michael chamoures
// date : 3/17/17


import React from 'react';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';


class InputWithLabelComponent extends React.Component {

  render() {

    return (
      <FormGroup>
        <Col xs={12} sm={6}>
          <Col xs={12} sm={3}>
            <ControlLabel>
            {this.props.label}
            </ControlLabel>
          </Col>
          <Col xs={12} sm={this.props.inputColWidth}>
            <FormControl
              type="text" 
              value={this.props.value} 
              name={this.props.name} 
              placeholder={this.props.placeholder}
              onChange={() => this.props.onChange()}
            />
          </Col>

        </Col>
      </FormGroup>
    );
  }
}

export default InputWithLabelComponent;