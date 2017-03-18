import React from 'react';
import { Col } from 'react-bootstrap';

class ButtonComponent extends React.Component {

  render() {
    

    return (
      <Col xs={12} sm={2}>
        <button className={this.getClassName()} disabled={this.props.disabled} onClick={() => this.props.onClick()}>
          {this.props.text}
        </button>
      </Col>
    );

  }

  getClassName() {
    let className = "btn" + this.getType() + this.getSize();

    return className;
  }

  getType() {
    let type = "";

    switch(this.props.type) {

      case 'primary' :
        type = ' btn-primary';
        break;
      case 'iconOnly' :
        type = ' btn-icon-only';
        break;
      case 'round' :
        type = ' btn-round';
        break;
      case 'danger' :
        type =  ' btn-danger';
        break;
      case 'success' :
        type = ' btn-success';
        break;
      case 'warning' :
        type =  ' btn-warning';
        break;
      case 'info' :
        type = ' btn-info';
        break;
      default :
        type = ' btn-default';
        break;
    }

    return type;

  }

  getSize() {
    let size = "";
    switch(this.props.size) {

      case 'xs' :
        size = ' btn-xs';
        break;
      case 'sm' :
        size = ' btn-sm';
        break;
      case 'md' :
        size = ' btn-md';
        break;
      case 'lg' :
        size = ' btn-lg';
        break;
      default :
        break;
    }

    return size;

  }

}

export default ButtonComponent;