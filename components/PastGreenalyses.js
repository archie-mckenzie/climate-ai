'use client'

import Link from "next/link";
import { useState, useEffect } from "react";

function GreenalysisPanel({ id, name }) {
    return (
        <div><Link className='subtle-link' href={`/${id}`}>
            <button className='subtle-link greenalysis-panel'>
                {name}
            </button>
        </Link></div>
    )
}

export default function PastGreenalyses() {

    const [fetched, setFetched] = useState(false)
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        if (jobs.length < 1 && !fetched) {
            async function fetchGreenalyses() {
                try {
                    const response = await fetch('api/gallery');
                    const data = await response.json();
                    console.log(data)
                    if (data && !data.error) {
                        setJobs(data.jobs)
                    }
                } catch (error) {
                    console.log(error);
                }
                setFetched(true)
            }
            fetchGreenalyses()
        }
    }, [jobs, fetched])

    return (
        <>
          {
            jobs.length > 0 
            &&
            jobs.map((job, index) => {
                return <GreenalysisPanel id={job._id} name={job.name} key={index}/>
            })
          }
          {
            jobs.length < 1 && fetched
            &&
            <p>No past <b className="highlighted">greenalyses</b> found!</p>
          }
        </>
    );
};