import React, { useState, useEffect  } from "react";
// import "./Styles/Dashboard.css";
// import { Chart } from "primereact/chart";
// import axios from "axios";
// import { format } from "date-fns";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Bar } from "react-chartjs-2";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import { Navbar } from "react-bootstrap";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

function Dashboard({ user, setUser })  {
    // const [process, setProcss] = useState([]);
    // //const [formskey, setFormskey] = useState([]);
    // const [chartdata, setChartdata] = useState([]);
    // console.log(chartdata);
    // //Link to report
    // const navigate = useNavigate();
  
    // //Donut ActiveTask
    // const [donuttask, setDonuttask] = useState([]);
    // const [chartData, setChartData] = useState({});
    // const [counttask, setCounttask] = useState([]);
    // const [activeCount, setActiveCount] = useState([]);
    // const [wf, setwf] = useState([]);
  
    // //Line
    // const [counttaskbar, setCounttaskbar] = useState([]);
  
    // const [chartDatas, setChartDatas] = useState({});
    // const [chartOptions, setChartOptions] = useState({});
  
    // //console.log(counttaskbar);
  
    // const [databar, setDatabar] = useState({ labels: [], datasets: [] });
  
    // //console.log(databar);
  
    // const BaseUrl = "http://localhost:8080/engine-rest";
  
    // useEffect(() => {
    //   const userid = user.map((user) => {
    //     return user.id;
    //   });
    //   if (userid.length > 0) {
    //     axios
    //       .get(
    //         `${BaseUrl}/process-definition?sortBy=version&sortOrder=desc&latestVersion=true`
    //       )
    //       .then((res) => {
    //         setProcss(res.data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // }, [user]);
  
    // useEffect(() => {
    //   const userid = user.map((user) => user.id);
    //   const forms = process.map((form) => form.key);
  
    //   //const controller = new AbortController()
  
    //   const getCounts = async () => {
    //     const keycounts = {};
    //     for (let i = 0; i < forms.length; i++) {
    //       const body = {
    //         variables: [
    //           {
    //             name: "Sender",
    //             operator: "eq",
    //             value: `${userid}`,
    //           },
    //         ],
    //         processDefinitionKey: `${forms[i]}`,
    //       };
    //       const [activeRes, completedRes, externallyTerminatedRes] =
    //         await Promise.all([
    //           axios.post(`${BaseUrl}/history/process-instance/count`, {
    //             ...body,
    //             active: "true",
    //           }),
    //           axios.post(`${BaseUrl}/history/process-instance/count`, {
    //             ...body,
    //             completed: "true",
    //           }),
    //           axios.post(`${BaseUrl}/history/process-instance/count`, {
    //             ...body,
    //             externallyTerminated: "true",
    //           }),
    //         ]);
            
    //       //pust Data count and create status in keycountobject
    //       keycounts[forms[i]] = {
    //         stateactive: {
    //           status: "Active",
    //           count: activeRes.data.count,
    //         },
    //         statecomplete: {
    //           status: "Completed",
    //           count: completedRes.data.count,
    //         },
    //         stateexternal: {
    //           status: "ExternallyTerminated",
    //           count: externallyTerminatedRes.data.count,
    //         },
    //       };

    //       //chang object to Array
    //       const keycountsArray = Object.entries(keycounts).map(
    //         ([key, count]) => ({
    //           key,
    //           active: count.stateactive.count,
    //           completed: count.statecomplete.count,
    //           external: count.stateexternal.count,
    //         })
    //       );
    //       setChartdata(keycountsArray);
    //     }
    //   };
  
    //   if (userid.length > 0) {
    //     getCounts();
    //   }
    // }, [process, user]);
    
    // useEffect(() => {
    //   let labels = [];
    //   let activeData = [];
    //   let completedData = [];
    //   let externallyTerminatedData = [];
  
    //   chartdata.forEach(async ({ key, active, completed, external }) => {
    //     labels.push(key);
    //     activeData.push(active);
    //     completedData.push(completed);
    //     externallyTerminatedData.push(external);
    //   });
    //   setDatabar({
    //     labels,
    //     datasets: [
    //       {
    //         label: "Active",
    //         backgroundColor: "#039be5",
    //         data: activeData,
    //       },
    //       {
    //         label: "Completed",
    //         backgroundColor: "#42bd41",
    //         data: completedData,
    //       },
    //       {
    //         label: "ExternallyTerminated",
    //         backgroundColor: "#bdbdbd",
    //         data: externallyTerminatedData,
    //       },
    //     ],
    //   });
    // }, [chartdata]);
  
    // // style bar
    // const getLightTheme = () => {
    //   let basicOptions = {
    //     maintainAspectRatio: false,
    //     aspectRatio: 0.4,
    //     plugins: {
    //       legend: {
    //         labels: {
    //           color: "#000000",
    //         },
    //       },
    //     },
    //     scales: {
    //       x: {
    //         ticks: {
    //           color: "#212121",
    //         },
    //         grid: {
    //           color: "#bdbdbd",
    //         },
    //       },
    //       y: {
    //         ticks: {
    //           color: "#212121",
    //         },
    //         grid: {
    //           color: "#bdbdbd",
    //         },
    //       },
    //     },
    //   };
    //   return {
    //     basicOptions,
    //   };
    // };
  
    // const { basicOptions } = getLightTheme();
  
    // basicOptions.onClick = function (evt, element) {
    //   if (element.length > 0) {
    //     console.log(element);
    //     console.log(databar?.datasets[element[0]?.datasetIndex]);
    //     console.log(
    //       databar?.datasets[element[0]?.datasetIndex]?.data[element[0]?.index]
    //     );
    //     navigate("Formreports");
    //   }
    // };
  
    // // api task count 7 day
    // useEffect(() => {
    //   const date = new Date();
    //   const beYear = date.getFullYear() + 543;
  
    //   const startDates = [];
    //   const startDate = new Date();
    //   startDates.push(format(startDate, `${beYear}-MM-dd`));
  
    //   const endDates = [];
    //   const endDate = new Date();
    //   endDate.setDate(endDate.getDate() + 7);
    //   endDates.push(format(endDate, `${beYear}-MM-dd`));
    //   console.log(startDates);
    //   console.log(endDates);
  
    //   const userid = user.map((user) => user.id);
    //   const position = user.map((user) => user.position);
    //   console.log(position);
    //   const posttaskcount = async () => {
    //     const countsByDate = [];
    //     const days = [
    //       "Sunday",
    //       "Monday",
    //       "Tuesday",
    //       "Wednesday",
    //       "Thursday",
    //       "Friday",
    //       "Saturday",
    //     ];
    //     for (let i = 0; i < 7; i++) {
    //       const currentStartDate = new Date();
    //       currentStartDate.setDate(
    //         currentStartDate.getDate() - currentStartDate.getDay() + i
    //       );
    //       const bodycounttask = {
    //         variables: [
    //           {
    //             name: "Sender",
    //             operator: "eq",
    //             value: `${userid}`,
    //           },
    //         ],
    //         taskInvolvedGroup: `${position}`,
    //         startedAfter:
    //           format(currentStartDate, `${beYear}-MM-dd`) + "T00:00:00.000+0200",
    //         startedBefore:
    //           format(currentStartDate, `${beYear}-MM-dd`) + "T23:59:59.000+0200",
    //       };
    //       //console.log(bodycounttask)
    //       await axios
    //         .post(`${BaseUrl}/history/task/count`, bodycounttask)
    //         .then((res) => {
    //           countsByDate[format(currentStartDate, `${beYear}-MM-dd`)] = {
    //             count: String(res.data.count),
    //             day: days[i] + " " + format(currentStartDate, `${beYear}-MM-dd`),
    //           };
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //     //console.log(countsByDate)
    //     setCounttaskbar(countsByDate);
    //   };
    //   posttaskcount();
    // }, [user]);
  
    // //bar Line task count show task 7 day
    // useEffect(() => {
    //   const label = [];
    //   const data = [];
    //   Object.values(counttaskbar).forEach((task) => {
    //     label.push(task.day);
    //     data.push(task.count);
    //   });
    //   console.log(label);
    //   console.log(data);
    //   const datas = {
    //     labels: label,
    //     datasets: [
    //       {
    //         label: "Weekly Tasks",
    //         data: data,
    //         fill: true,
    //         borderColor: "#4e73df",
    //         tension: 0.4,
    //         backgroundColor: "#f8f9fc",
    //       },
    //     ],
    //   };
    //     const options = {
    //       maintainAspectRatio: false,
    //       aspectRatio: 0.6,
    //       plugins: {
    //         legend: {
    //           labels: {
    //             color: "#404258",
    //           },
    //         },
    //       },
    //       scales: {
    //         x: {
    //           ticks: {
    //             color: "#50577A",
    //           },
    //           grid: {
    //             color: "#bdbdbd",
    //           },
    //         },
    //         y: {
    //           ticks: {
    //             color: "#50577A",
    //           },
    //           grid: {
    //             color: "#bdbdbd",
    //           },
    //         },
    //       },
    //     };
    //   setChartDatas(datas);
    //   options.onClick = function (evt, element) {
    //     if (element.length > 0) {
    //       console.log(element);
    //       navigate("Reportweeklytask");
    //     }
    //   };
    //   setChartOptions(options);
    // }, [counttaskbar, navigate]);
  
    // //fetch task conut
    // useEffect(() => {
    //   const userid = user.map((user) => user.id);
    //   const forms = process.map((form) => form.key);
    //   const position = user.map((user) => user.position);
  
    //   const taskkey = [];
    //   const gettaskcount = async () => {
    //     for (let i = 0; i < forms.length; i++) {
    //       const bodycounttask = {
    //         variables: [
    //           {
    //             name: "Sender",
    //             operator: "eq",
    //             value: `${userid}`,
    //           },
    //         ],
    //         active: "true",
    //         candidateGroup: `${position}`,
    //         processDefinitionKey: `${forms[i]}`,
    //       };
    //       await axios
    //         .post(`${BaseUrl}/task/count`, bodycounttask)
    //         .then((res) => {
    //           taskkey.push({ ...process[i], ...res.data });
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     }
    //     setDonuttask(taskkey);
    //   };
  
    //   gettaskcount();
    // }, [process, user]);
  
    // //Donut Chart Task
    // useEffect(() => {
    //   const label = [];
    //   const data = [];
    //   donuttask.forEach((task) => {
    //     label.push(task.key);
    //     data.push(task.count);
    //     setChartData({
    //       datasets: [ {
    //           data: data,
    //           backgroundColor: ["#243763", "#FF6E31", "#AD8E70", "#FFEBB7"],
    //         },
    //       ],
    //       hoverBackgroundColor: ["#243763", "#FF6E31", "#AD8E70", "#FFEBB7"],
    //       labels: label,
    //     });
    //   });
    // }, [donuttask]);
  
    // let optionstask = {
    //   plugins: {
    //     legend: {
    //       display: true,
    //       position: "right",
    //     },
        
        
    //   },
    // };
  
    // // count task all task
    // useEffect(() => {
    //   const usermanager = user.map((manager) => {
    //     return manager.position;
    //   });
    //   const userid = user.map((user) => {
    //     return user.id;
    //   });
    //   const getcounttask = async () => {
    //     const bodycounttask = {
    //       variables: [
    //         {
    //           name: "Sender",
    //           operator: "eq",
    //           value: `${userid}`,
    //         },
    //       ],
    //       active: "true",
    //       candidateGroup: `${usermanager}`,
    //     };
    //     await axios
    //       .post(`${BaseUrl}/task/count`, bodycounttask)
    //       .then((res) => {
    //         const { count } = res.data;
    //         setCounttask(count);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
    //   getcounttask();
    // }, [user]);

    // // count task activeCount
    // useEffect(() => {
    //   const usermanager = user.map((manager) => {
    //     return manager.position;
    //   });
    //   const userid = user.map((user) => {
    //     return user.id;
    //   });
    //   const getactivetask = async () => {
    //     const body = {
    //       variables: [
    //         {
    //           name: "Sender",
    //           operator: "eq",
    //           value: `${userid}`,
    //         },
    //       ],
    //       active: "true",
    //       candidateGroup: `${usermanager}`,
    //     };
    //     await axios
    //       .post(`${BaseUrl}/history/process-instance/count`, {
    //         ...body,
    //         active: "true",
    //       })
    //       .then((res) => {
    //         const { count } = res.data;
    //         setActiveCount(count);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };
    //   getactivetask();
    // }, [user]);

    // const goToFormsList = () => {
    //   navigate("/Myforms")
    // }

    // const goToTasksList = () => {
    //   navigate("/Mytasks")
    // }

    // const firstname = user.map((user) => {
    //   return user.firstname;
    // });

    // const lastname = user.map((user) => {
    //   return user.lastname;
    // });

    // const position = user.map((user) => {
    //   return user.position;
    // });

    // const department = user.map((user) => {
    //   return user.department;
    // });
    

  return (
    <>
    {/* <div>
    <Sidebar>
    <Navbar/>
    <div className="box-dashborad">
      <div class="inner">
            <label>งานของฉัน</label>

          <div class="row stats ng-scope" ng-if="deployedActive">
            <div class="stats-section processes col-xs-12 col-lg-6">
              <div class="stats-label">ฟอร์ม Active </div>
              
              <label className="text-primary" onClick={goToFormsList}> {activeCount}  </label>
              </div>

            <div class="stats-section decisions col-xs-12 col-lg-6">
              <div class="stats-label ng-binding">ฟอร์มทั้งหมด</div>
              <label class="text-primary"onClick={goToTasksList}>{counttask}</label> </div>
              <div className="card-border-bar">
            <label>ข้อมูลผู้ใช้ </label>
            <p>ชื่อ : {firstname}  {    lastname} </p>
            <p>ตำแหน่ง : {position} </p>
            <p>แผนก : {department}</p>
            <br></br></div>
          </div>
        </div>
        
          <br></br> 
          <div className="box-bar">
            <label>แบบฟอร์มที่กำลังดำเนินการ</label>
            <div className="box-chrat">
            <Bar options={basicOptions} data={databar} /></div>
      
            <div className="bonut-bar">
            <label>งานทั้งหมด</label>
            <Chart className="bar-donut"
              type="doughnut"
              data={chartData}
              options={optionstask}/>
              
          </div>
          </div>

           <div className="weely-tasks">
            <div >
            <label>งานที่ดำเนินการรายสัปดาห์</label>
            <Chart className="bar-weely-tasks"
           type="line"
           data={chartDatas}
           options={chartOptions}
           />
          </div>
          <br></br><br></br>
          </div>
      </div>
    </Sidebar>
    </div> */}
    </>
  );
}
export default Dashboard;
