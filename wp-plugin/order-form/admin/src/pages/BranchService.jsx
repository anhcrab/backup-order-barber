import { useContext, useEffect, useState } from "react";
import { context } from "../App";

export default function BranchService() {
  const [branches, setBranches] = useState();
  const [services, setServices] = useState();
  const { setPage } = useContext(context);

  useEffect(() => {
    fetch("https://" + window.location.hostname + "/wp-json/api/service").then(
      (res) => {
        setServices(res.json());
      }
    );

    fetch("https://" + window.location.hostname + "/wp-json/api/branch").then(
      (res) => {
        setBranches(res.json());
      }
    );
  }, [branches, services]);

  const [formService, setFormService] = useState();
  const [formBranch, setFormBranch] = useState();

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      "https://" + window.location.hostname + "/wp-json/api/service-branch",
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify({
          services: formService,
          branch: formBranch,
        }),
      }
    )
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
            {branches.map((branch) => {
              return (
                <option value={branch.branch_id}>{branch.branch_name}</option>
              );
            })}
          </select>

          <select
            name="service"
            onChange={(e) => {
              setFormService(parseInt(e.target.value));
            }}
          >
            {services.map((service) => {
              return (
                <option value={service.service_id}>
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
