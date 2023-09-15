import { useEffect, useState } from "react";
import "./Services.scss";
import { baseURL } from "../../utils/api";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(baseURL + "/service")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  useEffect(() => {
    console.log(services);
  }, [services]);

  return (
    <>
      <h2>Service</h2>
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
            <th className="column">Tên</th>
            <th className="column">Loại</th>
            <th className="column">Thời lượng</th>
            <th className="column" style={{ borderTopRightRadius: "10px" }}>
              Giá
            </th>
          </tr>
        </thead>
        <tbody>
          {typeof services === Array.toString() &&
            services.map((service) => {
              return (
                <>
                  <tr className="table100-body">
                    <th
                      className="column"
                      style={{ borderLeft: "1px solid #333" }}
                    >
                      {service.service_id}
                    </th>
                    <th className="column">{service.service_name}</th>
                    <th className="column">{service.service_type}</th>
                    <th className="column">{service.service_time}</th>
                    <th className="column">{service.service_price}</th>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
