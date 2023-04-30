import React, { useEffect, useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Leaveform from "../../template/Leaveform/Leaveform";
import "./Styles/Startworkflow.css";
import DetailForm from "../../template/DetailForm";
import CustomModal from "../../components/Model";

function Startworkflow({ user, setUser }) {
  const [form, setForm] = useState([]);
  //const [formnew, setFormnew] = useState([]);
  const [formKey, setFormKey] = useState("");
  // const [id, setId] =useState("")
  const [formname, setFormname] = useState("");
  const controller = useRef(new AbortController());

  console.log(formname);

  // get processdifinition
  useEffect(() => {
    const fetchprocess = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/engine-rest/process-definition?sortBy=version&sortOrder=desc&latestVersion=true",
          {
            signal: controller.current.signal,
          }
        );
        setForm(response.data);
        //console.log(response);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.log(err);
        }
      }
    };
    fetchprocess();
  }, []);

  const toggleform = (id) => {
    const formid = id;
    //setId(formid)
    const fetchstartformkey = async () => {
      await axios
        .get(
          `http://localhost:8080/engine-rest/process-definition/${formid}/startForm`
        )
        .then((res) => {
          const datakeyforms = res.data;
          console.log(datakeyforms);
          const { key } = datakeyforms;
          setFormKey(key);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchstartformkey();

    const fetchfromname = async () => {
      await axios
        .get(`http://localhost:8080/engine-rest/process-definition/${formid}`)
        .then((res) => {
          const dataforms = res.data;
          const { name } = dataforms;
          setFormname(name);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchfromname();
  };

  return (
    <div>
      <div className="section1-startworkflow">
        <h1>Start Workflow</h1>
      </div>
      <div className="section2-startworkflow">
        <h1 className="text-select">เลือกแบบฟอร์ม</h1>
        <select
          id="form-select"
          className="form-select"
          aria-label="select example"
          onChange={(event) => {
            toggleform(event.target.value);
          }}
        >
          <option value="">Select form</option>
          {form.map((forms) => {
            return (
              <option key={forms.id} value={forms.id}>
                {forms.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* <div>{forms[formKey]}</div> */}
      <div>
        <DetailForm formKey={formKey} />
      </div>
      <div>
        <CustomModal />
      </div>
    </div>
  );
}

export default Startworkflow;
