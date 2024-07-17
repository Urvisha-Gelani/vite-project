import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { postSchema } from "../validation/FormError";
import { PostType, userType } from "../interface/interface";

interface CustomModalProps {
  showModal: boolean;
  handleClose: () => void;
  handleAction: (values: PostType) => void;
  initialValues: PostType;
  users: userType[];
  action: "Add" | "Update";
}

const CustomModal: React.FC<CustomModalProps> = ({
  showModal,
  handleClose,
  handleAction,
  initialValues,
  users,
  action,
}) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik<PostType>({
      initialValues,
      validationSchema: postSchema,
      enableReinitialize: true,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        await handleAction(values);
        resetForm();
        handleClose();
        setSubmitting(false);
      },
    });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formPostUserId">
            <Form.Label>User</Form.Label>
            <Form.Control
              as="select"
              name="userId"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userId}
              isInvalid={!!(touched.userId && errors.userId)}
            >
              <option value="">Select user</option>
              {users.map((user: userType) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.userId}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              isInvalid={!!(touched.title && errors.title)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPostBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="body"
              placeholder="Description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.body}
              isInvalid={!!(touched.body && errors.body)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              // disabled={isSubmitting}
            >
              {action}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
