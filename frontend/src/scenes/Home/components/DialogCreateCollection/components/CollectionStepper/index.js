import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

class CollectionStepper extends Component {
  
  render() {
    
    return (
      <Stepper activeStep={this.props.stepIndex}>
        <Step>
          <StepLabel>Choose type</StepLabel>
        </Step>
        <Step>
          <StepLabel>Configure</StepLabel>
        </Step>
        <Step>
          <StepLabel>Customize</StepLabel>
        </Step>
      </Stepper>
    );
  }
}

const mapStateToProps = state => {
  return {
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionStepper);