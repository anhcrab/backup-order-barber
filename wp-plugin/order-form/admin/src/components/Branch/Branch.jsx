import { useEffect, useState } from "react";
import "./Branch.scss";
import { baseURL } from "../../utils/api";

export default function Branch() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetch(baseURL + "/branch")
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
      });
  }, []);

  return (
    <>
      <h2>Branch</h2>
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
            <th className="column" style={{ borderTopRightRadius: "10px" }}>
              Tên
            </th>
          </tr>
        </thead>
        <tbody>
          {branches &&
            branches.map((branch) => {
              return (
                <>
                  <tr className="table100-body">
                    <th
                      className="column"
                      style={{ borderLeft: "1px solid #333" }}
                    >
                      {branch.branch_id}
                    </th>
                    <th className="column">{branch.branch_name}</th>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
