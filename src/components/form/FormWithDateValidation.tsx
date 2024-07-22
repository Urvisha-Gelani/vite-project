import { useFormik } from "formik";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";
import { FormValidationSchema } from "../../validation/FormError";
const initialValues = {
  inDateTime: "",
  outDateTime: "",
  phoneNumber: ""
};
const FormWithDataValidation = () => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: FormValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form values", values);
      resetForm();
    },
  });

  return (
    <BootstrapForm onSubmit={handleSubmit} className="w-75 mx-auto">
      <BootstrapForm.Group as={Row} controlId="inDateTime">
        <BootstrapForm.Label column sm={3}>
          In Date and Time:
        </BootstrapForm.Label>
        <Col sm={10}>
          <BootstrapForm.Control
            type="datetime-local"
            name="inDateTime"
            value={values.inDateTime}
            onChange={(e) => {
              handleChange(e);
              const inDate = new Date(e.target.value);
              const outDate = new Date(values.outDateTime);
              if (inDate > outDate) {
                setFieldValue("outDateTime", "");
              }
            }}
            onBlur={handleBlur}
            isInvalid={!!(touched.inDateTime && errors.inDateTime)}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {errors.inDateTime}
          </BootstrapForm.Control.Feedback>
        </Col>
      </BootstrapForm.Group>

      <BootstrapForm.Group as={Row} controlId="outDateTime">
        <BootstrapForm.Label column sm={3}>
          Out Date and Time:
        </BootstrapForm.Label>
        <Col sm={10}>
          <BootstrapForm.Control
            type="datetime-local"
            name="outDateTime"
            value={values.outDateTime}
            onChange={handleChange}
            onBlur={handleBlur}
            min={values.inDateTime}
            isInvalid={!!(touched.outDateTime && errors.outDateTime)}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {errors.outDateTime}
          </BootstrapForm.Control.Feedback>
        </Col>
      </BootstrapForm.Group>

      <BootstrapForm.Group as={Row} controlId="phoneNumber">
        <BootstrapForm.Label column sm={3}>
          Phone Number:
        </BootstrapForm.Label>
        <Col sm={10}>
          <BootstrapForm.Control
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Phone Number"
            isInvalid={!!(touched.phoneNumber && errors.phoneNumber)}
          />
          <BootstrapForm.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </BootstrapForm.Control.Feedback>
        </Col>
      </BootstrapForm.Group>

      <Button variant="primary" type="submit" className="mt-2">
        Submit
      </Button>
    </BootstrapForm>
  );
};

export default FormWithDataValidation;
