#!/bin/bash

# source directories
SOURCE_DIR="/var/www/BanaPaymentVerficationSystem/"
MONGODB_DIR="/var/lib/mongodb"

# backup directories
BACKUP_DIR="/backup/myapp_backup"
MONGODB_BACKUP_DIR="/backup/mongodb_backup"

# Full paths to commands
RSYNC="/usr/bin/rsync"
MONGODUMP="/usr/bin/mongodump"

# Load environment variables from .env
export $(cat /path/to/your/.env | xargs)

# Ensure backup directories exist
mkdir -p $BACKUP_DIR #directory for backup application files
mkdir -p $MONGODB_BACKUP_DIR #directory for backup mongodb files

# Backup MongoDB data using mongodump
echo "Starting MongoDB backup..."
$MONGODUMP --uri=$MONGODB_URI --out=$MONGODB_BACKUP_DIR/$(date +"%Y%m%d%H%M%S")

# Backup application files using rsync
# echo "Starting application files backup..."
# $RSYNC -avz --delete $SOURCE_DIR $BACKUP_DIR/$(date +"%Y%m%d%H%M%S")

# Print success message
echo "Backup completed successfully!"
