# 🤖 Edge AI DevOps Assistant (边缘 AI 运维助手)

Welcome to the **cncentre (c1z.com)** AI DevOps guide. Managing cloud infrastructure across GCP, Oracle Cloud, and SAP BTP often means dealing with complex and cryptic error logs. To help our open-source community troubleshoot faster, we have built a serverless AI log analyzer powered by **Cloudflare Workers AI**.

## 🌟 为什么要在边缘节点引入 AI？
传统的运维排错通常需要开发者将报错信息复制到搜索引擎或第三方的 AI 聊天软件中，这不仅效率低下，还可能存在敏感日志泄露的风险。

通过利用 Cloudflare 遍布全球的边缘计算网络和原生 AI 模型（如开源的 Llama 3），我们构建了一个无需配置服务器、毫秒级响应的 API。开发者可以直接通过命令行（CLI）将报错日志发送到离他们最近的边缘节点，并瞬间获取修复建议。

## 🛠️ How it Works (原理解析)

This tool is a lightweight HTTP POST endpoint deployed via Cloudflare Workers. 

1. **Log Ingestion**: It accepts raw error snippets (e.g., Nginx 502s, Docker build failures, or Cloud-init crash logs).
2. **Edge Inference**: The payload is processed directly at the edge using `env.AI.run('@cf/meta/llama-3.1-8b-instruct')`.
3. **Actionable Output**: The LLM acts as a Senior Cloud Architect, stripping away the noise and returning a structured JSON response with step-by-step mitigation commands.

## 🚀 快速使用示例 (Quick Start)

Assuming the worker is deployed at `https://ai-ops.c1z.com` (replace with your actual worker route), you can easily integrate it into your bash scripts or terminal workflow.

### Example: Troubleshooting an Nginx Error
If your web server throws an error, you can pipe the log directly into our AI assistant:

```bash
curl -X POST [https://ai-ops.c1z.com/](https://ai-ops.c1z.com/) \
     -H "Content-Type: application/json" \
     -d '{
           "log_snippet": "nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)"
         }'
