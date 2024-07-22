/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table } from "react-bootstrap";
import useAppStore from "../../store/Appstore";
import { useEffect } from "react";
import { userType } from "../../interface/interface";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Users() {
  const { users, getUsers, loading } = useAppStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner status={loading} />
          </div>
        ) : (
          <div className=" mx-4">
            <h1>Users</h1>
            <Table className="border" striped hover size="sm">
              <thead>
                <tr className="px-3  align-middle  text-center box-shadow mb-2">
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(users as userType[]).map((users) => {
                  return (
                    <tr
                      style={{ width: "100%" }}
                      className="px-3  align-middle  text-center box-shadow mb-2"
                      key={users.id}
                    >
                      <td className="py-3">{users.name}</td>
                      <td className="">{users.email}</td>
                      <td className="">{users.address?.city}</td>
                      <td className="padding-0 text-center">
                        <Link to={`/albums?userId=${users.id}`}>
                          <Button
                            variant="primary"
                            className="btn-bg-color border-0"
                          >
                            Albums
                          </Button>
                        </Link>
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
