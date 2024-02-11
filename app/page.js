"use client";

import {useEffect, useState} from "react";
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState([])
  const [dataQueue, setDataQueue] = useState([])
  const [dataDone, setDataDone] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = (status = 0) => {
    axios.get(`http://localhost:8000/api/jobs?status=${status}`)
        .then((res) => {
          if(status === 0) {
            setData(res.data.data)
          } else {
            setDataDone(res.data.data)
          }
        }).catch((err) => {
          console.log(err)
        })
  }
  const fetchDataQueue = () => {
    axios.get('http://localhost:8000/api/processes')
        .then((res) => {
          setDataQueue(res.data.data)
        }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
    fetchDataQueue()
    fetchData(2)

    setInterval(() => {
      fetchData()
      fetchDataQueue()
      fetchData(2)
    }, 2000)
  }, [])

  return (
    <div>
      <h3>New Job</h3>
      <div className="table-responsive" style={{ height: "400px" }}>
        <table className="table table-striped table-bordered mb-4">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {data.map((data, key) => {
            return (
                <tr>
                  <th scope="row">{key+1}</th>
                  <td>{data.job_name}</td>
                  <td><span className="badge bg-primary">New</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <h3>Queue Job</h3>
      <div className="table-responsive" style={{ height: "400px" }}>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {dataQueue.map((data, key) => {
            return (
                <tr>
                  <th scope="row">{key+1}</th>
                  <td>{data.job_name}</td>
                  <td><span className="badge bg-warning">Queue</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <h4>Job Done</h4>
      <div className="table-responsive" style={{ height: "400px" }}>
        <table className="table table-striped table-bordered">
          <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Job</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {dataDone.map((data, key) => {
            return (
                <tr>
                  <th scope="row">{key+1}</th>
                  <td>{data.job_name}</td>
                  <td><span className="badge bg-success">Done</span></td>
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
