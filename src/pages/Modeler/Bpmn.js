import React, { Fragment, useEffect, useRef, useState, useContext } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import { emptyBpmn } from "./asset/constansBpmn";
import dowload from "downloadjs";
import './Styles/Modeler.css';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import CamundaBpmnModdle from "camunda-bpmn-moddle/resources/camunda.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertDismissible from "./Alert.js";
import bpmnlintConfig from "../../bpmnlintconfig-packed";
import "bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css";

import lintModule from "bpmn-js-bpmnlint";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../../components/Alert";
import AuthContext from "../../context/AuthContext";


export default function BpmnEditor() {
  // we use reference because modeler is a mutable object for which we need to keep reference
  const modelerRef = useRef(null);
  const bpmContainerRef = useRef();
  const propertiesRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  //const [show, setShow] = useState(false);

  const {authTokens} = useContext(AuthContext)


  console.log(modelerRef);

  const [filexml, setFilexml] = useState(emptyBpmn);

  console.log(filexml);

  const navigate = useNavigate();

  // const url = "http://localhost:8080/engine-rest";

  // set dowloadfile and SVG
  const setEncoded = (data, fileName, mimeType) => {
    return dowload(
      "data:" + mimeType + ";charset=UTF-8," + encodeURIComponent(data),
      fileName,
      (mimeType = "application/xml")
    );
  };

  // button download bpmn
  const saveDaigram = async (e) => {
    const result = await e.saveXML();
    const { xml } = result;
    console.log(result);
    try {
      if (result) {
        setEncoded(xml, "daigram.bpmn", "application/xml");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // button download bpmn Svg
  const downloadSvg = async (e) => {
    const result = await e.saveSVG();
    const { svg } = result;
    try {
      if (result) {
        setEncoded(svg, "diagram.svg", "application/xml");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // import is fired only once
  useEffect(() => {
    let isCancel = false;
    let modeler;
    console.log(isCancel);

    if (!isCancel) {
      modeler = modelerRef.current = new BpmnModeler({
        container: bpmContainerRef.current,
        linting: {
          bpmnlint: bpmnlintConfig,
        },
        keyboard: {
          bindTo: window,
        },
        propertiesPanel: {
          parent: propertiesRef.current,
        },
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          CamundaPlatformPropertiesProviderModule,
          lintModule,
        ],
        linting: {
          bpmnlint: bpmnlintConfig,
          active: true
        },
        moddleExtensions: {
          camunda: CamundaBpmnModdle,
        },
      });

      modeler
        .importXML(filexml)
        .then(() => {
          const canvas = modeler.get("canvas");
          canvas.zoom("fit-viewport");
        })
        .catch(console.error);
    }

    return () => {
      isCancel = true;
      console.log("cancel");
      if (modeler) {
        modeler.destroy();
      }
    };
  }, [filexml, bpmContainerRef, propertiesRef]);

  // Api Deploy to camunda
  const handleDeploy = async () => {
    if(name !== "") {
      const file = await modelerRef.current.saveXML();
      const { xml } = file;
      const blob = new Blob([xml], { type: "application/octet-stream" });
      console.log(blob);
      const fromdata = new FormData();
      fromdata.append("data", blob, "test.bpmn");
      fromdata.append("deployment-name", name);
      fromdata.append("deployment-source", "Pipat");
      setToggle(false);
      //await axios.post( `${url}/deployment/create`,fromdata)
      const spance = ' '
      const headers = {
        'content-Type':'application/json',
        'Authorization':'Bearer' + spance + String(authTokens.access)
      }
      await axios
        .post("http://127.0.0.1:7000/deployment/create", fromdata,{headers:headers})
        .then((res) => {
          //setShow(true);
          console.log(res.data);
          console.log(fromdata)
          notifySuccess("Deploy success.")
        })
        .catch((err) => {
          console.log(err);
          notifySuccess("Deploy not success.")
        });
    } else if(name === "") {
      notifyError("Please enter a diagram name.")
    }
  };

  //docker run -d --name camunda-postgres-env -p 8080:8080 --link postgres:db -e DB_DRIVER=org.postgresql.Driver -e DB_URL=jdbc:postgresql://db:5432/postgres -e DB_USERNAME=postgres -e DB_PASSWORD=2543 -e WAIT_FOR=db:5432 camunda/camunda-bpm-platform:latest

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const contents = event.target.result;
      console.log(contents);
      setFilexml(contents);
    };
    reader.readAsText(file);
  };

  return (
    <Fragment>
      <div className="Bpmn">
        <div id="container" ref={bpmContainerRef}>
          {/* <div className="alertdeploy">
            {}
          </div> */}
        </div>
        <div className="properties" ref={propertiesRef} />
        <div className="allbutton">
          <button onClick={() => navigate("/Workflowlist")} className="button">
            &#129144;
          </button>
          <button
            onClick={() => saveDaigram(modelerRef.current)}
            className="button"
          >
            {" "}
            Download BPMN{" "}
          </button>
          <button
            onClick={() => downloadSvg(modelerRef.current)}
            className="button"
          >
            {" "}
            Download Image
          </button>
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className="button"
          >
            {" "}
            Deploy{" "}
          </button>
          <input
            className="custom-file-input"
            type="file"
            accept=".bpmn"
            onChange={handleChange}
          />
        </div>
        <div></div>
        <div>
          {toggle && (
            <div className="setdeploy">
              <button onClick={() => setToggle(!toggle)} className="close">
                &#10005;
              </button>
              <p className="Daigarm">Deploy diagram</p>
              <p className="DaigarmName"> Deploy Name </p>
              <input
                required
                className="inputname"
                placeholder="Name"
                type="text/plain"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <button onClick={handleDeploy} className="BTdeploy">
                {" "}
                Deploy{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
