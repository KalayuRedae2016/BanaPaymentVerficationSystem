#!/bin/bash

# Source directories
SOURCE_DIR="/var/www/BanaPaymentVerficationSystem/"
MONGODB_DIR="/var/lib/mongodb"

# Backup directories
BACKUP_DIR="/backup/myapp_backup"
MONGODB_BACKUP_DIR="/backup/mongodb_backup"

# Full paths to commands
RSYNC="/usr/bin/rsync"
MONGODUMP="/usr/bin/mongodump"
MONGORESTORE="/usr/bin/mongorestore"

# Load environment variables from .env
ENV_FILE="/var/www/BanaPaymentVerficationSystem/PaymentVerficationsystemBackend/.env"
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs -d '\n')
else
    echo "Error: .env file not found at $ENV_FILE"
    exit 1
fi

# Ensure backup directories exist
mkdir -p "$BACKUP_DIR"
mkdir -p "$MONGODB_BACKUP_DIR"

# Get the current timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Function to perform MongoDB backup
backup_mongo() {
    echo "Starting MongoDB backup..."
    $MONGODUMP --uri="$MONGODB_URI" --out="$MONGODB_BACKUP_DIR/$TIMESTAMP"
    echo "MongoDB backup completed at $MONGODB_BACKUP_DIR/$TIMESTAMP"
}

# Function to restore MongoDB backup
restore_mongo() {
    echo "Starting MongoDB restore..."
    LATEST_BACKUP=$(ls -td "$MONGODB_BACKUP_DIR"/* | head -1)  # Get the latest backup
    if [ -d "$LATEST_BACKUP" ]; then
        $MONGORESTORE --uri="$MONGODB_URI" "$LATEST_BACKUP"
        echo "MongoDB restore completed from $LATEST_BACKUP"
    else
        echo "No MongoDB backup found!"
    fi
}

# Check command-line argument
case "$1" in
    backup)
        backup_mongo
        ;;
    restore)
        restore_mongo
        ;;
    *)
        echo "Usage: $0 {backup|restore}"
        exit 1
        ;;
esac

# Example Usage:
# ./full_backup.sh backup
# ./full_backup.sh restore
