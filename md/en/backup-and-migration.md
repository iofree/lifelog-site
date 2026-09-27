---
outline: deep
title: Diary Backup and Device Migration
description: Learn how local storage, cloud backups and multi-device sync work in Lifelog Note, and how to move entries using ZIP files, cloud storage or the same Wi-Fi network.
---

# Data Backup and Migration

Lifelog Note stores journals locally on your device by default. Local storage, backup and sync serve different purposes:

| Method | Purpose | Requirements |
|---|---|---|
| Local storage | Write and read entries on this device | Local storage alone is not a backup |
| Backup | Keep a copy for recovery or migration | Configure your cloud drive, or export and safely store a ZIP file |
| Multi-device sync | Update diary data across devices | iCloud or Alibaba Cloud Drive, Beta; enable it and keep the app in the foreground |

iCloud is available on supported iPhones and iPads. WebDAV is used for backup here, not two-way sync.

## Data Backup

Open “Menu → Sync & Backup” and choose iCloud (iOS only), Alibaba Cloud Drive or a WebDAV-enabled drive. Regularly check that backups have completed and keep a usable copy. Manual backup is free; automatic backup requires membership, setup and activation, and runs while the app is in the foreground.

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

Once your cloud drive is configured, tap "Backup Now" on that drive's page. This updates its backup with data from the current device. When changing devices, restore the old backup before uploading data from the new device over it. During backup, do not turn off the screen, switch to another app or use a floating window.

### Restore from Backup

Tap "Download and import cloud data" on the drive's page. If iCloud or Alibaba Cloud Drive contains data from a previous sync, the app first offers a choice of recovery sources. When restoring a cloud backup with local entries already present, choose "Merge" or "Overwrite". Merge keeps local data and uses the newer version of the same record. Overwrite clears local data before importing, so save anything you need first.

## Multi-Device Sync

Multi-device sync uses your own iCloud or Alibaba Cloud Drive and is free to use. It is marked Beta, for testing only. Configure the same cloud account on each device, then open “Menu → Sync & Backup → iCloud / Alibaba Cloud Drive → Multi-Device Sync” and turn on "Enable Multi-Device Sync". iCloud is available on iOS devices; Alibaba Cloud Drive can be used between Android and iOS. Keep the app in the foreground during sync. The page shows the last sync time and provides a "Sync Now" action.

Enabling sync hides "Backup Now", "Download and import cloud data" and automatic backup options for that drive. Any automatic backup already enabled for it is turned off. Sync propagates changes and does not replace an independent backup. Safely store a ZIP export or another usable copy before enabling it.

## Data Migration

When you switch to a new phone, you can migrate your data using one of the following three methods. Before restoring, keep copies of any data you need on both devices. Check that entries and media open correctly on the new device before clearing the old one.

### Method 1: Via Cloud Backup

This works well if you already have a complete cloud backup. If both devices are nearby, you can also use the local network transfer below.

1.  **On your old phone**: Perform a complete backup of all your data via iCloud, Alibaba Cloud Drive, or WebDAV. It's best to back up regularly, as backups are incremental. Waiting to back up a large amount of data right before switching phones may result in long upload times or exceeding your cloud drive's traffic limits.
2.  **On your new phone**: Install the app, open "Sync & Backup", configure the same cloud drive and tap "Download and import cloud data". When restoring a cloud backup with local entries already present, choose "Merge" or "Overwrite" as appropriate. Only overwriting clears local data first.
3.  **Confirm**: Ensure all your data has been successfully restored on the new phone.
4.  **Finish**: You can now delete the data on your old phone or reset the device.

### Method 2: Via Import/Export

1.  **On your old phone**: Open “Menu → Sync & Backup → Data Import and Export” and tap "Export" to generate and save a `.zip` backup. Check the required space shown on the export page and ensure your device has enough free storage.
2.  **On your new phone**: Transfer the `.zip` file, tap "Import" in the same location and choose merge or overwrite as needed. Import only an unmodified ZIP exported by this app. For a large library, consider cloud or local network transfer.
3.  **Confirm**: Ensure all your data has been successfully imported on the new phone.
4.  **Finish**: You can now delete the data on your old phone or reset the device.

### Method 3: Transfer over the Same Wi-Fi Network

LAN transfer does not require uploading to a cloud drive. Transferring all data is free. Both devices need an app version that includes "LAN Transfer".

1.  **Connect the devices**: Join the same Wi-Fi network and open “Menu → Sync & Backup → LAN Transfer” on both devices. Allow local network access on iOS and camera access on the receiving device for scanning.
2.  **Choose content**: On the old device, choose "I'm the old device — show QR code", then "All Data". Version 1.23 adds selective transfer "By Notebook" or "By Threads", which requires membership on the sending device. For these options, both devices need a version that supports them. Availability of version 1.23 depends on your download channel.
3.  **Scan and import**: On the new device, choose "I'm the new device — scan to import", scan the QR code, review the content and tap "Start Transfer". A full transfer offers merge or overwrite when local entries exist. Selected notebooks or threads are always merged: missing records are added and the newer version of an existing record is kept.
4.  **Check the result**: Keep both transfer pages open without switching apps or locking the screens. After completion, check entries, comments, photos, videos and recordings, and look for any failed media transfers before clearing the old device.

### Does merging remove every duplicate entry?

Merge identifies the same existing record and compares its update time. Transferring the same data again normally does not create another copy of that record. Entries created separately, duplicated or recreated through another import can remain separate even when their text matches. Merge is not a tool for removing entries based on similar content.

## Frequently Asked Questions

### What if I lose my data?
Journals are stored locally on your device by default. If you enable cloud backup or sync, the relevant data is also stored in your chosen cloud drive. We do not provide a hosted journal recovery service. Check other devices, cloud backups and exported ZIP files first. If both local data and all usable copies are lost, we cannot recover them for you.

### What if I have issues exporting data?
If you encounter problems while exporting, check if your app is updated to the latest version, as older versions may have export-related bugs. Please update the app and try again. Do not uninstall the app from your old phone until you have successfully migrated your data.

### What should I know about WebDAV backup?
WebDAV is for backup, not two-way sync. Please familiarize yourself with your cloud provider's WebDAV rules. Keep the app in the foreground during the backup process and wait for the incremental backup to complete. You can retry if it fails. Currently, iCloud and Alibaba Cloud Drive are the more recommended backup options.
