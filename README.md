# c1z (创一站)
 One-stop platform for internet entrepreneurship - 互联网创业一站式平台

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

Welcome to the official GitHub repository for **cncentre**. We are dedicated to building accessible, efficient, and open tools for the developer community. 

🌐 **Official Website:** [https://c1z.com](https://c1z.com)  
📧 **Contact:** admin@c1z.com

## 🌟 Mission (我们的使命)
Our goal is to provide high-quality resources and solutions that empower developers and creators, fostering a collaborative and open internet environment.

## 🤝 Non-Profit & Open Source Declaration (非营利与开源声明)
**This project is a 100% non-profit, volunteer-driven open-source initiative.** * **No Monetization:** We do not generate revenue, run ads, or sell data. The project operates entirely free of charge for the public good.
* **Open Source:** All core code, documentation, and tools hosted here are released under the MIT License, ensuring they remain free and open forever.
* **Community First:** We rely on community contributions, open-source infrastructure support, and volunteer efforts to maintain and scale our services (such as c1z.com).

## 🛠 Features (项目特性)
* Open-source developer utilities.
* Community-driven documentation and guides.
* Free resources for web deployment and infrastructure management.

## ⚙️ Core Architecture & Code (核心架构与代码)
We focus on modern edge-computing and automated provisioning. Here are our core operational utilities:

* 🛡️ **[Edge Security Router](src/workers/security-router.js)** A highly optimized Cloudflare Worker script deployed at the edge. It automatically mitigates basic bot traffic, injects strict HTTP security headers, and routes API requests before they even hit our origin servers.
* 🚀 **[Server Initialization Scripts](scripts/init-server.sh)** Automated bash scripts designed to quickly bootstrap Debian/Ubuntu cloud instances (e.g., GCP, Oracle Cloud). It automatically configures Docker environments, enables TCP BBR for Egress optimization, and provisions Swap memory for low-resource nodes.
* 🔄 **[CI/CD Pipelines](.github/workflows/deploy-worker.yml)** Automated GitHub Actions workflows that seamlessly deploy our edge code to the Cloudflare global network upon every main branch commit.

## 📚 Documentation & Best Practices (技术文档与最佳实践)
Sharing operational knowledge is a core part of our mission. Check out our open-source guides:

* 🌟 **[Cloudflare Integration Guide](cloudflare-integration-guide.md)** - Detailed architecture decisions on why we utilize Cloudflare R2 for zero-egress storage, Workers for serverless APIs, and advanced WAF for community protection.
* ☁️ **[Cloud Operations & Troubleshooting](cloud-ops-guide.md)** - Practical recovery steps for Oracle Cloud SSH key loss and rapid GCP AMD (`n2d`) instance provisioning.
* 🏢 **[Enterprise Cloud Provisioning](enterprise-cloud-provisioning.md)** - Setup workflows and cost-optimization strategies for SAP BTP Pay-As-You-Go, AWS Graviton instances, and GCP networking.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
