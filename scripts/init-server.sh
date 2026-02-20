#!/bin/bash
set -e
echo "[+] Starting cncentre server initialization..."
apt-get update -y && apt-get upgrade -y
if ! grep -q "tcp_bbr" /etc/modules-load.d/modules.conf; then
    echo "tcp_bbr" >> /etc/modules-load.d/modules.conf
    modprobe tcp_bbr
    echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
    echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
    sysctl -p
fi
if [ ! -f /swapfile ]; then
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
fi
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $USER
    rm get-docker.sh
fi
echo "[+] Initialization complete!"
