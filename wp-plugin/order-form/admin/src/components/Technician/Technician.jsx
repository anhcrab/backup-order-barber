import "./Technician.scss";

export default function Technician() {
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
          <tr className="table100-body">
            <th className="column" style={{ borderLeft: "1px solid #333" }}>
              123
            </th>
            <th className="column">1324561200</th>
            <th className="column">1324561200</th>
          </tr>
          <tr className="table100-body">
            <th className="column" style={{ borderLeft: "1px solid #333" }}>
              145
            </th>
            <th className="column">1324561200</th>
            <th className="column">1324561200</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
