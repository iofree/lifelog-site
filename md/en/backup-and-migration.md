---
outline: deep
---

# Data Backup and Migration

## Data Backup

Lifelog supports data backup via iCloud (iOS only), Alibaba Cloud Drive, and WebDAV-enabled cloud drives to prevent data loss.

### iCloud Backup (iOS Only)

To use iCloud backup, you need to enable two settings in your phone's system settings:
- iCloud Drive
- The switch for "Lifelog" within iCloud settings

Once both are enabled, you can perform backups within the app.

### WebDAV Backup

WebDAV backup requires a cloud drive that supports the WebDAV protocol, such as Nutstore (坚果云).
- **Instructions**: Before using WebDAV backup, please review the WebDAV tutorials and limitations of your chosen cloud service provider.
- **Note**: When backing up via WebDAV in Lifelog, please be patient and wait for the upload to complete. The last backup time will be displayed upon completion. The app must remain in the foreground during the backup process; do not switch apps or lock the screen. Backups are incremental and will not re-upload all data each time. If the backup fails due to cloud service limitations, you can tap "Backup Now" again to resume.
- **Recommendation**: We currently recommend using iCloud or Alibaba Cloud Drive for backups.

### Alibaba Cloud Drive Backup

(Please follow the in-app instructions to authorize and set up Alibaba Cloud Drive.)

### How to Back Up

Once your cloud drive is configured, simply tap "Backup Now" on the backup page. During the backup, do not turn off the screen, switch to another app, or use a floating window.

### Restore from Backup

This function downloads your backup data from the cloud and overwrites all local data. It is typically used to restore your data after installing the app on a new device.

## Data Migration

When you switch to a new phone, you can migrate your data using one of the following two methods.

### Method 1: Via Cloud Backup

This is the most recommended method for data migration.

1.  **On your old phone**: Perform a complete backup of all your data via iCloud, Alibaba Cloud Drive, or WebDAV. It's best to back up regularly, as backups are incremental. Waiting to back up a large amount of data right before switching phones may result in long upload times or exceeding your cloud drive's traffic limits.
2.  **On your new phone**: Install the app, go to the backup function, and tap "Restore from Backup" or "Delete Local Data & Overwrite with Cloud Backup" to sync your data from the cloud.
3.  **Confirm**: Ensure all your data has been successfully restored on the new phone.
4.  **Finish**: You can now delete the data on your old phone or reset the device.

### Method 2: Via Import/Export

1.  **On your old phone**: Go to "Settings" -> "Import/Export", and tap "Export" to generate a `.zip` backup file.
2.  **On your new phone**: Transfer the exported `.zip` file to your new phone and use the import function within the app to select the file and restore your data. If the `.zip` file is very large, the import may fail or take a long time. Therefore, using cloud backup for daily backups and migration is highly recommended.
3.  **Confirm**: Ensure all your data has been successfully imported on the new phone.
4.  **Finish**: You can now delete the data on your old phone or reset the device.

## Frequently Asked Questions

### What if I lose my data?
Lifelog is a privacy-first application, meaning all data is stored locally on your device. We do not host your data. Therefore, it is crucial to back up your data yourself using the methods described above. If you have not backed up your data, it cannot be recovered if lost.

### What if I have issues exporting data?
If you encounter problems while exporting, check if your app is updated to the latest version, as older versions may have export-related bugs. Please update the app and try again. Do not uninstall the app from your old phone until you have successfully migrated your data.

### What should I know about WebDAV backup?
Please familiarize yourself with your cloud provider's WebDAV rules. Keep the app in the foreground during the backup process and wait for the incremental backup to complete. You can retry if it fails. Currently, iCloud and Alibaba Cloud Drive are the more recommended backup options.
