#!/bin/bash

# Define source directories
SOURCE_DIR="/var/www/BanaPaymentVerficationSystem/"
MONGODB_DIR="/var/lib/mongodb"

# Define backup directories
BACKUP_DIR="/backup/myapp_backup"
MONGODB_BACKUP_DIR="/backup/mongodb_backup"

# Full paths to commands (modify based on your server environment)
RSYNC="/usr/bin/rsync"
MONGODUMP="/usr/bin/mongodump"

# Backup MongoDB data using mongodump
echo "Starting MongoDB backup..."
$MONGODUMP --out=$MONGODB_BACKUP_DIR

# Backup application files using rsync
# echo "Starting application files backup..."
# $RSYNC -avz --delete $SOURCE_DIR $BACKUP_DIR

# Print success message
echo "Backup completed successfully!"
