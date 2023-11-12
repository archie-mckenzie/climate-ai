import Image from "next/image";

export default function GreenalysisDisplay({ job }) {
    return (
        <div className="links">
            {job.company_name &&
                <h1>{job.company_name}</h1>
            }
            {job.net_carbon_emissions &&
                <p><b>Net Carbon Emissions: {parseFloat(job.net_carbon_emissions)} metric tons</b></p>
            }
            {job.annualReport &&
                <p><b>Emissions Per Dollar of Revenue in 2022: {parseFloat(job.net_carbon_emissions) / parseFloat(job.annualReport[1].totalRevenue)} metric tons per $</b></p>
            }
            {job.annualReport && job.net_carbon_emissions &&
                <p><b>Emissions Past 5 Years: {(parseFloat(job.annualReport[0].totalRevenue) + parseFloat(job.annualReport[1].totalRevenue) + parseFloat(job.annualReport[2].totalRevenue) + parseFloat(job.annualReport[3].totalRevenue) + parseFloat(job.annualReport[4].totalRevenue)) * (parseFloat(job.net_carbon_emissions) / parseFloat(job.annualReport[1].totalRevenue))} metric tons</b></p>
            }
            {job.annualReport && job.net_carbon_emissions &&
                <p><b>Total Cost of Emissions Past 5 Years: ${51 * ((parseFloat(job.annualReport[0].totalRevenue) + parseFloat(job.annualReport[1].totalRevenue) + parseFloat(job.annualReport[2].totalRevenue) + parseFloat(job.annualReport[3].totalRevenue) + parseFloat(job.annualReport[4].totalRevenue)) * (parseFloat(job.net_carbon_emissions) / parseFloat(job.annualReport[1].totalRevenue))}</b></p>
            }
            {job.summary &&
                <p>{job.summary}</p>
            }
        </div>
    );
};
