# ==============================================================================
# cncentre (c1z.com) - Infrastructure as Code (IaC)
# Description: Terraform configuration to route traffic from Cloudflare Edge 
# to multiple cloud backends (GCP, AWS) with WAF rules enabled.
# License: MIT
# ==============================================================================

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

# Variable definitions
variable "cloudflare_zone_id" {
  description = "The Zone ID for c1z.com in Cloudflare"
  type        = string
}

variable "gcp_backend_ip" {
  description = "The public IP of the primary GCP Compute Engine node"
  type        = string
}

variable "aws_fallback_ip" {
  description = "The public IP of the fallback AWS EC2 node"
  type        = string
}

# 1. Primary DNS Record (Routing to Google Cloud Platform)
resource "cloudflare_record" "api_primary_gcp" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  value   = var.gcp_backend_ip
  type    = "A"
  proxied = true # Critical: Enables Cloudflare DDoS protection & caching
  ttl     = 1
}

# 2. Strict SSL/TLS Configuration for Enterprise Security
resource "cloudflare_zone_settings_override" "c1z_security_settings" {
  zone_id = var.cloudflare_zone_id
  settings {
    ssl                      = "strict"
    always_use_https         = "on"
    min_tls_version          = "1.2"
    browser_cache_ttl        = 14400
    brotli                   = "on"
    early_hints              = "on"
    security_level           = "high"
  }
}

# 3. Custom WAF Rule: Block suspicious specific ASNs or Countries 
# protecting backend SAP/Oracle APIs from abuse
resource "cloudflare_ruleset" "block_malicious_traffic" {
  zone_id     = var.cloudflare_zone_id
  name        = "cncentre Core Security WAF"
  description = "Block known malicious botnets targeting enterprise APIs"
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    action = "block"
    expression = "(ip.geoip.country in {\"T1\"}) or (cf.threat_score > 40)"
    description = "Block High Threat Score & Tor Networks"
    enabled = true
  }
}
