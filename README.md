# c1z (创一站)
 One-stop platform for internet entrepreneurship - 互联网创业一站式平台

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare_Workers-F38020.svg?logo=cloudflare)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC.svg?logo=terraform)

Welcome to the official GitHub repository for **cncentre**. We are a non-profit open-source initiative dedicated to building accessible, secure, and efficient cloud infrastructure solutions for the global developer community.

🌐 **Official Website:** [https://c1z.com](https://c1z.com)  
📧 **Contact:** admin@c1z.com

## 🛡️ Non-Profit & Open Source Declaration (非营利与开源声明)
**This project is a strictly non-profit, volunteer-driven open-source initiative.** * **Zero Monetization:** We do not generate revenue, run commercial advertisements, or sell user data. 
* **100% Open Source:** All core code, CI/CD pipelines, IaC configurations, and documentation hosted here are released under the MIT License.
* **Community First:** We rely heavily on community contributions and programs designed for public-good projects (like Cloudflare Project Alexandria) to maintain our global infrastructure and deliver high-speed resources to developers.

## ⚙️ Core Architecture & Multi-Cloud Code (核心架构与多云代码)
We focus on modern edge-computing, automated provisioning, and multi-cloud routing. Here are our core operational utilities:

### Edge Computing, Security & AI (边缘计算、安全与 AI)
* 🤖 **[Edge AI DevOps Assistant](src/workers/ai-log-analyzer.js)**: A serverless troubleshooting tool powered by **Cloudflare Workers AI**. It processes raw server error logs (from Docker, Nginx, or cloud instances) at the edge and utilizes open-source LLMs (like Llama 3) to instantly generate actionable fix recommendations for our community developers.
* ☁️ **[Multi-Cloud Storage Proxy](src/workers/cloud-storage-proxy.js)**: A proxy Worker designed to cache objects from Azure Blob or AWS S3 directly at the Cloudflare Edge.
* 🛡️ **[Edge Security Router](src/workers/security-router.js)**: Mitigates basic bot traffic and injects strict HTTP security headers.

### Infrastructure as Code (IaC) & Automation
* 🌍 **[Terraform Cloudflare Routing](infra/terraform/cloudflare-routing.tf)**: Enterprise-grade Terraform scripts to manage Cloudflare DNS, WAF rules, and traffic routing to multiple cloud backends (e.g., GCP, AWS).
* 🚀 **[Server Initialization Scripts](scripts/init-server.sh)**: Automated bash scripts to quickly bootstrap Debian/Ubuntu cloud instances, configuring Docker, TCP BBR for Egress optimization, and Swap memory.
* 🔄 **[CI/CD Pipelines](.github/workflows/deploy-worker.yml)**: Automated GitHub Actions workflows for seamless edge deployments.

### Edge Computing & Security (Cloudflare Workers)
* ☁️ **[Multi-Cloud Storage Proxy](src/workers/cloud-storage-proxy.js)**: A proxy Worker designed to cache objects from Azure Blob or AWS S3 directly at the Cloudflare Edge, eliminating exorbitant cloud egress costs.
* 🛡️ **[Edge Security Router](src/workers/security-router.js)**: A highly optimized Worker that mitigates basic bot traffic and injects strict HTTP security headers.
* 🤖 **[Turnstile API Validator](src/security/turnstile-validator.js)**: Middleware to validate Cloudflare Turnstile tokens, ensuring only human traffic reaches our expensive backend APIs (e.g., SAP BTP).

## 📚 Documentation & Best Practices (技术文档与最佳实践)
Sharing operational knowledge is a core part of our mission. Check out our open-source guides:

* 🌟 **[Cloudflare Integration Guide](cloudflare-integration-guide.md)** - Detailed architecture decisions on why we utilize Cloudflare R2, Workers, and WAF.
* ☁️ **[Cloud Operations & Troubleshooting](cloud-ops-guide.md)** - Practical recovery steps for Oracle Cloud SSH key loss and rapid GCP AMD instance provisioning.
* 🏢 **[Enterprise Cloud Provisioning](enterprise-cloud-provisioning.md)** - Setup workflows and cost-optimization strategies for SAP BTP Pay-As-You-Go, AWS Graviton instances, and GCP networking.

## 🤝 Contributing
We welcome contributions from the community! Whether it's a pull request to optimize our bash scripts, expanding our documentation, or improving our IaC logic, your help is appreciated. 

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
Copyright (c) 2026 cncentre (c1z.com)
