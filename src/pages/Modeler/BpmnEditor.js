import React, { Fragment, useEffect, useRef, useState, useContext } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import dowload from "downloadjs";
import './Styles/Modeler.css';
import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule,CamundaPlatformPropertiesProviderModule } from 'bpmn-js-properties-panel';
import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
import CamundaBpmnModdle from 'camunda-bpmn-moddle/resources/camunda.json'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { notifyError } from "../../components/Alert";
import AuthContext from "../../context/AuthContext";

export default function BpmnEditor() {

  const { Bpmnid } = useParams();
  const [getxml, setGetxml] = useState([]);
  const modelerRef = useRef(null);
  const bpmContainerRef = useRef();
  const propertiesRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  //const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(true);

  console.log(getxml)

  
  const {authTokens} = useContext(AuthContext)

  const url = "http://127.0.0.1:7000"
  const navigate = useNavigate();

   //get xml definition
  useEffect(() => {
    const spance = ' '
    const headers = {
      'content-Type':'application/json',
      'Authorization':'Bearer' + spance + String(authTokens.access)
    }
      setLoading(true)
      const fetchxml = async() => {
        await axios.get(`${url}/process-definition/${Bpmnid}/xml`,{headers:headers})
        .then(res => {
          setGetxml(res.data.bpmn20Xml)
          setLoading(false)
          console.log(res.data.bpmn20Xml)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
         notifyError("Get xml not success")
        })
        }
        if(Bpmnid){
          fetchxml()
        }
  },[Bpmnid, authTokens.access])
  

// set dowloadfile and SVG
  const setEncoded = (data, fileName, mimeType) => {
    return dowload(
      "data:" + mimeType + ";charset=UTF-8," + encodeURIComponent(data),
    fileName,
    mimeType="application/xml"
    )
  };

    // button download bpmn
    const saveDaigram = async (e) => {
    const result = await e.saveXML();
    const { xml } = result;
    console.log(result)
    try {if(result){
      setEncoded(xml, "daigram.bpmn", "application/xml");
    }} catch(err) {
      console.log(err)
    }
  };

    // button download bpmn Svg
    const  downloadSvg = async (e) => {
      const result = await e.saveSVG();
      const { svg } = result;
      try{ if(result){
        setEncoded(svg, "diagram.svg", "application/xml");
      }} catch(err) {
        console.log(err)
      }
    }

  // import is fired only once
  useEffect(() => {
    let modeler;
    
    const modelerxml = () => {
      if(getxml !== []) {
         modeler = modelerRef.current = new BpmnModeler({
          container: bpmContainerRef.current,
          keyboard: {
            bindTo: window
          },
          propertiesPanel: {
            parent: propertiesRef.current
          },
          additionalModules: [BpmnPropertiesPanelModule,
            BpmnPropertiesProviderModule,
            CamundaPlatformPropertiesProviderModule],
          moddleExtensions: {
            camunda: CamundaBpmnModdle
          }
        });
        modeler
          .importXML(`${getxml}`)
          .then(() => {
            const canvas = modeler.get("canvas");
            canvas.zoom("fit-viewport");
    
          })
          .catch(console.error);
      }
    }
    if(getxml) {
      modelerxml()
    }
  },[getxml])

    // Api ReDeploy to camunda

    const handleDeploy = async (e) => {
      if(name !== "") {
        const file = await e.saveXML();
        const { xml } = file;
          const blob = new Blob([xml], {type:"application/octet-stream"});
          const fromdata = new FormData()
          fromdata.append('data', blob, 'test.bpmn');
          fromdata.append('deployment-name', name);
          fromdata.append('deployment-source', 'Pipat');

          const spance = ' '
          const headers = {
            'content-Type':'application/json',
            'Authorization':'Bearer' + spance + String(authTokens.access)
          }

          setToggle(false)
              await axios.post( `${url}/deployment/create`,fromdata,{headers:headers})
          .then((res) => {
              //setShow(true)
              console.log(res.data);
          }).catch((err)=>{
            console.log(err)
          });
      } else {
        notifyError("Please enter a diagram name.")
      }
  };

  if(loading){
    return  <div style={{height: "100%", width: "100%"}} className="d-flex justify-content-center align-items-center">
              <RingLoader color="#6F2DA8" size={100} speedMultiplier={1} /> 
            </div>
  }

  return (
    <Fragment>
    <div className="Bpmn">
      <div id="container"
        ref={bpmContainerRef}>
            {/* <div className='alertdeploy'>
          <AlertDismissible show={show} setShow={setShow}/>
          </div> */}
      </div>
         <div className="properties"
              ref={propertiesRef}/>
           <div className="allbutton">
           <button onClick={() => navigate("/Workflowlist")} className="button">&#129144;</button>
            <button onClick={() => saveDaigram(modelerRef.current)}
             className="button"> Download BPMN </button>
             <button onClick={() => downloadSvg(modelerRef.current)}
             className="button"> Download Image</button>
             <button onClick={() => setToggle(!toggle)}
             className="button"> Deploy </button>
          </div>
          <div>
          </div>
          <div>
          {toggle && ( 
          <div className="setdeploy">
            <button onClick={() => setToggle(!toggle)}  className="close">&#10005;</button>
            <p className="Daigarm">Deploy daigarm</p>
            <p className="DaigarmName"> Deploy Name </p>
            <input className="inputname" placeholder="Name" type='text/plain' onChange={(e) => setName(e.target.value)}></input>
            <button onClick={() => handleDeploy(modelerRef.current)} 
            className="BTdeploy">Deploy</button>
           </div>)}
          </div>
    </div>
    </Fragment>
  );
}

