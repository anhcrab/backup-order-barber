import { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { baseURL } from "../utils/api";

export default function BranchService() {
  const [branches, setBranches] = useState([]);
  const [services, setServices] = useState([]);
  const [formService, setFormService] = useState();
  const [formBranch, setFormBranch] = useState();
  const { setPage } = useContext(context);

  useEffect(() => {
    fetch(baseURL + "/service").then(res => res.json()).then(data => {
      setServices(data)
    })

    fetch(baseURL + "/branch").then(res => res.json()).then(data => {
      setBranches(data)
    })
  }, []);

  useEffect(() => {
    console.log("branches: " + branches);
    console.log("services: " + services);
  }, [branches, services])


  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      service: formService,
      branch: formBranch
    }
    console.log(payload);
    fetch(baseURL + "/service-branch", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log(res.json());
      })
      .then((res) => {
        setPage("Order");
      });
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="form-container" onSubmit={handleSubmit}>
          <select
            name="branch"
            onChange={(e) => {
              setFormBranch(parseInt(e.target.value));
            }}
          >
            <option value={null} style={{ display: 'none' }}>Chọn chi nhánh</option>
            {branches &&
              branches.map((branch, index) => {
                return (
                  <option key={index} value={branch.branch_id}>
                    {branch.branch_name}
                  </option>
                );
              })}
          </select>
          <select
            name="service"
            onChange={(e) => {
              setFormService(parseInt(e.target.value));
            }}
          >
            <option value={null} style={{ display: 'none' }}>Chọn dịch vụ</option>
            {services &&
              services.map((service, index) => {
                return (
                  <option key={index} value={service.service_id}>
                    {service.service_name}
                  </option>
                );
              })}
          </select>

          <button type="submit"> Thêm</button>
        </form>
      </div>
    </>
  );
}
