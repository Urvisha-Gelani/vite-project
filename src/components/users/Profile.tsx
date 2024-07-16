import React, { useEffect } from "react";
import useAppStore from "../../store/Appstore";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { toCamelCase } from "../../common/common";

function Profile() {
  const { userId } = useParams();
  const { getUser, user, loading } = useAppStore();
  useEffect(() => {
    getUser(Number(userId));
  }, []);
  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading} />
        </div>
      ) : (
        <div>
            <h1>{toCamelCase(user.name)}</h1>
        </div>
      )}
    </>
  );
}

export default Profile;
