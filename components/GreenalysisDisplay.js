import Image from "next/image";
export default function GreenalysisDisplay({job}) {
    return (
        <div className="links">
            { job.company_name &&
                <h1>{job.company_name}</h1>
            }
            {
                job.net_carbon_emissions &&
                <p><b>Net Carbon Emissions: {job.net_carbon_emissions} metric tons</b></p>
            }
            {
                job.annualReport &&
                <p><b>Emissions Per Dollar of Revenue in 2022: {job.net_carbon_emissions / job.annualReport[1].totalRevenue}</b></p>
            }
            {
                job.annualReport && job.net_carbon_emissions &&
                <p><b>Emissions Past 5 Years: {(job.annualReport.reduce((sum, report) => sum + report.totalRevenue, 0))*(job.net_carbon_emissions / job.annualReport[1].totalRevenue)}</b></p>
            }
            {
                job.annualReport &&
                <p><b>Total Cost of Emissions Past 5 Years: {88*10*10*10*10*10*10*(job.annualReport.reduce((sum, report) => sum + report.totalRevenue, 0))}</b></p>
            }
            {
                job.summary &&
                <p>{job.summary}</p>
            }
        </div>
    );
};