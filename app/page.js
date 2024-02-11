"use client";

import {useEffect, useState} from "react";
import axios from 'axios';
import collapse from "bootstrap/js/src/collapse";

export default function Home() {
  const [data, setData] = useState([])
  const [dataQueue, setDataQueue] = useState([])
  const [dataDone, setDataDone] = useState([])

  const handleGenerate = () => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/generate?total=200`)
          .then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
  }

  const fetchData = (status = "NEW") => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs?status=${status}`)
        .then((res) => {
          if(status === "NEW") {
            setData(res.data.data)
          } else if(status === "QUEUE") {
              setDataQueue(res.data.data)
          } else {
            setDataDone(res.data.data)
          }
        }).catch((err) => {
          console.log(err)
        })
  }

  useEffect(() => {
    fetchData()
    fetchData("QUEUE")
    fetchData("SUCCESS")

    setInterval(() => {
      fetchData()
      fetchData("QUEUE")
      fetchData("SUCCESS")
    }, 2000)
  }, [])

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-end mb-2">
          <h3 className="m-0">New Job</h3>
          <button className="btn btn-primary" onClick={() => handleGenerate()}>Generate Job</button>
      </div>
      <div className="table-responsive mb-4" style={{ maxHeight: "400px" }}>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {data.map((d, key) => {
            return (
                <tr key={d.id}>
                  <th scope="row">{key+1}</th>
                  <td>{d.job_name}</td>
                  <td><span className="badge bg-primary">{d.status}</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <h3>Queue Job</h3>
      <div className="table-responsive mb-4" style={{ maxHeight: "400px" }}>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Attempt</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {dataQueue.map((data, key) => {
            return (
                <tr key={data.id}>
                  <th scope="row">{key+1}</th>
                  <td>{data.job_name}</td>
                  <td>{data.attempt}</td>
                  <td><span className="badge bg-warning">{data.status}</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <h4>Job Done</h4>
      <div className="table-responsive" style={{ maxHeight: "400px" }}>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Attempt</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {dataDone.map((data, key) => {
            return (
                <tr key={data.id}>
                  <th scope="row">{key+1}</th>
                  <td>{data.job_name}</td>
                    <td>{data.attempt}</td>
                  <td><span className="badge bg-success">{data.status}</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
