import { useEffect, useState } from "react";
import { baseURL } from "../utils/api";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log(baseURL);
    fetch(baseURL + "/form")
      .then((res) => res.json())
      .then((res) => {
        setOrders(res);
      });
    fetch(baseURL + "/branch")
      .then((res) => res.json())
      .then((res) => {
        setBranches(res);
      });
    fetch(baseURL + "/technician")
      .then((res) => res.json())
      .then((res) => {
        setTechnicians(res);
      });
    fetch(baseURL + "/service")
      .then((res) => res.json())
      .then((res) => {
        setServices(res);
      });
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    console.log(branches);
  }, [branches]);

  useEffect(() => {
    console.log(technicians);
  }, [technicians]);

  useEffect(() => {
    console.log(services);
  }, [services]);

  return (
    <>
      <h2>Order Table</h2>

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
            <th className="column">Số điện thoại</th>
            <th className="column">Họ và tên</th>
            <th className="column">Số lượng khách</th>
            <th className="column">Chi nhánh</th>
            <th className="column">Tên thợ</th>
            <th className="column">Dịch vụ</th>
            <th className="column">Ngày</th>
            <th className="column">Thời điểm</th>
            <th className="column">Ghi chú</th>
            <th className="column">Thành tiền</th>
            <th className="column" style={{ borderTopRightRadius: "10px" }}>
              Thời gian ước tính
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <>
                  <tr className="table100-body">
                    <th
                      className="column"
                      style={{ borderLeft: "1px solid #333" }}
                    >
                      {order.id}
                    </th>
                    <th className="column">{order.phone}</th>
                    <th className="column">{order.name}</th>
                    <th className="column">{order.total_guest}</th>
                    <th className="column">
                      {branches.map((branch) => {
                        if (order.branch_id == branch.branch_id) {
                          return branch.branch_name;
                        }
                      })}
                    </th>
                    <th className="column">
                      {technicians.map((tech) => {
                        if (order.technician_id == tech.technician_id) {
                          return tech.technician_name;
                        }
                      })}
                    </th>
                    <th className="column">
                      {JSON.parse(order.service).map((service, index) => {
                        return (
                          service.service_name +
                          (JSON.parse(order.service).length - 1 === index
                            ? ""
                            : " | ")
                        );
                      })}
                    </th>
                    <th className="column">{order.date}</th>
                    <th className="column">{order.time}</th>
                    <th className="column">{order.note}</th>
                    <th className="column">{order.total_price}</th>
                    <th className="column">{order.estimate_time}</th>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
