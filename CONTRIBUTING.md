# Contributing to cncentre (c1z.com)

First off, thank you for considering contributing to **cncentre**! It's people like you that make the open-source community such an amazing place to learn, inspire, and create. 

We are a non-profit community dedicated to building accessible, secure, and efficient cloud infrastructure solutions. Whether you are fixing a typo in our documentation, optimizing a Bash script, or expanding our multi-cloud Terraform architecture, your contributions are highly valued.

## 🤝 Code of Conduct
By participating in this project, you are expected to uphold our community standards. We are committed to providing a welcoming and inspiring experience for all developers, regardless of their background or experience level with cloud infrastructure.

## 💡 How Can I Contribute?

### 1. Reporting Bugs & Infrastructure Issues
If you find a bug in our Cloudflare Workers, a broken deployment script, or an outdated piece of documentation (e.g., changes in GCP or Oracle Cloud provisioning), please open an Issue.
* Check if the issue has already been reported.
* Use a clear and descriptive title.
* Include steps to reproduce the issue, and specify the environment (e.g., OS version for bash scripts, or Wrangler version for Edge workers).

### 2. Suggesting Enhancements
We are always looking for ways to optimize egress costs and improve server automation! 
* Open an Issue detailing your proposal.
* Explain **why** this enhancement would benefit the open-source community (e.g., "This new Terraform module saves X% on AWS bandwidth").

### 3. Pull Requests (PRs)
Ready to write some code? Awesome! Please follow this standard workflow:
1. **Fork** the repository and create your branch from `main`.
2. **Branch naming convention**: Use descriptive names like `feat/add-sap-btp-guide`, `fix/worker-routing`, or `docs/update-readme`.
3. If you've added code (like a new `.sh` script or a `.js` Worker), ensure it is well-commented and tested.
4. If you've changed APIs or infrastructure configurations, update the relevant documentation in the `README.md` or `.md` guide files.
5. Submit your Pull Request! A community maintainer will review your code. We may suggest some tweaks before merging.

## 🛠️ Styleguides & Conventions

* **Infrastructure as Code (Terraform)**: Please run `terraform fmt` before committing to ensure standard formatting.
* **Bash Scripts**: Use `set -e` at the top of your scripts to fail on errors, and ensure all variables are properly quoted.
* **Cloudflare Workers (JavaScript)**: We prefer modern ES6 syntax (Modules format using `export default { fetch }`).

## 🔒 Security Vulnerabilities
As an infrastructure project, security is our top priority. If you discover a security vulnerability (e.g., exposed API keys, WAF bypass, or Server-Side Request Forgery risks), **please DO NOT open a public issue.** Instead, securely email our core team at **admin@c1z.com**. We will evaluate and patch the vulnerability as quickly as possible.

---
*Thank you for helping us build a faster, safer, and more open internet!*
