import React, { useEffect, useState } from "react";
import { AlbumsType } from "../../interface/interface";
import { Link, useLocation } from "react-router-dom";
import { apiUrl, toCamelCase } from "../../common/common";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { Button, Table } from "react-bootstrap";
import useAppStore from "../../store/Appstore";

function Albums() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [albums, setAlbums] = useState<AlbumsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const { user, getUser } = useAppStore();
  const userId = queryParams.get("userId");

  const commentsUrl = () => {
    return userId
      ? `${apiUrl}albums?userId=${userId}`
      : `${apiUrl}albums?_page=${page}&_limit=10`;
  };

  useEffect(() => {
    userId ? getUser(Number(userId)) : null;
    setLoading(true);
    setAlbums([]);
    setPage(1);
    fetchAlbums();
  }, [location.search]);

  const fetchAlbums = async () => {
    userId ? setLoading(true) : setLoading(false);
    setLoading(false);
    const response = await axios.get(commentsUrl());
    setTimeout(() => {
      setAlbums((prevAlbums) => [...prevAlbums, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    }, 1000);
  };

  return (
    <>
      {loading || albums.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner status={loading || albums.length === 0 ? true : loading} />
        </div>
      ) : (
        <div className="w-75 mx-auto">
          <h1>Albums</h1>
          <h1 className="text-center fs-3">
            {userId ? toCamelCase(user.name) : ""}
          </h1>
          <div className="d-flex mt-2 justify-content-center">
            <InfiniteScroll
              dataLength={albums.length}
              next={fetchAlbums}
              hasMore={userId || albums.length === 100 ? false : true}
              loader={
                <ThreeDots
                  visible={!userId}
                  height="50"
                  width="50"
                  color="#2E236C"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              }
              className="text-center"
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Table striped hover className="border" size="sm">
                <thead>
                  <tr className="px-3  align-middle box-shadow mb-2">
                    {/* <th className="py-3">User Id</th> */}
                    <th className="py-3 text-center">Album Id</th>
                    <th className="w-50">Title</th>
                    <th>Photos</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album) => (
                    <tr
                      className="px-3  align-middle  box-shadow mb-2"
                      key={album.id}
                    >
                      {/* <td className="py-3">{album.userId}</td> */}
                      <td className="text-center">{album.id}</td>
                      <td className="w-50 text-start">{toCamelCase(album.title)}</td>
                      <td className="py-3">
                        <Link to="photos">
                          <Button
                            variant="primary"
                            className="btn-bg-color border-0"
                          >
                            Photos
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          </div>
        </div>
      )}
    </>
  );
}

export default Albums;
