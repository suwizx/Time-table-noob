"use client"

import dayjs from "dayjs";
import { useState , useEffect } from "react";
import TimeSlot from "./components/TimeSlot";
import End from "./components/End";
import axios from "axios";

export default function Home() {
  const [time , setTime] = useState(new Date());
  const [times , setTimes] = useState([]);

  const [createTimes , setCreateTimes] = useState("");
  const [createTitle , setCreateTitle] = useState("");

  async function postTime(){ 
    const { data } = await axios.post("/api", { title: createTitle , time: new Date(createTimes) });
    console.log(data);
    
    await getTimes();
  }

  async function getTimes(){
    const { data } = await axios.get("/api");
    setTimes(data.dates);
  }

  useEffect(() => {
    getTimes();
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold text-center mb-4">
        {dayjs(time).format("HH:mm:ss")}
      </h1>
      <div className="p-4 mb-4 border border-zinc-700 rounded-lg">
        <input className="p-2 bg-black text-white mb-2" placeholder="Event Title" type="text" onChange={(e:any) => setCreateTitle(e.target.value)} />
        <br />
        <input className="p-2 bg-black text-white mb-2" type="datetime-local" onChange={(e:any) => setCreateTimes(e.target.value)} />
        <br />
        <button className="py-2 px-4 bg-red-500 rounded-lg" onClick={postTime}>
          Create
        </button>
      </div>
      <h2 className="text-2xl font-bold">Incoming</h2>
      {times.map((t: any , i) => (
        <div key={i}>
          <TimeSlot time={t.time} title={t.title} i={i} now={time} />
        </div>
      ))}
      <h2 className="text-2xl font-bold">End</h2>
      {times.map((t: any , i) => (
        <div key={i}>
          <End time={t.time} title={t.title} i={i} now={time} />
        </div>
      ))}
    </div>
  );
}

