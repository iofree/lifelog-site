---
title: FAQ on Membership, Live Photos and Data
description: Find answers about free features, local diary storage, backup and sync, Live Photos, device migration and membership restoration in Lifelog Note.
---

# Frequently Asked Questions

## Data Privacy & Security

### Where are journals stored, and why does Android have a membership account?
Lifelog Note stores journals locally on your device by default. Local diary storage and membership verification are separate features. The Android email account manages membership benefits; it is not a hosted journal account. You can export your data or choose your own cloud drive for backup. If you enable cloud backup or sync, the relevant data is also stored in that drive.

### What if I lose my data?
Check other devices, cloud backups and exported ZIP files first. Local storage alone is not a backup. If both local data and all usable copies are lost, we cannot recover them for you. Before changing phones, confirm that your backup has completed; after restoring, check entries and media files.

### What if data export has issues?
Is your app version very old? Very old versions may have data export issues. If there are no signature issues, please upgrade to the latest version before exporting. (Please remember to update regularly - I frequently release various fixes). If there are signature issues and you haven't completed backup (export data or backup to cloud), don't uninstall yet. First backup to cloud or try re-exporting and importing until the exported data works properly.

## Backup/Device Migration

### Are multi-device sync and backup the same?
Backup keeps a copy for recovery; sync updates data across devices. Sync uses your own iCloud or Alibaba Cloud Drive, is free, and is marked Beta, for testing only. Configure the same cloud account on each device and keep the app in the foreground. iCloud is available on supported iPhones and iPads. WebDAV is for backup, not two-way sync. Open “Menu → Sync & Backup → your cloud drive → Multi-Device Sync”. Enabling it hides that drive's backup options and turns off automatic backup, so keep an independent copy first. See the [backup and migration guide](/en/docs/backup-and-migration).

