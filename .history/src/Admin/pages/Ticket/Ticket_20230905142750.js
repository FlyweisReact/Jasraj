/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const Ticket = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);


  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/ticket/listTicket",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  return (
    <>
  
      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Ticket's ( Total : {total} )
          </span>
        </div>
        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Ticket Not Found</Alert>
          ) : (
      
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>User</th>
                      <th>Ticket Id</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Close</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.userId?.fullName}</td>
                        <td> {i.tiketId} </td>
                        <td> {i.title} </td>
                        <td> {i.description} </td>
                        <td> {i.close === false ? "No" : "Yes"} </td>
                        <td>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Ticket);
