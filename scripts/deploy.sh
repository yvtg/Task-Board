#!/bin/bash
set -e

cd /home/ubuntu/Task-Board 

echo "[+] Pulling latest code..."
git pull origin main

echo "[+] Pull latest images..."
docker compose pull

echo "[+] Restart containers"
docker-compose up -d

echo "[+] Cleanup old images..."
docker image prune -f

echo "[✔] Deployment completed at $(date)" >> /var/log/task-board-deploy.log