### Migration via Cloud Storage
Before deleting data on your old phone, complete these steps:
1. Successfully backup and upload all data via iCloud (iOS), Alibaba Cloud Drive or WebDAV in the backup section (it's best to backup regularly - incremental backup. Waiting until phone change may result in long upload times or exceed cloud storage upload limits)
2. On your new phone, configure the same drive in "Sync & Backup" and tap "Download and import cloud data". When restoring a cloud backup with local entries already present, choose "Merge" or "Overwrite"; overwrite clears local data first
3. Ensure new phone has the data
4. Finally, delete data from old phone or discard it

### Data Import/Export
Before deleting data on your old phone, complete these steps:
1. Open “Menu → Sync & Backup → Data import and export”, tap "Export", check the required storage space and safely store the ZIP file
2. Tap "Import" in the same location on the new phone, select an unmodified ZIP exported by this app and choose merge or overwrite as needed. For a large library, consider cloud or LAN transfer
3. Ensure new phone has the data
4. Finally, delete data from old phone or discard it

### Does LAN transfer require membership?
Transferring all data is free. Connect both devices to the same Wi-Fi and open “Menu → Sync & Backup → LAN Transfer”. Choose the old-device role to show a QR code and the new-device role to scan it. Version 1.23 adds selective transfer by notebook or thread, which requires membership on the sending device and a supporting version on both devices. Version 1.23 availability depends on your download channel. Partial transfers always merge; a full transfer offers merge or overwrite when local entries exist. Keep both transfer pages open without locking the screens, then check entries and media after completion.

### Does merging remove duplicates?
For the same record, merge keeps the newer version. Transferring the same data again normally does not add another copy. Entries created separately or duplicated can remain distinct even if their text matches. Merge does not remove entries based on matching content. See the [backup and migration guide](/en/docs/backup-and-migration).

### WebDAV Backup Instructions
When using WebDAV backup, please first check the WebDAV tutorials and limitations for different cloud platforms. When using WebDAV backup in Lifelog Note, please wait patiently for upload; after all backup is complete, it will show the last backup time. During backup, keep Lifelog Note app in foreground - don't switch out or lock screen. Backup is incremental and won't re-upload everything each time. If cloud has limitations and fails, you can click to continue backup again. Currently WebDAV backup is not recommended - iCloud backup and Alibaba Cloud Drive backup are recommended instead.

## Membership

### Is Lifelog Note free?
The app is free to download with no limit on the number of entries. Free users can add up to 9 ordinary photos per entry and create 3 diary threads. Manual cloud backup, multi-device sync (Beta) and full LAN transfer are free. Members can add up to 25 photos, Live Photos and videos in total per entry and use Live Photos, video, audio recording, media within the text, automatic backup and PDF export. Selective LAN transfer in version 1.23 also requires membership. Check the app for current benefits and prices.

### Membership Purchase & Migration
Android and iOS memberships are purchased separately. An Android membership account can be logged in and used on only one device; moving the membership login does not move your diary data. Entries can be migrated between iOS and Android using import/export or LAN transfer. Media playback still depends on the device and format.

### Android Membership Account System
Android now supports membership account system. Users can login with the email address bound during previous redemption (emails bound with previous redemption codes don't have passwords set - for first login, click "Forgot Password" first, receive verification code via email to reset password, then login with account and password directly). If your previously entered email address can't receive verification codes, contact me via Alipay for troubleshooting.

### iOS Membership Restoration
For iOS membership, directly click "Restore Purchase" in the top right corner of the in-app membership page.

To combat piracy, protect developer rights, and ensure optimal app maintenance, we verify your member App Store account.

Membership privileges are linked to the Apple ID used for the original purchase. Please log in to the App Store using that Apple ID. Additionally, ensure the app was downloaded with this same account and that your account's region has not been switched. (Before redownloading, complete a cloud backup or ZIP export and confirm that the backup is safely stored; do not uninstall first. Then switch back to the Apple ID used for the in-app purchase, redownload the app, then switch your account back to the region where the in-app purchase was made, and tap "Restore Purchases" again.)


### How to migrate membership after changing Android phones
Android now supports membership account system. Users can login with the email address bound during previous redemption (emails bound with previous redemption codes don't have passwords set - for first login, click "Forgot Password" first, receive verification code via email to reset password, then login with account and password directly). If your previously entered email address can't receive verification codes, contact me via Alipay for troubleshooting.

## Feature Usage

### Does the app support Live Photos?
On iOS, members can add and revisit Live Photos. Open the media panel while editing an entry, choose "Live", then press and hold an added photo to play it. Keep the complete original media; a still cover alone cannot restore the motion.

Android version 1.23 adds support for some motion photo formats from Google/Xiaomi, Samsung, OPPO, vivo and Honor/Huawei, also for members. Detection and playback depend on the original file, photo access and device decoding support; not every model or format from those brands is supported. The Live entry is currently unavailable in the Zhuoyitong/EasyAbroad Android compatibility environments on HarmonyOS NEXT. Version 1.23 availability depends on your download channel. If an original motion photo is not recognized, use "Contact Us" in the app to share the phone model, system version and original file.

### Will a Live Photo still move after saving or sharing it?
Open the photo viewer from an entry and tap the save button at the top to save to the system gallery. iOS attempts to save a complete Live Photo, but limited permissions or a failed save may result in separate photo and video files. Android currently saves the photo and video separately. The share button also shares Live Photos as separate photo and video files. For a full device migration, use ZIP, cloud or LAN transfer and check playback on the new device. A still image or a long journal image is not a backup of its moving media.

### Does On This Day automatically find old album photos?
On This Day shows saved diary entries with matching dates from previous years. A new installation without historical entries does not automatically create past journals from your photo album.

### How to delete/edit tags, templates, comments, notebooks
Try swiping left or right

### Why is there a limit on the earliest time in calendar?
The earliest and latest times shown in calendar are based on your diary entry times. You can create a diary entry, then click the time at the top to customize and select.

### Is there a password feature?
App Lock requires membership. Open settings from the sidebar to set a passcode and enable face or fingerprint unlock where supported by your device.

### Can't copy/paste, or can only select all, can't select partial text
Double-tap to select partially, long-press to select all

## Technical Issues

### Android shows "Loading failed" when selecting images/videos to add
Open Lifelog Note's app permissions in system settings and check photo and video access. Make sure the media you want to add is included in the granted access. If access is limited to selected photos, add the required photos or videos to that selection, then try again in the app. Permission labels vary by Android version and device.

## How to report issues/requests and contact us

App Sidebar - Contact Us
