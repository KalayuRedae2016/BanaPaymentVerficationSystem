#!/bin/bash

# Default values (Change if needed)
BACKUP_SRC="/backup/mongodb_backup"  # MongoDB backup directory on the server -->`ls /backup/mongodb_backup`
LOCAL_USER="user"                    # Local machine username -->whoami
LOCAL_IP="192.168.1.100"             # Local machine IP address -->hostname -I or ip
LOCAL_PATH="/home/$LOCAL_USER/backup" # Local backup directory -->pwd
LOG_FILE="/var/log/backup.log"       # Log file for backup process


# Construct the remote destination path
LOCAL_DEST="$LOCAL_USER@$LOCAL_IP:$LOCAL_PATH"

# Ensure backup folder exists on local machine
ssh "$LOCAL_USER@$LOCAL_IP" "mkdir -p $LOCAL_PATH"

# Perform backup using rsync
rsync -avz --delete "$BACKUP_SRC" "$LOCAL_DEST" >> "$LOG_FILE" 2>&1

# Log completion time
echo "Backup completed on $(date)" >> "$LOG_FILE"
