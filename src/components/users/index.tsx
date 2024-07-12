/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from "react-bootstrap";
import useAppStore from "../../store/Appstore";
import { useEffect } from "react";
import { userType } from "../../interface/interface";

function Users() {
  const { users, getUsers } = useAppStore();
  console.log(users, "*****user********");
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <div className="d-flex flex-wrap gap-2 justify-content-between">
        {(users as userType[]).map((user: userType) => {
          return (
            <Card style={{ width: "100%" }} className="d-flex flex-wrap " key={user.id}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body className="d-flex flex-wrap justify-content-between align-items-center">
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>{user.email}</Card.Text>
                <Card.Text>{user.address.city}</Card.Text>
                <Button variant="primary">Posts</Button>
                <Button variant="primary" className="">
                  Comments
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Users;
