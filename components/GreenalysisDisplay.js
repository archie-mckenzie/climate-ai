export default function GreenalysisDisplay({job}) {
    return (
        <div className="links">
            { job.company_name &&
                <h1>{job.company_name}</h1>
            }
            {
                job.net_carbon_emissions &&
                <p><b>Net Carbon Emissions: {job.net_carbon_emissions}</b></p>
            }
            {
                job.summary &&
                <p>{job.summary}</p>
            }
        </div>
    );
};