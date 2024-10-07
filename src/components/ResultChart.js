import './result.css';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, AlertOctagon, BadgeAlert } from 'lucide-react';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

function ResultChart({ data }) {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    const prioritizedActionPlan = [
      "Address critical SQL Injection vulnerability in login form",
      "Fix Cross-Site Scripting (XSS) issues in user comment system",
      "Implement anti-CSRF tokens for all state-changing operations",
      "Enhance authentication mechanisms to prevent unauthorized access",
      "Encrypt all sensitive data both at rest and in transit"
    ]
    
   const bestPractices = [
      "Regularly update and patch all software components",
      "Implement a Web Application Firewall (WAF)",
      "Conduct regular security audits and penetration testing",
      "Provide security awareness training for the development team",
      "Implement a secure development lifecycle (SDLC) process"
    ]
    const {
        vulnerabilities = {},
        recommendations = [],
        scanDate,
        targetURL,
        criticalVulnerabilities,
        highVulnerabilities,
        mediumVulnerabilities,
        lowVulnerabilities,
        securityPosture,
        Websitescrape
    } = parsedData;
    const totalVulnerabilities= criticalVulnerabilities+highVulnerabilities +mediumVulnerabilities + lowVulnerabilities;
console.log(parsedData);
    // Prepare data for charts
    const vulnerabilityData = [
        { name: 'Critical', value: criticalVulnerabilities },
        { name: 'High', value: highVulnerabilities },
        { name: 'Medium', value: mediumVulnerabilities },
        { name: 'Low', value: lowVulnerabilities },
    ];

    const vulnerabilityTypeData = [
        { name: 'Broken Access Control', count: vulnerabilities.brokenAccessControl || 0 },
        { name: 'Security Misconfiguration', count: vulnerabilities.securityMisconfiguration || 0 },
        { name: 'XML External Entities', count: vulnerabilities.xmlExternalEntities || 0 },
        { name: 'Using Components with Known Vulnerabilities', count: vulnerabilities.usingComponentsWithKnownVulnerabilities || 0 },
        { name: 'Broken Authentication', count: vulnerabilities.brokenAuth || 0 },
        { name: 'Injection', count: vulnerabilities.injection || 0 },
        { name: 'Cross Site Scripting', count: vulnerabilities.crossSiteScripting || 0 },
        { name: 'Sensitive Data Exposure', count: vulnerabilities.sensitiveDataExposure || 0 },
        { name: 'Insecure Deserialization', count: vulnerabilities.insecureDeserialization || 0 },
        { name: 'Insufficient Logging and Monitoring', count: vulnerabilities.insufficientLoggingAndMonitoring || 0 }
    ];

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-3xl font-bold mb-4">Vulnerability Scan Report</h1>

            <Card className="card">
                <CardHeader>
                    <CardTitle>1. Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="table">
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Scan Date</TableCell>
                                <TableCell>{scanDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Target URL</TableCell>
                                <TableCell>{targetURL}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Total Vulnerabilities Detected</TableCell>
                                <TableCell>{totalVulnerabilities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Critical Vulnerabilities</TableCell>
                                <TableCell className="text-red-600 font-bold">{criticalVulnerabilities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">High Vulnerabilities</TableCell>
                                <TableCell className="text-orange-600 font-bold">{highVulnerabilities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Medium Vulnerabilities</TableCell>
                                <TableCell className="text-yellow-600 font-bold">{mediumVulnerabilities}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Low-Risk Vulnerabilities</TableCell>
                                <TableCell>{lowVulnerabilities}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="card">
                <CardHeader>
                    <CardTitle>2. Top 10 OWASP Vulnerabilities</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="accordion w-full">
                        {vulnerabilityTypeData.slice(0, 10).map((vuln, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger>
                                    <div className="flex items-center">
                                    {index <3 && <AlertOctagon style={{color:" red"}} className="text-red-500 mr-2" />}
                    {index === 3&& <AlertTriangle style={{color:" orange"}} className="text-orange-500 mr-2" />}
                    {index === 4&& <AlertTriangle style={{color:" orange"}} className="text-orange-500 mr-2" />}
                    {index === 5&& <AlertTriangle style={{color:" orange"}} className="text-orange-500 mr-2" />}
                    {index === 6&& <AlertTriangle style={{color:" orange"}} className="text-orange-500 mr-2" />}
                    {index > 6 && <BadgeAlert  style={{color:" yellow"}} className="text-yellow-500 mr-2" />}
                                        Vulnerability #{index + 1}: {vuln.name}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent  style={{ textAlign: "justify"}}>
                                    <p><strong>Description:</strong> Brief description of {vuln.name}.</p>
                                    <p><strong>Severity:</strong> {index < 2 ? 'Critical' : 'High'}</p>
                                    <p><strong>Location:</strong> Various endpoints in the application</p>
                                    <p><strong>Affected Components:</strong> {securityPosture}</p>
                                    <p><strong>Proof of Concept:</strong> Detailed in the full report</p>
                                    <h4 className="font-bold mt-4">Recommendations:</h4>
                                    <p><strong>Suggested Fix:</strong> {recommendations.join(', ')}</p>
                                    <p><strong>Steps to Remediate:</strong> {recommendations.join(', ')}</p>
                                    <p><strong>Resources:</strong> OWASP Cheat Sheet for {vuln.name}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            {/* Visualizations */}
            <Card className="card">
                <CardHeader>
                    <CardTitle>4. Visualizations</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap justify-around responsive-container">
                    <div className="w-full md:w-1/2 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Vulnerability Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={vulnerabilityData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {vulnerabilityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Vulnerabilities by Type</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={vulnerabilityTypeData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8">
                                    {vulnerabilityTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="card">
                <CardHeader>
                    <CardTitle>5. Summary and Recommendations</CardTitle>
                </CardHeader>
                <CardContent  style={{ textAlign: "justify"}}>
                    <h3  className="font-semibold mb-2" >Overall Security Posture</h3>
                    <p className="mb-4">
                        Based on the scan results, the overall security posture of the website is concerning. 
                        There are {criticalVulnerabilities} critical vulnerabilities that require immediate attention.
                    </p>
                    <h3 className="font-semibold mb-2">Prioritized Action Plan</h3>
                    <ol className="list-decimal list-inside mb-4">
                        {prioritizedActionPlan.map((action, index) => (
                            <li key={index}>{action}</li>
                        ))}
                    </ol>
                    <h3 className="font-semibold mb-2">Best Practices</h3>
                    <ul className="list-disc list-inside">
                        {bestPractices.map((practice, index) => (
                            <li key={index}>{practice}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card className="card">
                <CardHeader>
                    <CardTitle>6.Website Scraper output</CardTitle>
                </CardHeader>
                <CardContent  style={{ textAlign: "justify"}}>
                    <h3  className="font-semibold mb-2" >Scrapped data</h3>
                    <p className="mb-4">
                        {Websitescrape}
                    </p>
                    {/* <h3 className="font-semibold mb-2">Prioritized Action Plan</h3>
                    <ol className="list-decimal list-inside mb-4">
                        {prioritizedActionPlan.map((action, index) => (
                            <li key={index}>{action}</li>
                        ))}
                    </ol>
                    <h3 className="font-semibold mb-2">Best Practices</h3>
                    <ul className="list-disc list-inside">
                        {bestPractices.map((practice, index) => (
                            <li key={index}>{practice}</li>
                        ))}
                    </ul> */}
                </CardContent>
            </Card>
        </div>
    );
}

export default ResultChart;
