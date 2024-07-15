/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from "react-bootstrap";
import useAppStore from "../../store/Appstore";
import { useEffect } from "react";
import { userType } from "../../interface/interface";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

function Users() {
  const { users, getUsers, loading } = useAppStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <div className="">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner status={loading} />
          </div>
        ) : (
          <div className=" mx-4">
            <h1>Users</h1>
            <Table className="border" striped hover size="sm">
              <tbody>
                {(users as userType[]).map((user: userType) => {
                  return (
                    <tr
                      style={{ width: "100%" }}
                      className="px-3  align-middle  text-center box-shadow mb-2"
                      key={user.id}
                    >
                      <td className="py-3">{user.name}</td>
                      <td className="">{user.email}</td>
                      <td className="">{user.address.city}</td>
                      <td className="padding-0 text-center">
                        <Link to={`/users/${user.id}/posts`}>
                          {" "}
                          <Button
                            variant="primary"
                            className="btn-bg-color border-0"
                          >
                            Posts
                          </Button>
                        </Link>
                      </td>
                      <td className="padding-0 text-center">
                        <Button
                          variant="primary"
                          className="btn-bg-color border-0"
                        >
                          Comments
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
