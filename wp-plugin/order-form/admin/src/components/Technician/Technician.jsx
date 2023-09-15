import { useEffect, useState } from "react";
import "./Technician.scss";
import { baseURL } from "../../utils/api";

export default function Technician() {
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetch(baseURL + "/technician")
      .then((res) => res.json())
      .then((data) => {
        setTechnicians(data);
      });
  }, []);

  useEffect(() => {
    console.log(technicians);
  }, [technicians]);

  return (
    <>
      <h2>Technician</h2>
      <table style={{ width: "100%", borderSpacing: 0 }}>
        <thead
          style={{
            backgroundColor: "#36304a",
            color: "#fff",
            height: "50px",
          }}
        >
          <tr className="table100-head">
            <th className="column" style={{ borderTopLeftRadius: "10px" }}>
              ID
            </th>
            <th className="column">Tên thợ</th>
            <th className="column" style={{ borderTopRightRadius: "10px" }}>
              Thuộc chi nhánh
            </th>
          </tr>
        </thead>
        <tbody>
          {technicians &&
            technicians.map((tech) => {
              return (
                <>
                  <tr className="table100-body">
                    <th
                      className="column"
                      style={{ borderLeft: "1px solid #333" }}
                    >
                      {tech.technician_id}
                    </th>
                    <th className="column">{tech.technician_name}</th>
                    <th className="column">{tech.branch_id}</th>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
