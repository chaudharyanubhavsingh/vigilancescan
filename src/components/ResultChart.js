import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableRow } from "./ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'
import { AlertTriangle, AlertOctagon, AlertCircle } from 'lucide-react'

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']

const vulnerabilityData = [
  { name: 'Critical', value: 3 },
  { name: 'High', value: 5 },
  { name: 'Medium', value: 8 },
  { name: 'Low', value: 12 },
]

const vulnerabilityTypeData = [
  { name: 'SQL Injection', count: 2 },
  { name: 'XSS', count: 4 },
  { name: 'CSRF', count: 3 },
  { name: 'Broken Auth', count: 2 },
  { name: 'Data Exposure', count: 3 },
]

 const scanData = {
    scanDate: "2023-06-15",
    targetURL: "https://example.com",
    totalVulnerabilities: 28,
    criticalVulnerabilities: 3,
    highVulnerabilities: 5,
    mediumVulnerabilities: 8,
    lowVulnerabilities: 12
  }

   const securityPosture = "concerning due to the presence of critical vulnerabilities in core system components"
  
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
function ResultChart() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Vulnerability Scan Report</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>1. Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Scan Date</TableCell>
                <TableCell>{scanData.scanDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Target URL</TableCell>
                <TableCell>{scanData.targetURL}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Vulnerabilities Detected</TableCell>
                <TableCell>{scanData.totalVulnerabilities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Critical Vulnerabilities</TableCell>
                <TableCell className="text-red-600 font-bold">{scanData.criticalVulnerabilities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">High Vulnerabilities</TableCell>
                <TableCell className="text-orange-600 font-bold">{scanData.highVulnerabilities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Medium Vulnerabilities</TableCell>
                <TableCell className="text-yellow-600 font-bold">{scanData.mediumVulnerabilities}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Low-Risk Vulnerabilities</TableCell>
                <TableCell>{scanData.lowVulnerabilities}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2. Top 5 OWASP Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {[1, 2, 3, 4, 5].map((i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger>
                  <div className="flex items-center">
                    {i === 1 && <AlertOctagon className="text-red-500 mr-2" />}
                    {i === 2 && <AlertTriangle className="text-orange-500 mr-2" />}
                    {i > 2 && <AlertCircle className="text-yellow-500 mr-2" />}
                    Vulnerability #{i}: {vulnerabilityTypeData[i-1].name}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p><strong>Description:</strong> Brief description of {vulnerabilityTypeData[i-1].name}.</p>
                  <p><strong>Severity:</strong> {i === 1 ? 'Critical' : i === 2 ? 'High' : 'Medium'}</p>
                  <p><strong>Location:</strong> Various endpoints in the application</p>
                  <p><strong>Affected Components:</strong> User input fields, authentication system</p>
                  <p><strong>Proof of Concept:</strong> Detailed in the full report</p>
                  <h4 className="font-bold mt-4">Recommendations:</h4>
                  <p><strong>Suggested Fix:</strong> Implement proper input validation and sanitization</p>
                  <p><strong>Steps to Remediate:</strong> 1. Review all input fields, 2. Implement server-side validation, 3. Use prepared statements for database queries</p>
                  <p><strong>Resources:</strong> OWASP Cheat Sheet for {vulnerabilityTypeData[i-1].name}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>4. Visualizations</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-around">
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
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Summary and Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-semibold mb-2">Overall Security Posture</h3>
          <p className="mb-4">
            Based on the scan results, the overall security posture of the website is concerning. 
            There are {scanData.criticalVulnerabilities} critical vulnerabilities that require immediate attention.
          </p>
          <h3 className="font-semibold mb-2">Prioritized Action Plan</h3>
          <ol className="list-decimal list-inside mb-4">
          <ol className="list-decimal list-inside mb-4">
  {prioritizedActionPlan.map((action, index) => (
    <li key={index}>{action}</li>
  ))}
</ol>
          </ol>
          <h3 className="font-semibold mb-2">Best Practices</h3>
          <ul className="list-disc list-inside">
            <li>Regularly update and patch all software components</li>
            <li>Implement a Web Application Firewall (WAF)</li>
            <li>Conduct regular security audits and penetration testing</li>
            <li>Provide security awareness training for development team</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultChart